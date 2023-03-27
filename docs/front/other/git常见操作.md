# git常见操作

### 清空master分支的全部提交记录

``` sh
git checkout --orphan latest_branch;
git add -A;
git commit -am "commit message";
git branch -D master;
git branch -m master;
git push -f origin master;
```

### 添加忽略
从暂存去删除文件或者目录, 常用把新的文件用于添加到忽略, 删除跟踪清单
```sh
git rm --cached 文件名
git rm  -r --cached 目录
```

### git 对大小写不敏感的问题

解决方案1:
备份要改名的文件, 修改备份文件为想要的文件, 删除就的文件,
引起这个问题的原因，是我绕过了 git 直接使用了系统的重命名操作而导致的, 间隔通过文件的删除和新增解决大小写敏感问题

解决方案2:
使用git的重命名方法
git rm 源文件名称 目标文件名称




