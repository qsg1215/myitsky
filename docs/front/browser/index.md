#  如何兼容IE 11

IE11 的缺陷

1. 没有Promise [点击查看兼容性](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
2. 没有 fetch [点击查看兼容性](https://developer.mozilla.org/en-US/docs/Web/API/fetch)
3. Object.assign 不支持 (React中广泛使用 Object.assign) [点击查看兼容性](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
4. array.from  不支持  ([点击查看兼容性](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from))
5. for ... of 用不了[点击查看兼容性](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)


IE 11 以前的版本 Map , Set requestAnimationFrame 用不了



如果是使用的webpack 并且使用了 react-create-app

在webpack entry 中添加包 'react-app-polyfill/ie11', 'react-app-polyfill/stable'