const navConfig = require('../../config/navConfig.js');
const path = require("path")
const rootpath = path.dirname(__dirname) //执行一次dirname将目录定位到docs目录
const utils = require('./utils/index.js');
const filehelper = require('./utils/initPage.js');


module.exports = {
  title: '大前端',
  description: '前端知识体系建设',
  markdown: {
    lineNumbers: true
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@alias': '/docs'
      }
    }
  },
  base: '/',
  themeConfig: {
    logo: '/assets/img/logo.svg',
    // 你的GitHub仓库，请正确填写
    repo: 'https://github.com/qsg1215/myitsky',
    // 自定义仓库链接文字。
    repoLabel: 'GitHub',
    locales: {
      '/': {
        lang: 'zh-CN',
      }
    },
    lastUpdated: '最后更新时间',
    nav: navConfig,
    sidebar: {
      //前端
      '/front/css/': utils.genSidebar('CSS', filehelper.getFileName(rootpath + "/front/css/"), false),
      '/front/html/': utils.genSidebar('HTML', filehelper.getFileName(rootpath + "/front/html/"), false),
      '/front/js/': utils.genSidebar('javaScript', filehelper.getFileName(rootpath + "/front/js/"), false),
      '/front/browser/': utils.genSidebar('浏览器', filehelper.getFileName(rootpath + "/front/browser/"), false),
      '/front/react/': utils.genSidebar('react', filehelper.getFileName(rootpath + "/front/react/"), false),
      '/front/other/': utils.genSidebar('随笔', filehelper.getFileName(rootpath + "/front/other/"), false),
    },
    nextLinks: true,
    // 默认值是 true 。设置为 false 来禁用所有页面的 上一篇 链接
    prevLinks: true
  }
}