/**
 * 这段代码的作用是从 reactflow 库中导入两个类型定义：ReactFlowJsonObject 和 XYPosition。这两个类型主要用于描述流程中的节点、边以及其他与位置相关的数据结构。

类型解释
ReactFlowJsonObject
ReactFlowJsonObject 是一个通用的 JSON 对象类型，通常用来描述流程中的节点和边的数据结构。它可以包含任意键值对，并且常用于传递复杂的数据结构给 reactflow 组件。

XYPosition
XYPosition 类型用于描述二维空间中的位置坐标，通常用来表示节点的位置或者连接线的位置等。

示例代码
下面是一个详细的示例，展示如何使用这两种类型来创建流程实例，并在实际应用中使用它们。

定义类型
首先定义两种类型：

TypeScript
// 假设这是从 reactflow 中导出的实际类型定义
type ReactFlowJsonObject = Record<string, any>;
type XYPosition = { x: number; y: number };
创建流程实例
接下来创建一个符合 FlowType 规定的流程实例，并进行类型检查：

TypeScript
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

type FlowStyleType = {
    backgroundColor?: string;
    borderRadius?: number;
    padding?: number;
};

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
            console.log(` - ID: ${node.id}, Type: ${node.type}, Position: (${node.position.x}, ${node.position.y})`);
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

ReactFlowJsonObject：一个通用的 JSON 对象类型，用于描述流程中的节点和边的数据结构。
XYPosition：用于描述二维空间中的位置坐标。
创建实例：

根据 FlowType 创建一个具体的流程实例，并填充各种属性。
特别注意 data 字段包含节点 (nodes) 和边 (edges) 的详细信息，并且每个节点都有位置坐标。
显示详情：

定义一个函数来展示流程的详细信息，并进行适当的条件判断以处理可选项。
通过这种方式，你可以更好地理解和管理流程数据，并确保代码的一致性和健壮性。
 */
import { ReactFlowJsonObject, XYPosition } from "reactflow";



import { BuildStatus } from "../../constants/enums";
import { APIClassType } from "../api/index";

/**
 * 这段代码定义了一个 TypeScript 类型 FlowType，用于描述流程（flow）的各种属性和字段。这个类型定义了流程的基本结构和可选属性，使得在后续的开发过程中可以更方便地使用这些类型来进行类型检查和文档说明。

# # 类型定义解释
下面是 FlowType 类型的具体解释：

TypeScript
export type FlowType = {
  name: string;                  // 流程的名字（必填）
  id: string;                    // 流程的唯一标识符（必填）
  data: ReactFlowJsonObject | null; // 流程的数据对象（可为空）
  description: string;           // 流程的描述（必填）
  
  endpoint_name?: string;        // 可选：端点名称
  style?: FlowStyleType;         // 可选：样式类型
  
  is_component?: boolean;        // 可选：是否为组件，默认为 false
  last_tested_version?: string;  // 可选：最后测试的版本
  
  updated_at?: string;           // 可选：最近更新时间戳
  date_created?: string;         // 可选：创建时间戳
  
  parent?: string;               // 可选：父级流程的 ID
  folder?: string;               // 可选：所属文件夹的名称
  
  user_id?: string;              // 可选：用户 ID
  
  icon?: string;                 // 可选：图标路径或 URL
  icon_bg_color?: string;        // 可选：图标背景颜色
  
  folder_id?: string;            // 可选：所属文件夹的 ID
  
  webhook?: boolean;             // 可选：是否启用 Webhook，默认为 false
};
# # 示例使用
下面是一个具体的示例，展示了如何使用这个类型来定义一个流程实例，并进行类型检查。

# # # 示例代码
假设我们已经有了 ReactFlowJsonObject 和 FlowStyleType 的定义，并且要在实际项目中使用这个类型定义来创建流程实例。

定义辅助类型
首先定义辅助类型 ReactFlowJsonObject 和 FlowStyleType：

TypeScript
type ReactFlowJsonObject = Record<string, any>; // JSON 对象类型
type FlowStyleType = {
    backgroundColor?: string;
    borderRadius?: number;
    padding?: number;
};
创建流程实例
接着创建一个符合 FlowType 规定的流程实例，并进行类型检查：

TypeScript
const sampleFlow: FlowType = {
    name: 'Sample Flow',
    id: 'sample-flow-id',
    data: {
        nodes: [{ id: 'node1', type: 'input', position: { x: 100, y: 100 } }],
        edges: [{ id: 'edge1', source: 'node1', target: 'node2' }]
    },
    description: '这是一个示例流程',
    
    endpoint_name: 'example-endpoint',
    style: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 16
    },
    
    is_component: true,
    last_tested_version: 'v1.0.0',
    
    updated_at: '2023-10-01T12:00:00Z',
    date_created: '2023-09-01T10:00:00Z',
    
    parent: 'parent-flow-id',
    folder: 'example-folder',
    
    user_id: 'user-123',
    
    icon: '/path/to/icon.png',
    icon_bg_color: '#ff0000',
    
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
# # 解释
定义类型：FlowType 定义了流程的所有属性和字段。
创建实例：根据 FlowType 创建一个具体的流程实例，并填充各种属性。
显示详情：定义一个函数来展示流程的详细信息，并进行适当的条件判断以处理可选项。
这种类型定义有助于确保代码的一致性和健壮性，同时提高了开发效率和代码质量。

------------------------------------------------------------
在 TypeScript 中，类型定义中的 ? 号表示该属性是可选的。具体来说，在 endpoint_name?: string; 这一行中，? 号的作用是使 endpoint_name 属性变为可选属性。

详细解释
可选属性：
在 TypeScript 中，如果你不希望某个属性必须出现在对象中，可以在属性名后面加上 ? 号。
如果没有 ? 号，那么该属性就是必需的，即所有符合此类型的对象都必须包含这个属性。
加上 ? 号后，该属性就变成了可选属性，意味着对象可以包含也可以不包含这个属性。
示例对比
必需属性
TypeScript
interface RequiredProps {
    name: string;
    age: number;
}

const obj1: RequiredProps = {
    name: 'Alice',
    age: 25
};

// 下面的对象缺少 `age` 属性，会导致编译错误
const obj2: RequiredProps = {
    name: 'Bob'
};
可选属性
TypeScript
interface OptionalProps {
    name: string;
    age?: number;
}

const obj3: OptionalProps = {
    name: 'Charlie',
    age: 30
};

// 下面的对象缺少 `age` 属性，但仍然合法
const obj4: OptionalProps = {
    name: 'Diana'
};
 */
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

export type NodeType = {
  id: string;
  type?: string;
  position: XYPosition;
  data: NodeDataType;
  selected?: boolean;
};

export type NodeDataType = {
  showNode?: boolean;
  type: string;
  node?: APIClassType;
  id: string;
  output_types?: string[];
  selected_output_type?: string;
  buildStatus?: BuildStatus;
};
// FlowStyleType is the type of the style object that is used to style the
// Flow card with an emoji and a color.
export type FlowStyleType = {
  emoji: string;
  color: string;
  flow_id: string;
};

export type TweaksType = Array<
  {
    [key: string]: {
      output_key?: string;
    };
  } & FlowStyleType
>;

// right side
export type sourceHandleType = {
  dataType: string;
  id: string;
  output_types: string[];
  conditionalPath?: string | null;
  name: string;
};
//left side
export type targetHandleType = {
  inputTypes?: string[];
  type: string;
  fieldName: string;
  id: string;
  proxy?: { field: string; id: string };
};
