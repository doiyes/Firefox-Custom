    // ==UserScript==
    // @name                 Mousegestures.uc.js
    // @namespace            Mousegestures@gmail.com
    // @homepageURL          http://www.cnblogs.com/ziyunfei/archive/2011/12/15/2289504.html
    // @include              chrome://browser/content/browser.xhtml
    // @include              chrome://browser/content/browser.xul
    // @charset              UTF-8
    // @source               https://bbs.kafan.cn/thread-2170048-1-1.html
    // ==/UserScript==
    (() => {
        'use strict';
        let ucjsMouseGestures = {
            lastX: 0,
            lastY: 0,
            directionChain: '',
            isMouseDownL: false,
            isMouseDownR: false,
            hideFireContext: false,
            shouldFireContext: false,
            GESTURES: {
                'L': {name: '后退', cmd: () => getWebNavigation().canGoBack && getWebNavigation().goBack()},
                'R': {name: '前进', cmd: () => getWebNavigation().canGoForward && getWebNavigation().goForward()},

                'U': {name: '向上滚动', cmd: () => goDoCommand('cmd_scrollPageUp')},
                'D': {name: '向下滚动', cmd: () => goDoCommand('cmd_scrollPageDown')},
                
                'W-': {name: '放大', cmd: function() { ucjsMouseGestures_helper.zoomIn(); }},
          'W+': {name: '缩小', cmd: function() { ucjsMouseGestures_helper.zoomOut(); }},
          'L<R': {name: '缩放重置', cmd: function() { ucjsMouseGestures_helper.zoomReset(); }},

                'UD': {name: '刷新当前页面', cmd: function() { document.getElementById("Browser:Reload").doCommand();}},
                'UDU': {name: '跳过缓存刷新当前页面', cmd: function() { document.getElementById("Browser:ReloadSkipCache").doCommand();}},
                'DUDU': {name: '刷新所有页面', cmd: function() {gBrowser.visibleTabs.forEach(tab => {try {gBrowser.getBrowserForTab(tab).reload();} catch (e){}});}},
                'DU': {name: '网址向上一层', cmd:  function() { loadURI(content.location.host + content.location.pathname.replace(/\/[^\/]+\/?$/, ""));}},

                'RL': {name: '打开新标签', cmd:  function() { BrowserOpenTab();  }},
                'LR': {name: '添加/移除书签', cmd:  function() {document.getElementById("Browser:AddBookmarkAs").doCommand();    } },

            'UL': {name: '激活左边的标签页', cmd:  function(event) { gBrowser.tabContainer.advanceSelectedTab(-1, true);}},
                'UR': {name: '激活右边的标签页', cmd: function(event) { gBrowser.tabContainer.advanceSelectedTab(+1, true);}},
                'ULU': {name: '激活第一个标签页', cmd:  function(event) { gBrowser.selectedTab = (gBrowser.visibleTabs || gBrowser.mTabs)[0];}},
                'URU': {name: '激活最后一个标签页', cmd: function(event) { gBrowser.selectedTab = (gBrowser.visibleTabs || gBrowser.mTabs)[(gBrowser.visibleTabs || gBrowser.mTabs).length - 1];}},

                'DL': {name: '恢复关闭的标签', cmd:  function() { try {                document.getElementById('History:UndoCloseTab').doCommand();            } catch (ex) {                if ('undoRemoveTab' in gBrowser) gBrowser.undoRemoveTab();                else throw "Session Restore feature is disabled."            }        }  },
                'DR': {name: '关闭当前标签', cmd: function(event) {            gBrowser.removeCurrentTab();        }},
              'LDL': {name: '关闭左侧标签页', cmd: function(event) {    for (let i = gBrowser.selectedTab._tPos - 1; i >= 0; i--) if (!gBrowser.tabs.pinned){ gBrowser.removeTab(gBrowser.tabs, {animate: true});}}},
              'RDR': {name: '关闭右侧标签页', cmd: function(event) {gBrowser.removeTabsToTheEndFrom(gBrowser.selectedTab);    }},
                'LUL': {name: '关闭其他所有标签页', cmd:  function(event) {gBrowser.removeAllTabsBut(gBrowser.selectedTab); }},
                'RUR': {name: '关闭所有标签页', cmd:  function(event) { gBrowser.removeAllTabsBut(openTrustedLinkIn('about:newtab', 'current')); }},

                'RU': {name: '转到页首', cmd: () => goDoCommand('cmd_scrollTop')},
                'RD': {name: '转到页尾', cmd: () => goDoCommand('cmd_scrollBottom')},

                'LU': {name: '聚焦到地址栏', cmd: function(event) {    openLocation(); }},
                'LD': {name: '查看页面信息', cmd: function(event) {    BrowserPageInfo(); }},

                'RLRL': {name: '重启浏览器', cmd: function(event) {        Services.startup.quit(Services.startup.eAttemptQuit | Services.startup.eRestart);        }},
                'LRLR': {name: '重启浏览器', cmd: function(event) {        Services.startup.quit(Services.startup.eAttemptQuit | Services.startup.eRestart);        }},
                'URDLU': {name: '关闭浏览器',  cmd: function(event) {        goQuitApplication();        }},

                'DRU': {name: '打开附加组件',  cmd: function(event) {    BrowserOpenAddonsMgr();    }},
                'URD': {name: '打开选项',  cmd: function(event) {        openPreferences(); }},

                'DLD': {name: '侧边栏打开当前页', cmd: function(event) { openWebPanel(document.title, gBrowser.currentURI.spec);}},
                'LDR': {name: '打开历史侧边栏',  cmd: function(event) {SidebarUI.toggle("viewHistorySidebar");    }},
                /*'RDL': {name: '打开书签工具栏',  cmd: function(event) {    var bar = document.getElementById("PersonalToolbar"); setToolbarVisibility(bar, bar.collapsed);    }},*/
                'RDL': {name: '打开书签侧边栏',  cmd: function(event) {SidebarUI.toggle("viewBookmarkSidebar");    }},

                'RULD': {name: '添加到稍后阅读',  cmd: function(event) {document.getElementById("pageAction-urlbar-_cd7e22de-2e34-40f0-aeff-cec824cbccac_").click();}},
                'RULDR': {name: '添加到稍后阅读',  cmd: function(event) {document.getElementById("pageAction-urlbar-_cd7e22de-2e34-40f0-aeff-cec824cbccac_").click();}},
                  'LDRUL': {name: '打开鼠标手势设置文件',  cmd: function(event) {FileUtils.getFile('UChrm',['SubScript', 'MouseGestures.uc.js']).launch();}},
            },


            init: function() {
                let self = this;
                ['mousedown', 'mousemove', 'mouseup', 'contextmenu', 'DOMMouseScroll'].forEach(type => {
                    gBrowser.tabpanels.addEventListener(type, self, true);
                });
                gBrowser.tabpanels.addEventListener('unload', () => {
                    ['mousedown', 'mousemove', 'mouseup', 'contextmenu', 'DOMMouseScroll'].forEach(type => {
                        gBrowser.tabpanels.removeEventListener(type, self, true);
                    });
                }, false);
            },
            handleEvent: function(event) {
                switch (event.type) {
                case 'mousedown':
                    if (event.button == 2) {
                        (gBrowser.mPanelContainer || gBrowser.tabpanels).addEventListener("mousemove", this, false);
                        this.isMouseDownR = true;
                        this.hideFireContext = false;
                        [this.lastX, this.lastY, this.directionChain] = [event.screenX, event.screenY, ''];
                    }
                    if (event.button == 0) {
                        this.isMouseDownR = false;
                        this.stopGesture();
                    }
                    break;
                case 'mousemove':
                    if (this.isMouseDownR) {
                        let[subX, subY] = [event.screenX - this.lastX, event.screenY - this.lastY];
                        let[distX, distY] = [(subX > 0 ? subX : (-subX)), (subY > 0 ? subY : (-subY))];
                        let direction;
                        if (distX < 10 && distY < 10) return;
                        if (distX > distY) direction = subX < 0 ? 'L' : 'R';
                        else direction = subY < 0 ? 'U' : 'D';
                        if (!this.xdTrailArea) {
                            this.xdTrailArea = document.createXULElement('hbox');
                            let canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
                            canvas.setAttribute('width', window.screen.width);
                            canvas.setAttribute('height', window.screen.height);
                            this.xdTrailAreaContext = canvas.getContext('2d');
                            this.xdTrailArea.style.cssText = '-moz-user-focus: none !important;-moz-user-select: none !important;display: -moz-box !important;box-sizing: border-box !important;pointer-events: none !important;margin: 0 !important;padding: 0 !important;width: 100% !important;height: 100% !important;border: none !important;box-shadow: none !important;overflow: hidden !important;background: none !important;opacity: 0.9 !important;position: fixed !important;z-index: 2147483647 !important;display: inline !important;';
                            this.xdTrailArea.appendChild(canvas);
                            gBrowser.selectedBrowser.parentNode.insertBefore(this.xdTrailArea, gBrowser.selectedBrowser.nextSibling);
                        }
                        if (this.xdTrailAreaContext) {
                            this.hideFireContext = true;
                            this.xdTrailAreaContext.strokeStyle = '#0065FF';
                            this.xdTrailAreaContext.lineJoin = 'round';
                            this.xdTrailAreaContext.lineCap = 'round';
                            this.xdTrailAreaContext.lineWidth = 3;
                            this.xdTrailAreaContext.beginPath();
                            this.xdTrailAreaContext.moveTo(this.lastX - gBrowser.selectedBrowser.screenX, this.lastY - gBrowser.selectedBrowser.screenY);
                            this.xdTrailAreaContext.lineTo(event.screenX - gBrowser.selectedBrowser.screenX, event.screenY - gBrowser.selectedBrowser.screenY);
                            this.xdTrailAreaContext.closePath();
                            this.xdTrailAreaContext.stroke();
                            this.lastX = event.screenX;
                            this.lastY = event.screenY;
                        }
                        if (direction != this.directionChain.charAt(this.directionChain.length - 1)) {
                            this.directionChain += direction;
                            StatusPanel._label = this.GESTURES[this.directionChain] ? '手势: ' + this.directionChain + ' ' + this.GESTURES[this.directionChain].name : '未知手势:' + this.directionChain;
                        }
                    }
                    break;
                case 'mouseup':
                    if (this.isMouseDownR && event.button == 2) {
                        if (this.directionChain) this.shouldFireContext = false;
                        this.isMouseDownR = false;
                        this.directionChain && this.stopGesture();
                    }
                    break;
                case 'contextmenu':
                    if (this.isMouseDownR || this.hideFireContext) {
                        this.shouldFireContext = true;
                        this.hideFireContext = false;
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    break;
                case 'DOMMouseScroll':
                    if (this.isMouseDownR) {
                        this.shouldFireContext = false;
                        this.hideFireContext = true;
                        this.directionChain = 'W' + (event.detail > 0 ? '+' : '-');
                        this.stopGesture();
                    }
                    break;
                }
            },
            stopGesture: function() {
                if (this.GESTURES[this.directionChain]) this.GESTURES[this.directionChain].cmd();
                if (this.xdTrailArea) {
                    this.xdTrailArea.parentNode.removeChild(this.xdTrailArea);
                    this.xdTrailArea = null;
                    this.xdTrailAreaContext = null;
                }
                this.directionChain = '';
                setTimeout(() => StatusPanel._label = '', 2000);
                this.hideFireContext = true;
            }
        };
        ucjsMouseGestures.init();
    })();
