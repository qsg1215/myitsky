# antd Upload 组件拖拽上传如何校验格式

```jsx
  onDrop(e) {
            const files = Array.from(e.dataTransfer.files) || [];
            const hasNotVttFiles = files.some(file => file.type !== "text/vtt");
            if (hasNotVttFiles) {
                message.error("请上传.vtt文件");
                return;
            }
        }
```