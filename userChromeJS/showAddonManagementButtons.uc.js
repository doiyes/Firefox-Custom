// ==UserScript==
// @include      about:addons
// ==/UserScript==

location.href == 'about:addons' && ({
  init () {
    const browser = document.getElementById('html-view-browser');
    if(!browser) return;
    this.addStyle();
    const addObserver = (doc) => {
      const main = doc.getElementById('main');
      const observer = new browser.contentWindow.MutationObserver((e) => {
        observer.disconnect();
        this.addMenu(doc);
        addObserver(doc);
      });
      observer.observe(main, {childList: true});
    }

    const doc = browser.contentDocument;
    this.addMenu(doc);
    addObserver(doc);
  },

  addMenu (doc) {
    const win = doc.defaultView;
    let list = doc.querySelector('addon-list, div[current-view="detail"] addon-card');
    if(!list) return;
    const { FileUtils } = ChromeUtils.import('resource://gre/modules/FileUtils.jsm');

    //将扩展名改为 名称 + 版本号
    list.querySelectorAll('.addon-name').forEach(n => {
      n.textContent += ' ' + n.closest('addon-card').addon.version;
    });
    const isAddonList = list.matches('addon-list');
    const onClick = (e, callback) => {
      if(e.target.localName !== 'panel-item' || !e.target.dataset.action)
        return;
      e.stopPropagation();
      e.preventDefault();
      const card = e.target.closest('addon-card');
      if(!card) return;
      const addon = card.addon;
      if(addon && (e.target.dataset.action === 'open-folder' || e.target.dataset.action === 'inspect')){
        callback(addon, e.target.dataset.action);
        e.target.parentNode.parentNode.panel.hide();
      }
    }
    //打开文件夹菜单项
    list.addEventListener('click', e => {
      onClick(e, (addon, action) => {
        if(addon.type == 'extension' || addon.type == 'theme') {
          if(addon.type == 'extension' && action === 'open-folder'){
            let file = FileUtils.getDir('ProfD', ['extensions', addon.id + '.xpi']);
            if(file.exists())
              return file.reveal();
            const icon = Object.values(addon.icons).find(icon => /^(jar:)?file:/.test(icon));
            if(icon){
              let path = icon.match(/^(?:jar:)?(.+?\.xpi)!.+/);
              if(!path) return;
              path = Cc["@mozilla.org/network/protocol;1?name=file"]
                    .getService(Ci.nsIFileProtocolHandler)
                    .getFileFromURLSpec(path[1]).path;
              file = Components.classes['@mozilla.org/file/local;1']
                    .createInstance(Components.interfaces.nsIFile);
              file.initWithPath(path);
              if(file.exists())
                file.reveal();
            }
          }else if(action === 'inspect'){
            Services.wm.getMostRecentWindow('navigator:browser')
              .openTrustedLinkIn(`about:devtools-toolbox?type=extension&id=${addon.id}`, 'tab');
          }
        }else if(addon.type == 'plugin'){
          if(addon.pluginFullpath && addon.pluginFullpath.length > 0){
            const file = Components.classes['@mozilla.org/file/local;1']
                  .createInstance(Components.interfaces.nsIFile);
            file.initWithPath(addon.pluginFullpath[0]);
            if(file.exists())
              file.reveal();
          }
        }
      });
    }, true);
    //打开文件夹菜单项中键复制 扩展名 + 版本号
    list.addEventListener('auxclick', e => {
      onClick(e, (addon, action) => {
        if(action === 'open-folder'){
          Cc['@mozilla.org/widget/clipboardhelper;1']
            .createInstance(Ci.nsIClipboardHelper)
            .copyString(addon.name + ' ' + addon.version);
        }else if(action === 'inspect'){
          try{
            const uuid = JSON.parse(Services.prefs.getStringPref('extensions.webextensions.uuids'))[addon.id]
            Services.wm.getMostRecentWindow('navigator:browser')
              .openTrustedLinkIn(`moz-extension://${uuid}/manifest.json`, 'tab');
          }catch(ex){}
        }
      });
    }, true);


    //将未签名消息警告改为图标
    const updataCardMessage = (addon, addonCard) => {
      const ct = addonCard.querySelector('.addon-card-message[type="warning"] span:not([class])');
      if(ct && !win.isCorrectlySigned(addon) && ct.textContent === win.extBundle.formatStringFromName(
        'details.notification.unsigned',
        [addon.name, win.brandBundle.GetStringFromName('brandShortName')], 2
      )){
        //移除原来的避免切换扩展详情页后重复添加
        const unsignedBadge = addonCard.querySelector('.unsigned-badge');
        if(unsignedBadge){
          unsignedBadge.remove();
        }
        const nc = addonCard.querySelector('.addon-name');
        if(nc) {
          const a = doc.createElement('a');
          addonCard._unsignedBadge = a;
          a.className = 'addon-badge unsigned-badge';
          a.style.cssText = 'background-image: url("chrome://global/skin/icons/warning.svg");';
          a.setAttribute('title', ct.textContent);
          a.setAttribute('target', '_blank');
          a.href = ct.nextElementSibling.getAttribute('url');
          nc.after(a);
          //防止闪烁
          ct.parentNode.style.display = 'none';
          setTimeout(() => {
            ct.parentNode.hidden = true;
            ct.parentNode.style.display = '';
          }, 50);
        }
      }
    }

    //扩展更新后处理未签名消息警告
    const tempAddonCard = doc.querySelector('addon-card');
    if(tempAddonCard){
      const AddonCard = tempAddonCard.constructor;
      const updateMessage = AddonCard.prototype.updateMessage;
      AddonCard.prototype.updateMessage = async function (...args) {
        const rt = await updateMessage.apply(this, args);
        //仅在扩展列表页处理
        if(this.card.ownerDocument.querySelector('addon-list[type="extension"]'))
          updataCardMessage(this.addon, this.card);

        //更新查看菜单项
        const inspect = this.card.querySelector('panel-item[data-action="inspect"]');
        if(inspect){
          inspect.hidden = this.addon.userDisabled;
        }
      
        if(this.card.ownerDocument.querySelector('addon-list[type="extension"]'))
          updataCardMessage(this.addon, this.card);

        //将扩展名改为 名称 + 版本号
        const addonName = this.card.querySelector('.addon-name');
        if(addonName){
          addonName.textContent = this.addon.name + ' ' + this.addon.version;
        }

        return rt;
      };
    }

    if(isAddonList){
      for(const addonCard of list.querySelectorAll('addon-card')){
        updataCardMessage(addonCard.addon, addonCard);
      }
    }else{
      updataCardMessage(list.addon, list);
    }

    //将扩展菜单面板组件加上part好让外部css处理样式
    const replaceComponentsPart = (components) => {
      for(const child of components.children){
        if(child.className){
          child.setAttribute('part', child.className);
        }
      }
    }
    //模板替换part
    const tempPanelList = doc.querySelector('template[name="panel-list"]');
    if(tempPanelList && tempPanelList.content){
      replaceComponentsPart(tempPanelList.content);
    }
    const panels = list.querySelectorAll('panel-list');
    const isEN = Services.locale.appLocaleAsLangTag == 'en-US';
    const folderText = isEN ? 'Folder' : '打开目录';
    const inspectText = isEN ? 'Inspect' : '查看';
    for(const panel of panels){
      //由于组件快于uc脚本加载只能后处理
      const shadowRoot = panel.shadowRoot;
      if(shadowRoot){
        replaceComponentsPart(shadowRoot);
      }

      //添加打开文件夹菜单
      const addonCard = panel.closest('addon-card[addon-id]');
      if(!addonCard) continue;
      const addon = addonCard.addon;

      if(!addon) continue;

      if(addon.type === 'extension' || addon.type === 'theme'){
        const item = doc.createElement('panel-item');
        item.dataset.action = 'inspect';
        item.textContent = inspectText;
        item.hidden = addon.userDisabled;
        panel.append(item);
      }

      if(!(addon.icons && Object.values(addon.icons).some(icon => /^(jar:)?file:/.test(icon))) &&
        !(addon.pluginFullpath && addon.pluginFullpath.length > 0) &&
        !FileUtils.getDir('ProfD', ['extensions', addon.id + '.xpi']).exists()
      ) continue;

      const item = doc.createElement('panel-item');
      item.dataset.action = 'open-folder';
      item.textContent = folderText;
      panel.append(item);
    }
  },

  addStyle () {
    const sss = Cc['@mozilla.org/content/style-sheet-service;1'].getService(Ci.nsIStyleSheetService);
    sss.loadAndRegisterSheet(Services.io.newURI('data:text/css,' + encodeURIComponent(`
      @-moz-document url(chrome://mozapps/content/extensions/aboutaddons.html) {
        addon-card .card.addon{
          padding-bottom: 0 !important;
        }
        addon-card .addon-card-collapsed {
          display: grid  !important;
          grid-template-columns: auto 1fr;
          margin-bottom: 5px !important;
        }
        addon-list[type="theme"] .addon-card-collapsed{
          grid-template-columns: 1fr;
        }
        /*显示警告消息 如flash过期警告*/
        addon-card .addon-card-message{
          margin-top: 0 !important;
          margin-bottom: 0 !important;
        }
        addon-card .card-contents{
          width: auto !important;
          white-space: pre-line !important;
        }
        addon-card .more-options-menu{
          grid-column: span 2;
          margin: 0 !important;
          padding: 0 !important;
          margin-top: 1em !important;
        }

        /*隐藏三点菜单按钮*/
        addon-card .more-options-button{
          display: none !important;
        }
        /*弹出菜单去阴影背景边框等*/
        addon-card panel-list{
          position: static !important;
          display: flex !important;
          border: 0 !important;
          border-block-start: 1px solid var(--in-content-box-border-color) !important;
          box-shadow: none !important;
          margin: 0 !important;
        }
        addon-card .deck-tab-group {
          margin-top: 0 !important;
        }

        /*弹出菜单组件：通过uc脚本加上的 part，改变排列方向*/
        addon-card panel-list::part(list){
          display: flex !important;
          flex-direction: row  !important;
          flex: 1;
        }
        addon-card panel-list::part(arrow){
          display: none !important;
        }


        /*设置按钮排在最后*/
        addon-card panel-item[action="preferences"]{
          order: 1000;
          margin-inline-start: auto !important;
          --icon: url("chrome://mozapps/skin/extensions/utilities.svg");
        }
        /*设置按钮分割条*/
        addon-card panel-item{
          position: relative;
        }
        addon-card panel-list > :not([hidden]) ~ panel-item:not(:first-child)::before{
          position: absolute;
          content: '';
          height: 60%;
          border-inline-start: 1px solid var(--in-content-box-border-color) !important;
        }

        addon-card panel-item[action="preferences"]::before{
          height: 100%;
        }
        /*除了只有一个管理按钮时隐藏*/
        addon-card panel-list > :not([hidden]) ~ panel-item[action="expand"]{
          display: none !important;
        }

        /*缺失的按钮加上图标*/
        panel-item[action="toggle-disabled"]{
          --icon: url("chrome://devtools/content/netmonitor/src/assets/icons/blocked.svg");
        }
        panel-item[action="toggle-disabled"][data-l10n-id="enable-addon-button"]{
          --icon: url("chrome://devtools/skin/images/add.svg");
        }
        panel-item[data-action="open-folder"]{
          --icon: url("chrome://browser/skin/folder.svg");
        }
        panel-item[data-action="inspect"]{
          --icon: url("chrome://devtools/skin/images/command-pick.svg");
        }
        panel-item[action="expand"]{
          --icon: url("chrome://devtools/skin/images/import.svg");
        }
        addon-list[type="userstyle"] panel-list panel-item[action="expand"]{
          display: flex !important;
        }
        
        addon-card:not([expanded]) > .addon.card[active="false"]:active .card-heading-icon,
        addon-card:not([expanded]) > .addon.card[active="false"]:hover .card-heading-icon{
          opacity: .6 !important;
        }
      }
    `), null, null), sss.AUTHOR_SHEET);
  }
}).init();