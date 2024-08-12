export type LocationStoreType = {
  routeHistory: string[];
  setRouteHistory: (location: string) => void;
};
/**
 * 这段代码定义了一个类型别名 LocationStoreType，它是针对一个理想化的store结构所设计的类型描述，特别关注于路由历史和相关操作。具体来说，LocationStoreType 包括以下两部分内容：

routeHistory: 类型为 string[] 的数组，用于存储用户在应用内的浏览历史。每个元素都是一个字符串，代表用户曾经访问过的某个页面或路由的标识符。

setRouteHistory: 一个接受单个参数 location 的函数，参数类型为 string。这个函数的目的是更新 routeHistory 数组，通常是添加一个新的位置到历史记录中。

# # 使用场景
LocationStoreType 可以在多种场景下发挥作用，尤其是涉及到用户导航和历史记录功能的应用中：

导航历史记录：保持一份用户访问过的所有页面的列表，这对于实现前进/后退功能、个性化推荐或是统计分析都非常有用。
状态恢复：在用户离开并重新进入应用时，能够根据历史记录恢复到他们上次所在的位置。
性能优化：通过缓存先前访问过的页面状态，减少不必要的数据加载和计算。
# # 实现示例
下面是一个基于Zustand的状态管理库实现 LocationStoreType 的示例代码：

TypeScript
// stores/locationStore.ts
import create from 'zustand';

type LocationStoreType = {
  routeHistory: string[];
  setRouteHistory: (location: string) => void;
};

const useLocationStore = create<LocationStoreType>((set) => ({
  routeHistory: [],
  setRouteHistory: (location) => set((state) => ({ routeHistory: [...state.routeHistory, location] })),
}));

export default useLocationStore;
接下来是在React组件中使用 useLocationStore 的方式：

TypeScriptReact
// components/NavigationHistory.tsx
import React from 'react';
import { useLocationStore } from '../stores/locationStore';

const NavigationHistory = () => {
  const { routeHistory, setRouteHistory } = useLocationStore();

  React.useEffect(() => {
    // 模拟从路由系统获取当前位置
    const currentLocation = window.location.pathname;
    setRouteHistory(currentLocation);
  }, []);

  return (
    <div>
      <h2>Navigation History</h2>
      <ol>
        {routeHistory.map((location, index) => (
          <li key={index}>{location}</li>
        ))}
      </ol>
    </div>
  );
};

export default NavigationHistory;
在这个例子中，NavigationHistory 组件负责监听和记录用户的导航动作。每当组件挂载或重新渲染时，它都会捕获当前的路由位置，并使用 setRouteHistory 函数将其添加到历史记录中。随后，组件会展示出完整的导航历史列表，使用户能够清晰地看到他们的浏览轨迹。这种机制不仅增强了用户体验，还为开发人员提供了宝贵的用户行为洞察。
 */