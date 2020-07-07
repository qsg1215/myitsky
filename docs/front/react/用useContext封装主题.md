# 用useContext封装主题

// index.js
```js
import React from 'react';
import FunctionContextComponent from './FunctionContextComponent.js';
import {ThemeProvider} from './ThemeContext';

export default  function App() {
  return (
    <>
      <ThemeProvider>
        <FunctionContextComponent></FunctionContextComponent>
     </ThemeProvider>
    </>
  );
}

```

//ThemeContext.jsx
```js
import React, { useState, useContext } from 'react';

const themeContext = React.createContext();
const ThemeUpdateContext = React.createContext();

export function useTheme() {
    return useContext(themeContext)
}

export function useThemeUpdate() {
    return useContext(ThemeUpdateContext)
}


export  function ThemeProvider({children}) {
    
    const [darkTheme, setDarkTheme] = useState(true);

    function toggleTheme() {
       setDarkTheme(preDarkTheme => !preDarkTheme)
    }

    return (
        <themeContext.Provider value={darkTheme}>
            <ThemeUpdateContext.Provider value={toggleTheme}>
                {children}
            </ThemeUpdateContext.Provider>
          
        </themeContext.Provider>
    )

}
```

// FunctionContextComponent.js
```js
import React, {useContext} from 'react';
import { themeStyles } from './utils.js';
import { useTheme, useThemeUpdate } from './ThemeContext';

export default function FunctionContextComponent() {
    const darkTheme = useTheme();
    const toggleTheme = useThemeUpdate();

    return (
        <>
              <button onClick={toggleTheme} >toggle theme</button>
              <div style={themeStyles(darkTheme)}>funtion theme</div>
        </>
      
    )
}
```