# forwardRef 用法

# 1.暴露句柄

```jsx
import { useRef } from 'react';
import Child from './components/Child'
import { Button } from 'antd';

export default () => {
  const childRef = useRef(null);
  const hanldeClick = () => {
    childRef?.current?.setChildName('陈陈' + new Date().getTime());
  }
  return (
    <div>
      父组件
      <Button onClick={hanldeClick}>改名字</Button>
      <Child ref={childRef} />
    </div>
  );
};


```

```jsx
import React, { useState, forwardRef, useImperativeHandle } from 'react';

const Child = (props: any, ref) => {
    const [name, setName] = useState('');
    useImperativeHandle(ref, () => ({
        setChildName: (val: any) => {
            setName(val);
        },
    }));

    return <div>
        这是儿子的名字{name}
    </div>
}

export default forwardRef(Child);
```

# 2.暴露DOM节点

```jsx
import { useRef } from 'react';
import Child from './components/Child'
import { Button } from 'antd';

export default () => {
  const childRef = useRef(null);
  const hanldeClick = () => {
    childRef?.current?.focus();
  }
  return (
    <div>
      父组件
      <Button onClick={hanldeClick}>聚集</Button>
      <Child ref={childRef} />
    </div>
  );
};


```

```jsx
import React, { forwardRef } from 'react';

const Child = (props: any, ref) => {
    return <div>
        <input ref={ref} />
    </div>
}

export default forwardRef(Child);
```

# 在组件上下文中层层转发

[forwardRef文档参考链接](https://zh-hans.react.dev/reference/react/forwardRef)