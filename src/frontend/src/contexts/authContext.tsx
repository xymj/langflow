/**
 * 这段代码引入了 React 中的一些核心功能：createContext, useEffect, 和 useState。这些功能通常用于创建上下文（context）、添加副作用效果以及管理组件内的状态。下面详细介绍每个功能的作用及其常见用途。

# # 导入的核心功能
JavaScript
import { createContext, useEffect, useState } from "react";
# # 功能介绍
1. createContext
功能说明
createContext 是一个函数，用于创建一个新的 React 上下文（context）。上下文是一种跨层级组件传递数据的方式，无需手动向下传递 props。

用法
JavaScript
const MyContext = createContext(initialValue);
initialValue: 上下文的默认值。
示例
JavaScript
const ThemeContext = createContext('light'); // 默认主题为 'light'

function App() {
  return (
    <ThemeContext.Provider value="dark">
      // 子组件可以访问当前的主题
      <Header />
      <Content />
    </ThemeContext.Provider>
  );
}
2. useEffect
功能说明
useEffect 是一个 Hook，用于执行副作用操作（如数据获取、订阅或者手动更改 DOM 等）。它类似于生命周期方法 componentDidMount、componentDidUpdate 和 componentWillUnmount 的组合。

用法
JavaScript
useEffect(() => {
  // 副作用操作
  const cleanup = () => {}; // 清除副作用

  // 返回清除函数
  return cleanup;
}, [dependencies]);
第一个参数是一个回调函数，表示副作用操作。
第二个参数是一个依赖数组（可选），表示哪些变量变化时重新执行副作用操作。如果不传依赖数组，默认情况下每次渲染都会执行副作用操作。
示例
JavaScript
function ExampleComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;

    // 清除副作用
    return () => {
      document.title = 'React App';
    };
  }, [count]);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
3. useState
功能说明
useState 是一个 Hook，用于在函数组件中添加状态管理的功能。它返回一对值：当前的状态值和更新该状态的函数。

用法
JavaScript
const [state, setState] = useState(initialState);
initialState: 初始状态值。
[state, setState]: 分别表示当前状态值和更新该状态的函数。
示例
JavaScript
function Counter() {
  const [count, setCount] = useState(0);

  function increment() {
    setCount(count + 1);
  }

  return (
    <div>
      <p>{count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
# # 综合示例
假设我们需要创建一个简单的计数器组件，并使用上下文传递主题信息：

定义上下文
JavaScript
const ThemeContext = createContext('light');
创建计数器组件
JavaScript
function Counter({ theme }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(`Current theme is: ${theme}`);

    return () => {
      console.log('Counter component unmounted');
    };
  }, [theme]);

  function increment() {
    setCount(count + 1);
  }

  return (
    <div style={{ backgroundColor: theme === 'dark' ? '#333' : '#fff', color: theme === 'dark' ? '#fff' : '#333' }}>
      <p>{count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
主应用组件
JavaScript
function App() {
  const [theme, setTheme] = useState('light');

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  return (
    <ThemeContext.Provider value={theme}>
      <div>
        <h1>App with Context and Hooks</h1>
        <button onClick={toggleTheme}>Toggle Theme</button>
        <Counter theme={theme} />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
# # 解释
定义上下文:

使用 createContext 创建一个名为 ThemeContext 的上下文，默认主题为 'light'。
计数器组件:

使用 useState 管理计数器的状态。
使用 useEffect 监听主题的变化并在控制台打印相关信息。
提供按钮来增加计数器的值，并根据主题调整样式颜色。
主应用组件:

使用 useState 管理主题的状态。
提供按钮切换主题。
使用 <ThemeContext.Provider> 将主题传递给子组件。
渲染计数器组件并传递主题。

 */
import { createContext, useEffect, useState } from "react";

/**
 * useNavigate 是来自 react-router-dom 库的一个 Hook，用于在函数组件中导航到不同的路由路径。这使得可以在不使用类组件的情况下轻松地进行页面跳转。

# # 导入 useNavigate
JavaScript
import { useNavigate } from "react-router-dom";
# # 功能介绍
1. useNavigate
功能说明
useNavigate Hook 提供了一种简单的方式来导航到不同的路由路径。它返回一个函数，可以通过调用这个函数并传入目标路径来进行页面跳转。

用法
JavaScript
const navigate = useNavigate();

navigate(pathname, options);
pathname: 目标路径字符串。
options: （可选）配置选项对象，包括以下属性：
replace: 是否替换当前历史记录条目（默认为 false）。
state: 要附加到新历史记录条目的状态对象（默认为 undefined）。
示例
JavaScript
function MyComponent() {
  const navigate = useNavigate();

  function handleButtonClick() {
    navigate('/another-page');
  }

  return (
    <button onClick={handleButtonClick}>
      Go to Another Page
    </button>
  );
}
2. 综合示例
假设我们需要创建一个简单的页面跳转功能，并使用 useNavigate 来实现这一功能：

定义路由和页面
首先定义一些基本的路由配置和页面组件。

JavaScript
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  function handleClick() {
    navigate('/about');
  }

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={handleClick}>Go to About Page</button>
      <Link to="/contact">Contact Us</Link>
    </div>
  );
}

function AboutPage() {
  return (
    <div>
      <h1>About Page</h1>
      <Link to="/">Back to Home</Link>
    </div>
  );
}

function ContactPage() {
  return (
    <div>
      <h1>Contact Page</h1>
      <Link to="/">Back to Home</Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}

export default App;
步骤详解
导入所需模块:

JavaScript
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
定义主页 (HomePage) 组件:

使用 useNavigate 获取导航函数。
定义点击事件处理器来导航到 /about 页面。
提供链接到 /contact 页面。
定义关于页 (AboutPage) 组件:

提供链接回到主页 (/)。
定义联系页 (ContactPage) 组件:

提供链接回到主页 (/)。
主应用 (App) 组件:

使用 BrowserRouter 包装整个应用。
使用 <Routes> 和 <Route> 定义不同路径对应的页面组件。
运行示例
假设你已经安装了所有所需的依赖项，可以按照以下步骤运行示例：

初始化项目：

Shell
npx create-react-app my-app
cd my-app
npm install react-router-dom
替换 src/App.js 文件内容：

JavaScript
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  function handleClick() {
    navigate('/about');
  }

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={handleClick}>Go to About Page</button>
      <Link to="/contact">Contact Us</Link>
    </div>
  );
}

function AboutPage() {
  return (
    <div>
      <h1>About Page</h1>
      <Link to="/">Back to Home</Link>
    </div>
  );
}

function ContactPage() {
  return (
    <div>
      <h1>Contact Page</h1>
      <Link to="/">Back to Home</Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}

export default App;
运行项目：

Shell
npm start
通过这种方式，你可以使用 useNavigate Hook 方便地进行页面跳转，并结合 React Router 实现路由管理
 */
import { useNavigate } from "react-router-dom";


/**
 * universal-cookie 是一个库，用于在客户端（浏览器）中方便地操作 Cookie。通过这个库，你可以轻松地设置、获取和删除 Cookie。

# # 导入库
JavaScript
import Cookies from 'universal-cookie';
# # 功能介绍
1. Cookies.set(key, value[, options])
功能: 设置一个新的 Cookie。
参数:
key: Cookie 的键名（字符串）。
value: Cookie 的值（字符串）。
options: （可选）配置选项对象，包括但不限于：
path: Cookie 的路径（默认为 /）。
domain: Cookie 的域名（默认为空字符串）。
secure: 是否仅在 HTTPS 下发送 Cookie（布尔值，默认为 false）。
httpOnly: 是否仅允许服务器端访问 Cookie（布尔值，默认为 false）。
maxAge: Cookie 过期时间（单位：秒，默认为无限期）。
2. Cookies.get(key)
功能: 获取指定键名的 Cookie 值。
参数:
key: Cookie 的键名（字符串）。
返回值: 对应键名的 Cookie 值（字符串）或 undefined（如果不存在）。
3. Cookies.remove(key[, options])
功能: 删除指定键名的 Cookie。
参数:
key: Cookie 的键名（字符串）。
options: （可选）配置选项对象，通常包含 path 和 domain 属性以匹配原始 Cookie 的设置。
示例代码
假设你需要在应用中设置、获取和删除 Cookie。下面是一个综合示例：

定义 Cookie 操作函数
JavaScript
import Cookies from 'universal-cookie';

const cookie = new Cookies();

function setCookie(key: string, value: string, options?: object) {
  cookie.set(key, value, options);
}

function getCookie(key: string): string | undefined {
  return cookie.get(key);
}

function removeCookie(key: string, options?: object) {
  cookie.remove(key, options);
}
使用示例
设置 Cookie
JavaScript
function setCookieExample() {
  const key = 'username';
  const value = 'john_doe';
  const options = {
    path: '/',
    maxAge: 60 * 60 * 24 * 7 // 一周后过期
  };

  setCookie(key, value, options);

  console.log('Set cookie:', key, value);
}
获取 Cookie
JavaScript
function getCookieExample() {
  const key = 'username';
  const value = getCookie(key);

  if (value) {
    console.log('Get cookie:', key, value);
  } else {
    console.log('Cookie not found:', key);
  }
}
删除 Cookie
JavaScript
function removeCookieExample() {
  const key = 'username';
  const options = { path: '/' };

  removeCookie(key, options);

  console.log('Removed cookie:', key);
}
完整示例组件
假设你需要在登录表单提交后设置 Cookie 并重定向到首页。

JavaScript
import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const cookie = new Cookies();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 登录验证逻辑（此处简化）
    if (username === 'admin' && password === 'secret') {
      const options = {
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 一周后过期
      };

      cookie.set('username', username, options);
      
      alert('Login successful');
      navigate('/');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username:</label>
      <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />

      <label htmlFor="password">Password:</label>
      <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
解释
导入所需模块:

JavaScript
import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
定义登录表单组件 (Login):

使用 useState 管理用户名和密码的状态。
使用 useNavigate 获取导航函数。
定义表单提交事件处理器来验证登录信息并设置 Cookie。
表单提交事件处理器 (handleSubmit):

验证用户名和密码是否正确。
如果验证通过，设置 Cookie 并导航到首页。
如果验证未通过，显示错误提示信息。
渲染表单元素:

输入框用于输入用户名和密码。
提交按钮触发表单提交事件处理器。
通过这种方式可以方便地在客户端操作 Cookie，并结合 React Router 进行页面跳转
 */
import Cookies from "universal-cookie";


import {
  getGlobalVariables,
  getLoggedUser,
  requestLogout,
} from "../controllers/API";
import useAlertStore from "../stores/alertStore";
import { useFolderStore } from "../stores/foldersStore";
import { useGlobalVariablesStore } from "../stores/globalVariablesStore/globalVariables";
import { useStoreStore } from "../stores/storeStore";
import { Users } from "../types/api";
import { AuthContextType } from "../types/contexts/auth";

const initialValue: AuthContextType = {
  isAdmin: false,
  setIsAdmin: () => false,
  isAuthenticated: false,
  accessToken: null,
  login: () => {},
  logout: () => new Promise(() => {}),
  userData: null,
  setUserData: () => {},
  authenticationErrorCount: 0,
  autoLogin: false,
  setAutoLogin: () => {},
  setApiKey: () => {},
  apiKey: null,
  storeApiKey: () => {},
  getUser: () => {},
};

export const AuthContext = createContext<AuthContextType>(initialValue);

export function AuthProvider({ children }): React.ReactElement {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [accessToken, setAccessToken] = useState<string | null>(
    cookies.get("access_token_lf") ?? null,
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!cookies.get("access_token_lf"),
  );
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [userData, setUserData] = useState<Users | null>(null);
  const [autoLogin, setAutoLogin] = useState<boolean>(false);
  const setLoading = useAlertStore((state) => state.setLoading);
  const [apiKey, setApiKey] = useState<string | null>(
    cookies.get("apikey_tkn_lflw"),
  );

  const getFoldersApi = useFolderStore((state) => state.getFoldersApi);
  const setGlobalVariables = useGlobalVariablesStore(
    (state) => state.setGlobalVariables,
  );
  const checkHasStore = useStoreStore((state) => state.checkHasStore);
  const fetchApiData = useStoreStore((state) => state.fetchApiData);

  useEffect(() => {
    const storedAccessToken = cookies.get("access_token_lf");
    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
    }
  }, []);

  useEffect(() => {
    const apiKey = cookies.get("apikey_tkn_lflw");
    if (apiKey) {
      setApiKey(apiKey);
    }
  }, []);

  function getUser() {
    getLoggedUser()
      .then(async (user) => {
        setUserData(user);
        const isSuperUser = user!.is_superuser;
        setIsAdmin(isSuperUser);
        getFoldersApi(true, true);
        const res = await getGlobalVariables();
        setGlobalVariables(res);
        checkHasStore();
        fetchApiData();
      })
      .catch((error) => {
        setLoading(false);
      });
  }

  function login(newAccessToken: string) {
    setAccessToken(newAccessToken);
    setIsAuthenticated(true);
    getUser();
  }

  async function logout() {
    if (autoLogin) {
      return;
    }
    try {
      await requestLogout();
      cookies.remove("apikey_tkn_lflw", { path: "/" });
      setIsAdmin(false);
      setUserData(null);
      setAccessToken(null);
      setIsAuthenticated(false);
      navigate("/login");
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  function storeApiKey(apikey: string) {
    cookies.set("apikey_tkn_lflw", apikey, { path: "/" });
    setApiKey(apikey);
  }

  return (
    // !! to convert string to boolean
    <AuthContext.Provider
      value={{
        isAdmin,
        setIsAdmin,
        isAuthenticated,
        accessToken,
        login,
        logout,
        setUserData,
        userData,
        authenticationErrorCount: 0,
        setAutoLogin,
        autoLogin,
        setApiKey,
        apiKey,
        storeApiKey,
        getUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
