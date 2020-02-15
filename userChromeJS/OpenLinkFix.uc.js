// ==UserScript==
// @name           OpenLinkFix.uc.js
// @description    地址栏输入新地址在新标签打开
// ==/UserScript==
(function () {
    if (!location.href.startsWith('chrome://browser/content/browser.x'))
        return;

    gURLBar.handleCommandOld = gURLBar.handleCommand;
		gURLBar.handleCommand = function(event, openWhere, openParams, triggeringPrincipal){
			var isRefresh = true;
			let currentURL = gBrowser.selectedTab.linkedBrowser.currentURI.spec;
			try{
				isRefresh = (event.target.value==currentURL);
			}catch(e){}
			if(currentURL && !isRefresh){
				openWhere="tab";
			}
			this.handleCommandOld(event,openWhere,openParams,triggeringPrincipal);
		}
		
		
						
})();
