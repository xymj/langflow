import ReactDOM from "react-dom/client";
import App from "./App";
import ContextWrapper from "./contexts";
import reportWebVitals from "./reportWebVitals";

// @ts-ignore
import "./style/index.css";
// @ts-ignore
import "./style/applies.css";
// @ts-ignore
import "./style/classes.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <ContextWrapper>
    <App />
  </ContextWrapper>,
);
reportWebVitals();



/**
 * 这段代码是React应用的一个启动文件，主要负责初始化React应用并将其渲染到DOM中。下面逐行解析：

import ReactDOM from "react-dom/root";：从react-dom库导入ReactDOM模块，用于操作DOM元素。

注意：这里使用的是新版本的react-dom API，其中createRoot方法被用来创建一个React根实例。

import App from "./App";：从./App.js或./App.jsx（根据项目配置）导入App组件，这是React应用的主要入口点。

import ContextWrapper from "./contexts";：从./contexts.js或./contexts.jsx导入ContextWrapper组件，这个组件通常用于提供全局状态管理或其他上下文数据给子组件。

import reportWebVitals from "./reportWebVitals";：导入reportWebVitals函数，它通常在页面加载后报告关键性能指标，如首次内容绘制时间、交互时间等。

下面三行注释掉的CSS导入语句：

// @ts-ignore
import "./style/index.css";
// @ts-ignore
import "./style/applies.css";
// @ts-ignore
import "./style/classes.css";
这些语句用于导入全局样式表，但它们被@ts-ignore注释掉了，这可能是为了避免TypeScript编译时的警告。如果这些文件存在并且需要被引入，应该移除@ts-ignore注释。

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
这里创建了一个React根实例，并将它绑定到了ID为"root"的DOM元素上。as HTMLElement是为了类型断言，确保获取的元素确实是HTMLElement类型。

root.render(
  
    
  ,
);
使用render方法将<ContextWrapper><App /></ContextWrapper>作为React树渲染到之前指定的DOM节点上。这意味着整个应用将在ContextWrapper提供的上下文中运行。

最后的reportWebVitals();调用了前面导入的reportWebVitals函数，用于收集和报告网站的关键性能指标。

总结来说，这段代码的作用是设置并渲染了React应用的核心结构，同时提供了必要的上下文环境和性能监控功能。
 */
