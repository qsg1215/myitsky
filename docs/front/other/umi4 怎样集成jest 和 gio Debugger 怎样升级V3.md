# umi4 怎样集成jest 和 gio Debugger 怎样升级V3

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/AJdl65AjpaG87Oke/img/5e94ddde-4249-433c-adf2-64fcf964c83f.png)

```powershell
npx umi g jest
```

测试文件中不能包含其他格式的文件,, 不然会报错, 只能是纯函数, 不能有副作用

```powershell
 yarn add @types/jest --save-dev
```

在 chrome 浏览器中怎样打包已经下载好的扩展程序

C:\Users\11840\AppData\Local\Google\Chrome\User Data\Default\Extensions\gighmmpiobklfepjocnamgkkbiglidom

最后的连续字母是插件ID;

改造后的mainfest 文件

```json
{
  "manifest_version": 3, // 改成V3
  "name": "GIO debugger",
  "version": "1.1.3",
  "action": {
    "default_icon":"images/icon16.png"
  },
  "icons": {
    "16": "images/icon16.png",
    "32": "images/icon32.png",
    "48": "images/icon48.png",
    "128": "images/icon128.png"
  },
  "background": {
    "service_worker": "background.js" // 重点, 需要修改文件的目录层级, 将bg 提到外面来, 并改名, 应该可以不改
  },
  "options_ui": {
    "page": "html/options.html"
  },
  "permissions": [
    "tabs",
    "webRequest",
    "scripting",
    "contextMenus",
    "activeTab",
    "storage",
    "notifications",
    "unlimitedStorage"
  ],
  "host_permissions": [
    "http://*/*",
    "https://*/*",
    "file://*/*"
  ],
  "devtools_page": "devtools/index.html"
}
```

更改后的插件源代码

[请至钉钉文档查看附件《growingio\_web\_debugger.zip》](https://alidocs.dingtalk.com/i/nodes/2Amq4vjg89gP2MyMudjAb9Y1V3kdP0wQ?doc_type=wiki_doc&iframeQuery=anchorId%3DX02mcvmv8xrw7y713hcho&rnd=0.4443431249673009)

更改后后的插件

[请至钉钉文档查看附件《growingio\_web\_debugger.crx》](https://alidocs.dingtalk.com/i/nodes/2Amq4vjg89gP2MyMudjAb9Y1V3kdP0wQ?doc_type=wiki_doc&iframeQuery=anchorId%3DX02mcvmyky5k3wdfmbqduq&rnd=0.4443431249673009)

[请至钉钉文档查看附件《growingio\_web\_debugger.pem》](https://alidocs.dingtalk.com/i/nodes/2Amq4vjg89gP2MyMudjAb9Y1V3kdP0wQ?doc_type=wiki_doc&iframeQuery=anchorId%3DX02mcvmykuyhlyq236il55&rnd=0.4443431249673009)