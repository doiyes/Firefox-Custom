Forefox配置文件自用收集整理 doiyes.com

# 下载安装

官方FTP：http://ftp.mozilla.org/pub/firefox/

官网：https://www.mozilla.org/en-US/firefox/all/

解压文件，复制core文件夹的内容到D:\Program File\Firefox\下即可。

版本介绍：
| 正式版
下载页面：http://www.mozilla.com/en-US/firefox/all.html（选择Chinese (Simplified) 后的下载简体中文）
FTP下载页面（包含所有历史版本）：http://ftp.mozilla.org/pub/mozilla.org/firefox/releases/
| ESR版 长期支持版本（Extended Support Release，简称“ESR”）是 Mozilla 专门为那些无法或不愿每隔六周就升级一次的企业打造。Firefox ESR 版的升级周期为42周，而普通 Firefox 的升级周期为6周。
下载页面：http://www.mozilla.org/en-US/firefox/organizations/all.html（选择Chinese (Simplified) 后的下载简体中文）
Beta版（测试版）
下载页面：http://www.mozilla.com/en-US/firefox/all-beta.html （全语言）
下载页面：http://www.mozilla.org/zh-CN/firefox/beta/（简体中文版）
Aurora版（开发者版）
Firefox Aurora 是 Mozilla 基金会推出的更新幅度介于 Beta 和 Nightly Build 之间的版本，方便更多的用户体验新功能。
从2017年4月开始，Aurora版本正式被取消。
Nightly版（每夜版）
Firefox是一个开源的浏览器，有着强大的开发团队和社区支持。Firefox还是一个变化和发展着的浏览器——新功能的引入、旧功能的改进/废除、性能的提升……这一切都需要一个强大的团体，来测试、反馈并参与浏览器的成长历程，有鉴于此，出现了FNB（后来还出现了Hourly Builds，简称FHB）：每一天，Mozilla的编译机器都会把当前最新的Firefox代码生成各个平台下的FNB，放置在FTP上供下载测试。
下载页面：http://nightly.mozilla.org/
FTP下载页面：http://ftp.mozilla.org/pub/mozilla.org/firefox/nightly/latest-mozilla-central-l10n/
火狐中国版（谋智网络）

# 配置文件

常用命令行参数（在 Firefox 快捷方式上右键点击属性中的，启动路径后面的参数）：

**-ProfileManager** 或 **-P** -- 打开内置的配置管理器界面。

-**P "配置名"** -- 使用自定义名称的配置来启动 Firefox。如果这个配置名不存在，则打开配置管理器。如果有其他 Firefox 实例正在运行，则该参数无法生效。

**-no-remote** -- 在 -P 后面添加这个参数，可以创建一个新的实例，实现同时使用多个Firefox 配置。如：

"D:\Program File\Firefox\firefox.exe" -p

"D:\Program File\Firefox\firefox.exe" --no-remote -profile "doiyes"

**-private** -- 始终在隐私浏览模式启动 Firefox。

**-safe-mode** -- 安全模式启动 Firefox，或者按住 Shift 键打开 Firefox 也可以。 

更多可见：https://www.firefox.net.cn/read-54673

# about:config 常用设置

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

关闭最后一个标签页后不关闭窗口
 browser.tabs.closeWindowWithLastTab  双击改为true

查找自動高亮
 findbar.modalHighlight   双击改为true
 findbar.highlightAll         双击改为true

自定义标签页宽度（默认 76）
 browser.tabs.tabMinWidth

在mozilla页面激活WebExtensions
 方法：about:config--新建布尔参数：privacy.resistFingerprinting.block_mozAddonManager 设置为 true

security.dialog_enable_delay  将其值设置为0  扩展安装等待时间 （默认1000）
 dom.event.contextmenu.enabled  双击改为false 破解右键限制

更多可见：https://www.firefox.net.cn/read-60535



# user.js常用设置

```js
user_pref("browser.urlbar.trimURLs", false);   //隐藏地址栏 http://前缀？NO

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

//密码
user_pref("signon.autofillForms", true);  //自动填写登录表单？
user_pref("signon.rememberSignons", true);  //记录网站登录密码

//可以解决某些网站密码不存不了的情况……
user_pref("signon.importedFromSqlite", true);
user_pref("signon.overrideAutocomplete", true);

//extensions
user_pref("security.dialog_enable_delay", 0); //按装扩展无延时

pref("browser.bookmarks.max_backups", 1);//书签备份

//禁止生成略缩图
user_pref("browser.pagethumbnails.capturing_disabled", true);
user_pref("browser.newtabpage.enabled", true);
user_pref("pageThumbs.enabled", false);
```

# 扩展

uBlock Origin：一款高效的请求过滤工具，不只是一个广告拦截工具。扩展地址：https://github.com/gorhill/uBlock

暴力猴(Violentmonkey )：开源的脚本管理扩展，扩展地址：https://addons.mozilla.org/zh-CN/firefox/addon/violentmonkey/ 脚本库：https://greasyfork.org/

Stylus：一个用户样式管理器，帮助您重新定义网页样式，扩展地址：https://github.com/openstyles/stylus 样式站：https://userstyles.org/

闪耀拖拽：兼容多进程的Firefox拖拽扩展，扩展地址：https://github.com/harytfw/GlitterDrag

Header Editor：管理浏览器请求，包括修改请求头和响应头、重定向请求、取消请求，扩展地址：https://github.com/FirefoxBar/HeaderEditor 规则：https://github.com/dupontjoy/customization/tree/master/Rules/HeaderEditor 来源：https://bbs.kafan.cn/thread-2102524-1-1.html

Proxy SwitchyOmega：代理设置，扩展地址：https://github.com/FelisCatus/SwitchyOmega

Open Tabs Next To Current：Open new tabs to the right of the current one，扩展地址：https://github.com/sblask/webextension-open-tabs-next-to-current

Youku-HTML5-Player：一个适配优酷的简单易用的HTML5播放器（已停止维护），扩展地址：https://github.com/esterTion/Youku-HTML5-Player

备用：

Gesturefy：鼠标手势扩展，扩展地址：https://github.com/Robbendebiene/Gesturefy

# 常用用户脚本（UserScript）

视频网HTML5播放小工具：https://greasyfork.org/zh-CN/scripts/30545

iqiyi-player-switch：爱奇艺flash播放器与html5播放器切换 https://github.com/gooyie/userscript-iqiyi-player-switch

Super_preloaderPlus_one_New：网页自动翻页  https://github.com/machsix/Super-preloader

anti-redirect：去除各搜索引擎/常用网站的重定向 https://github.com/axetroy/anti-redirect

拒绝二维码登录：https://greasyfork.org/zh-CN/scripts/37988

再见了百家号：https://greasyfork.org/zh-CN/scripts/377144

Jump to Top/Bottom of page with hotkeys：为网页增加向页尾、页首的按钮及快捷键  https://greasyfork.org/zh-CN/scripts/794-jump-to-top-bottom-of-page-with-hotkeys

searchEngineJump：搜索引擎跳转脚本 https://github.com/qxinGitHub/searchEngineJump

Picviewer CE+：在线看图工具，支持图片翻转、旋转、缩放、弹出大图、批量保存 https://greasyfork.org/zh-CN/scripts/24204-picviewer-ce

网盘自动填写密码：https://greasyfork.org/zh-CN/scripts/29762

Search Jump Around：自用 https://github.com/doiyes/Firefox-Custom/blob/master/UserScript/Search%20Jump%20Around.js

# UC脚本(UserChormeJS)

### 使用方法：

https://github.com/Endor8/userChrome.js/tree/master/userChrome

config.js  和userChromeJS.js放在Firefox安装根目录下；

 config-prefs.js放在 Firefox 安装根目录\defaults\pref下；

UserChrome.js 放在配置文件夹\chrome下，UC 脚本放入 chrome 文件夹。 

注：FF62之后版本需要在 config-pref.js 加上下面的代码:

```
pref("general.config.sandbox_enabled", false);
```

### 自用UC脚本：

https://github.com/doiyes/Firefox-Custom/tree/master/userChromeJS

鼠标放在标签栏自动滚动切换.uc.js ——标签栏鼠标悬停切换

AutoPopup.uc.js   ——按钮菜单自动弹出

ClearSearchTerm 1.0.uc.js  ——搜索框自动清空

LoadingBar.uc.js  ——地址栏下方显示当前页面加载进度条

MemoryMonitor.uc.js ——内存监控

DoubleClick-CloseTab.uc.js ——双击关闭标签

downloadPlus.uc.js ——下载增强

EnableAutoLogin.ucjs ——自动登录增强

OpenNewTab.uc.js ——地址栏输入在新标签打开

# CSS相关

https://github.com/doiyes/Firefox-Custom/tree/master/CSS

书签栏自动隐藏



# 其他

#### [Firefox 启用 “自带” 翻译 （Yandex 提供）](https://bbs.kafan.cn/thread-2109497-1-1.html)

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

#### [Firefox 在部分网站上不提示保存密码的解决方法](https://bbs.kafan.cn/thread-2114354-1-1.html)

像是mail.163.com，输入完用户名、密码并提交表单后，firefox不会提示保存密码
将表单从ajax提交改为form提交即可，方法是：

1、鼠标移至登录按钮上，右键，“查看元素”，源代码是

    <a href="javascript:void(0);" id="dologin" data-action="dologin" class="u-loginbtn btncolor tabfocus btndisabled" tabindex="8">登  录</a>

复制代码
将标签从a改为input并添加type="submit"属性，即改为

    <input href="javascript:void(0);" id="dologin" data-action="dologin" class="u-loginbtn btncolor tabfocus btndisabled" tabindex="8" type="submit">登  录</input>

复制代码
2、现在可以正常输入用户名、密码，点击登录按钮后，firefox会提示保存用户名密码

#### [FF 内置翻译功能增强脚本](https://www.firefox.net.cn/read-121267)

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
小声地提醒一下，Google 翻译的 apiKey 可以在 github 白嫖别人代码中泄漏的，为了防止被滥用关键字自己琢磨一下吧。

Bing 翻译的分别新建字符串类型名称为
browser.translation.bing.apiKeyOverride
browser.translation.bing.clientIdOverride
的设置项，值为你申请得到的 Bing 翻译的 apiKey 和 clientId
使用该翻译引擎时将 browser.translation.engine 的值改为 Bing（首字母必须大写）
由于 Bing 提供的 API 好像挂了，同样不介绍如何申请。

像Chrome一样弹出Google翻译工具栏的扩展Google Translate This：https://github.com/andreicristianpetcu/google_translate_this

#### [全局雅黑字体](https://bbs.kafan.cn/thread-1681393-1-1.html)
