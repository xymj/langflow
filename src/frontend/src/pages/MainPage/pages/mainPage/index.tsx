import { useEffect, useState } from "react";

/**
 * 这段代码从 react-router-dom 库中导入了几个关键的组件和钩子（Hooks），主要用于构建复杂的路由系统。让我们逐一了解这些导入项的功能：

# # 导入的关键组件与钩子
JavaScript
import { Outlet, useLocation, useNavigate } from "react-router-dom";
1. Outlet
Outlet 是一个特殊的 React 组件，用于渲染当前路由下的子路由组件。它是路由嵌套的关键部分。

用法示例：
JavaScriptReact
function Layout() {
  return (
    <div>
      <nav>
        // 导航栏
        </nav>
        <main>
          // 渲染子路由组件
          <Outlet />
        </main>
      </div>
    );
  }
  2. useLocation
  这是一个 React Hook，用于获取当前路由的位置信息，包括 URL、查询参数等。
  
  使用示例：
  JavaScriptReact
  function CurrentUrlDisplay() {
    const location = useLocation();
    return <div>The current URL is: {location.pathname}</div>;
  }
  3. useNavigate
  这是另一个 React Hook，提供了导航至其他路由的能力。它可以替代传统的 HTML 锚点标签或 JavaScript 的 window.location.href 来进行页面跳转。
  
  使用示例：
  JavaScriptReact
  function NavigateButton(props) {
    const navigate = useNavigate();
  
    function handleClick() {
      navigate(props.to);
    }
  
    return (
      <button onClick={handleClick}>
        Go to {props.to}
      </button>
    );
  }
  综合示例
  假设我们要构建一个多级路由的应用程序：
  
  定义路由结构：
  JavaScriptReact
  import React from 'react';
  import ReactDOM from 'react-dom/client';
  import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
  
  import MainLayout from './MainLayout';
  import Dashboard from './Dashboard';
  import Profile from './Profile';
  import Settings from './Settings';
  
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          // 嵌套路由
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>,
  );
  定义布局组件：
  JavaScriptReact
  import React from 'react';
  import { Outlet } from 'react-router-dom';
  
  function MainLayout() {
    return (
      <>
        // 导航栏
        <nav>
          <ul>
            <li><a href="/">Dashboard</a></li>
            <li><a href="/profile">Profile</a></li>
            <li><a href="/settings">Settings</a></li>
          </ul>
        </nav>
  
        // 内容区域
        <main>
          <Outlet />
        </main>
      </>
    );
  }
  
  export default MainLayout;
  定义页面组件：
  Dashboard 组件：
  JavaScriptReact
  import React from 'react';
  
  function Dashboard() {
    return (
      <div className="dashboard">
        // Dashboard 页面内容
      </div>
    );
  }
  
  export default Dashboard;
  Profile 组件：
  JavaScriptReact
  import React from 'react';
  
  function Profile() {
    return (
      <div className="profile">
        // Profile 页面内容
      </div>
    );
  }
  
  export default Profile;
  Settings 组件：
  JavaScriptReact
  import React from 'react';
  
  function Settings() {
    return (
      <div className="settings">
        // Settings 页面内容
      </div>
    );
  }
  
  export default Settings;
  使用 useLocation 和 useNavigate：
  Location Display 组件：
  JavaScriptReact
  import React from 'react';
  import { useLocation } from 'react-router-dom';
  
  function LocationDisplay() {
    const location = useLocation();
  
    return (
      <div>
        <h2>Current URL:</h2>
        <code>{location.pathname}</code>
      </div>
    );
  }
  
  export default LocationDisplay;
  Navigation Button 组件：
  JavaScriptReact
  import React from 'react';
  import { useNavigate } from 'react-router-dom';
  
  function NavigationButton({ to }) {
    const navigate = useNavigate();
  
    function handleClick() {
      navigate(to);
    }
  
    return (
      <button onClick={handleClick}>
        Go to {to}
      </button>
    );
  }
  
  export default NavigationButton;
  这样，我们就建立了一个具备多级路由和导航功能的基本应用程序框架。Outlet 用于渲染子路由组件；useLocation 提供了访问当前路由位置信息的能力；而 useNavigate 则使我们可以编写更灵活的导航逻辑。
 */
import { Outlet, useLocation, useNavigate } from "react-router-dom";



import DropdownButton from "../../../../components/dropdownButtonComponent";
import PageLayout from "../../../../components/pageLayout";
import SidebarNav from "../../../../components/sidebarComponent";
import {
  MY_COLLECTION_DESC,
  USER_PROJECTS_HEADER,
} from "../../../../constants/constants";
import useFlowsManagerStore from "../../../../stores/flowsManagerStore";
import { useFolderStore } from "../../../../stores/foldersStore";
import ModalsComponent from "../../components/modalsComponent";
import useDeleteFolder from "../../hooks/use-delete-folder";
import useDropdownOptions from "../../hooks/use-dropdown-options";

export default function HomePage(): JSX.Element {
  const uploadFlow = useFlowsManagerStore((state) => state.uploadFlow);
  const setCurrentFlowId = useFlowsManagerStore(
    (state) => state.setCurrentFlowId,
  );

  const location = useLocation();
  const pathname = location.pathname;
  const [openModal, setOpenModal] = useState(false);
  const [openFolderModal, setOpenFolderModal] = useState(false);
  const [openDeleteFolderModal, setOpenDeleteFolderModal] = useState(false);
  const is_component = pathname === "/components";
  const setFolderToEdit = useFolderStore((state) => state.setFolderToEdit);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentFlowId("");
  }, [pathname]);

  const dropdownOptions = useDropdownOptions({
    uploadFlow,
    navigate,
    is_component,
  });

  const { handleDeleteFolder } = useDeleteFolder({ navigate });

  return (
    <>
      <PageLayout
        title={USER_PROJECTS_HEADER}
        description={MY_COLLECTION_DESC}
        button={
          <div className="flex gap-2">
            <DropdownButton
              firstButtonName="New Project"
              onFirstBtnClick={() => setOpenModal(true)}
              options={dropdownOptions}
              plusButton={true}
              dropdownOptions={false}
            />
          </div>
        }
      >
        <div className="flex h-full w-full space-y-8 md:flex-col lg:flex-row lg:space-x-8 lg:space-y-0">
          <aside className="flex h-fit w-fit flex-col space-y-6">
            <SidebarNav
              items={[]}
              handleChangeFolder={(id: string) => {
                navigate(`all/folder/${id}`, { state: { folderId: id } });
              }}
              handleEditFolder={(item) => {
                setFolderToEdit(item);
                setOpenFolderModal(true);
              }}
              handleDeleteFolder={(item) => {
                setFolderToEdit(item);
                setOpenDeleteFolderModal(true);
              }}
              className="w-[20vw]"
            />
          </aside>
          <div className="relative h-full w-full flex-1">
            <Outlet />
          </div>
        </div>
      </PageLayout>
      <ModalsComponent
        openModal={openModal}
        setOpenModal={setOpenModal}
        openFolderModal={openFolderModal}
        setOpenFolderModal={setOpenFolderModal}
        openDeleteFolderModal={openDeleteFolderModal}
        setOpenDeleteFolderModal={setOpenDeleteFolderModal}
        handleDeleteFolder={handleDeleteFolder}
      />
    </>
  );
}
