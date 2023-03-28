删除目录中的子目录中的 node_modules
```bash
find . -name "node_modules" -type d -prune -exec rm -rf '{}' +
```
