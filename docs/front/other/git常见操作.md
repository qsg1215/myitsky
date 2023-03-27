# git常见操作

清空master分支的全部提交记录

``` sh
git checkout --orphan latest_branch;
git add -A;
git commit -am "commit message";
git branch -D master;
git branch -m master;
git push -f origin master;
```