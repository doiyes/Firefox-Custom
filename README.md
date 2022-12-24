Forefox配置文件自用收集整理-doiyes.com

> 索引

- [下载安装](#下载安装)

- [配置文件参数](#配置文件参数)

- [常用设置](#常用设置)

- [扩展](#扩展)

- [用户脚本UserScript](#用户脚本UserScript)

- [UC脚本UserChormeJS](#UC脚本UserChromeJS)

  - [使用方法](#使用方法)
  - [自用UC脚本](#自用UC脚本)

- [CSS相关](#CSS相关)

- [Firefox清理](#Firefox清理)

- [其他](#其他)

  - Firefox启用内置翻译-Yandex提供
  - Firefox在部分网站上不提示保存密码的解决方法
  - FF内置翻译功能增强脚本
  - 全局雅黑字体


### 下载安装

官网：https://www.mozilla.org/en-US/firefox/all/  

官方FTP：http://archive.mozilla.org/pub/firefox/ 或 https://ftp.mozilla.org/pub/firefox/  

版本选择：  
Firefox Releases（正式版）    
Firefox ESR （长期支持版，Extended Support Release）   
Firefox Beta （测试版）   
Firefox Developer Edition （开发版）  
Firefox Nightly （每夜版）  
发布日历：https://wiki.mozilla.org/Release_Management/Calendar

解压文件，复制core文件夹的内容到D:\Program File\Firefox\下即可。

移动版(第三方iceraven)：https://github.com/fork-maintainers/iceraven-browser/releases

### 配置文件参数

常用命令行参数（在 Firefox 快捷方式上右键点击属性中的，启动路径后面的参数。‘-p’前有空格）：

**-ProfileManager** 或 **-P** ：打开内置的配置管理器界面。

-**P "配置名"**：使用自定义名称的配置来启动 Firefox。如果这个配置名不存在，则打开配置管理器。如果有其他 Firefox 实例正在运行，则该参数无法生效。

**-no-remote**： 在 -P 后面添加这个参数，可以创建一个新的实例，实现同时使用多个Firefox 配置。如：

"D:\Program File\Firefox\firefox.exe" -p

"D:\Program File\Firefox\firefox.exe" --no-remote -profile "doiyes"

-no-remote -Profile "D:\Program Files\MyFirefox\Profiles"

**-private** -- 始终在隐私浏览模式启动 Firefox。

**-safe-mode** -- 安全模式启动 Firefox，或者按住 Shift 键打开 Firefox 也可以。 

**-url** -- “地址” 指定火狐启动打开某一网页 -url可以省略.例如 "D:\Program File\Firefox\firefox.exe" www.doiyes.com

更多可见：https://www.firefox.net.cn/read-54673

安装新版本后，无法使用原配置文件夹：  
使用 -allow-downgrade 参数启动，  
或者删除配置文件夹中的 compatibility.ini 文件。  

### 常用设置

#### about:config个性化设置

地址栏输入about:config ，打开；搜索------

新标签页后台运行
 browser.tabs.loadInBackground
 browser.tabs.loadDivertedInBackground
 browser.tabs.loadBookmarksInBackground
 全部设为true

书签在新标签页中打开
 browser.tabs.loadBookmarksInTabs，默认为 false，双击改为true 即可在新建标签页打开。

搜索栏搜索在新标签页打开
 browser.search.openintab  双击改为true

在mozilla页面激活WebExtensions
 方法：about:config--新建布尔参数：privacy.resistFingerprinting.block_mozAddonManager 设置为 true

security.dialog_enable_delay  将其值设置为0  扩展安装等待时间 （默认1000）
 dom.event.contextmenu.enabled  双击改为false 破解右键限制

关闭最后一个标签页后不关闭窗口 `browser.tabs.closeWindowWithLastTab`  双击改为true

双击左键关闭当前标签页（火狐61后）`browser.tabs.closeTabByDblclick`  双击改为true 

查找自动高亮 ` findbar.modalHighlight`，`findbar.highlightAll`  均双击改为true

自定义标签页宽度 `browser.tabs.tabMinWidth`  默认76 

在mozilla页面激活WebExtensions，新建布尔参数：`privacy.resistFingerprinting.block_mozAddonManager` 设置为 true

破解右键限制 `dom.event.contextmenu.enabled`  双击改为false 

默认不加载 userChrome.css 和 userContent.css 文件以提升启动速度 
about:config 里面 toolkit.legacyUserProfileCustomizations.stylesheets 设置为 true 开启对这两个文件的加载。


更多可见：https://www.firefox.net.cn/read-60535

http://kb.mozillazine.org/About:config_Entries

#### user.js常用设置

```js
user_pref("browser.urlbar.trimURLs", false);   //隐藏地址栏 http://前缀？NO

user_pref("browser.tabs.insertAfterCurrent", true);//紧邻当前标签页打开
user_pref("browser.link.open_newwindow.restriction", 0);//新标签页打开链接,而不是窗口
user_pref("browser.search.openintab", true);//搜索栏在新标签页打开
user_pref("browser.urlbar.openintab", true);//地址栏在新标签页打开
user_pref("browser.tabs.loadBookmarksInTabs", true);//书签栏在新标签页打开
user_pref("browser.tabs.closeTabByDblclick", true);//双击关闭标签

user_pref("browser.tabs.loadInBackground", true);//中键点击链接后台打开
//user_pref("browser.search.context.loadInBackground", true);//搜索栏在后台打开
//user_pref("browser.tabs.loadBookmarksInBackground", true);//书签在后台打开
//user_pref("browser.tabs.loadDivertedInBackground", true);//外部链接后台打开

user_pref("browser.cache.disk.parent_directory","C:\\TEMP");//缓存位置位于该处制定目录下的cache文件夹内
user_pref("browser.cache.offline.parent_directory","C:\\TEMP");//cache2文件

//密码
user_pref("signon.autofillForms", true);  //自动填写登录表单？
user_pref("signon.rememberSignons", true);  //记录网站登录密码

//可以解决某些网站密码不存不了的情况……
user_pref("signon.importedFromSqlite", true);
user_pref("signon.overrideAutocomplete", true);

//extensions
user_pref("security.dialog_enable_delay", 1000); //安装扩展延时
user_pref("extensions.getAddons.cache.enabled", false); //扩展页面不显示自动推荐内容

pref("browser.bookmarks.max_backups", 1);//书签备份

//禁止生成略缩图
user_pref("browser.pagethumbnails.capturing_disabled", true);
user_pref("browser.newtabpage.enabled", true);
user_pref("pageThumbs.enabled", false);
```

更多可见：

https://github.com/ghacksuserjs/ghacks-user.js/blob/master/user.js

https://github.com/pyllyukko/user.js/blob/master/user.js

### 扩展

 - [uBlock Origin](https://github.com/gorhill/uBlock)：一款高效的请求过滤工具，不只是一个广告拦截工具。
 - [暴力猴(Violentmonkey)](https://addons.mozilla.org/zh-CN/firefox/addon/violentmonkey/)：开源的脚本管理扩展。脚本库：https://greasyfork.org/
 - [Stylus](https://github.com/openstyles/stylus)：一个用户样式管理器，帮助您重新定义网页样式。样式站：https://userstyles.org/
 - [闪耀拖拽](https://github.com/harytfw/GlitterDrag)：兼容多进程的Firefox拖拽扩展 
 - [Header Editor](https://github.com/FirefoxBar/HeaderEditor)：管理浏览器请求，包括修改请求头和响应头、重定向请求、取消请求。[规则](https://github.com/dupontjoy/customization/tree/master/Rules/HeaderEditor) 来源：https://bbs.kafan.cn/thread-2102524-1-1.html
 - [Proxy SwitchyOmega](https://github.com/FelisCatus/SwitchyOmega)：代理设置

备用：

 - [Gesturefy](https://github.com/Robbendebiene/Gesturefy)：鼠标手势扩展
 - [Open Tabs Next To Current](https://github.com/sblask/webextension-open-tabs-next-to-current)：Open new tabs to the right of the current one

### 用户脚本UserScript

 - [HTML5视频播放工具](https://greasyfork.org/zh-CN/scripts/30545)：启用HTML5播放；万能网页全屏；添加快捷键

 - [Super_preloaderPlus_one_New](https://github.com/machsix/Super-preloader)：网页自动翻页  

 - [anti-redirect](https://github.com/axetroy/anti-redirect)：去除各搜索引擎/常用网站的重定向 

 - [拒绝二维码登录](https://greasyfork.org/zh-CN/scripts/37988)：默认使用账号密码登录，不出现二维码登录界面

 - [再见了百家号](https://greasyfork.org/zh-CN/scripts/377144)：搜索排除百家号

 - [Jump to Top/Bottom of page with hotkeys](https://greasyfork.org/zh-CN/scripts/794)：为网页增加向页尾、页首的按钮及快捷键  

 - [Picviewer CE+](https://greasyfork.org/zh-CN/scripts/24204)：在线看图工具，支持图片翻转、旋转、缩放、弹出大图、批量保存 

 - [网盘自动填写密码](https://greasyfork.org/zh-CN/scripts/29762)：智能融合网盘密码到网址中，并自动提交密码

 - [soTab](https://greasyfork.org/zh-CN/scripts/14856)：搜索引擎跳转，搜索引擎一键切换(修改部分样式为：`.soTab a{margin-right: 1em;}`即rem改为em即可)。备用：[Search Jump Around](https://github.com/doiyes/Firefox-Custom/blob/master/UserScript/Search%20Jump%20Around.js) 或者 [searchEngineJump](https://greasyfork.org/zh-CN/scripts/27752)   

 - [网页限制解除](https://greasyfork.org/zh-CN/scripts/28497):解除网站禁止复制、剪切、选择文本、右键菜单的限制（黑名单版）

 - [CSDN净化](https://greasyfork.org/zh-CN/scripts/378351)：屏蔽掉所有烦人的CSDN广告, 并自动展开内容

 - [斗鱼清爽版](https://greasyfork.org/zh-CN/scripts/390452)：斗鱼精简，真实人数显示，默认最高画质

 - [Bilibili Evolved](https://greasyfork.org/zh-CN/scripts/373563)：强大的哔哩哔哩增强脚本

 - [知网下载助手](https://greasyfork.org/zh-CN/scripts/371938)：解析CNKI论文PDF格式下载地址，caj格式下载链接替换为pdf链接

### UC脚本UserChromeJS

#### 使用方法

xiaoxiaoflood方案： https://github.com/xiaoxiaoflood/firefox-scripts

fx-folder.zip解压后放在Firefox安装根目录下；utils.zip解压后放入 chrome 文件夹，UC脚本放入 chrome 文件夹。

userChrome.js 的更新：

https://github.com/xiaoxiaoflood/firefox-scripts/tree/master/chrome

https://github.com/benzBrake/FirefoxCustomize/tree/master/userChromeJS



其他方案：https://github.com/Endor8/userChrome.js/tree/master/userChrome

config.js和userChromeJS.js放在Firefox安装根目录下；config-prefs.js放在 Firefox 安装根目录\defaults\pref下；UserChrome.js 放在配置文件夹\chrome下，UC脚本放入 chrome 文件夹。 

userChrome.js 的更新：https://github.com/alice0775/userChrome.js

#### 自用UC脚本

https://github.com/doiyes/Firefox-Custom/tree/master/userChromeJS

 - 鼠标放在标签栏自动滚动切换.uc.js ——标签栏鼠标悬停切换
 - [AddonsPage_fx72.uc.js](https://github.com/benzBrake/FirefoxCustomize/blob/master/userChromeJS/AddonsPage_fx72.uc.js) ——附件组件页面右键新增查看所在目录，详细信息页面新增安装地址或路径，新增 uc脚本管理页面
 - [autoPlainTextLinks.uc.js](https://github.com/xiaoxiaoflood/firefox-scripts/blob/master/chrome/autoPlainTextLinks.uc.js) ——自动纯文本链接
 - [BMMultiColumn.uc.js](https://github.com/benzBrake/FirefoxCustomize/blob/master/userChromeJS/BMMultiColumn.uc.js) ——书签菜单自动分列显示
 - [BookmarkOpt.uc.js](https://github.com/benzBrake/FirefoxCustomize/blob/master/userChromeJS/BookmarkOpt.uc.js) ——书签操作增强，添加书签到此处/更新书签，复制标题，复制Markdown格式链接，增加显示/隐藏书签工具栏按钮
 - [contextToSearch.uc.js](https://github.com/xiaoxiaoflood/firefox-scripts/blob/master/chrome/contextToSearch.uc.js) ——Search context menu entry now sends search to search box
 - [downloadPlus_ff98.uc.js](https://github.com/benzBrake/Firefox-downloadPlus.uc.js) ——Firefox下载增强工具：默认选择下载文件、改名后保存、保存并打开、另存为、下载提示音、来源显示完整目录并支持双击复制完整地址、第三方工具下载（依赖 FlashGot
 - [EnableAutoLogin.uc.js](https://www.firefox.net.cn/read-26401) ——允许保存登录账号和自动填写登录账号的脚本
 - [enterSelects.uc.js](https://github.com/xiaoxiaoflood/firefox-scripts/blob/master/chrome/enterSelects.uc.js)
 - [extensionOptionsMenu.uc.js](https://github.com/xiaoxiaoflood/firefox-scripts/blob/master/chrome/extensionOptionsMenu.uc.js)
 - [masterPasswordPlus.uc.js](https://github.com/xiaoxiaoflood/firefox-scripts/blob/master/chrome/masterPasswordPlus.uc.js)
 - [mouseGestures.uc.js](https://github.com/xiaoxiaoflood/firefox-scripts/blob/master/chrome/mouseGestures.uc.js)
 - [move_reload_into_url.uc.js](https://github.com/benzBrake/FirefoxCustomize/blob/master/userChromeJS/moveReloadIntoUrl.uc.js) ——移动刷新按钮到地址栏
 - [openInUnloadedTab.uc.js](https://github.com/xiaoxiaoflood/firefox-scripts/blob/master/chrome/openInUnloadedTab.uc.js)
 - [OpenWith.uc.js](https://github.com/benzBrake/FirefoxCustomize/blob/master/userChromeJS/OpenWith.uc.js) ——用其他浏览器打开页面、链接、书签及标签
 - [privateTab.uc.js](https://github.com/xiaoxiaoflood/firefox-scripts/blob/master/chrome/privateTab.uc.js) ——无痕标签页
 - [QuickOpen.uc.js](https://github.com/runningcheese/RunningCheese-Firefox/blob/master/userChrome.js/QuickOpen.uc.js) ——快速打开指定选项
 - [rebuild_userChrome.uc.js](https://github.com/xiaoxiaoflood/firefox-scripts/blob/master/chrome/rebuild_userChrome.uc.js)
 - [redirector.uc.js](https://github.com/xiaoxiaoflood/firefox-scripts/blob/master/chrome/redirector.uc.js)
 - Restart-Panelbutton.uc.js
 - [styloaix.uc.js](https://github.com/xiaoxiaoflood/firefox-scripts/blob/master/chrome/styloaix.uc.js) ——样式管理
 - [Tabplus.uc.js](https://github.com/benzBrake/FirefoxCustomize/blob/master/userChromeJS/TabPlus.uc.js) ——设置标签的打开方式
 - [TranslatePlus.uc.js](https://www.firefox.net.cn/read-121267)

### CSS相关

https://github.com/doiyes/Firefox-Custom/tree/master/CSS

 - 书签栏自动隐藏

更多可见：

https://github.com/Timvde/UserChrome-Tweaks

https://github.com/Aris-t2/CustomCSSforFx/tree/master/classic

https://github.com/coekuss/quietfox

### Firefox清理
cache2 ——缓存

jumpListCache ——任务栏跳转列表的缓存

safebrowsing ——Google安全浏览相关数据

startupCache ——启动缓存

thumbnails ——缩略图缓存

bookmarkbackups ——书签备份

crashes ——崩溃报告

datareporting ——诊断数据

minidumps ——崩溃记录

sessionstore-backups ——会话备份


### 其他

 - [Firefox启用内置翻译-Yandex提供](https://bbs.kafan.cn/thread-2109497-1-1.html)

进入：about:config ，没有的首选项的新建，有的话更改值。
KEY 申请地址， https://tech.yandex.com/keys/get/?service=trnsl 

```css
browser.translation.engine  Yandex  
browser.translation.detectLanguage   true  
browser.translation.ui.show    true  
browser.translation.ui.welcomeMessageShown   true  
browser.translation.yandex.apiKeyOverride    自己申请 KEY
```

完成后，重启浏览器。

 - [Firefox在部分网站上不提示保存密码的解决方法](https://bbs.kafan.cn/thread-2114354-1-1.html)

像是mail.163.com，输入完用户名、密码并提交表单后，firefox不会提示保存密码
将表单从ajax提交改为form提交即可，方法是：

1、鼠标移至登录按钮上，右键，“查看元素”，源代码是

```
<a href="javascript:void(0);" id="dologin" data-action="dologin" class="u-loginbtn btncolor tabfocus btndisabled" tabindex="8">登  录</a>
```

将标签从a改为input并添加type="submit"属性，即改为

```
<input href="javascript:void(0);" id="dologin" data-action="dologin" class="u-loginbtn btncolor tabfocus btndisabled" tabindex="8" type="submit">登  录</input>
```

2、现在可以正常输入用户名、密码，点击登录按钮后，firefox会提示保存用户名密码

 - [FF内置翻译功能增强脚本](https://www.firefox.net.cn/read-121267)

如何开启内置翻译？
在 about:config 中
设置 browser.translation.detectLanguage 为 true，
设置 browser.translation.ui.show 为 true，

如果你有 Yandex 翻译的 apiKey
在 about:config 中新建字符串类型名称为
browser.translation.yandex.apiKeyOverride
的设置项，值为你申请得到的 Yandex 翻译的 apiKey
使用该翻译引擎时将 browser.translation.engine 的值改为 Yandex（首字母必须大写）
免费申请 Yandex 翻译  apiKey 的地址为 https://tech.yandex.com/keys/get/?service=trnsl

Google 翻译的新建字符串类型名称为
browser.translation.google.apiKey
的设置项，值为你申请得到的 Google 翻译的 apiKey
使用该翻译引擎时将 browser.translation.engine 的值改为 Google（首字母必须大写，此为默认值）
由于 Google 翻译 apiKey 为收费的，就不介绍如何申请了。
| 小声地提醒一下，Google 翻译的 apiKey 可以在 github 白嫖别人代码中泄漏的，为了防止被滥用关键字自己琢磨一下吧。

Bing 翻译的分别新建字符串类型名称为
browser.translation.bing.apiKeyOverride
browser.translation.bing.clientIdOverride
的设置项，值为你申请得到的 Bing 翻译的 apiKey 和 clientId
使用该翻译引擎时将 browser.translation.engine 的值改为 Bing（首字母必须大写）
由于 Bing 提供的 API 好像挂了，同样不介绍如何申请。

像Chrome一样弹出Google翻译工具栏的扩展Google Translate This：https://github.com/andreicristianpetcu/google_translate_this

-  [DNS-over-HTTPS(DoH)+ESNI](https://bbs.kafan.cn/thread-2174452-1-1.html) 解决GitHub连接问题

-  [分享个人总结的hosts与自带防火墙列表](https://bbs.kafan.cn/thread-2115085-1-1.html)


-  修改更新通道，修改根部目录下update-settings.ini和defaults\pref\channel-prefs.js文件

-  使用内建的策略(Policies)功能禁用版本更新检测：根目录下创建一个名叫distribution的子文件夹，其中新建文本文件policies.json，文档内容为：  
```
{
  "policies": {
    "DisableAppUpdate": true
  }
}
```


-  广告过滤规则
   - [乘风规则](https://bbs.kafan.cn/thread-1866845-1-1.html) 精简规则、视频规则、UBO动态规则
   - [cjxlist规则](https://github.com/cjx82630/cjxlist)  
   - [常用广告过滤规则汇总](https://gitee.com/ADList/NoADList)  


-  全局雅黑字体

强制雅黑：https://bbs.kafan.cn/forum.php?mod=redirect&goto=findpost&ptid=1664505&pid=30282384

字体替换一：https://bbs.kafan.cn/forum.php?mod=redirect&goto=findpost&ptid=1664505&pid=30315464

字体替换二：https://bbs.kafan.cn/forum.php?mod=redirect&goto=findpost&ptid=1647873&pid=29892002

全局雅黑最佳方案：https://bbs.kafan.cn/thread-1681393-1-1.html
