#  umi-request在IE中的问题


在 主流浏览器 和 IE11 中, XmlHttpRequest 实例上挂载的属性方法有所差异

在 主流浏览器 中能拿到 responseURL, 但是在IE 11中没有 responseURL, [点击查看兼容情况]( https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseURL?retiredLocale=de) 
因此需要 polyfill;



### bug 追踪记录 

1. 在项目中使用的umi-request@1.4.0
2. isomorphic-fetch@3.0.0 依赖了 node-fetch  whatwg-fetch, isomorphic-fetch 统一了服务端和客户端的fetch 请求,  客户端 用 whatwg-fetch  兼容

3.[whatwg-fetch](https://www.npmjs.com/package/whatwg-fetch#obtaining-the-response-url) 中 去获取了 xhr.responseURL 或者 headers 中的 X-Request-URL
4. 要想在任何环境中 使用fetch 需要引入 whatwg-fetch

```js
    // 直接引用 导入将自动填充 window.fetch 和相关 API
    import 'whatwg-fetch'
    window.fetch(...)
    // 单独使用
    import {fetch as fetchPolyfill} from 'whatwg-fetch'
    window.fetch(...)   // use native browser version
    fetchPolyfill(...)  // use polyfill implementation
    //要与 webpack 一起使用，请在应用程序入口点之前的入口配置选项中添加此包
    entry: ['whatwg-fetch', ...]

  ```

因此在IE 中 要想准确的获取 reponse 中的 url 需要在响应头中设置 X-Request-URL

```js
 xhr.onload = function() {
      var options = {
        status: xhr.status,
        statusText: xhr.statusText,
        headers: parseHeaders(xhr.getAllResponseHeaders() || '')
      }
      options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
      var body = 'response' in xhr ? xhr.response : xhr.responseText
      setTimeout(function() {
        resolve(new Response(body, options))
      }, 0)
    }


```






