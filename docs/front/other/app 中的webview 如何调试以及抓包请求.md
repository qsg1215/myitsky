# app 中的webview 如何调试以及抓包请求

whistle 抓包设置抓包  https

iOS 抓包设置 手机上要安装证书,  下载证书前先要 设置网络代理为 抓包服务器地址才能下载, 证书

证书安装后, 需要在设置 > 通用> 关于本机 > 证书信任设置> 选择信任安装的证书

怎样调试webview

在mac上, 打开safari 浏览器的开发设置

在 ios 手机上打开 设置 > safari 浏览器 > 高级> web 检查器 (打开)

在android 手机上试用浏览器的inspect 调试webview

 第一步:  打开开发者模式 一般是 设置> 关于手机 > 双击(或者多次点击)版本号

第二步: 打开调试模式 设置 > 系统和更新 > 开发人员选项>打开usb 调试

![206b58910452fe9c9df775782034dcf.jpeg](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/4j6OJMBNgeBJq3p8/img/bb8e8dc3-cbc7-4e26-9211-34aca3a2f00a.jpeg?x-oss-process=image/auto-orient,1/ignore-error,1)

第三步: 打开inspect 地址 

  [chrome://inspect/#devices](调试地址)

   [edge://inspect/#devices](edge调试地址)

踩坑点: 如果在chrome 中发现不了真机, 重新启动下adb服务

```shell
adb kill-server  # 终止当前运行的ADB服务
adb start-server  # 启动ADB服务
```