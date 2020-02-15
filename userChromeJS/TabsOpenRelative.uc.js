// ==UserScript==
// @name           TabsOpenRelative.uc.js
// @description    在当前标签页右侧打开新标签页
// ==/UserScript==
(function () {
    if (!location.href.startsWith('chrome://browser/content/browser.x'))
        return;
    gBrowser.tabContainer.addEventListener("TabOpen", tabOpenHandler, false);
    gBrowser.tabContainer.addEventListener("TabClose", tabCloseHandler, false);

	function tabOpenHandler(event) {
		var tab = event.target;
		gBrowser.moveTabTo(tab, gBrowser.selectedTab._tPos + 1);
	}
		
    function tabCloseHandler(event) {
        var tab = event.target;
      // 如果是因下载而产生的空白页
      if (tab.linkedBrowser.documentURI.spec == 'about:blank') return;
      if (tab._tPos <= gBrowser.selectedTab._tPos){
          if (tab.previousSibling) {
            gBrowser.selectedTab = tab.previousSibling;
        	}
      }
    }
    
		
		
})();
