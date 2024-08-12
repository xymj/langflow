import { create } from "zustand";
import { LocationStoreType } from "../types/zustand/location";

export const useLocationStore = create<LocationStoreType>((set, get) => ({
  routeHistory: [],
  setRouteHistory: (location) => {
    /**
     * 这行代码的作用是从当前状态管理器（store）中获取 routeHistory 属性的值。这里使用了 zustand 库提供的 get 函数，它允许我们在不引起组件重渲染的情况下访问 store 当前的状态。
      在这行代码中：
      get() 是由 zustand 创建的 store 提供的一个函数，用于获取 store 的当前状态。
      get().routeHistory 则是访问 store 状态中的 routeHistory 属性，该属性通常是一个数组，用于存储用户访问过的路由路径。
      通过这种方式，我们可以安全地读取 routeHistory 的当前值而不会影响到 store 的状态或者触发不必要的组件更新。接着，我们可以对 routeHistoryArray 进行各种操作，比如添加新条目、删除旧条目等，然后再使用 set 函数将修改后的数组写回到 store 中。

      例如，在 setRouteHistory 方法中，我们可能会这样做：

      TypeScript
      setRouteHistory: (location) => {
        let routeHistoryArray = get().routeHistory;
        routeHistoryArray.push(location); // 向历史记录中添加新位置
        
        if (routeHistoryArray.length > 100) {
          routeHistoryArray.shift(); // 如果历史记录太长，移除第一个元素
        }
        
        set({ routeHistory: routeHistoryArray }); // 更新 store 中的 routeHistory
      },
      这样，我们就能够在不影响当前组件渲染流程的前提下，安全地读取和修改 store 中的数据。
     */
    let routeHistoryArray = get().routeHistory;
    routeHistoryArray.push(location);

    /**
     * 在表达式 routeHistoryArray?.length > 100 中的问号 (?) 是 JavaScript ES6 引入的一种特性的一部分 —— 可选链操作符（Optional Chaining）。这里的问号并不是条件运算符的一部分，而是用于安全访问对象属性或方法的一种方式。
      可选链操作符的工作原理
      可选链操作符 (?.) 允许你访问嵌套的对象属性而不必担心中间层级是否存在。如果没有可选链操作符，你需要显式检查每一层是否为 null 或 undefined 才能安全地访问更深层级的属性；否则程序会抛出错误。

      在本例中的作用
      在这个特定的例子中，

      如果 routeHistoryArray 不是 null 或者 undefined，
      它会继续尝试获取 .length 属性。
      如果 routeHistoryArray 是 null 或者 undefined，
      表达式的剩余部分不会被评估，并且整个表达式的结果会被视为 undefined 而不是抛出错误。
      因此，在 routeHistoryArray?.length > 100 表达式里，

      如果 routeHistoryArray 存在，则检查其长度是否大于 100；
      如果不存在，则表达式结果为 false （因为 undefined > 100 结果为假）而不是抛出异常。
      这种方法使得代码更加健壮且易于阅读，因为它隐式处理了潜在的空引用错误，同时保持了简洁性。这是现代JavaScript编码实践中一种常见的最佳做法，特别是在处理可能未完全初始化的对象层次结构时。
     */
    if (routeHistoryArray?.length > 100) {
      routeHistoryArray.shift();
      set({
        routeHistory: routeHistoryArray,
      });
    }

    set({
      routeHistory: routeHistoryArray,
    });
  },
}));


/**
 * 这段 TypeScript 代码定义了一个使用 zustand 库创建的状态管理 store，用于存储和操作位置信息的历史记录。下面是代码的具体工作原理：

导入库与类型：首先从 zustand 导入了 create 函数，并且从本地文件系统中引入了自定义类型 LocationStoreType。

创建 Store：通过调用 create 函数并传入一个函数作为参数来创建一个新的状态管理 store。这个函数接收两个参数：

set：这是一个函数，可以用来更新 store 的状态。
get：这也是一个函数，可以获取当前 store 的状态。
初始化 State：在传给 create 的函数内部，我们定义了初始状态对象，它包含以下属性：

routeHistory：一个空数组，用于保存历史位置信息。
设置方法：还定义了一个名为 setRouteHistory 的方法，该方法接受一个 location 参数。当调用此方法时，会执行以下逻辑：

首先，通过调用 get() 获取当前的 routeHistory 数组。
然后将新的 location 添加到数组末尾。
接下来检查数组长度是否超过 100，如果超过，则移除数组的第一个元素（即最旧的位置），以保持数组大小不超过限制。
最后，使用 set 函数更新整个 routeHistory 属性为处理后的数组。
导出 Store：最后，将创建的 store 作为一个常量 useLocationStore 导出，以便其他组件或模块可以在需要时使用它。

需要注意的是，在 setRouteHistory 方法中有两次调用了 set 函数，这可能是冗余的，因为第二次调用 set 前已经进行了相同的赋值操作。通常情况下，只需要在对状态进行修改之后调用一次 set 即可。不过，由于 zustand 的实现细节，多次调用 set 并不会导致实际问题，只是可能不是最优实践。
 */
