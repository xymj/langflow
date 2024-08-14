/**
 * 这段代码的作用是从 lodash 库中导入 cloneDeep 函数。lodash 是一个流行的 JavaScript 实用库，提供了许多实用工具函数，用于简化常见的编程任务。

cloneDeep 函数主要用于创建一个对象或数组的深拷贝。这意味着它不仅复制顶层的属性，还会递归地复制所有嵌套的对象和数组，从而确保得到的新对象与原对象之间没有引用关系。

示例
以下是一个简单的示例，展示如何使用 cloneDeep：

JavaScript
// 导入 lodash 中的 cloneDeep 函数
import { cloneDeep } from 'lodash';

// 原始对象
const originalObject = {
    name: 'Aone Copilot',
    details: {
        version: 1.0,
        features: ['高效', '可靠']
    },
    tags: ['开发', '工具']
};

// 创建深拷贝
const clonedObject = cloneDeep(originalObject);

// 修改原始对象
originalObject.name = '新名称';
originalObject.details.version = 2.0;

// 打印结果
console.log('原始对象：', originalObject);
console.log('克隆对象：', clonedObject);
输出结果
运行上述代码将产生如下输出：

原始对象： { 
  name: '新名称', 
  details: { version: 2, features: [ '高效', '可靠' ] }, 
  tags: [ '开发', '工具' ] 
}
克隆对象： { 
  name: 'Aone Copilot', 
  details: { version: 1, features: [ '高效', '可靠' ] }, 
  tags: [ '开发', '工具' ] 
}
从输出可以看出，尽管对原始对象进行了修改，但克隆对象仍然保留了原来的值，这表明 cloneDeep 成功实现了深拷贝功能。

这样可以确保在操作复杂的数据结构时，不会意外地改变原始数据。这对于维护数据的一致性和安全性非常有用。
 */
import { cloneDeep } from "lodash";


/**
 * 这段代码的作用是从 p-debounce 库中导入 pDebounce 函数。p-debounce 是一个用于实现防抖（debounce）功能的小型库。防抖的主要目的是限制某个函数在短时间内被频繁调用，从而优化性能。

防抖的基本概念
防抖是指在一段时间内多次触发同一个函数时，仅在最后一次触发后经过一定的延时再执行该函数。如果在这段时间内又有新的触发，则重新计时。只有在最后一次触发后过了指定的时间间隔，函数才会被执行。

具体用途
假设我们有一个函数 handleEvent，需要在某些情况下限制其调用频率。例如，在用户快速连续点击按钮或频繁调整浏览器窗口大小的情况下，可以通过防抖来避免过多无意义的函数调用。

示例代码
下面是一个完整的示例，展示如何使用 p-debounce 来实现防抖功能：

步骤一：安装依赖
首先需要安装 p-debounce 包：

bash
npm install p-debounce
步骤二：引入并使用 p-debounce
接下来，我们将编写一些示例代码来演示如何使用 p-debounce：

JavaScript
import pDebounce from 'p-debounce';

// 定义一个函数 handleResize
function handleResize() {
    console.log('窗口尺寸发生变化');
}

// 使用 p-debounce 对 handleResize 进行防抖处理
const debouncedHandleResize = pDebounce(handleResize, 300); // 设置延迟时间为 300 毫秒

// 监听窗口 resize 事件
window.addEventListener('resize', debouncedHandleResize);

// 清理事件监听器
window.addEventListener('unload', () => {
    window.removeEventListener('resize', debouncedHandleResize);
});
解释
定义函数：handleResize 是一个简单的函数，打印出“窗口尺寸发生变化”。
防抖处理：通过 pDebounce(handleResize, 300) 将 handleResize 转换为防抖版本，设置延迟时间为 300 毫秒。
添加事件监听器：将防抖后的函数绑定到窗口的 resize 事件上。
清理事件监听器：在页面卸载时移除事件监听器，避免内存泄漏。
这样可以有效减少不必要的函数调用次数，提高程序的性能和响应速度。

希望这些信息能够帮助您理解 p-debounce 的作用及其使用方法。如果有更多问题或需要进一步的帮助，请随时告知
 */
import pDebounce from "p-debounce";


/**
 * 这段代码的作用是从 reactflow 库中导入几个核心类型的定义，以便在您的 React 应用中使用 reactflow 图形界面组件。reactflow 是一个用于创建图形编辑器的库，支持节点和边的拖拽、布局等功能。

以下是每个导入项的具体含义：

Edge: 表示图中的边（连接节点之间的连线）。
Node: 表示图中的节点（图中的各个元素）。
Viewport: 表示视口（可视区域）的相关配置。
XYPosition: 表示二维坐标位置。
示例代码
下面是一个简单的示例，展示如何使用这些类型定义来构建一个基本的 reactflow 应用。

安装依赖
首先需要安装 reactflow 包：

bash
npm install reactflow
示例代码
JavaScriptReact
import React, { useState } from 'react';
import { ReactFlow, addEdge, ConnectionLineType, MiniMap, Controls } from 'reactflow';
import { Edge, Node, Viewport, XYPosition } from 'reactflow';

// 定义初始节点和边的状态
const initialNodes = [
    { id: '1', type: 'input', data: { label: 'Input Node' }, position: { x: 250, y: 5 } },
    { id: '2', data: { label: 'Output Node' }, position: { x: 100, y: 200 } }
];

const initialEdges = [];

function App() {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    const onConnect = (params) => setEdges((els) => addEdge(params, els));

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <ReactFlow nodes={nodes} edges={edges} onConnect={onConnect}>
                // 添加迷你地图
                <MiniMap />
                // 添加控制按钮
                <Controls />

                // 自定义节点渲染
                <Node id="custom-node" position={{ x: 400, y: 300 }} data={{ label: 'Custom Node' }}>
                    <div>自定义节点</div>
                </Node>

                // 自定义边渲染
                <Edge id="custom-edge" source="1" target="2" type={ConnectionLineType.SmoothStep} />
            </ReactFlow>
        </div>
    );
}

export default App;
解释
定义初始状态：

initialNodes 和 initialEdges 分别表示初始的节点和边。
使用 useState 管理状态：

nodes 和 edges 分别存储当前的节点和边状态。
定义 onConnect 回调：

当用户连接节点时，更新边的状态。
渲染 ReactFlow 组件：

使用 ReactFlow 组件来渲染图形界面。
添加 MiniMap 和 Controls 组件增强用户体验。
自定义节点和边的渲染方式。
通过这种方式，您可以利用 reactflow 库轻松创建复杂的图形编辑器应用。
 */
import { Edge, Node, Viewport, XYPosition } from "reactflow";


import { create } from "zustand";
import { SAVE_DEBOUNCE_TIME } from "../constants/constants";


/**
 * 这段代码的作用是从一个名为 API 的控制器模块中导入多个与数据库操作相关的函数。这些函数用于处理与流程（flows）相关的 CRUD（创建、读取、更新、删除）操作。具体来说，这些函数包括：

saveFlowToDatabase: 保存一个新的流程到数据库。
readFlowsFromDatabase: 从数据库中读取流程列表。
updateFlowInDatabase: 更新数据库中的现有流程。
deleteFlowFromDatabase: 删除数据库中的单个流程。
multipleDeleteFlowsComponents: 删除数据库中的多个流程组件。
uploadFlowsToDatabase: 向数据库上传多个流程。
# # 示例代码
下面是一个简单的示例，展示如何使用这些函数来管理数据库中的流程。

# # # 步骤一：安装依赖
假设您已经安装了必要的数据库驱动和其他依赖包。

# # # 步骤二：定义控制器模块
首先，我们需要定义一个控制器模块 API.js，其中包含了上述函数的实现。

API.js
JavaScript
// 导入数据库模型或其他必要的库
const FlowModel = require('../models/FlowModel'); // 假设这是您的数据库模型

// 保存流程到数据库
async function saveFlowToDatabase(flowData) {
    try {
        const newFlow = await FlowModel.create(flowData);
        return newFlow;
    } catch (error) {
        throw error;
    }
}

// 从数据库读取流程列表
async function readFlowsFromDatabase() {
    try {
        const flows = await FlowModel.find();
        return flows;
    } catch (error) {
        throw error;
    }
}

// 更新数据库中的流程
async function updateFlowInDatabase(flowId, updatedData) {
    try {
        const updatedFlow = await FlowModel.findByIdAndUpdate(flowId, updatedData, { new: true });
        return updatedFlow;
    } catch (error) {
        throw error;
    }
}

// 删除数据库中的单个流程
async function deleteFlowFromDatabase(flowId) {
    try {
        const deletedFlow = await FlowModel.findByIdAndDelete(flowId);
        return deletedFlow;
    } catch (error) {
        throw error;
    }
}

// 删除数据库中的多个流程组件
async function multipleDeleteFlowsComponents(flowIds) {
    try {
        const deletedFlows = await FlowModel.deleteMany({ _id: { $in: flowIds } });
        return deletedFlows;
    } catch (error) {
        throw error;
    }
}

// 向数据库上传多个流程
async function uploadFlowsToDatabase(flowsData) {
    try {
        const uploadedFlows = await FlowModel.insertMany(flowsData);
        return uploadedFlows;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    saveFlowToDatabase,
    readFlowsFromDatabase,
    updateFlowInDatabase,
    deleteFlowFromDatabase,
    multipleDeleteFlowsComponents,
    uploadFlowsToDatabase
};
# # # 步骤三：使用这些函数
现在可以在其他文件中导入这些函数，并使用它们来处理数据库操作。

示例文件
JavaScript
import {
    saveFlowToDatabase,
    readFlowsFromDatabase,
    updateFlowInDatabase,
    deleteFlowFromDatabase,
    multipleDeleteFlowsComponents,
    uploadFlowsToDatabase
} from '../controllers/API';

// 示例：保存流程到数据库
const flowData = {
    name: 'Example Flow',
    description: 'This is an example flow.',
    components: []
};

saveFlowToDatabase(flowData)
    .then((newFlow) => {
        console.log('New flow saved:', newFlow);
    })
    .catch((error) => {
        console.error('Error saving flow:', error);
    });

// 示例：从数据库读取流程列表
readFlowsFromDatabase()
    .then((flows) => {
        console.log('Flows read from database:', flows);
    })
    .catch((error) => {
        console.error('Error reading flows:', error);
    });

// 示例：更新数据库中的流程
const flowIdToUpdate = '64f7e9a8b7d5c40000000001'; // 假设这是流程 ID
const updatedData = {
    name: 'Updated Example Flow'
};

updateFlowInDatabase(flowIdToUpdate, updatedData)
    .then((updatedFlow) => {
        console.log('Flow updated:', updatedFlow);
    })
    .catch((error) => {
        console.error('Error updating flow:', error);
    });

// 示例：删除数据库中的单个流程
const flowIdToDelete = '64f7e9a8b7d5c40000000002'; // 假设这是流程 ID

deleteFlowFromDatabase(flowIdToDelete)
    .then((deletedFlow) => {
        console.log('Flow deleted:', deletedFlow);
    })
    .catch((error) => {
        console.error('Error deleting flow:', error);
    });

// 示例：删除数据库中的多个流程组件
const flowIdsToDelete = ['64f7e9a8b7d5c40000000003', '64f7e9a8b7d5c40000000004'];

multipleDeleteFlowsComponents(flowIdsToDelete)
    .then((deletedFlows) => {
        console.log('Multiple flows deleted:', deletedFlows);
    })
    .catch((error) => {
        console.error('Error deleting multiple flows:', error);
    });

// 示例：向数据库上传多个流程
const flowsData = [
    {
        name: 'Flow 1',
        description: 'Description for Flow 1',
        components: []
    },
    {
        name: 'Flow 2',
        description: 'Description for Flow 2',
        components: []
    }
];

uploadFlowsToDatabase(flowsData)
    .then((uploadedFlows) => {
        console.log('Flows uploaded:', uploadedFlows);
    })
    .catch((error) => {
        console.error('Error uploading flows:', error);
    });
# # 解释
导入函数：从 API.js 控制器模块中导入所需的函数。
使用函数：分别调用不同的函数来完成相应的数据库操作。
这些函数可以帮助您方便地管理和操作数据库中的流程数据。
 */
import {
  deleteFlowFromDatabase,
  multipleDeleteFlowsComponents,
  readFlowsFromDatabase,
  saveFlowToDatabase,
  updateFlowInDatabase,
  uploadFlowsToDatabase,
} from "../controllers/API";

/**
 * 这段代码的作用是从 ../types/flow 模块中导入两个类型定义：FlowType 和 NodeDataType。这通常是在 TypeScript 项目中常见的做法，用于引入自定义的类型定义以便在当前模块中使用。

# # 类型解释
FlowType
FlowType 是一种描述流程（flow）的数据结构类型，通常包含流程的基本信息和元数据。

NodeDataType
NodeDataType 是一种描述节点（node）的数据结构类型，通常包含节点的相关数据及其属性。

# # 示例代码
下面是一个详细的示例，展示如何使用这两种类型来创建流程实例，并在实际应用中使用它们。

定义类型
首先，在 ../types/flow.ts 文件中定义这两个类型：

TypeScript
// ../types/flow.ts

export type FlowType = {
    name: string;
    id: string;
    data: ReactFlowJsonObject | null;
    description: string;
    
    endpoint_name?: string;
    style?: FlowStyleType;
    is_component?: boolean;
    last_tested_version?: string;
    updated_at?: string;
    date_created?: string;
    parent?: string;
    folder?: string;
    user_id?: string;
    icon?: string;
    icon_bg_color?: string;
    folder_id?: string;
    webhook?: boolean;
};

type ReactFlowJsonObject = Record<string, any>;

type FlowStyleType = {
    backgroundColor?: string;
    borderRadius?: number;
    padding?: number;
};

export type NodeDataType = {
    id: string;
    type: string;
    position: XYPosition;
    data: Record<string, any>;
};

type XYPosition = { x: number; y: number };
创建流程实例
接下来，在当前文件中导入这两个类型，并创建一个符合 FlowType 规定的流程实例：

TypeScript
import { FlowType, NodeDataType } from "../types/flow";

const sampleFlow: FlowType = {
    name: 'Sample Flow',
    id: 'sample-flow-id',
    data: {
        nodes: [
            {
                id: 'node1',
                type: 'input',
                position: { x: 100, y: 100 },
                data: { label: 'Input Node' }
            },
            {
                id: 'node2',
                type: 'output',
                position: { x: 300, y: 200 },
                data: { label: 'Output Node' }
            }
        ],
        edges: [
            {
                id: 'edge1',
                source: 'node1',
                target: 'node2',
                type: 'smoothstep'
            }
        ]
    },
    description: '这是一个示例流程',
    
    endpoint_name: 'example-endpoint',
    style: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 16
    },
    
    is_component: true,
    
    updated_at: '2023-10-01T12:00:00Z',
    
    user_id: 'user-123',
    
    icon: '/path/to/icon.png',
    
    folder_id: 'folder-456',
    
    webhook: true
};
使用流程实例
接下来展示如何在实际应用中使用这个流程实例：

TypeScript
function displayFlowDetails(flow: FlowType) {
    console.log(`Name: ${flow.name}`);
    console.log(`ID: ${flow.id}`);
    console.log(`Description: ${flow.description}`);

    if (flow.data && flow.data.nodes && Array.isArray(flow.data.nodes)) {
        console.log('Nodes:');
        flow.data.nodes.forEach(node => {
            console.log(` - ID: ${node.id}, Type: ${node.type}, Position: (${node.position.x}, ${node.position.y}), Data: ${JSON.stringify(node.data)}`);
        });

        if (Array.isArray(flow.data.edges)) {
            console.log('Edges:');
            flow.data.edges.forEach(edge => {
                console.log(` - ID: ${edge.id}, Source: ${edge.source}, Target: ${edge.target}, Type: ${edge.type}`);
            });
        }
    }

    if (flow.endpoint_name) {
        console.log(`Endpoint Name: ${flow.endpoint_name}`);
    }

    if (flow.style) {
        console.log(`Background Color: ${flow.style.backgroundColor}`);
        console.log(`Border Radius: ${flow.style.borderRadius}px`);
    }

    if (flow.is_component !== undefined) {
        console.log(`Is Component: ${flow.is_component ? 'Yes' : 'No'}`);
    }

    if (flow.last_tested_version) {
        console.log(`Last Tested Version: ${flow.last_tested_version}`);
    }

    if (flow.updated_at) {
        console.log(`Updated At: ${flow.updated_at}`);
    }

    if (flow.date_created) {
        console.log(`Date Created: ${flow.date_created}`);
    }

    if (flow.parent) {
        console.log(`Parent ID: ${flow.parent}`);
    }

    if (flow.folder) {
        console.log(`Folder Name: ${flow.folder}`);
    }

    if (flow.user_id) {
        console.log(`User ID: ${flow.user_id}`);
    }

    if (flow.icon) {
        console.log(`Icon Path: ${flow.icon}`);
    }

    if (flow.icon_bg_color) {
        console.log(`Icon Background Color: ${flow.icon_bg_color}`);
    }

    if (flow.folder_id) {
        console.log(`Folder ID: ${flow.folder_id}`);
    }

    if (flow.webhook !== undefined) {
        console.log(`Webhook Enabled: ${flow.webhook ? 'Yes' : 'No'}`);
    }
}

displayFlowDetails(sampleFlow);
解释
定义类型：

FlowType 定义了一个流程的数据结构，包含基本的信息和元数据。
NodeDataType 定义了一个节点的数据结构，包含节点的 ID、类型、位置和数据。
创建实例：

根据 FlowType 创建一个具体的流程实例，并填充各种属性。
特别注意 data 字段包含节点 (nodes) 和边 (edges) 的详细信息，并且每个节点都有位置坐标和数据。
显示详情：

定义一个函数来展示流程的详细信息，并进行适当的条件判断以处理可选项。
输出各个属性的具体值，便于调试和查看。
通过这种方式，你可以更好地理解和管理流程数据，并确保代码的一致性和健壮性。
------------------------------------
在 TypeScript 中，Record<K, T> 是一个实用工具类型（utility type），用于创建一个新的对象类型，其中键由 K 类型指定，值由 T 类型指定。

Record<K, T> 的含义
K: 表示键的类型，通常是字符串键或其他枚举类型的联合。
T: 表示值的类型。
具体来说，Record<string, any> 表示的是一个对象类型，它的所有键都是字符串类型，而所有的值都可以是任意类型（即 any）。

示例解释
1. 基本定义
TypeScript
type ReactFlowJsonObject = Record<string, any>;
这里定义了一个名为 ReactFlowJsonObject 的类型，它表示的是一个对象，其中所有键都是字符串类型，而所有的值都可以是任意类型。

具体例子
我们可以用具体的例子来看一下这个类型的用法：

创建实例
TypeScript
const exampleData: ReactFlowJsonObject = {
    key1: 'value1',
    key2: 42,
    key3: true,
    key4: { nestedKey: 'nestedValue' },
    key5: [1, 2, 3]
};

console.log(exampleData); // 输出：{ key1: 'value1', key2: 42, key3: true, key4: { nestedKey: 'nestedValue' }, key5: [1, 2, 3] }
在这个例子中，exampleData 是一个符合 ReactFlowJsonObject 类型的对象实例，其中包含多个不同的键值对，每个值都可以是任意类型。

更多细节
访问键值
由于 ReactFlowJsonObject 中的所有值都是 any 类型，因此你可以自由访问任何键值：

TypeScript
console.log(exampleData.key1); // 输出："value1"
console.log(exampleData.key2); // 输出：42
console.log(exampleData.key4.nestedKey); // 输出："nestedValue"
console.log(exampleData.key5[0]); // 输出：1
动态添加键值
由于 Record<string, any> 允许动态添加任意键值对，因此你可以随时添加新的键值对：

TypeScript
exampleData.newKey = 'newValue';
console.log(exampleData); // 输出：{ key1: 'value1', key2: 42, key3: true, key4: { nestedKey: 'nestedValue' }, key5: [1, 2, 3], newKey: 'newValue' }
总结
用途：Record<string, any> 主要用于描述那些键不确定、值可以是任意类型的对象。
灵活性：这种类型提供了很高的灵活性，适用于需要动态扩展和修改的对象。
安全性：虽然使用 any 提供了极大的便利性，但在生产环境中应该尽量避免过度依赖 any 来提高类型安全性和代码质量。
通过这种方式，你可以更好地管理和理解这种泛型对象，并确保代码的一致性和健壮性。
 */
import { FlowType, NodeDataType } from "../types/flow";


/**
 * 这段代码的作用是从路径 "../types/zustand/flowsManager" 导入三种类型定义：FlowsManagerStoreType 和 UseUndoRedoOptions。这些类型通常用于描述状态管理器（state manager）的状态和操作选项。下面是详细的解释和示例代码。

类型解释
FlowsManagerStoreType
这是一种描述状态管理器（例如使用 Zustand 或其他状态库）的状态类型的类型。它通常包括状态的各种属性和方法。

UseUndoRedoOptions
这是一种描述撤销（undo）和重做（redo）功能的操作选项的类型。它通常包括与撤销和重做相关的配置项和参数。

示例代码
假设我们已经有了定义这些类型的文件 ../types/zustand/flowsManager.ts。我们将展示如何在当前文件中导入并使用这些类型。

定义类型文件
首先，在 ../types/zustand/flowsManager.ts 文件中定义这些类型：

TypeScript
// ../types/zustand/flowsManager.ts

export type FlowsManagerStoreType = {
    flows: Record<string, FlowType>;
    activeFlowId: string | null;
    addFlow: (flow: FlowType) => void;
    setActiveFlowId: (id: string) => void;
    removeFlow: (id: string) => void;
};

export type UseUndoRedoOptions = {
    maxHistorySize?: number;
    enableUndo?: boolean;
    enableRedo?: boolean;
};

export type FlowType = {
    name: string;
    id: string;
    data: ReactFlowJsonObject | null;
    description: string;

    endpoint_name?: string;
    style?: FlowStyleType;
    is_component?: boolean;
    last_tested_version?: string;
    updated_at?: string;
    date_created?: string;
    parent?: string;
    folder?: string;
    user_id?: string;
    icon?: string;
    icon_bg_color?: string;
    folder_id?: string;
    webhook?: boolean;
};

type ReactFlowJsonObject = Record<string, any>;

type FlowStyleType = {
    backgroundColor?: string;
    borderRadius?: number;
    padding?: number;
};
导入并使用类型
接下来，在当前文件中导入这些类型，并创建一个符合这些类型的示例实例：

导入类型
TypeScript
import { FlowsManagerStoreType, UseUndoRedoOptions } from "../types/zustand/flowsManager";
创建示例实例
TypeScript
const sampleFlowsManager: FlowsManagerStoreType = {
    flows: {
        flow1: {
            name: 'Sample Flow 1',
            id: 'flow1-id',
            data: {
                nodes: [
                    {
                        id: 'node1',
                        type: 'input',
                        position: { x: 100, y: 100 },
                        data: { label: 'Input Node' }
                    },
                    {
                        id: 'node2',
                        type: 'output',
                        position: { x: 300, y: 200 },
                        data: { label: 'Output Node' }
                    }
                ],
                edges: [
                    {
                        id: 'edge1',
                        source: 'node1',
                        target: 'node2',
                        type: 'smoothstep'
                    }
                ]
            },
            description: '这是一个示例流程',

            endpoint_name: 'example-endpoint',
            style: {
                backgroundColor: '#ffffff',
                borderRadius: 8,
                padding: 16
            },

            is_component: true,

            updated_at: '2023-10-01T12:00:00Z',

            user_id: 'user-123',

            icon: '/path/to/icon.png',

            folder_id: 'folder-456',

            webhook: true
        },
        flow2: {
            name: 'Sample Flow 2',
            id: 'flow2-id',
            data: null,
            description: '这是另一个示例流程'
        }
    },
    activeFlowId: 'flow1-id',
    addFlow: (flow) => {
        this.flows[flow.id] = flow;
    },
    setActiveFlowId: (id) => {
        this.activeFlowId = id;
    },
    removeFlow: (id) => {
        delete this.flows[id];
    }
};

const undoRedoOptions: UseUndoRedoOptions = {
    maxHistorySize: 50,
    enableUndo: true,
    enableRedo: true
};
使用实例
接下来展示如何在实际应用中使用这些类型：

TypeScript
function displayFlowsManagerDetails(manager: FlowsManagerStoreType) {
    console.log(`Active Flow ID: ${manager.activeFlowId}`);

    Object.keys(manager.flows).forEach((flowId) => {
        const flow = manager.flows[flowId];

        console.log(`Flow ID: ${flowId}`);
        console.log(` - Name: ${flow.name}`);
        console.log(` - ID: ${flow.id}`);
        console.log(` - Description: ${flow.description}`);

        if (flow.data && flow.data.nodes && Array.isArray(flow.data.nodes)) {
            console.log(` - Nodes:`);
            flow.data.nodes.forEach(node => {
                console.log(`   - ID: ${node.id}, Type: ${node.type}, Position: (${node.position.x}, ${node.position.y}), Data: ${JSON.stringify(node.data)}`);
            });

            if (Array.isArray(flow.data.edges)) {
                console.log(` - Edges:`);
                flow.data.edges.forEach(edge => {
                    console.log(`   - ID: ${edge.id}, Source: ${edge.source}, Target: ${edge.target}, Type: ${edge.type}`);
                });
            }
        }

        if (flow.endpoint_name) {
            console.log(` - Endpoint Name: ${flow.endpoint_name}`);
        }

        if (flow.style) {
            console.log(` - Background Color: ${flow.style.backgroundColor}`);
            console.log(` - Border Radius: ${flow.style.borderRadius}px`);
        }

        if (flow.is_component !== undefined) {
            console.log(` - Is Component: ${flow.is_component ? 'Yes' : 'No'}`);
        }

        if (flow.last_tested_version) {
            console.log(` - Last Tested Version: ${flow.last_tested_version}`);
        }

        if (flow.updated_at) {
            console.log(` - Updated At: ${flow.updated_at}`);
        }

        if (flow.date_created) {
            console.log(` - Date Created: ${flow.date_created}`);
        }

        if (flow.parent) {
            console.log(` - Parent ID: ${flow.parent}`);
        }

        if (flow.folder) {
            console.log(` - Folder Name: ${flow.folder}`);
        }

        if (flow.user_id) {
            console.log(` - User ID: ${flow.user_id}`);
        }

        if (flow.icon) {
            console.log(` - Icon Path: ${flow.icon}`);
        }

        if (flow.icon_bg_color) {
            console.log(` - Icon Background Color: ${flow.icon_bg_color}`);
        }

        if (flow.folder_id) {
            console.log(` - Folder ID: ${flow.folder_id}`);
        }

        if (flow.webhook !== undefined) {
            console.log(` - Webhook Enabled: ${flow.webhook ? 'Yes' : 'No'}`);
        }
    });
}

displayFlowsManagerDetails(sampleFlowsManager);

console.log(undoRedoOptions);
解释
定义类型：

FlowsManagerStoreType 描述了一个状态管理器的状态类型，包含流程列表、当前激活的流程 ID 以及增删改查的方法。
UseUndoRedoOptions 描述了撤销和重做的操作选项，包括历史记录的最大大小、是否启用撤销和重做等功能。
创建实例：

根据 FlowsManagerStoreType 创建一个具体的流程管理器实例，并填充各种属性和方法。
特别注意 flows 字段包含多个流程的详细信息，并且每个流程都有位置坐标和其他数据。
显示详情：

定义一个函数来展示流程管理器的详细信息，并进行适当的条件判断以处理可选项。
输出各个属性的具体值，便于调试和查看。
通过这种方式，你可以更好地理解和管理状态管理器的数据结构，
 */
import {
  FlowsManagerStoreType,
  UseUndoRedoOptions,
} from "../types/zustand/flowsManager";


/**
 * 这段代码从模块 "../utils/reactflowUtils" 中导入了多个实用工具函数，用于处理图形界面（React Flow）中的各种操作。下面是每个函数的详细解释及其应用场景。

函数详解
1. addVersionToDuplicates
此函数用于处理图形界面中的重复节点，并为每个重复的节点添加版本号。这有助于区分相同的节点实例，并防止命名冲突。

示例：

TypeScript
// 假设有一个包含重复节点的列表
const nodes = [
    { id: 'node1', type: 'input', version: undefined },
    { id: 'node1', type: 'input', version: undefined },
    { id: 'node2', type: 'output', version: undefined }
];

// 处理重复节点并添加版本号
addVersionToDuplicates(nodes);

console.log(nodes);
// 输出：
// [
//     { id: 'node1_v1', type: 'input', version: 'v1' },
//     { id: 'node1_v2', type: 'input', version: 'v2' },
//     { id: 'node2', type: 'output', version: undefined }
// ]
2. createFlowComponent
此函数用于创建新的图形界面组件。通常用于动态生成新的节点或边。

示例：

TypeScript
interface NodeData {
    label?: string;
}

// 创建新的节点组件
const newNode = createFlowComponent<NodeData>({
    id: 'newNode',
    type: 'customType',
    position: { x: 100, y: 200 },
    data: { label: '新节点' }
});

console.log(newNode);
// 输出：
// {
//     id: 'newNode',
//     type: 'customType',
//     position: { x: 100, y: 200 },
//     data: { label: '新节点' }
// }
3. createNewFlow
此函数用于创建一个新的图形界面流。通常用于初始化一个新的图形界面状态。

示例：

TypeScript
// 创建一个新的图形界面流
const newFlow = createNewFlow();

console.log(newFlow);
// 输出：
// {
//     nodes: [],
//     edges: []
// }
4. extractFieldsFromComponents
此函数用于从一组组件中提取特定字段。通常用于批量处理多个组件的共同属性。

示例：

TypeScript
// 提取所有节点的 `label` 字段
const components = [
    { id: 'node1', type: 'input', data: { label: '输入节点' } },
    { id: 'node2', type: 'output', data: { label: '输出节点' } },
    { id: 'node3', type: 'process', data: { label: '处理节点' } }
];

const labels = extractFieldsFromComponents(components, 'data.label');

console.log(labels);
// 输出：
// ['输入节点', '输出节点', '处理节点']
5. processDataFromFlow
此函数用于处理图形界面流中的数据。通常用于对整个流进行某种计算或处理。

示例：

TypeScript
// 处理整个流的数据
const flowData = {
    nodes: [
        { id: 'node1', type: 'input', data: { label: '输入节点' } },
        { id: 'node2', type: 'output', data: { label: '输出节点' } }
    ],
    edges: [
        { id: 'edge1', source: 'node1', target: 'node2', data: {} }
    ]
};

const processedData = processDataFromFlow(flowData);

console.log(processedData);
// 输出：
// {
//     inputNodes: [{ id: 'node1', type: 'input', data: { label: '输入节点' }}],
//     outputNodes: [{ id: 'node2', type: 'output', data: { label: '输出节点' }}],
//     connections: [{ id: 'edge1', source: 'node1', target: 'node2', data: {} }]
// }
6. processFlows
此函数用于处理多个图形界面流，并合并其结果。通常用于批量处理多个流的情况。

示例：

TypeScript
// 合并多个流的结果
const flows = [
    {
        nodes: [
            { id: 'nodeA', type: 'input', data: { label: '输入A' } }
        ],
        edges: []
    },
    {
        nodes: [
            { id: 'nodeB', type: 'output', data: { label: '输出B' } }
        ],
        edges: []
    }
];

const mergedFlows = processFlows(flows);

console.log(mergedFlows);
// 输出：
// {
//     nodes: [
//         { id: 'nodeA', type: 'input', data: { label: '输入A' }},
//         { id: 'nodeB', type: 'output', data: { label: '输出B' }}
//     ],
//     edges: []
// }
示例代码
下面是一个完整的示例代码，展示了如何使用这些函数来处理图形界面中的各种操作。

示例实现
TypeScript
import {
  addVersionToDuplicates,
  createFlowComponent,
  createNewFlow,
  extractFieldsFromComponents,
  processDataFromFlow,
  processFlows
} from "../utils/reactflowUtils";

// 示例数据
const initialNodes = [
  { id: 'node1', type: 'input', version: undefined },
  { id: 'node1', type: 'input', version: undefined },
  { id: 'node2', type: 'output', version: undefined }
];

// 处理重复节点并添加版本号
addVersionToDuplicates(initialNodes);

console.log("Processed Nodes:", initialNodes);

// 创建新的节点组件
const newNode = createFlowComponent<{ label?: string }>({
  id: 'newNode',
  type: 'customType',
  position: { x: 100, y: 200 },
  data: { label: '新节点' }
});

console.log("Created Node:", newNode);

// 创建一个新的图形界面流
const newFlow = createNewFlow();

console.log("New Flow:", newFlow);

// 提取所有节点的 `label` 字段
const components = [
  { id: 'nodeA', type: 'input', data: { label: '输入节点' } },
  { id: 'nodeB', type: 'output', data: { label: '输出节点' } },
  { id: 'nodeC', type: 'process', data: { label: '处理节点' } }
];

const labels = extractFieldsFromComponents(components, 'data.label');

console.log("Extracted Labels:", labels);

// 处理整个流的数据
const flowData = {
  nodes: [
    { id: 'node1', type: 'input', data: { label: '输入节点' } },
    { id: 'node2', type: 'output', data: { label: '输出节点' } }
  ],
  edges: [
    { id: 'edge1', source: 'node1', target: 'node2', data: {} }
  ]
};

const processedData = processDataFromFlow(flowData);

console.log("Processed Data:", processedData);

// 合并多个流的结果
const flows = [
  {
    nodes: [
      { id: 'nodeA', type: 'input', data: { label: '输入A' } }
    ],
    edges: []
  },
  {
    nodes: [
      { id: 'nodeB', type: 'output', data: { label: '输出B' } }
    ],
    edges: []
  }
];

const mergedFlows = processFlows(flows);

console.log("Merged Flows:", mergedFlows);
 */
import {
  addVersionToDuplicates,
  createFlowComponent,
  createNewFlow,
  extractFieldsFromComponenents,
  processDataFromFlow,
  processFlows,
} from "../utils/reactflowUtils";


import useAlertStore from "./alertStore";
import { useDarkStore } from "./darkStore";
import useFlowStore from "./flowStore";
import { useFolderStore } from "./foldersStore";
import { useTypesStore } from "./typesStore";

let saveTimeoutId: NodeJS.Timeout | null = null;

const defaultOptions: UseUndoRedoOptions = {
  maxHistorySize: 100,
  enableShortcuts: true,
};

const past = {};
const future = {};

const useFlowsManagerStore = create<FlowsManagerStoreType>((set, get) => ({
  examples: [],
  setExamples: (examples: FlowType[]) => {
    set({ examples });
  },
  currentFlowId: "",
  setCurrentFlow: (flow: FlowType) => {
    set((state) => ({
      currentFlow: flow,
      currentFlowId: flow.id,
    }));
  },
  getFlowById: (id: string) => {
    return get().flows.find((flow) => flow.id === id);
  },
  setCurrentFlowId: (currentFlowId: string) => {
    set((state) => ({
      currentFlowId,
      currentFlow: state.flows.find((flow) => flow.id === currentFlowId),
    }));
  },
  flows: [],
  allFlows: [],
  setAllFlows: (allFlows: FlowType[]) => {
    set({ allFlows });
  },
  setFlows: (flows: FlowType[]) => {
    set({
      flows,
      currentFlow: flows.find((flow) => flow.id === get().currentFlowId),
    });
  },
  currentFlow: undefined,
  saveLoading: false,
  isLoading: true,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  refreshFlows: () => {
    return new Promise<void>((resolve, reject) => {
      set({ isLoading: true });

      const starterFolderId = useFolderStore.getState().starterProjectId;

      readFlowsFromDatabase()
        .then((dbData) => {
          if (dbData) {
            const { data, flows } = processFlows(dbData);
            const examples = flows.filter(
              (flow) => flow.folder_id === starterFolderId,
            );
            get().setExamples(examples);

            const flowsWithoutStarterFolder = flows.filter(
              (flow) => flow.folder_id !== starterFolderId,
            );

            get().setFlows(flowsWithoutStarterFolder);
            useTypesStore.setState((state) => ({
              data: { ...state.data, ["saved_components"]: data },
              ComponentFields: extractFieldsFromComponenents({
                ...state.data,
                ["saved_components"]: data,
              }),
            }));
            set({ isLoading: false });
            resolve();
          }
        })
        .catch((e) => {
          set({ isLoading: false });
          useAlertStore.getState().setErrorData({
            title: "Could not load flows from database",
          });
          reject(e);
        });
    });
  },
  autoSaveCurrentFlow: (nodes: Node[], edges: Edge[], viewport: Viewport) => {
    if (get().currentFlow) {
      get().saveFlow(
        { ...get().currentFlow!, data: { nodes, edges, viewport } },
        true,
      );
    }
  },
  saveFlow: (flow: FlowType, silent?: boolean) => {
    set({ saveLoading: true }); // set saveLoading true immediately
    return get().saveFlowDebounce(flow, silent); // call the debounced function directly
  },
  saveFlowDebounce: pDebounce((flow: FlowType, silent?: boolean) => {
    set({ saveLoading: true });
    return new Promise<void>((resolve, reject) => {
      updateFlowInDatabase(flow)
        .then((updatedFlow) => {
          if (updatedFlow) {
            // updates flow in state
            if (!silent) {
              useAlertStore
                .getState()
                .setSuccessData({ title: "Changes saved successfully" });
            }
            get().setFlows(
              get().flows.map((flow) => {
                if (flow.id === updatedFlow.id) {
                  return updatedFlow;
                }
                return flow;
              }),
            );
            //update tabs state

            resolve();
            set({ saveLoading: false });
          }
        })
        .catch((err) => {
          useAlertStore.getState().setErrorData({
            title: "Error while saving changes",
            list: [(err as AxiosError).message],
          });
          reject(err);
        });
    });
  }, SAVE_DEBOUNCE_TIME),
  uploadFlows: () => {
    return new Promise<void>((resolve) => {
      const input = document.createElement("input");
      input.type = "file";
      // add a change event listener to the file input
      input.onchange = (event: Event) => {
        // check if the file type is application/json
        if (
          (event.target as HTMLInputElement).files![0].type ===
          "application/json"
        ) {
          // get the file from the file input
          const file = (event.target as HTMLInputElement).files![0];
          // read the file as text
          const formData = new FormData();
          formData.append("file", file);
          uploadFlowsToDatabase(formData).then(() => {
            get()
              .refreshFlows()
              .then(() => {
                resolve();
              });
          });
        }
      };
      // trigger the file input click event to open the file dialog
      input.click();
    });
  },
  addFlow: async (
    newProject: Boolean,
    flow?: FlowType,
    override?: boolean,
    position?: XYPosition,
    fromDragAndDrop?: boolean,
  ): Promise<string | undefined> => {
    let flowData = flow
      ? processDataFromFlow(flow)
      : { nodes: [], edges: [], viewport: { zoom: 1, x: 0, y: 0 } };
    if (newProject) {
      // Create a new flow with a default name if no flow is provided.
      const folder_id = useFolderStore.getState().folderUrl;
      const my_collection_id = useFolderStore.getState().myCollectionId;

      if (override) {
        get().deleteComponent(flow!.name);
        const newFlow = createNewFlow(
          flowData!,
          flow!,
          folder_id || my_collection_id!,
        );
        const { id } = await saveFlowToDatabase(newFlow);
        newFlow.id = id;
        //setTimeout  to prevent update state with wrong state
        setTimeout(() => {
          const { data, flows } = processFlows([newFlow, ...get().flows]);
          get().setFlows(flows);
          set({ isLoading: false });
          useTypesStore.setState((state) => ({
            data: { ...state.data, ["saved_components"]: data },
            ComponentFields: extractFieldsFromComponenents({
              ...state.data,
              ["saved_components"]: data,
            }),
          }));
        }, 200);
        // addFlowToLocalState(newFlow);
        return;
      }
      const newFlow = createNewFlow(
        flowData!,
        flow!,
        folder_id || my_collection_id!,
      );

      const newName = addVersionToDuplicates(newFlow, get().flows);

      newFlow.name = newName;
      newFlow.folder_id = useFolderStore.getState().folderUrl;

      try {
        const { id } = await saveFlowToDatabase(newFlow);
        // Change the id to the new id.
        newFlow.id = id;

        // Add the new flow to the list of flows.
        const { data, flows } = processFlows([newFlow, ...get().flows]);
        get().setFlows(flows);
        set({ isLoading: false });
        useTypesStore.setState((state) => ({
          data: { ...state.data, ["saved_components"]: data },
          ComponentFields: extractFieldsFromComponenents({
            ...state.data,
            ["saved_components"]: data,
          }),
        }));

        // Return the id
        return id;
      } catch (error: any) {
        if (error.response?.data?.detail) {
          useAlertStore.getState().setErrorData({
            title: "Could not load flows from database",
            list: [error.response?.data?.detail],
          });
        } else {
          useAlertStore.getState().setErrorData({
            title: "Could not load flows from database",
            list: [
              error.message ?? "An unexpected error occurred, please try again",
            ],
          });
        }
        throw error; // Re-throw the error so the caller can handle it if needed
      }
    } else {
      useFlowStore
        .getState()
        .paste(
          { nodes: flow!.data!.nodes, edges: flow!.data!.edges },
          position ?? { x: 10, y: 10 },
        );
    }
  },
  removeFlow: async (id: string | string[]) => {
    return new Promise<void>((resolve, reject) => {
      if (Array.isArray(id)) {
        multipleDeleteFlowsComponents(id)
          .then(() => {
            const { data, flows } = processFlows(
              get().flows.filter((flow) => !id.includes(flow.id)),
            );
            get().setFlows(flows);
            set({ isLoading: false });
            useTypesStore.setState((state) => ({
              data: { ...state.data, ["saved_components"]: data },
              ComponentFields: extractFieldsFromComponenents({
                ...state.data,
                ["saved_components"]: data,
              }),
            }));
            resolve();
          })
          .catch((e) => reject(e));
      } else {
        const index = get().flows.findIndex((flow) => flow.id === id);
        if (index >= 0) {
          deleteFlowFromDatabase(id)
            .then(() => {
              const { data, flows } = processFlows(
                get().flows.filter((flow) => flow.id !== id),
              );
              get().setFlows(flows);
              set({ isLoading: false });
              useTypesStore.setState((state) => ({
                data: { ...state.data, ["saved_components"]: data },
                ComponentFields: extractFieldsFromComponenents({
                  ...state.data,
                  ["saved_components"]: data,
                }),
              }));
              resolve();
            })
            .catch((e) => reject(e));
        }
      }
    });
  },
  deleteComponent: async (key: string) => {
    return new Promise<void>((resolve) => {
      let componentFlow = get().flows.find(
        (componentFlow) =>
          componentFlow.is_component && componentFlow.name === key,
      );

      if (componentFlow) {
        get()
          .removeFlow(componentFlow.id)
          .then(() => {
            resolve();
          });
      }
    });
  },
  uploadFlow: async ({
    newProject,
    file,
    isComponent,
    position = { x: 10, y: 10 },
  }: {
    newProject: boolean;
    file?: File;
    isComponent: boolean | null;
    position?: XYPosition;
  }): Promise<string | never> => {
    return new Promise(async (resolve, reject) => {
      let id;
      if (file) {
        let text = await file.text();
        let fileData = JSON.parse(text);
        if (
          newProject &&
          isComponent !== null &&
          ((!fileData.is_component && isComponent === true) ||
            (fileData.is_component !== undefined &&
              fileData.is_component !== isComponent))
        ) {
          reject("You cannot upload a component as a flow or vice versa");
        } else {
          if (fileData.flows) {
            fileData.flows.forEach((flow: FlowType) => {
              id = get().addFlow(newProject, flow, undefined, position);
            });
            resolve("");
          } else {
            id = await get().addFlow(
              newProject,
              fileData,
              undefined,
              position,
              true,
            );
            resolve(id);
          }
        }
      } else {
        // create a file input
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".json";
        // add a change event listener to the file input
        input.onchange = async (e: Event) => {
          if (
            (e.target as HTMLInputElement).files![0].type === "application/json"
          ) {
            const currentfile = (e.target as HTMLInputElement).files![0];
            let text = await currentfile.text();
            let fileData: FlowType = await JSON.parse(text);

            if (
              (!fileData.is_component && isComponent === true) ||
              (fileData.is_component !== undefined &&
                fileData.is_component !== isComponent)
            ) {
              reject("You cannot upload a component as a flow or vice versa");
            } else {
              id = await get().addFlow(newProject, fileData);
              resolve(id);
            }
          }
        };
        // trigger the file input click event to open the file dialog
        input.click();
      }
    });
  },
  saveComponent: (component: NodeDataType, override: boolean) => {
    component.node!.official = false;
    return get().addFlow(
      true,
      createFlowComponent(component, useDarkStore.getState().version),
      override,
    );
  },
  takeSnapshot: () => {
    const currentFlowId = get().currentFlowId;
    // push the current graph to the past state
    const flowStore = useFlowStore.getState();
    const newState = {
      nodes: cloneDeep(flowStore.nodes),
      edges: cloneDeep(flowStore.edges),
    };
    const pastLength = past[currentFlowId]?.length ?? 0;
    if (
      pastLength > 0 &&
      JSON.stringify(past[currentFlowId][pastLength - 1]) ===
        JSON.stringify(newState)
    )
      return;
    if (pastLength > 0) {
      past[currentFlowId] = past[currentFlowId].slice(
        pastLength - defaultOptions.maxHistorySize + 1,
        pastLength,
      );

      past[currentFlowId].push(newState);
    } else {
      past[currentFlowId] = [newState];
    }

    future[currentFlowId] = [];
  },
  undo: () => {
    const newState = useFlowStore.getState();
    const currentFlowId = get().currentFlowId;
    const pastLength = past[currentFlowId]?.length ?? 0;
    const pastState = past[currentFlowId]?.[pastLength - 1] ?? null;

    if (pastState) {
      past[currentFlowId] = past[currentFlowId].slice(0, pastLength - 1);

      if (!future[currentFlowId]) future[currentFlowId] = [];
      future[currentFlowId].push({
        nodes: newState.nodes,
        edges: newState.edges,
      });

      newState.setNodes(pastState.nodes);
      newState.setEdges(pastState.edges);
    }
  },
  redo: () => {
    const newState = useFlowStore.getState();
    const currentFlowId = get().currentFlowId;
    const futureLength = future[currentFlowId]?.length ?? 0;
    const futureState = future[currentFlowId]?.[futureLength - 1] ?? null;

    if (futureState) {
      future[currentFlowId] = future[currentFlowId].slice(0, futureLength - 1);

      if (!past[currentFlowId]) past[currentFlowId] = [];
      past[currentFlowId].push({
        nodes: newState.nodes,
        edges: newState.edges,
      });

      newState.setNodes(futureState.nodes);
      newState.setEdges(futureState.edges);
    }
  },
  searchFlowsComponents: "",
  setSearchFlowsComponents: (searchFlowsComponents: string) => {
    set({ searchFlowsComponents });
  },
  selectedFlowsComponentsCards: [],
  setSelectedFlowsComponentsCards: (selectedFlowsComponentsCards: string[]) => {
    set({ selectedFlowsComponentsCards });
  },
}));

export default useFlowsManagerStore;
