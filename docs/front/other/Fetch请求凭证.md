# Fetch请求凭证

[参考链接](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch)

在请求携带cookie 的时候， 不能设置请求的响应头 Access-Control-Allow-Origin 为 \* 号

```javascript
fetch("https://example.com", {
  credentials: "include",
});
```

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/NpQlKaAvG5JjqDvL/img/b4efe74d-b971-4d27-ab9b-c9f73e3b6726.png)