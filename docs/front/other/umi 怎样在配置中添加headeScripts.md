# umi 怎样在配置中添加headeScripts

umi2:

```javascript
 plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: { hmr: true, immer: true },
        targets: { ie: 11 },
        locale: {
          enable: false,
          // default false
          default: 'zh-CN',
          baseNavigator: true,
        },
        // default true, when it is true, will use `navigator.language` overwrite default
        dynamicImport: { loadingComponent: './components/PageLoading/index' },
        headScripts: [
          { src: 'http://cdn/a.js' },
          { src: '<%= PUBLIC_PATH %>a.js' },
          { content: `alert('a');` }
        ]
      },
    ],
```

umi4: 

```typescript
export default defineConfig({
  headScripts: [
    // 公式
    {
      content: `window.MathJax = {
          tex: {
            inlineMath: [
              ['$', '$'],
              ['\(', '\)'],
            ],
            displayMath: [
              ['$$', '$$'],
              ['\[', '\] '],
            ]
          }
        }`,
      charset: 'utf-8',
    },
    { src: `${publicPath}gio.js` },
    {
      src: `https://assets.haixue.com/sdk/libs/tex-mml-chtml.js`,
      defer: false,
      async: false,
    },
  ]
}
```