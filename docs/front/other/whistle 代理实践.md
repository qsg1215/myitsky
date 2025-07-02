# whistle 代理实践

基本格式  匹配规则, 操作

### 三: 操作符

######   修改请求头

```javascript
 headerReplace://({"req.user-agent:Chrome":"xxx"})
```

效果截图

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/vBPlN5m6Bp6x9OdG/img/0d5b4b8a-523d-45fc-a57f-4a59749f94ae.png)

###### 2  .修改响应头:

```javascript
www.reg.highso.com.cn/v5/libs/gioSDK.js headerReplace://{headerReplace}
{"res.etag:30c":23}

```

效果截图:

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/vBPlN5m6Bp6x9OdG/img/f27c72ca-fdeb-4851-b67c-d75d3b43b5e2.png)

###### 3  .替换返回内容:

```javascript
https://www.reg.highso.com.cn/v5/libs/gioSDK.js  resReplace://{replace.js}
replace.js内容
本地页面: 替换的内容
```

效果截图:

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/vBPlN5m6Bp6x9OdG/img/fbd0b37e-08b2-4802-8a82-bf39dc09f561.png)

###### 4  .htmlPrepend html 前面追加html

```javascript
https://www.reg.highso.com.cn/v5/my/course  htmlPrepend://{test.html}

```

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/vBPlN5m6Bp6x9OdG/img/2ac322a9-dd4c-49fd-964f-0ed241d11cdb.png)

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/vBPlN5m6Bp6x9OdG/img/f227a14a-10b0-4c97-8355-2efc79d3041e.png)

###### 5 .jsAppend html 前面追加js

```javascript
https://www.reg.highso.com.cn/v5/my/course jsAppend://{appendJs}
```

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/vBPlN5m6Bp6x9OdG/img/39536509-5910-4917-bed8-cbbc9d2b212d.png)

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/vBPlN5m6Bp6x9OdG/img/4c248572-0650-4ac0-9c7a-b8aab56617d5.png)

###### 6.抓包的结果写入本地文件 resWriteRaw,reqWriteRaw,resWrite

```javascript
https://api-userportraitdc.reg.highso.com.cn/event/v1/listeventinfo  resWrite://D:\temp\listeventinfo.json
https://api-userportraitdc.reg.highso.com.cn/event/v1/listeventinfo  resWriteRaw://D:\temp\listeventinfo_res.raw
https://api-userportraitdc.reg.highso.com.cn/event/v1/listeventinfo  reqWriteRaw://D:\temp\listeventinfo_req.raw
```

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/vBPlN5m6Bp6x9OdG/img/737b698c-ad05-4306-bba1-e51980b3b1b2.png)

###### 6.添加用户名和密码

```javascript
https://www.reg.highso.com.cn/study/pc/experience/prize  auth://test:123
```

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/vBPlN5m6Bp6x9OdG/img/6bbb89e2-650b-4bfe-b4e1-fcb9093877ab.png)

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/vBPlN5m6Bp6x9OdG/img/b84c0f40-8594-43a1-a44d-072b2c4de437.png)

###### 6.修改referer, 可以更加灵活的用通配符匹配

```javascript
^api-study-web.haixue.com   referer://https://master.haixue.com
```

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/vBPlN5m6Bp6x9OdG/img/1b92b484-3489-4e10-b827-e5b9bd59dc9f.png)

```javascript
^api-study-web.***/user/current/userData   referer://https://antd-study-admin.$1
```

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/vBPlN5m6Bp6x9OdG/img/af46615a-2462-418e-961b-6b57e148d051.png)

```javascript
^api-os.growingio.com/custom/88da63a710494189/web/***?stm=***  referer://http://www.test.com/$1/$2
^https://api-study-web.***$  referer://https://antd-study-admin.$0/
```

匹配模式:[https://wproxy.org/whistle/pattern.html](https://wproxy.org/whistle/pattern.html)

###### 7.jsBody

```javascript
https://www.reg.highso.com.cn/v5/my/course jsBody://{jsBody}
```

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/vBPlN5m6Bp6x9OdG/img/d0c4aa85-f25b-41a8-958c-9ae831e3ee6c.png)

###### 8.cssApend

```javascript
https://assets.haixue.com/reg/fe-antd-mainsite/current/static/css/main.4d9a120d.chunk.css cssAppend://{cssApend.css}
```

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/vBPlN5m6Bp6x9OdG/img/9fed2df3-e271-43d2-8fab-cc50cfd5fbb7.png)

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/vBPlN5m6Bp6x9OdG/img/74682c9b-ceb9-4284-82f9-0fb4c1975220.png)

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/vBPlN5m6Bp6x9OdG/img/9e38e28c-4224-449c-953b-e5038aba97e5.png)

添加响应cookie