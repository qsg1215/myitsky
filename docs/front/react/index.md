# 常用 Hooks

### useCallback

```js
const Hello = React.memo(({ increment }) => {
  return <button onClick={increment}>+1</button>;
});

const App = () => {
  const [count, setCount] = useState(0);
  const increment = useCallback(() => {
    setCount((count) => count + 1);
  }, []);
  return (
    <div style={{ marginTop: "300px", height: "300px", textAlign: "center" }}>
      父组件: {count}
      <Hello increment={increment}></Hello>
    </div>
  );
};
```

### useLayoutEffect

```js
const App = () => {
  const [value, setValue] = useState(0);

  useLayoutEffect(() => {
    if (value === 0) {
      setValue(10 + Math.random() * 200);
    }
  }, [value]);
  // useEffect(() => {
  //   if(value == 0) {
  //       setValue(10 + Math.random() * 200);
  //   };

  // }, [value]);

  return (
    <div>
      <button onClick={() => setValue(0)}>随机数</button>
      value: {value}
    </div>
  );
};
```

### useContext

```js
// app.js
import React, { useState } from "react";
import FunctionContextComponent from "./FunctionContextComponent.js";
import ClassContextComponent from "./ClassContextComponent.js";

export const ThemeContext = React.createContext();

export default function App() {
  const [darkTheme, setDarkTheme] = useState(true);

  function toggleTheme() {
    setDarkTheme((preDarkTheme) => !preDarkTheme);
  }

  return (
    <>
      <ThemeContext.Provider value={darkTheme}>
        <button onClick={toggleTheme}>Toggle Theme</button>
        <FunctionContextComponent></FunctionContextComponent>
        <ClassContextComponent></ClassContextComponent>
      </ThemeContext.Provider>
    </>
  );
}
```

FunctionContextComponent.js

```js
import React, { useContext } from "react";
import { ThemeContext } from "./App.js";
import { themeStyles } from "./utils.js";

export default function FunctionContextComponent() {
  const darkTheme = useContext(ThemeContext);
  return <div style={themeStyles(darkTheme)}>funtion theme</div>;
}
```

ClassContextComponent.js

```js
import React, { Component } from "react";
import { ThemeContext } from "./App.js";
import { themeStyles } from "./utils.js";

export default class ClassContextComponent extends Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {(darkTheme) => {
          return <div style={themeStyles(darkTheme)}> class Theme</div>;
        }}
      </ThemeContext.Consumer>
    );
  }
}
```
