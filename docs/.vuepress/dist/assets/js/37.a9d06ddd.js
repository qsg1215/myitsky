(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{289:function(t,s,a){"use strict";a.r(s);var n=a(28),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"git常见操作"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#git常见操作"}},[t._v("#")]),t._v(" git常见操作")]),t._v(" "),a("h3",{attrs:{id:"清空master分支的全部提交记录"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#清空master分支的全部提交记录"}},[t._v("#")]),t._v(" 清空master分支的全部提交记录")]),t._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" checkout --orphan latest_branch"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" -A"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" commit -am "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"commit message"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" branch -D master"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" branch -m master"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" push -f origin master"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br")])]),a("h3",{attrs:{id:"添加忽略"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#添加忽略"}},[t._v("#")]),t._v(" 添加忽略")]),t._v(" "),a("p",[t._v("从暂存去删除文件或者目录, 常用把新的文件用于添加到忽略, 删除跟踪清单")]),t._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("rm")]),t._v(" --cached 文件名\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("rm")]),t._v("  -r --cached 目录\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br")])]),a("h3",{attrs:{id:"git-对大小写不敏感的问题"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#git-对大小写不敏感的问题"}},[t._v("#")]),t._v(" git 对大小写不敏感的问题")]),t._v(" "),a("p",[t._v("解决方案1:\n备份要改名的文件, 修改备份文件为想要的文件, 删除就的文件,\n引起这个问题的原因，是我绕过了 git 直接使用了系统的重命名操作而导致的, 间隔通过文件的删除和新增解决大小写敏感问题")]),t._v(" "),a("p",[t._v("解决方案2:\n使用git的重命名方法\ngit rm 源文件名称 目标文件名称")])])}),[],!1,null,null,null);s.default=e.exports}}]);