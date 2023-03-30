#### sentry还原源代码

运行时代码:

```js

 Sentry.init({
    dsn: 'https://xxxxxxx@sentry.h.highso.com.cn/60',
    release: RELEASE,
    environment: UMI_ENV,
    ignoreErrors: [
      // chrome 插件报错
      '$',
      // 不影响业务的报错
      'ResizeObserver loop limit exceeded',
    ],
    beforeSend: (event, hint) => {
     
    },
  });

```

编译时插件sentry插件:

```js

new SentryWebpackPlugin({
        ignore: ['node_modules'],
        include: './dist/static/js',
        configFile: './.sentryclirc',
        release: RELEASE, // 版本
        deleteAfterCompile: true,
        urlPrefix: sourceMapUrl 
  })

```

sourceMapUrl说明: 
   js文件如果是在当前域名下面~/static/js ;
   js文件如果是在当前其他域名下面 http:/xxx/xxx.com/static/js ;

environment: 指定项目的环境

在安装的.yarnrc 中配置 sentrycli_cdnurl的下载地址: 因为默认的被GFW给屏蔽了, 速率很慢因此需要跟换cdn下载地址

```js
registry "https://registry.npm.taobao.org/"
sentrycli_cdnurl "https://cdn.npm.taobao.org/dist/sentry-cli" // 指定国内的淘宝
```

在项目的根目录中添加.sentryclirc 文件


```bash

[auth]
#apiTOKEN
token=xxxxx  

[defaults]
#sentry项目部署地址
url=https://sentry.com/   
#组织
org=haixue-sentry  
#项目名称
project=fe-antd-mainsite

[log]
level=debug
[http]
verify_ssl=false


````