# 监听元素进去窗口和怎样利用localStorage 做本地过期缓存

# 本地过期缓存, 一天一次

```tsx
export function shouldShowToday(uid: number): boolean {
  const storageKey = `dailyShow_${uid}`;
  const storedDateStr = localStorage.getItem(storageKey);
  const todayDateStr = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"

  if (!storedDateStr || storedDateStr !== todayDateStr) {
    localStorage.setItem(storageKey, todayDateStr);
    return true;
  }

  return false;
}

```

# 监听页面元素是否出现在 视窗中

```tsx
export function observeElementInViewport(
  element: HTMLElement,
  callback: (isIntersecting: boolean, entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverInit = {},
): () => void {
  // 默认配置
  const defaultOptions: IntersectionObserverInit = {
    threshold: 0,
    root: null,
    rootMargin: '0px',
  };

  // 合并配置
  const observerOptions: IntersectionObserverInit = {
    ...defaultOptions,
    ...options,
  };

  // 创建观察者实例
  const observer = new IntersectionObserver(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        callback(entry.isIntersecting, entry);
      });
    },
    observerOptions,
  );

  // 开始观察元素
  observer.observe(element);

  // 返回取消观察的函数
  return () => observer.unobserve(element);
}

```
```tsx
 useLayoutEffect(() => {
    if (showMask) {
      const targetElement = document.querySelector('#learnMore') as HTMLElement;
      // 定义回调函数
      const handleVisibilityChange = (isVisible: boolean): void => {
        if (isVisible) {
          reportGIO('vip_guide_expose', {
            from: '个人题库',
            categoryId: CATEGORY_ID || '-1',
          });
        }
      };
      // 开始观察
      const unobserve = observeElementInViewport(
        targetElement,
        handleVisibilityChange,
        {
          threshold: 0.5, // 当元素50%可见时触发回调
          rootMargin: '0px 0px -100px 0px', // 底部缩小100px的视口范围
        },
      );
      // 离开就不观察了
      return unobserve;
    }
  }, [showMask]);

```

### 注意: 在android 中, 每次销毁 webview 都会让本地存储的cookie 丢失, 因此在做一天展示一次等这样控制展示频率的需求的时候, 不能使用cookie 过期这种方案, 要使用本地缓存的方案, 但是在iOS 中的webview 不会有这个问题; 需要注意一下