# 在web上渲染lottie动画(json动画)

```tsx
import lottie from 'lottie-web';
import { useLayoutEffect } from 'react';
//@ts-ignore
import { v4 as uuidv4 } from 'uuid';
interface Iprops {
  width: number | string;
  height: number | string;
  animationName: string;
}
export default ({ width = '100%', height = '100%', animationName }: Iprops) => {
  const id = 'id' + uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
  useLayoutEffect(() => {
    const ele = document.querySelector(`#${id}`);
    if (ele) {
      lottie.loadAnimation({
        container: ele, // the dom element that will contain the animation
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: `/JsonAnimation/${animationName}/${animationName}.json`, // JSON 路径，而不是 animationData
      });
    }
  }, []);

  return <div style={{ width, height }} id={id}></div>;
};

```

调用的地方

```tsx
   <LottieWeb width={80} height={80} animationName="loading" />
```

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/ABmOoWVk1o6WjOaw/img/9faa1ebc-0153-4df4-932b-a5d449867f9c.png)

动画文件夹只能放在 public 目录下面, 因为里面的文件夹都是相对与跟路径的, 需要验证下public path