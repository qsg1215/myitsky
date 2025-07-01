# 构建文档
npm run docs:build

# 进入dist目录
Set-Location docs\.vuepress\dist

# 创建CNAME文件
"blog.myitsky.com" | Out-File -FilePath "CNAME" -Encoding ASCII
git config --global http.proxy http://127.0.0.1:7890  # 替换成你的代理地址
git config --global https.proxy http://127.0.0.1:7890
# 初始化Git仓库
git init

git remote add origin https://github.com/qsg1215/myitsky.git

git checkout -b gh-pages
git add .

git commit -m "deploy $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")"

git push -f origin gh-pages

Write-Host "done"