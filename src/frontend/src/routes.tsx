// 这段代码从React库中导入了两个重要的功能：Suspense和lazy。这两个API共同提供了React中的代码分割和异步加载的能力，这对于提高大型应用的性能和用户体验至关重要。
// Suspense是一个React组件，用于优雅地处理异步操作的结果，如数据获取或组件加载。它可以接收一个fallback属性，当其子组件（通常是通过lazy加载的组件）还未准备好时，Suspense会渲染fallback属性所指定的内容。一旦子组件准备就绪，Suspense就会将其替换掉fallback内容。
// lazy是一个高阶函数，用于动态加载React组件。它接受一个函数作为参数，该函数应当返回一个Promise，这个Promise在解析时会返回所需的模块。通常，这个函数会使用ES6的import()语法来实现按需加载，这样就可以把组件的代码放到单独的chunk中，只在真正需要的时候才加载。
/*
// 假设我们有一个名为 MyLazyComponent 的组件，位于 my-lazy-component.js 文件中
const MyLazyComponent = lazy(() => import('./my-lazy-component'));

function MyComponent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyLazyComponent />
    </Suspense>
  );
}
 在这个例子中，MyLazyComponent会在首次被渲染时异步加载。在加载期间，Suspense组件会渲染<div>Loading...</div>作为加载提示。一旦MyLazyComponent加载完毕，Suspense就会将其插入到DOM中，取代加载提示。
*/
import { Suspense, lazy } from "react";

/*
这段代码从react-router-dom库中导入了几个关键的组件和函数，用于在React应用中实现客户端路由的功能。下面是每个导入项的作用说明：
  Navigate组件用于在React Router中执行程序化的导航。它允许你在应用的任何地方触发页面跳转，而不必直接修改浏览器的历史记录。Navigate组件特别适用于需要根据某些条件决定是否跳转的情况，例如在受保护的路由中判断用户是否已经登录。
  Route组件是React Router的核心组成部分之一，用于定义应用中的单个路由规则。每一个Route组件都可以指定一个path属性，用来匹配URL的一部分；以及一个element属性，用来指定当URL匹配时应该渲染的React组件。此外，Route还支持其他属性，如index（用于定义默认路由）、path（匹配路径）等，以便更精细地控制路由行为。
  Routes组件用于包含一系列的Route组件，并根据当前的URL来确定哪个Route应该被激活和渲染。Routes组件会遍历其所有的子Route组件，找到第一个与当前URL匹配的Route，并仅渲染那个Route的element。这是实现高效路由匹配的关键所在，因为它避免了对所有可能的Route进行不必要的渲染。

  import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users/:userId" element={<UserDetail />} />
        // 如果没有匹配的路由，重定向到首页 
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
export default App;
在这个例子中，我们定义了三个基本的路由规则，分别对应应用的首页、关于我们页面和用户详情页面。最后，我们使用Navigate组件作为一个通配符路由，当用户试图访问不存在的URL时，会自动重定向回首页。这种方法有助于简化错误处理和用户体验，确保用户始终能看到有效的页面内容。
*/
import { Navigate, Route, Routes } from "react-router-dom";


/**
 * 
 * 这行代码是从本地模块authAdminGuard中导入一个名为ProtectedAdminRoute的组件。这个组件通常被设计成一个高阶组件（Higher Order Component，HOC），用于保护那些仅限管理员访问的路由。
高阶组件（HOC）: 在React中，高阶组件是一个函数，它接受一个组件作为参数，并返回一个新的增强后的组件。ProtectedAdminRoute很可能就是这样一个函数，它接收一个原始的React组件作为输入，然后返回一个新的组件，这个新组件在渲染前会先检查用户是否有管理员权限。
工作原理:当ProtectedAdminRoute被用作路由的element时，它会做以下几件事：
  权限检查：在渲染实际的组件之前，ProtectedAdminRoute会检查当前用户的权限，看他们是否拥有管理员级别的访问权。这通常涉及到从全局状态管理器（如Redux或Context API）读取用户信息，或者调用API来验证用户的身份。
  重定向：如果用户不是管理员，ProtectedAdminRoute可能会阻止原组件的渲染，并将用户重定向到另一个页面，比如登录页面或无权限访问的提示页面。
  渲染组件：如果用户确实有管理员权限，ProtectedAdminRoute则会正常渲染传入的组件，允许用户访问受限资源。
  使用示例
  假设ProtectedAdminRoute的实现如下所示：

  JavaScriptReact
  import React from 'react';
  import { useSelector } from 'react-redux';
  import { Navigate } from 'react-router-dom';

  const ProtectedAdminRoute = ({ component: Component, ...rest }) => {
    const isAdmin = useSelector(state => state.user.isAdmin);

    if (!isAdmin) {
      // 用户不是管理员，重定向到登录页面或其他页面
      return <Navigate to="/login" />;
    }

    // 用户是管理员，继续渲染组件
    return <Component {...rest} />;
  };

  export default ProtectedAdminRoute;
  在路由配置中，你可以像这样使用ProtectedAdminRoute：

  JavaScriptReact
  <Route
    path="/admin"
    element={
      <ProtectedAdminRoute>
        <AdminPage />
      </ProtectedAdminRoute>
    }
  />
  这样，除非用户具备管理员权限，否则无法访问AdminPage组件。这种模式对于构建有严格访问控制的应用非常有用，能够确保敏感数据和功能的安全。
 */
import { ProtectedAdminRoute } from "./components/authAdminGuard";


/**
 * 这段代码从authGuard模块中导入了一个名为ProtectedRoute的组件。ProtectedRoute组件通常被设计为一个高阶组件（HOC），用于保护那些需要用户认证才能访问的路由。
高阶组件（HOC）:在React中，高阶组件是一个函数，它接收一个组件作为参数，并返回一个新的组件。这个新的组件包含了额外的行为或特性，例如权限检查、日志记录或是状态提升等。
ProtectedRoute的工作机制,当ProtectedRoute被用作路由的element时，它主要负责两件事情：
  身份验证：在渲染实际的组件之前，ProtectedRoute会检查当前用户是否已经登录。这通常涉及从全局状态管理器（如Redux、MobX或React Context API）读取用户的状态，或者调用API来确认用户的身份。
  路由守卫：如果用户未登录，ProtectedRoute可能会阻止原组件的渲染，并将用户重定向到登录页面。相反，如果用户已登录，它将继续渲染传入的组件，允许用户访问受保护的资源。
  实现示例
  假设ProtectedRoute的实现如下：

  JavaScriptReact
  import React from 'react';
  import { useSelector } from 'react-redux';
  import { Navigate } from 'react-router-dom';

  const ProtectedRoute = ({ component: Component, ...rest }) => {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    if (!isLoggedIn) {
      // 用户未登录，重定向到登录页面
      return <Navigate to="/login" />;
    }

    // 用户已登录，继续渲染组件
    return <Component {...rest} />;
  };

  export default ProtectedRoute;
  如何使用
  在你的路由配置中，你可以像这样使用ProtectedRoute：

  JavaScriptReact
  <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
  />
  这样，除非用户已经登录，否则无法访问Dashboard组件。这种模式对于构建需要用户认证的应用来说是非常有用的，它帮助确保了应用的安全性和私密性。
 */
import { ProtectedRoute } from "./components/authGuard";

/**
 * 这段代码表明你正在从authLoginGuard模块中导入ProtectedLoginRoute组件。这个组件主要用于保护登录相关的路由，确保只有未登录的用户可以访问这些页面，而已经登录的用户会被重定向至应用的其他部分。
组件作用,ProtectedLoginRoute组件通常工作于以下场景：
  当用户已经登录时，阻止他们再次访问登录或注册页面，以避免重复登录或混淆。
  引导已登录用户前往应用的主界面或其他授权区域。
  实现细节
  内部实现上，ProtectedLoginRoute会检查用户的登录状态。这可以通过多种方式完成，包括但不限于：

  检查存储在localStorage或sessionStorage中的JWT令牌。
  查询全局状态管理器（如Redux、MobX或React Context API）中的用户状态。
  调用后端API来验证当前用户的登录状态。
  如果用户已被验证为登录状态，ProtectedLoginRoute将不会渲染目标组件，而是使用Navigate或类似的方法重定向用户至应用的主页或其他位置。

  使用示例
  在你的路由配置中引入此保护措施的方式如下：

  JavaScriptReact
  import { ProtectedLoginRoute } from './components/authLoginGuard';
  // ...
  <Route 
    path="/login"
    element={
      <ProtectedLoginRoute>
        <LoginPage />
      </ProtectedLoginRoute>
    }
  />
  如此一来，即使用户尝试手动访问/login路径，在他们已经登录的情况下也会被自动重定向。这不仅提升了安全性，也改善了用户体验，避免了不必要的重复操作。
 */
import { ProtectedLoginRoute } from "./components/authLoginGuard";


/**
 * 这段代码表示你正从catchAllRoutes模块中导入CatchAllRoute组件。CatchAllRoute组件的设计目的是捕捉所有未明确匹配的路由请求，通常用于处理404错误页面或提供一个统一的“页面未找到”体验给用户。

功能概述
当用户尝试访问应用中不存在的URL时，CatchAllRoute组件就会介入，显示一个预设的页面或消息，告知用户他们所访问的页面不存在。这对于提高用户体验至关重要，避免了浏览器默认的生硬错误页面展示，提供了更加友好和一致的反馈。

实现方式
CatchAllRoute组件通常通过设置一个特殊的路由规则来实现，该规则匹配所有其他的路由之后。这意味着，一旦所有具体的路由规则都被检查过但没有发现匹配项，CatchAllRoute就会被激活。

使用示例
在React Router中，你可以将CatchAllRoute放在<Routes>组件的最下方，以确保它是最后一个被检查的路由规则：

JavaScriptReact
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CatchAllRoute } from './components/catchAllRoutes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        // 所有其他未匹配的路由都将导向CatchAllRoute
        <Route path="/*" element={<CatchAllRoute />} />
      </Routes>
    </Router>
  );
}
在这个例子中，CatchAllRoute被分配给了一个通配符路径/*，意味着它将捕获所有未能与前面定义的具体路由相匹配的请求。当这种情况发生时，CatchAllRoute组件内的内容将会被渲染，通常是自定义的404错误页面。

总结
CatchAllRoute组件是现代Web应用中不可或缺的一部分，它不仅增强了应用的健壮性，还能显著提升用户体验，尤其是在面对不可预见的用户输入或链接时。通过精心设计的错误页面，你可以保持品牌形象的一致性，同时给予用户清晰的指导，如何回到应用的有效部分。
 */
import { CatchAllRoute } from "./components/catchAllRoutes";


/**
 * 这行代码说明你正在从loadingComponent.js模块中导入一个名为LoadingComponent的React组件。这个组件通常用于在应用加载过程中显示一个视觉指示器，告诉用户系统正在进行某些后台任务，如获取数据、初始化应用状态或加载更多内容。

加载组件的作用
LoadingComponent组件在用户体验中起着关键作用，特别是在网络延迟较高或数据量较大的情况下。它可以是一个简单的动画图标、进度条或者是带有文本的消息，用来缓解用户等待过程中的焦虑感，使整个应用显得更加专业和用户友好。

基本结构
一个典型的LoadingComponent可能长这样：

JavaScriptReact
import React from 'react';

const LoadingComponent = () => {
  return (
    <div className="loader">
      <span>Loading...</span>
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingComponent;
这里，我们创建了一个包含文字“Loading...”和一个旋转动画的简单加载指示器。

在应用中使用
为了有效地利用LoadingComponent，你需要根据应用的不同状态条件动态地显示或隐藏它。一种常见的做法是在数据加载期间显示加载组件，一旦数据加载完毕就将其移除。这通常通过React的状态管理和生命周期方法（对于类组件）或Hooks（对于函数组件）来实现。

例如，你可以在数据加载完成前显示LoadingComponent：

JavaScriptReact
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingComponent from './components/loadingComponent';

const DataFetchingComponent = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('https://api.example.com/data')
      .then(response => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      {isLoading ? <LoadingComponent /> : <DataDisplay data={data} />}
    </div>
  );
};
在这个例子中，LoadingComponent只会在数据加载过程中显示，一旦数据加载完成，它就被替换成了实际的数据展示组件DataDisplay。

总之，LoadingComponent是提升用户体验的重要工具之一，合理地运用它可以使你的应用更加平滑和吸引人。

---------------------------------------------------
useEffect 是 React Hooks 中的一个重要组成部分，它让你能在函数组件中执行副作用操作，比如数据获取、订阅或手动改变 DOM。在 Class 组件中，这类操作通常在 componentDidMount、componentDidUpdate 和 componentWillUnmount 生命周期方法中执行。但在函数组件中，useEffect 提供了一种更简洁的方式来处理这些需求。

基础用法
useEffect 接收两个参数：一个是回调函数，另一个是一个依赖数组。回调函数将在组件渲染后运行，而依赖数组则决定了何时重新运行这个效果。

示例：
JavaScriptReact
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
    
    // 清理操作
    return () => {
      document.title = 'React App';
    };
  }, [count]); // 只有 count 改变时才重新运行 effect

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
关键点解析
副作用操作：useEffect 的第一个参数是一个函数，其中可以执行任何副作用操作，如数据获取、DOM 操作或定时器设置。

清理操作：useEffect 函数可以返回一个清除函数，当组件卸载或重新渲染时，这个函数会被调用来撤销副作用操作的影响。

依赖数组：第二个参数是一个依赖数组，它列出了所有导致 effect 重新运行的变量。如果省略这个数组，effect 将在每次渲染后都运行；如果传递空数组 []，effect 只会在组件挂载和卸载时运行一次。

性能优化：通过控制依赖数组的内容，你可以决定 effect 是否以及何时运行，从而优化应用性能。

异步操作：useEffect 内部可以执行异步操作，如 AJAX 请求或 setTimeout，只要确保在回调函数内正确处理这些操作即可。

并发更新：在 React 的新版本中，useEffect 也可以处理并发更新的情况，即多个状态更新之间的副作用顺序和执行时机。

总的来说，useEffect 是一个非常强大的工具，它简化了函数组件中的副作用管理，使得代码更加可预测和易于维护。


 */
import LoadingComponent from "./components/loadingComponent";

/**
 *  这一行代码表明你正在从storeGuard.js模块中导入一个名为StoreGuard的组件。StoreGuard组件通常用于在前端应用中实施基于状态的路由守卫机制，确保只有满足特定条件的用户才能访问某些页面或特性。

主要功能
StoreGuard组件的核心职责在于拦截对受保护资源的访问，检查用户状态是否符合访问权限。这通常涉及到读取应用的全局状态（如 Redux store 或 MobX store），评估用户身份认证、权限级别等信息，以确定是否允许用户访问请求的页面或功能。

工作原理
在具体实现中，StoreGuard可能会做以下几件事：

读取状态：从全局状态管理器中读取必要的用户信息，如登录状态、角色或权限。
条件判断：基于读取的状态，判断用户是否有权访问请求的资源。
导航控制：如果用户符合条件，允许其访问；否则，重定向到登录页、权限不足提示页或其他合适的页面。
使用场景
假设你有一个需要用户认证才能访问的功能，如个人资料编辑或订单历史查看。在这种情况下，StoreGuard可以作为路由的前置检查，确保只有经过验证的用户才能访问这些页面。

实现示例
以下是StoreGuard组件的一种可能实现方式：

JavaScriptReact
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const StoreGuard = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  );
};

export default StoreGuard;
在这个例子中，StoreGuard组件接收一个子组件Component和其他路由属性。它使用useSelector从Redux store中选择isAuthenticated状态，以此判断用户是否已登录。如果用户已登录，Component将正常渲染；如果没有登录，用户将被重定向到登录页面。

结论
StoreGuard组件是实现安全、可控的前端路由的关键部分，尤其适用于那些需要严格权限管理的应用场景。通过结合全局状态管理和React Router，你可以轻松地为不同的页面或功能添加细粒度的访问控制，增强应用的安全性和用户体验。
 */
import { StoreGuard } from "./components/storeGuard";


/**
 * 这行代码展示了从应用程序的目录结构中导入MessagesPage组件的过程。这通常意味着MessagesPage是位于settingsPage目录下的一个子页面，专门负责处理与消息相关的设置或功能。

目录结构分析
这段导入语句暗示了项目遵循了一种分层的文件组织策略，其中./pages/SettingsPage/pages/messagesPage指向的是一个特定的页面组件。这种结构有助于大型项目的开发和维护，因为它按照功能模块化地组织代码，使得每个页面或组件都有其独立的空间，便于团队协作和代码复用。

MessagesPage组件的角色
MessagesPage组件很可能是应用程序设置部分的一个细分，专注于呈现和管理与消息相关的选项。这可能包括用户消息通知的定制、隐私设置调整、消息过滤规则设定等功能。这样的页面设计旨在提供直观的用户界面，让用户能够轻松修改与消息交互相关的偏好设置。

如何使用MessagesPage
在React应用中，MessagesPage组件通常会被嵌入到更高级别的路由配置中，以便用户可以通过菜单或链接直接访问。例如，你可能会在SettingsPage组件中看到如下代码：

JavaScriptReact
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MessagesPage from './pages/messagesPage';

function SettingsPage() {
  return (
    <Switch>
      <Route exact path="/settings/messages" component={MessagesPage} />
      //其他设置页面的路由
      </Switch>
    );
  }
  
  export default SettingsPage;
  在这里，MessagesPage被配置为当用户访问/settings/messages路径时显示的页面。这种路由配置确保了用户能够通过清晰的路径访问到消息设置页面，同时也方便了应用内部的导航和跳转。
  
  总结
  通过导入和使用像MessagesPage这样的组件，开发者能够在复杂的前端应用中实现精细的功能划分和用户界面管理。这种方式不仅提高了代码的可读性和可维护性，还促进了更好的用户体验设计，特别是针对那些需要多级导航和个性化设置的复杂应用。
 */
import MessagesPage from "./pages/SettingsPage/pages/messagesPage";


/**
 * 这行代码使用了React的懒加载特性，也称为动态导入(dynamic imports)，主要用于按需加载组件，从而优化应用的初始加载时间和性能表现。

解析
lazy()函数: 自React 16.6版本起引入，用于包装异步组件。它接受一个函数作为参数，该函数应该返回一个Promise对象，该Promise对象最终解析为一个模块对象。模块对象中必须包含一个默认导出，即你要懒加载的组件。

箭头函数: ( ) => import("./pages/AdminPage") 是一个立即执行的异步函数表达式，当AdminPage组件首次被请求时，它才会执行并加载对应的模块。这实现了代码分割(code splitting)，即将应用拆分为较小的包，仅在需要时加载。

为什么使用懒加载？
减少初次加载时间: 应用程序的主入口文件体积减小，因为不是所有的组件都在一开始就加载。
改善用户体验: 用户无需等待不立即使用的组件加载，加快了首屏渲染速度。
节省带宽: 对于移动设备或低速网络环境尤为重要，减少了不必要的数据传输。
如何在React Router中使用
在React Router v6中，可以结合Suspense组件来优雅地处理懒加载组件的加载过程。下面是一个示例：

JavaScriptReact
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPage from './pages/AdminPage'; // 修改为懒加载形式
const AdminPage = React.lazy(() => import('./pages/AdminPage'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}> 
        // 显示加载状态
        <Routes>
          <Route path="/admin" element={<AdminPage />} />
          // 其他路由
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
在这个例子中，当用户访问 /admin 路径时，AdminPage 组件才会开始加载。在此期间，Suspense 组件会显示指定的 fallback 属性值（这里是 "Loading..." 文字），直到 AdminPage 完全加载完毕并准备就绪。

总结
懒加载是一种重要的优化手段，在大型单页应用(SPA)中尤为关键。通过将非立即必需的部分延迟至真正需要的时候再加载，不仅可以显著提升首屏加载速度和整体性能，还可以提供更佳的用户体验。使用React提供的lazy()和Suspense组合，可以轻松实现这一目标，并优雅地处理加载过程中的过渡状态。
 */
const AdminPage = lazy(() => import("./pages/AdminPage"));
const LoginAdminPage = lazy(() => import("./pages/AdminPage/LoginPage"));
const ApiKeysPage = lazy(
  () => import("./pages/SettingsPage/pages/ApiKeysPage"),
);
const DeleteAccountPage = lazy(() => import("./pages/DeleteAccountPage"));

/**
 * 这段代码同样体现了React中懒加载(lazy loading)的设计模式，特别适用于大型应用中提高性能和加载效率。让我们深入理解一下这段代码背后的意义及其应用场景。

懒加载概念
懒加载是指在需要某个组件或模块时才去加载它的机制，而不是在应用启动时一次性加载所有资源。这对于拥有大量组件的大规模应用来说至关重要，因为它能显著降低应用的初始加载时间，同时优化内存使用，提升用户体验。

lazy()函数详解
lazy()函数是React提供的一种特殊语法糖，用于动态导入模块。它接受一个函数作为参数，此函数应当返回一个Promise，该Promise最终解析为一个模块对象。模块对象中必须包含一个默认导出，通常是你要懒加载的组件。

动态导入(import())
import()是一个ES6+的语法特性，用于动态加载模块。当import()被调用时，它返回一个Promise，这个Promise在模块加载完成后解析为模块的对象。这意味着你可以异步加载模块，而不需要阻塞当前执行流程。

结合Suspense使用
为了优雅地处理懒加载组件的加载过程，React推荐使用<Suspense>组件。<Suspense>组件可以包裹那些使用lazy()加载的组件，当这些组件还在加载时，<Suspense>会显示一个回退(fallback)UI，通常是某种加载指示器。

示例代码
下面是使用lazy()和Suspense的一个典型示例：

JavaScriptReact
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// 使用 lazy() 包装动态导入
const FlowPage = lazy(() => import('./pages/FlowPage'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/flow" element={<FlowPage />} />
          // 更多路由定义
          </Routes>
          </Suspense>
        </Router>
      );
    }
    
    export default App;
    在这段代码中，当用户尝试访问/flow路径时，FlowPage组件将会被动态加载。在加载过程中，<Suspense>组件会显示Loading...文本，直到FlowPage完全加载完毕并渲染出来。
    
    总结
    通过使用lazy()和Suspense，我们可以实现组件的懒加载，从而优化应用的性能和用户体验。这种方法尤其适合那些拥有众多页面和组件的大型应用，帮助我们在保持良好性能的同时，提供丰富和互动性强的用户界面。
 */
const FlowPage = lazy(() => import("./pages/FlowPage"));

const LoginPage = lazy(() => import("./pages/LoginPage"));
const MyCollectionComponent = lazy(
  () => import("./pages/MainPage/components/myCollectionComponent"),
);
const HomePage = lazy(() => import("./pages/MainPage/pages/mainPage"));
const PlaygroundPage = lazy(() => import("./pages/Playground"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const GeneralPage = lazy(
  () => import("./pages/SettingsPage/pages/GeneralPage"),
);
const GlobalVariablesPage = lazy(
  () => import("./pages/SettingsPage/pages/GlobalVariablesPage"),
);
const ShortcutsPage = lazy(
  () => import("./pages/SettingsPage/pages/ShortcutsPage"),
);
const SignUp = lazy(() => import("./pages/SignUpPage"));
const StorePage = lazy(() => import("./pages/StorePage"));
const ViewPage = lazy(() => import("./pages/ViewPage"));

const Router = () => {
  return (
    
    <Suspense
    /* Suspense 组件：
        <Suspense> 是一个React组件，用于处理异步加载时的用户体验。当其子组件（如懒加载的路由）还在加载过程中时，会显示fallback属性指定的内容。
        在这里，当页面内容尚未加载完成时，会展示一个带有LoadingComponent的加载面板。 */
      fallback={
        <div className="loading-page-panel">
          {/* remSize被设置为50，这可能会使加载组件的大小适应于50倍根元素字体大小的计算结果。 */}
          <LoadingComponent remSize={50} />
        </div>
      }
    >
      {/* 通用路由配置：
            通过这种方式，你可以为不同的功能区域（如主页、设置页、商店等）设定清晰的路由结构，
            同时利用嵌套路由和重定向策略优化用户体验和应用架构。 */}
      {/* Routes 和 Route 组件：
            Routes是React Router提供的组件，用于包含多个Route组件，并根据当前URL匹配并渲染相应的组件。
            每个Route组件都指定了一个path属性，表示该路由对应的URL路径，以及一个element属性，表示在匹配到此路径时应渲染的组件。 */}
      <Routes>
        <Route
          path="/"
          element={
            /* 受保护的路由 (ProtectedRoute)：
                这里使用的<ProtectedRoute>、<ProtectedLoginRoute>和<ProtectedAdminRoute>等自定义组件，通常用于实现权限控制或身份验证。
                它们确保只有满足特定条件（例如已登录）的用户才能访问某些页面。*/
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        >
          {/* 导航重定向 (Navigate)：
              当某个Route被访问但没有具体的子路由与之完全匹配时，可以使用<Navigate>组件进行重定向。
              例如，在根路径下，如果没有更具体匹配，则自动跳转至"All"页面 */}
          <Route index element={<Navigate replace to={"all"} />} />
          <Route
            path="flows/*"
            element={<MyCollectionComponent key="flows" type="flow" />}
          />
          <Route
            path="components/*"
            element={
              <MyCollectionComponent key="components" type="component" />
            }
          />
          <Route
            path="all/*"
            element={<MyCollectionComponent key="all" type="all" />}
          />
        </Route>
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate replace to={"general"} />} />
          <Route path="global-variables" element={<GlobalVariablesPage />} />
          <Route path="api-keys" element={<ApiKeysPage />} />
          <Route path="general/:scrollId?" element={<GeneralPage />} />
          <Route path="shortcuts" element={<ShortcutsPage />} />
          <Route path="messages" element={<MessagesPage />} />
        </Route>
        <Route
          path="/store"
          element={
            <ProtectedRoute>
              <StoreGuard>
                <StorePage />
              </StoreGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/store/:id/"
          element={
            <ProtectedRoute>
              <StoreGuard>
                <StorePage />
              </StoreGuard>
            </ProtectedRoute>
          }
        />
        <Route path="/playground/:id/">
          <Route
            path=""
            element={
              <ProtectedRoute>
                <PlaygroundPage />
              </ProtectedRoute>
            }
          />
        </Route>
        {/* 动态路由参数：
              路径中的:id等占位符允许传递动态参数给路由组件。
              例如，"/flow/:id/"意味着任何以"/flow/"开头且后跟任意字符串作为ID的URL都将匹配这个路由。 */}
        <Route path="/flow/:id/">
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <FlowPage />
              </ProtectedRoute>
            }
          />
          <Route
            path=""
            element={
              <ProtectedRoute>
                <FlowPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="view"
            element={
              <ProtectedRoute>
                <ViewPage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <CatchAllRoute />
            </ProtectedRoute>
          }
        />

        <Route
          path="/login"
          element={
            <ProtectedLoginRoute>
              <LoginPage />
            </ProtectedLoginRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <ProtectedLoginRoute>
              <SignUp />
            </ProtectedLoginRoute>
          }
        />
        <Route
          path="/login/admin"
          element={
            <ProtectedLoginRoute>
              <LoginAdminPage />
            </ProtectedLoginRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminPage />
            </ProtectedAdminRoute>
          }
        />

        <Route path="/account">
          <Route
            path="delete"
            element={
              <ProtectedRoute>
                <DeleteAccountPage />
              </ProtectedRoute>
            }
          ></Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default Router;
