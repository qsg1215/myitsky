module.exports = {
    title: '陈华桥的个人网站',
    description: 'Just playing around',
    configureWebpack: {
        resolve: {
          alias: {
            '@alias': '/docs'
          }
        }
    },
    base: '/',
    markdown: {
        lineNumbers: true
    },
    themeConfig: {
        // 你的GitHub仓库，请正确填写
        repo: 'https://github.com/qsg1215/myitsky',
        // 自定义仓库链接文字。
        repoLabel: 'GitHub',
        nav: [
            { text: '首页', link: '/' },
            { text: '其他', link: '/other/index.md' }
        ],
    }
  }