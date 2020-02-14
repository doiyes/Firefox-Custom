火狐安装配置自用收集整理
# 下载安装

官方FTP：http://ftp.mozilla.org/pub/firefox/

官网：https://www.mozilla.org/en-US/firefox/all/

解压文件，复制core文件夹的内容到D:\Program File\Firefox\下即可。

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

暴力猴(Violentmonkey )：开源的脚本管理扩展，扩展地址：https://addons.mozilla.org/zh-CN/firefox/addon/violentmonkey/。脚本库：https://greasyfork.org/

Stylus：一个用户样式管理器，帮助您重新定义网页样式，扩展地址：https://github.com/openstyles/stylus

闪耀拖拽：兼容多进程的Firefox拖拽扩展，扩展地址：https://github.com/harytfw/GlitterDrag

Header Editor：管理浏览器请求，包括修改请求头和响应头、重定向请求、取消请求，扩展地址：https://github.com/FirefoxBar/HeaderEditor 规则：https://github.com/dupontjoy/customization/tree/master/Rules/HeaderEditor 来源：https://bbs.kafan.cn/thread-2102524-1-1.html

Proxy SwitchyOmega：代理设置，扩展地址：https://github.com/FelisCatus/SwitchyOmega

Open Tabs Next To Current：Open new tabs to the right of the current one，扩展地址：https://github.com/sblask/webextension-open-tabs-next-to-current

Youku-HTML5-Player：一个适配优酷的简单易用的HTML5播放器（已停止维护），扩展地址：https://github.com/esterTion/Youku-HTML5-Player

备用：

Gesturefy：鼠标手势扩展，扩展地址：https://github.com/Robbendebiene/Gesturefy

# 常用用户脚本（UserScript）

视频网HTML5播放小工具：https://greasyfork.org/zh-CN/scripts/30545







# UC脚本(UserChormeJS)

鼠标放在标签栏自动滚动切换.uc.js ——标签栏鼠标悬停切换

AutoPopup.uc.js   ——按钮菜单自动弹出

ClearSearchTerm 1.0.uc.js  ——搜索框自动清空

LoadingBar.uc.js  ——地址栏下方显示当前页面加载进度条

MemoryMonitor.uc.js ——内存监控

DoubleClick-CloseTab.uc.js ——双击关闭标签

downloadPlus.uc.js ——下载增强

EnableAutoLogin.ucjs ——自动登录增强

OpenNewTab.uc.js ——地址栏输入在新标签打开



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

#### [启用Firefox自带的网页翻译功能](https://bbs.kafan.cn/thread-2165299-1-1.html)

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

