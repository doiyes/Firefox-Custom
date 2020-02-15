// ==UserScript==
// @name           TranslationEnhance.uc.js
// @description    FF内置翻译功能增强
// @author         onely_8
// @source         https://www.firefox.net.cn/read-121267
// @note           适配Firefox57+
// ==/UserScript==
location.href.startsWith('chrome://browser/content/browser.x') && (() => {
        const {Translation, TranslationUI} = Cu.import('resource:///modules/translation/Translation.jsm', {});
   
        //阻止翻译通知栏弹出，仅在地址栏显示翻译图标，点击翻译图标后才弹出通知栏。
        TranslationUI.prototype.shouldShowInfoBar = () => false;
   
        //无论在使用什么语言包均默认翻译为中文
        Translation._defaultTargetLanguage = 'zh';
   
        //在翻译栏添加翻译引擎切换按钮
        const showTranslationInfoBar = TranslationUI.prototype.showTranslationInfoBar;
        TranslationUI.prototype.showTranslationInfoBar = function (...args) {
                const rt = showTranslationInfoBar.apply(this, args);
                const obtn = rt.querySelector('button.translate-infobar-element.options-menu-button');
                if(!obtn) return rt;
   
                const engines = Object.keys(Translation.supportedEngines);
                const menulist = document.createXULElement('menulist');
                for(const name of engines)
                        menulist.appendItem(name, name).setAttribute('accesskey', name.charAt(0));
                menulist.addEventListener('command', (event) => {
                        const name = event.target.value;
                        Services.prefs.setCharPref('browser.translation.engine', name);
                        const notification = menulist.closest('notification');
                        if(!notification.translation.originalShown)
                                notification.showOriginal();
                        notification.translation.state = 0;
                        notification.translate();
                });
                menulist.style.width = '8em';
                const label = document.createXULElement('label');
                label.value = obtn.label.includes('Options') ? 'Translation Engine:' : '翻译引擎：';
                const index = engines.indexOf(Services.prefs.getCharPref('browser.translation.engine', engines[0]));
                menulist.selectedIndex = index < 0 ? 0 : index;
                obtn.before(label, menulist);
   
                return rt;
        }
})();