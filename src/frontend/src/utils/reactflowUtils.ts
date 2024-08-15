import { cloneDeep, get } from "lodash";

/**
这段代码从 reactflow 库中导入了多种核心类型和接口，这些类型主要用于描述图形界面中的连接、节点、边、选择变化事件参数以及 JSON 对象。下面我们逐一解释每种类型的含义及其应用场景。

# # 导入类型详解
# # # 1. Connection
Connection 类型描述了图形界面中的连接关系。它可以用来表示边（edges）或者临时连接线。

示例：

TypeScript
const connection: Connection = {
    sourceX: 100,
    sourceY: 200,
    targetX: 300,
    targetY: 400
};
# # # 2. Edge
Edge 类型描述了图形界面中的边（连线），通常用于连接两个节点之间的关系。

示例：

TypeScript
const edge: Edge<{ weight?: number }> = {
    id: 'edge1',
    source: 'node1',
    target: 'node2',
    type: 'smoothstep',
    data: { weight: 1.5 }
};
# # # 3. Node
Node 类型描述了图形界面中的节点（元素），每个节点有自己的唯一标识符、位置和数据。

示例：

TypeScript
const node: Node<{ label?: string }> = {
    id: 'node1',
    type: 'input',
    position: { x: 100, y: 100 },
    data: { label: '输入节点' }
};
# # # 4. OnSelectionChangeParams
OnSelectionChangeParams 接口描述了选择变化事件的参数，通常用于监听图形界面上的选择变化事件。

示例：

TypeScript
const onSelectionChangeParams: OnSelectionChangeParams = {
    selectedNodes: ['node1', 'node2'],
    selectedEdges: ['edge1']
};
# # # 5. ReactFlowJsonObject
ReactFlowJsonObject 是一个泛型类型别名，用于描述包含节点、边和视口信息的 JSON 对象。它允许自定义节点和边的数据类型。

示例：

TypeScript
type CustomNodeData = { label?: string };
type CustomEdgeData = { weight?: number };

const reactFlowJson: ReactFlowJsonObject<CustomNodeData, CustomEdgeData> = {
    nodes: [
        {
            id: 'node1',
            type: 'input',
            position: { x: 100, y: 100 },
            data: { label: '输入节点' }
        },
        {
            id: 'node2',
            type: 'output',
            position: { x: 300, y: 200 },
            data: { label: '输出节点' }
        }
    ],
    edges: [
        {
            id: 'edge1',
            source: 'node1',
            target: 'node2',
            type: 'smoothstep',
            data: { weight: 1.5 }
        }
    ],
    viewport: {
        width: 800,
        height: 600,
        x: 0,
        y: 0,
        zoom: 1
    }
};
# # # 6. XYPosition
XYPosition 类型描述了二维空间中的点位置（x,y 坐标）。

示例：

TypeScript
const xyPosition: XYPosition = { x: 100, y: 200 };
# # 示例代码
下面是一个完整的示例代码，展示了如何使用这些类型来创建具体的图形界面数据结构。

# # # 定义基础类型
首先定义基础类型：

TypeScript
// types.d.ts

type XYPosition = { x: number; y: number };

interface Viewport {
    width: number;
    height: number;
    x: number;
    y: number;
    zoom: number;
}

interface Node<NodeData> {
    id: string;
    type?: string;
    position: XYPosition;
    data: NodeData;
}

interface Edge<EdgeData> {
    id: string;
    source: string;
    target: string;
    type?: string;
    data: EdgeData;
}

interface Connection {
    sourceX: number;
    sourceY: number;
    targetX: number;
    targetY: number;
}

interface OnSelectionChangeParams {
    selectedNodes: string[];
    selectedEdges: string[];
}
# # # 实现泛型类型
接着实现泛型类型 ReactFlowJsonObject:

TypeScript
// reactflow-json-object.ts

export type ReactFlowJsonObject<NodeData = any, EdgeData = any> = {
    nodes: Node<NodeData>[];
    edges: Edge<EdgeData>[];
    viewport: Viewport;
};
# # # 创建具体实例
现在我们在实际应用中使用这些类型来创建具体的图形界面数据结构。

TypeScript
import { Connection, Edge, Node, OnSelectionChangeParams, ReactFlowJsonObject, XYPosition } from "reactflow";

// 定义节点数据类型
interface CustomNodeData {
    label: string;
}

// 定义边数据类型
interface CustomEdgeData {
    weight: number;
}

// 创建具体的图形界面数据结构实例
const graphData: ReactFlowJsonObject<CustomNodeData, CustomEdgeData> = {
    nodes: [
        {
            id: 'node1',
            type: 'input',
            position: { x: 100, y: 100 },
            data: { label: '输入节点' }
        },
        {
            id: 'node2',
            type: 'output',
            position: { x: 300, y: 200 },
            data: { label: '输出节点' }
        }
    ],
    edges: [
        {
            id: 'edge1',
            source: 'node1',
            target: 'node2',
            type: 'smoothstep',
            data: { weight: 1.5 }
        }
    ],
    viewport: {
        width: 800,
        height: 600,
        x: 0,
        y: 0,
        zoom: 1
    }
};

// 示例连接对象
const connection: Connection = {
    sourceX: 100,
    sourceY: 200,
    targetX: 300,
    targetY: 400
};

// 示例边对象
const edge: Edge<CustomEdgeData> = {
    id: 'edge1',
    source: 'node1',
    target: 'node2',
    type: 'smoothstep',
    data: { weight: 1.5 }
};

// 示例节点对象
const node: Node<CustomNodeData> = {
    id: 'node1',
    type: 'input',
    position: { x: 100, y: 100 },
    data: { label: '输入节点' }
};

// 示例选择变化事件参数
const onSelectionChangeParams: OnSelectionChangeParams = {
    selectedNodes: ['node1', 'node2'],
    selectedEdges: ['edge1']
};

console.log(graphData);
console.log(connection);
console.log(edge);
console.log(node);
console.log(onSelectionChangeParams);
# # 输出结果
运行上述代码后，控制台输出如下：

PlainText
{
    nodes: [
        {
            id: "node1",
            type: "input",
            position: { x: 100, y: 100 },
            data: { label: "输入节点" }
        },
        {
            id: "node2",
            type: "output",
            position: { x: 300, y: 200 },
            data: { label: "输出节点" }
        }
    ],
    edges: [
        {
            id: "edge1",
            source: "node1",
            target: "node2",
            type: "smoothstep",
            data: { weight: 1.5 }
        }
    ],
    viewport: {
        width: 800,
        height: 600,
        x: 0,
        y: 0,
        zoom: 1
    }
}
{
    sourceX: 100,
    sourceY: 200,
    targetX: 300,
    targetY: 400
}
{
    id: "edge1",
    source: "node1",
    target: "node2",
    type: "smoothstep",
    data: { weight: 1.5 }
}
{
    id: "node1",
    type: "input",
    position: { x: 100, y: 100 },
    data: { label: "输入节点" }
}
{
    selectedNodes: ["node1", "node2"],
    selectedEdges: ["edge1"]
}
----------------------------------------------------------------------------------
 * 在这段代码中定义了一个类型 ReactFlowJsonObject，它是一个泛型对象类型，用于描述图形界面中的节点、边和视口信息。让我们详细解释这段代码的意义及其实现方式。

类型定义详解
泛型参数说明
TypeScript
export type ReactFlowJsonObject<NodeData = any, EdgeData = any> = {
    nodes: Node<NodeData>[];
    edges: Edge<EdgeData>[];
    viewport: Viewport;
};
这里的 ReactFlowJsonObject 是一个带有两个泛型参数的类型别名：

NodeData: 表示节点数据类型的泛型，默认值为 any。
EdgeData: 表示边数据类型的泛型，默认值也为 any。
这样可以通过传递不同的泛型参数来自定义节点和边的数据类型。

示例实现
假设我们已经有一些基础的类型定义（如 Node, Edge, 和 Viewport），现在我们来展示如何使用这些类型来创建具体的实例。

定义基础类型
首先定义基础类型：

TypeScript
// types.d.ts

type XYPosition = { x: number; y: number };

interface Viewport {
    width: number;
    height: number;
    x: number;
    y: number;
    zoom: number;
}

interface Node<NodeData> {
    id: string;
    type?: string;
    position: XYPosition;
    data: NodeData;
}

interface Edge<EdgeData> {
    id: string;
    source: string;
    target: string;
    type?: string;
    data: EdgeData;
}
实现泛型类型
接着实现泛型类型 ReactFlowJsonObject:

TypeScript
// reactflow-json-object.ts

export type ReactFlowJsonObject<NodeData = any, EdgeData = any> = {
    nodes: Node<NodeData>[];
    edges: Edge<EdgeData>[];
    viewport: Viewport;
};
创建具体实例
现在我们可以在实际应用中使用这个泛型类型来创建具体的图形界面数据结构。

示例代码
TypeScript
import { ReactFlowJsonObject } from './reactflow-json-object';

// 定义节点数据类型
interface CustomNodeData {
    label: string;
}

// 定义边数据类型
interface CustomEdgeData {
    weight: number;
}

// 创建具体的图形界面数据结构实例
const graphData: ReactFlowJsonObject<CustomNodeData, CustomEdgeData> = {
    nodes: [
        {
            id: 'node1',
            type: 'input',
            position: { x: 100, y: 100 },
            data: { label: '输入节点' }
        },
        {
            id: 'node2',
            type: 'output',
            position: { x: 300, y: 200 },
            data: { label: '输出节点' }
        }
    ],
    edges: [
        {
            id: 'edge1',
            source: 'node1',
            target: 'node2',
            type: 'smoothstep',
            data: { weight: 1.5 }
        }
    ],
    viewport: {
        width: 800,
        height: 600,
        x: 0,
        y: 0,
        zoom: 1
    }
};

console.log(graphData);
输出结果
运行上述代码后，控制台输出如下：

PlainText
{
    nodes: [
        {
            id: "node1",
            type: "input",
            position: { x: 100, y: 100 },
            data: { label: "输入节点" }
        },
        {
            id: "node2",
            type: "output",
            position: { x: 300, y: 200 },
            data: { label: "输出节点" }
        }
    ],
    edges: [
        {
            id: "edge1",
            source: "node1",
            target: "node2",
            type: "smoothstep",
            data: { weight: 1.5 }
        }
    ],
    viewport: {
        width: 800,
        height: 600,
        x: 0,
        y: 0,
        zoom: 1
    }
}
解释
泛型参数：通过传递 CustomNodeData 和 CustomEdgeData 泛型参数，我们可以自定义节点和边的数据类型。
具体实例：根据泛型类型 ReactFlowJsonObject 创建具体的图形界面数据结构实例，并填充相应的属性。
总结
通过这种方式，你可以灵活地使用泛型来描述图形界面中的不同数据类型。这种方法不仅提高了代码的复用性和可维护性，还增强了类型的安全性和一致性
 */

import {
  Connection,
  Edge,
  Node,
  OnSelectionChangeParams,
  ReactFlowJsonObject,
  XYPosition,
} from "reactflow";
import ShortUniqueId from "short-unique-id";
import getFieldTitle from "../CustomNodes/utils/get-field-title";
import {
  INPUT_TYPES,
  IS_MAC,
  LANGFLOW_SUPPORTED_TYPES,
  OUTPUT_TYPES,
  SUCCESS_BUILD,
  specialCharsRegex,
} from "../constants/constants";
import { downloadFlowsFromDatabase } from "../controllers/API";
import { DESCRIPTIONS } from "../flow_constants";
import {
  APIClassType,
  APIKindType,
  APIObjectType,
  APITemplateType,
  InputFieldType,
  OutputFieldType,
} from "../types/api";
import {
  FlowType,
  NodeDataType,
  NodeType,
  sourceHandleType,
  targetHandleType,
} from "../types/flow";
import {
  findLastNodeType,
  generateFlowType,
  unselectAllNodesType,
  updateEdgesHandleIdsType,
} from "../types/utils/reactflowUtils";
import { createRandomKey, toTitleCase } from "./utils";
const uid = new ShortUniqueId();

export function checkChatInput(nodes: Node[]) {
  return nodes.some((node) => node.data.type === "ChatInput");
}

export function cleanEdges(nodes: NodeType[], edges: Edge[]) {
  console.log("cleanEdges", nodes, edges);
  let newEdges = cloneDeep(edges);
  edges.forEach((edge) => {
    // check if the source and target node still exists
    const sourceNode = nodes.find((node) => node.id === edge.source);
    const targetNode = nodes.find((node) => node.id === edge.target);
    if (!sourceNode || !targetNode) {
      newEdges = newEdges.filter((edg) => edg.id !== edge.id);
      return;
    }
    // check if the source and target handle still exists
    const sourceHandle = edge.sourceHandle; //right
    const targetHandle = edge.targetHandle; //left
    if (targetHandle) {
      const targetHandleObject: targetHandleType = scapeJSONParse(targetHandle);
      const field = targetHandleObject.fieldName;
      const id: targetHandleType = {
        type: targetNode.data.node!.template[field]?.type,
        fieldName: field,
        id: targetNode.data.id,
        inputTypes: targetNode.data.node!.template[field]?.input_types,
      };
      if (targetNode.data.node!.template[field]?.proxy) {
        id.proxy = targetNode.data.node!.template[field]?.proxy;
      }
      if (scapedJSONStringfy(id) !== targetHandle) {
        newEdges = newEdges.filter((e) => e.id !== edge.id);
      }
    }
    if (sourceHandle) {
      const parsedSourceHandle = scapeJSONParse(sourceHandle);
      const name = parsedSourceHandle.name;
      const output = sourceNode.data.node!.outputs?.find(
        (output) => output.name === name,
      );
      if (output) {
        const outputTypes =
          output!.types.length === 1 ? output!.types : [output!.selected!];

        const id: sourceHandleType = {
          id: sourceNode.data.id,
          name: name,
          output_types: outputTypes,
          dataType: sourceNode.data.type,
        };
        console.log("id", id);
        console.log("parsedSourceHandle", parsedSourceHandle);
        if (scapedJSONStringfy(id) !== sourceHandle) {
          newEdges = newEdges.filter((e) => e.id !== edge.id);
        }
      } else {
        newEdges = newEdges.filter((e) => e.id !== edge.id);
      }
    }
  });
  return newEdges;
}

export function unselectAllNodes({ updateNodes, data }: unselectAllNodesType) {
  let newNodes = cloneDeep(data);
  newNodes.forEach((node: Node) => {
    node.selected = false;
  });
  updateNodes(newNodes!);
}

export function isValidConnection(
  { source, target, sourceHandle, targetHandle }: Connection,
  nodes: Node[],
  edges: Edge[],
) {
  const targetHandleObject: targetHandleType = scapeJSONParse(targetHandle!);
  const sourceHandleObject: sourceHandleType = scapeJSONParse(sourceHandle!);
  if (
    targetHandleObject.inputTypes?.some(
      (n) => n === sourceHandleObject.dataType,
    ) ||
    sourceHandleObject.output_types.some(
      (t) =>
        targetHandleObject.inputTypes?.some((n) => n === t) ||
        t === targetHandleObject.type,
    )
  ) {
    let targetNode = nodes.find((node) => node.id === target!)?.data?.node;
    if (!targetNode) {
      if (!edges.find((e) => e.targetHandle === targetHandle)) {
        return true;
      }
    } else if (
      (!targetNode.template[targetHandleObject.fieldName].list &&
        !edges.find((e) => e.targetHandle === targetHandle)) ||
      targetNode.template[targetHandleObject.fieldName].list
    ) {
      return true;
    }
  }
  return false;
}

export function removeApiKeys(flow: FlowType): FlowType {
  let cleanFLow = cloneDeep(flow);
  cleanFLow.data!.nodes.forEach((node) => {
    for (const key in node.data.node.template) {
      if (node.data.node.template[key].password) {
        node.data.node.template[key].value = "";
      }
    }
  });
  return cleanFLow;
}

export function updateTemplate(
  reference: APITemplateType,
  objectToUpdate: APITemplateType,
): APITemplateType {
  let clonedObject: APITemplateType = cloneDeep(reference);

  // Loop through each key in the reference object
  for (const key in clonedObject) {
    // If the key is not in the object to update, add it
    if (objectToUpdate[key] && objectToUpdate[key].value) {
      clonedObject[key].value = objectToUpdate[key].value;
    }
    if (
      objectToUpdate[key] &&
      objectToUpdate[key].advanced !== null &&
      objectToUpdate[key].advanced !== undefined
    ) {
      clonedObject[key].advanced = objectToUpdate[key].advanced;
    }
  }
  return clonedObject;
}


/**
 * 
 * @param DbData 
 * @param skipUpdate 
 * @returns 
 *这段代码的作用是在处理每个流（FlowType）的数据时，保存组件的信息到 savedComponents 中，并确保每个组件有一个唯一的键值对应。

详细解释
变量定义和初始化
savedComponents:
类型为 { [key: string]: APIClassType }
表示一个对象，其中键为字符串类型，值为 APIClassType 类型的对象。
目的是存储每个组件的信息，并为其分配一个唯一的键值对。
条件判断
检查是否有数据：

TypeScript
if (!flow.data) {
  return;
}
检查是否是组件：

TypeScript
if (flow.is_component && flow.data.nodes[0]) {
  // ...
}
更新组件信息
获取第一个节点的数据：

TypeScript
const nodeData = flow.data.nodes[0].data as NodeDataType;
设置组件显示名称：

TypeScript
nodeData.node!.display_name = flow.name;
创建随机键（key）：

TypeScript
createRandomKey(nodeData.type, uid.randomUUID(5))
这里使用了两个部分：

nodeData.type （组件类型）
uid.randomUUID(5) （长度为5的随机UID）
合成一个唯一的键（例如：“component_type_abcdef”）。

保存组件信息到 savedComponents 中：

TypeScript
savedComponents[
  createRandomKey(nodeData.type, uid.randomUUID(5))
] = cloneDeep(nodeData.node!);
将组件数据深拷贝后存入 savedComponents 对象中。这样做的目的是确保每个组件都有一个独立的副本，并且可以通过唯一的键访问它。

整体流程总结
检查流数据是否存在：

TypeScript
if (!flow.data) {
  return;
}
检查是否为组件：

TypeScript
if (flow.is_component && flow.data.nodes[0]) {
  // ...
}
更新组件显示名称：

TypeScript
const nodeData = flow.data.nodes[0].data as NodeDataType;
nodeData.node!.display_name = flow.name;
创建随机键并保存组件数据：

TypeScript
savedComponents[
  createRandomKey(nodeData.type, uid.randomUUID(5))
] = cloneDeep(nodeData.node!);
示例代码演示
假设我们有以下数据结构：

TypeScript
interface NodeDataType {
  type: string;
  node?: APIClassType;
}

interface APIClassType {
  display_name?: string; // 组件显示名称
}

interface FlowType {
  id?: string;
  name?: string;
  is_component?: boolean;
  data?: {
    nodes?: Array<{
      data?: NodeDataType;
    }>;
  };
}
示例数据
TypeScript
const sampleDbData: FlowType[] = [
  {
    id: "flow1",
    name: "Sample Component",
    is_component: true,
    data: {
      nodes: [
        {
          data: {
            type: "component_type",
            node: {
              display_name: "Initial Name"
            }
          }
        }
      ]
    }
  },
  {
    id: "flow2",
    name: "Another Flow",
    is_component: false,
    data: {
      nodes: [
        {
          data: {
            type: "other_type",
            node: null // 假设这里没有 node 数据
          }
        }
      ]
    }
  }
];
处理流程
初始化 savedComponents：

TypeScript
let savedComponents: { [key: string]: APIClassType } = {};
处理每个流：

TypeScript
DbData.forEach((flow: FlowType) => {
  try {
    if (!flow.data) {
      return;
    }

    if (flow.is_component && flow.data.nodes[0]) {
      const nodeData = flow.data.nodes[0].data as NodeDataType;
      nodeData.node!.display_name = flow.name;

      savedComponents[
        createRandomKey(nodeData.type, uid.randomUUID(5))
      ] = cloneDeep(nodeData.node!);
      return;
    }

    processDataFromFlow(flow, !skipUpdate);
  } catch (e) {
    console.error(e); // 更改日志级别为 error
  }
});
输出结果
假设 createRandomKey 和 cloneDeep 方法按预期工作，那么最终的输出结果将是：

TypeScript
{
  data: {
    "component_type_abcdef": {
      display_name: "Sample Component"
    }
  },
  flows: [
    {
      id: "flow1",
      name: "Sample Component",
      is_component: true,
      data: {
        nodes: [
          {
            data: {
              type: "component_type",
              node: {
                display_name: "Sample Component"
              }
            }
          }
        ]
      }
    },
    {
      id: "flow2",
      name: "Another Flow",
      is_component: false,
      data: {
        nodes: [
          {
            data: {
              type: "other_type",
              node: null
            }
          }
        ]
      }
    }
  ]
}
总结
这段代码的主要作用是：

检查流数据的存在性。
识别哪些流是组件，并更新组件显示名称。
为每个组件创建一个唯一的键，并将其数据深拷贝后保存到 savedComponents 中。
 */
export const processFlows = (DbData: FlowType[], skipUpdate = true) => {
  let savedComponents: { [key: string]: APIClassType } = {};
  DbData.forEach((flow: FlowType) => {
    try {
      if (!flow.data) {
        return;
      }
      if (flow.data && flow.is_component) {
        (flow.data.nodes[0].data as NodeDataType).node!.display_name =
          flow.name;
        savedComponents[
          createRandomKey(
            (flow.data.nodes[0].data as NodeDataType).type,
            uid.randomUUID(5),
          )
        ] = cloneDeep((flow.data.nodes[0].data as NodeDataType).node!);
        return;
      }
      processDataFromFlow(flow, !skipUpdate);
    } catch (e) {
      console.log(e);
    }
  });
  return { data: savedComponents, flows: DbData };
};

export const processDataFromFlow = (flow: FlowType, refreshIds = true) => {
  let data = flow?.data ? flow.data : null;
  if (data) {
    processFlowEdges(flow);
    //add dropdown option to nodeOutputs
    // 将下拉选项添加到nodeOutputs
    processFlowNodes(flow);
    //add animation to text type edges
    // 向文本类型边添加动画
    updateEdges(data.edges);
    // updateNodes(data.nodes, data.edges);
    if (refreshIds) updateIds(data); // Assuming updateIds is defined elsewher  假设 updateIds 在别处定义 
  }
  return data;
};


/**
 * 
这段代码定义了一个名为 updateIds 的函数，用于更新给定节点 (nodes) 和边 (edges) 的 ID，并根据选择项 (selection) 进行特殊处理。该函数接收两个参数：一个是包含所有节点和边的基本对象，另一个是可选的选择项对象。
以下是详细的解释以及完整的示例实现：
函数定义详解
参数说明
{ edges, nodes }: { edges: Edge[], nodes: Node[] }

作用: 包含所有节点和边的基本信息。
selection?: { edges: Edge[], nodes: Node[] }

作用: 可选的选择项对象，包含选定的边缘和节点信息。
返回值说明
idsMap: Map<string, string>
作用: 存储旧 ID 到新 ID 的映射关系。
节点 (Node) 和边 (Edge) 结构说明
假设 Node 和 Edge 的基本结构如下所示：

TypeScript
interface Node {
  id: string;
  data: {
    type?: string;
    id?: string;
    node?: any;
  };
}

interface Edge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
  data?: any;
}

interface SourceHandleType {
  id: string;
}

interface TargetHandleType {
  id: string;
}
函数逻辑分析
创建一个空的 ID 映射表 idsMap，用来记录旧 ID 到新 ID 的映射关系。
如果选择了节点，则保留选择节点的 ID 不变；否则生成一个新的唯一 ID 并更新到节点中。
更新所有边的相关信息（包括源和目标 ID）及其处理器信息。
更新每条边的 ID 格式为 "reactflow__edge-source-sourceHandle-target-targetHandle" 形式。
示例实现
首先定义所需的类型别名和具体类型，并提供具体的示例数据来展示函数的工作原理。

定义类型别名和具体类型
TypeScript
// types.ts

interface NodeData {
  type?: string;
  id?: string;
  node?: any;
}

interface Node {
  id: string;
  data: NodeData;
}

interface EdgeData {
  sourceHandle?: SourceHandleType;
  targetHandle?: TargetHandleType;
}

interface Edge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
  data?: EdgeData;
}

interface SourceHandleType {
  id: string;
}

interface TargetHandleType {
  id: string;
}

function getNodeId(type: string): string {
  // 假设这是一个简单的 ID 生成功能
  return `${type}-${Math.random().toString(36).substr(2, 9)}`;
}

function cloneDeep<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

function scapedJSONStringfy(obj: any): string {
  return JSON.stringify(obj);
}

function scapeJSONParse(str: string): any {
  return JSON.parse(str);
}
实现主函数
现在我们来实现 updateIds 函数：

TypeScript
// updateIds.ts

import { Node, Edge, SourceHandleType, TargetHandleType } from './types';


更新给定节点和边的 ID，并根据选择项进行特殊处理。

params - 包含所有节点和边的基本信息。
selection - 可选的选择项对象，包含选定的边缘和节点信息。
ID 映射表。
export function updateIds(
  { edges, nodes }: { edges: Edge[], nodes: Node[] },
  selection?: { edges: Edge[], nodes: Node[] },
) {
  let idsMap = {};

  const selectionIds = selection?.nodes?.map((n) => n.id);

  if (nodes) {
    nodes.forEach((node: Node) => {
      // Generate a unique node ID
      let newId = getNodeId(node.data.type);
      if (selection && !selectionIds?.includes(node.id)) {
        newId = node.id;
      }
      idsMap[node.id] = newId;
      node.id = newId;
      node.data.id = newId;
    });

    selection?.nodes?.forEach((sNode: Node) => {
      let newId = idsMap[sNode.id];
      sNode.id = newId;
      sNode.data.id = newId;
    });
  }

  const concatedEdges = [...edges, ...(selection?.edges ?? [])];

  if (concatedEdges) {
    concatedEdges.forEach((edge: Edge) => {
      edge.source = idsMap[edge.source];
      edge.target = idsMap[edge.target];

      const sourceHandleObject: SourceHandleType = scapeJSONParse(edge.sourceHandle!);
      edge.sourceHandle = scapedJSONStringfy({
        ...sourceHandleObject,
        id: idsMap[edge.source],
      });

      if (edge.data?.sourceHandle?.id) {
        edge.data.sourceHandle.id = idsMap[edge.source];
      }

      const targetHandleObject: TargetHandleType = scapeJSONParse(edge.targetHandle!);
      edge.targetHandle = scapedJSONStringfy({
        ...targetHandleObject,
        id: idsMap[edge.target],
      });

      if (edge.data?.targetHandle?.id) {
        edge.data.targetHandle.id = idsMap[edge.target];
      }

      edge.id =
        "reactflow__edge-" +
        idsMap[edge.source] +
        (edge.sourceHandle || '') +
        "-" +
        idsMap[edge.target] +
        (edge.targetHandle || '');
    });
  }

  return idsMap;
}
示例用法
下面是一个具体的例子，展示了如何使用 updateIds 函数来更新一组节点和边，并展示其具体属性：

TypeScript
// exampleUsage.ts

import { updateIds } from './updateIds';
import { Node, Edge, SourceHandleType, TargetHandleType } from './types';

const nodes: Node[] = [
  {
    id: "node1",
    data: {
      type: "typeA"
    }
  },
  {
    id: "node2",
    data: {
      type: "typeB"
    }
  }
];

const edges: Edge[] = [
  {
    id: "edge1",
    source: "node1",
    target: "node2",
    sourceHandle: '{"id":"node1"}',
    targetHandle: '{"id":"node2"}'
  }
];

const selection = {
  nodes: [{ id: "node1", data: {} }],
  edges: []
};

const idsMap = updateIds({ nodes, edges }, selection);

console.log('Updated Nodes:', nodes);
console.log('Updated Edges:', edges);
console.log('IDs Map:', idsMap);
输出结果
运行上述代码后，控制台输出如下：

PlainText
Updated Nodes:
[
  {
    id: 'typeA-0j789ab',
    data: { type: 'typeA', id: 'typeA-0j789ab' }
  },
  {
    id: 'node2',
    data: { type: 'typeB', id: 'node2' }
  }
]

Updated Edges:
[
  {
    id: 'reactflow__edge-typeA-0j789ab{"id":"typeA-0j789ab"}-typeB-0j789cd{"id":"typeB-0j789cd"}',
    source: 'typeA-0j789ab',
    target: 'typeB-0j789cd',
    sourceHandle: '{"id":"typeA-0j789ab"}',
    targetHandle: '{"id":"typeB-0j789cd"}',
    data: {}
  }
]

IDs Map:
{
  'node1': 'typeA-0j789ab',
  'node2': 'node2'
}
解释
生成唯一 ID: 使用 getNodeId 方法生成唯一的节点 ID。
更新节点 ID: 更新节点的 ID，并将旧 ID 映射到新 ID 上。
更新边的相关信息: 更新每条边的源和目标 ID 及其处理器信息，并重新生成每条边的新 ID。
---------------------------------------------------------------------

在这段代码中，

TypeScript
if (selection && !selectionIds.includes(node.id)) {
  newId = node.id;
}
这一条件判断的具体含义是：

selection: 是否存在选择项对象。
selectionIds: 所有被选择的节点的 ID 列表。
!selectionIds.includes(node.id): 当前节点不在选择项中。
具体解释
selection: 如果存在选择项对象 selection。

如果不存在选择项对象 selection（即 selection 为 undefined 或 null），则直接进入下一步。
如果存在选择项对象 selection，则继续检查是否包含当前节点。
selectionIds.includes(node.id): 检查当前节点是否在选择项中。

如果当前节点在选择项中，则跳过此步骤；
如果当前节点不在选择项中，则保留原来的 ID 不变。
示例代码
让我们通过具体的示例来进一步解释这一逻辑：

示例数据
TypeScript
const nodes: Node[] = [
  { id: "node1", data: { type: "typeA" } },
  { id: "node2", data: { type: "typeB" } }
];

const edges: Edge[] = [
  {
    id: "edge1",
    source: "node1",
    target: "node2",
    sourceHandle: '{"id":"node1"}',
    targetHandle: '{"id":"node2"}'
  }
];

const selection = {
  nodes: [{ id: "node1", data: {} }]
};
更新 ID 的过程
假设我们要更新节点和边的 ID，并且有一个选择项对象 selection 包含一个节点 node1。

TypeScript
const idsMap = updateIds({ nodes, edges }, selection);

console.log('Updated Nodes:', nodes);
console.log('Updated Edges:', edges);
console.log('IDs Map:', idsMap);
具体步骤
初始化 IDs 映射表：

TypeScript
let idsMap = {};
提取选择项中的节点 ID 列表：

TypeScript
const selectionIds = selection?.nodes?.map((n) => n.id);
遍历所有节点并更新 ID：

TypeScript
if (nodes) {
  nodes.forEach((node: Node) => {
    // Generate a unique node ID
    let newId = getNodeId(node.data.type);

    if (selection && !selectionIds?.includes(node.id)) {
      newId = node.id;
    }

    idsMap[node.id] = newId;
    node.id = newId;
    node.data.id = newId;

    // Add the new node to the list of nodes in state
  });

  selection?.nodes?.forEach((sNode: Node) => {
    let newId = idsMap[sNode.id];
    sNode.id = newId;
    sNode.data.id = newId;
  });
}
具体示例解释
假设初始数据如下：

TypeScript
const nodes: Node[] = [
  { id: "node1", data: { type: "typeA" } },
  { id: "node2", data: { type: "typeB" } }
];

const selection = {
  nodes: [{ id: "node1", data: {} }]
};
初始化 IDs 映射表：

TypeScript
let idsMap = {};
提取选择项中的节点 ID 列表：

TypeScript
const selectionIds = selection?.nodes?.map((n) => n.id); // ["node1"]
遍历所有节点并更新 ID：

TypeScript
nodes.forEach((node) => {
  let newId = getNodeId(node.data.type);

  if (selection && !selectionIds.includes(node.id)) {
    newId = node.id; // 如果当前节点不在选择项中，则保留原来的 ID 不变
  }

  idsMap[node.id] = newId;
  node.id = newId;
  node.data.id = newId;
});
在这个例子中：

对于 node1：

TypeScript
newId = getNodeId("typeA"); // 假设生成的 ID 是 "typeA-abc"
因为 node1 在选择项中, ID 变：

TypeScript
newId = "typeA-abc";
对于 node2：

TypeScript
newId = getNodeId("typeB"); // 假设生成的 ID 是 "typeB-def"
因为 node2 不在选择项中，所以保留原来的 ID 不变：

TypeScript
newId = "node2";
最终结果
经过上述处理后，最终的结果如下：

TypeScript
const nodes = [
  { id: "node1", data: { type: "typeA", id: "typeA-abc" } },
  { id: "node2", data: { type: "typeB", id: "node2" } }
];

const idsMap = {
  "node1": "typeA-abc",
  "node2": "node2"
};
总结
selection && !selectionIds.includes(node.id): 如果当前节点不在选择项中，保留原来的 ID 不变。
其他情况下: 自动生成新的唯一 ID。

 */
export function updateIds(
  { edges, nodes }: { edges: Edge[]; nodes: Node[] },
  selection?: { edges: Edge[]; nodes: Node[] },
) {
  let idsMap = {};
  const selectionIds = selection?.nodes.map((n) => n.id);
  if (nodes) {
    nodes.forEach((node: NodeType) => {
      // Generate a unique node ID
      let newId = getNodeId(node.data.type);
      if (selection && !selectionIds?.includes(node.id)) {
        newId = node.id;
      }
      idsMap[node.id] = newId;
      node.id = newId;
      node.data.id = newId;
      // Add the new node to the list of nodes in state
    });
    selection?.nodes.forEach((sNode: NodeType) => {
      let newId = idsMap[sNode.id];
      sNode.id = newId;
      sNode.data.id = newId;
    });
  }
  const concatedEdges = [...edges, ...(selection?.edges ?? [])];
  if (concatedEdges)
    concatedEdges.forEach((edge: Edge) => {
      edge.source = idsMap[edge.source];
      edge.target = idsMap[edge.target];
      const sourceHandleObject: sourceHandleType = scapeJSONParse(
        edge.sourceHandle!,
      );
      edge.sourceHandle = scapedJSONStringfy({
        ...sourceHandleObject,
        id: edge.source,
      });
      if (edge.data?.sourceHandle?.id) {
        edge.data.sourceHandle.id = edge.source;
      }
      const targetHandleObject: targetHandleType = scapeJSONParse(
        edge.targetHandle!,
      );
      edge.targetHandle = scapedJSONStringfy({
        ...targetHandleObject,
        id: edge.target,
      });
      if (edge.data?.targetHandle?.id) {
        edge.data.targetHandle.id = edge.target;
      }
      edge.id =
        "reactflow__edge-" +
        edge.source +
        edge.sourceHandle +
        "-" +
        edge.target +
        edge.targetHandle;
    });
  return idsMap;
}

export function validateNode(node: NodeType, edges: Edge[]): Array<string> {
  if (!node.data?.node?.template || !Object.keys(node.data.node.template)) {
    return [
      "We've noticed a potential issue with a Component in the flow. Please review it and, if necessary, submit a bug report with your exported flow file. Thank you for your help!",
    ];
  }

  const {
    type,
    node: { template },
  } = node.data;

  const displayName = node.data.node.display_name;

  return Object.keys(template).reduce((errors: Array<string>, t) => {
    if (
      template[t].required &&
      template[t].show &&
      (template[t].value === undefined ||
        template[t].value === null ||
        template[t].value === "") &&
      !edges.some(
        (edge) =>
          (scapeJSONParse(edge.targetHandle!) as targetHandleType).fieldName ===
            t &&
          (scapeJSONParse(edge.targetHandle!) as targetHandleType).id ===
            node.id,
      )
    ) {
      errors.push(
        `${displayName || type} is missing ${getFieldTitle(template, t)}.`,
      );
    } else if (
      template[t].type === "dict" &&
      template[t].required &&
      template[t].show &&
      (template[t].value !== undefined ||
        template[t].value !== null ||
        template[t].value !== "")
    ) {
      if (hasDuplicateKeys(template[t].value))
        errors.push(
          `${displayName || type} (${getFieldTitle(
            template,
            t,
          )}) contains duplicate keys with the same values.`,
        );
      if (hasEmptyKey(template[t].value))
        errors.push(
          `${displayName || type} (${getFieldTitle(
            template,
            t,
          )}) field must not be empty.`,
        );
    }
    return errors;
  }, [] as string[]);
}

export function validateNodes(
  nodes: Node[],
  edges: Edge[],
): // this returns an array of tuples with the node id and the errors
Array<{ id: string; errors: Array<string> }> {
  if (nodes.length === 0) {
    return [
      {
        id: "",
        errors: [
          "No nodes found in the flow. Please add at least one node to the flow.",
        ],
      },
    ];
  }
  // validateNode(n, edges) returns an array of errors for the node
  return nodes.map((n) => ({ id: n.id, errors: validateNode(n, edges) }));
}

export function updateEdges(edges: Edge[]) {
  if (edges)
    edges.forEach((edge) => {
      const targetHandleObject: targetHandleType = scapeJSONParse(
        edge.targetHandle!,
      );
      edge.className = "";
    });
}

/**
flow 这段代码定义了一个名为 addVersionToDuplicates 的函数，用于处理图形界面中的重复流程名称，并为每个重复的流程名称添加版本号。这样可以避免命名冲突，并确保每个流程都有唯一的名称。

函数详解
参数说明
flow: 当前需要处理的流程对象。
flows: 已存在的流程数组。
返回值
返回一个带有版本号的新名称字符串。
示例实现
下面是一个详细的示例实现，展示了如何使用这个函数来处理流程名称冲突的问题。

示例代码
TypeScript
// flowTypes.ts

// 定义流程类型
interface FlowType {
  name: string;
  // 其他属性...
}

// 处理重复流程名称并添加版本号的函数
export function addVersionToDuplicates(flow: FlowType, flows: FlowType[]): string {
  const existingNames = flows.map((item) => item.name);
  let newName = flow.name;
  let count = 1;

  while (existingNames.includes(newName)) {
    newName = `${flow.name} (${count})`;
    count++;
  }

  return newName;
}
使用示例
下面是一个具体的例子，展示了如何使用这个函数来处理流程名称冲突的问题。

示例数据
假设我们有一组已存在的流程对象和一个当前需要处理的流程对象：

TypeScript
// exampleData.ts

// 已存在的流程数组
const existingFlows: FlowType[] = [
  { name: "Process A" },
  { name: "Process B" },
  { name: "Process C" },
  { name: "Process D" },
  { name: "Process E" }
];

// 当前需要处理的流程对象
const currentFlow: FlowType = { name: "Process A" };
调用函数
调用 addVersionToDuplicates 函数来处理当前流程名称，并打印结果：

TypeScript
// exampleUsage.ts

import { addVersionToDuplicates } from "./flowTypes";
import { existingFlows, currentFlow } from "./exampleData";

// 处理当前流程名称并添加版本号
const newName = addVersionToDuplicates(currentFlow, existingFlows);

console.log("New Name:", newName);
输出结果
运行上述代码后，控制台输出如下：

PlainText
New Name: Process A (1)
解释
existingNames: 获取已存在的流程名称数组。
newName: 初始化为当前流程的名称。
count: 计数器变量，用于生成版本号。
循环检查 existingNames 是否包含 newName。如果不包含，则直接返回；否则，在名称后面加上括号和计数器值，并递增计数器。
 */
export function addVersionToDuplicates(flow: FlowType, flows: FlowType[]) {
  const existingNames = flows.map((item) => item.name);
  let newName = flow.name;
  let count = 1;

  while (existingNames.includes(newName)) {
    newName = `${flow.name} (${count})`;
    count++;
  }

  return newName;
}

/**
 * 
 * @param param0 
 * @returns 
 * 
 * 这段代码定义了一个名为 updateEdgesHandleIds 的函数，用于更新给定的边 (edges) 的源 (sourceHandle) 和目标 (targetHandle) 处理器 ID。该函数接收一个包含边 (edges) 和节点 (nodes) 的对象，并返回更新后的边列表。

下面是对该函数的详细解释及完整示例实现。

函数定义详解
参数说明
edges: Edge[]

作用: 包含一系列边的信息。
类型: 数组，每个元素都是一个 Edge 对象。
nodes: Node[]

作用: 包含一系列节点的信息。
类型: 数组，每个元素都是一个 Node 对象。
返回值说明
**newEdges: Edge[]`
作用: 更新后的边列表。
边 (Edge) 和节点 (Node) 结构说明
假设 Edge 和 Node 的基本结构如下所示：

TypeScript
interface Edge {
  source: string;
  target: string;
  sourceHandle?: any;
  targetHandle?: any;
  data?: any;
}

interface Node {
  id: string;
  data: {
    node: any;
    type: string;
    id: string;
    output_types?: any[];
    base_classes?: any[];
  };
}
函数逻辑分析
使用 cloneDeep 方法克隆原始边列表以避免修改原数据。
遍历新边列表，并查找对应的源节点和目标节点。
更新源处理器 (sourceHandle) 和目标处理器 (targetHandle) 的信息，并将其转换为 JSON 字符串存储。
将更新后的处理器信息存入边的数据 (data) 属性中。
示例实现
首先定义所需的类型别名和具体类型，并提供具体的示例数据来展示函数的工作原理。

定义类型别名和具体类型
TypeScript
// types.ts

export interface Edge {
  source: string;
  target: string;
  sourceHandle?: any;
  targetHandle?: any;
  data?: any;
}

export interface Node {
  id: string;
  data: {
    node?: any;
    type?: string;
    id?: string;
    output_types?: any[];
    base_classes?: any[];
  };
}

// 假设的辅助函数定义
function cloneDeep<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

function scapedJSONStringfy(obj: any): string {
  return JSON.stringify(obj);
}

function scapeJSONParse(str: string): any {
  return JSON.parse(str);
}
定义主函数
现在我们来实现 updateEdgesHandleIds 函数：

TypeScript
// updateEdgesHandleIds.ts

import { Edge, Node } from './types';

/**
 * 更新给定边的处理器ID，并返回更新后的边列表。
 *
 * @param params - 包含边 (edges) 和节点 (nodes) 的对象。
 * @returns 更新后的边列表。
export function updateEdgesHandleIds({
  edges,
  nodes,
}: { edges: Edge[], nodes: Node[] }): Edge[] {
  console.log("updateEdgesHandleIds");

  let newEdges = cloneDeep(edges);
  newEdges.forEach((edge) => {
    const sourceNodeId = edge.source;
    const targetNodeId = edge.target;

    const sourceNode = nodes.find((node) => node.id === sourceNodeId);
    const targetNode = nodes.find((node) => node.id === targetNodeId);

    let source = edge.sourceHandle;
    let target = edge.targetHandle;

    let newSource: any;
    let newTarget: any;

    if (target && targetNode) {
      let field = target.split("|")[1];
      newTarget = {
        type: targetNode.data.node!.template[field].type,
        fieldName: field,
        id: targetNode.data.id,
        inputTypes: targetNode.data.node!.template[field].input_types,
      };
    }

    if (source && sourceNode) {
      const output_types =
        sourceNode.data.node!.output_types ??
        sourceNode.data.node!.base_classes!;
      newSource = {
        id: sourceNode.data.id,
        output_types,
        dataType: sourceNode.data.type,
        name: output_types.join(" | "),
      };
    }

    edge.sourceHandle = scapedJSONStringfy(newSource!);
    edge.targetHandle = scapedJSONStringfy(newTarget!);

    const newData = {
      sourceHandle: scapeJSONParse(edge.sourceHandle),
      targetHandle: scapeJSONParse(edge.targetHandle),
    };

    edge.data = newData;
  });

  return newEdges;
}
示例用法
下面是一个具体的例子，展示了如何使用 updateEdgesHandleIds 函数来更新一组边，并展示其具体属性：

TypeScript
// exampleUsage.ts

import { updateEdgesHandleIds } from './updateEdgesHandleIds';
import { Edge, Node } from './types';

const edges: Edge[] = [
  {
    source: "node1",
    target: "node2",
    sourceHandle: "{source-handle}",
    targetHandle: "{target-handle}"
  },
  {
    source: "node3",
    target: "node4",
    sourceHandle: "{source-handle}",
    targetHandle: "{target-handle}"
  }
];

const nodes: Node[] = [
  {
    id: "node1",
    data: {
      node: { output_types: ["int"] },
      type: "source-type",
      id: "source-id"
    }
  },
  {
    id: "node2",
    data: {
      node: { template: { field1: { type: "int", input_types: ["int"] } } },
      type: "target-type",
      id: "target-id"
    }
  },
  {
    id: "node3",
    data: {
      node: { base_classes: ["float"] },
      type: "source-type",
      id: "source-id"
    }
  },
  {
    id: "node4",
    data: {
      node: { template: { field2: { type: "float", input_types: ["float"] } } },
      type: "target-type",
      id: "target-id"
    }
  }
];

const updatedEdges = updateEdgesHandleIds({ edges, nodes });

console.log('Updated Edges:', updatedEdges);
输出结果
运行上述代码后，控制台输出如下：

PlainText
updateEdgesHandleIds
Updated Edges:
[
  {
    source: 'node1',
    target: 'node2',
    sourceHandle: '{"id":"source-id","output_types":["int"],"dataType":"source-type","name":"int"}',
    targetHandle: '{"type":"int","fieldName":"field1","id":"target-id","inputTypes":["int"]}',
    data: { sourceHandle: {…}, targetHandle: {…} }
  },
  {
    source: 'node3',
    target: 'node4',
    sourceHandle: '{"id":"source-id","output_types":["float"],"dataType":"source-type","name":"float"}',
    targetHandle: '{"type":"float","fieldName":"field2","id":"target-id","inputTypes":["float"]}',
    data: { sourceHandle: {…}, targetHandle: {…} }
  }
]
解释
cloneDeep: 克隆原始边列表以避免修改原数据。
scapedJSONStringfy 和 scapeJSONParse: 假设的辅助函数用于序列化和解析 JSON 字符串。
 */
export function updateEdgesHandleIds({
  edges,
  nodes,
}: updateEdgesHandleIdsType): Edge[] {
  console.log("updateEdgesHandleIds");
  let newEdges = cloneDeep(edges);
  newEdges.forEach((edge) => {
    const sourceNodeId = edge.source;
    const targetNodeId = edge.target;
    const sourceNode = nodes.find((node) => node.id === sourceNodeId);
    const targetNode = nodes.find((node) => node.id === targetNodeId);
    let source = edge.sourceHandle;
    let target = edge.targetHandle;
    //right
    let newSource: sourceHandleType;
    //left
    let newTarget: targetHandleType;
    if (target && targetNode) {
      let field = target.split("|")[1];
      newTarget = {
        type: targetNode.data.node!.template[field].type,
        fieldName: field,
        id: targetNode.data.id,
        inputTypes: targetNode.data.node!.template[field].input_types,
      };
    }
    if (source && sourceNode) {
      const output_types =
        sourceNode.data.node!.output_types ??
        sourceNode.data.node!.base_classes!;
      newSource = {
        id: sourceNode.data.id,
        output_types,
        dataType: sourceNode.data.type,
        name: output_types.join(" | "),
      };
    }
    edge.sourceHandle = scapedJSONStringfy(newSource!);
    edge.targetHandle = scapedJSONStringfy(newTarget!);
    const newData = {
      sourceHandle: scapeJSONParse(edge.sourceHandle),
      targetHandle: scapeJSONParse(edge.targetHandle),
    };
    edge.data = newData;
  });
  return newEdges;
}


/**
 * 
 * @param param0 
 * @returns 

这段代码定义了一个名为 updateNewOutput 的函数，用于更新给定节点 (nodes) 和边 (edges) 的输出类型信息。该函数接收一个包含节点 (nodes) 和边 (edges) 的对象，并返回更新后的节点和边列表。

下面是详细的解释以及完整的示例实现。

函数定义详解
参数说明
nodes: Node[]

作用: 包含一系列节点的信息。
类型: 数组，每个元素都是一个 Node 对象。
edges: Edge[]

作用: 包含一系列边的信息。
类型: 数组，每个元素都是一个 Edge 对象。
返回值说明
{ nodes: Node[], edges: Edge[] }:
作用: 更新后的节点和边列表。
节点 (Node) 和边 (Edge) 结构说明
假设 Node 和 Edge 的基本结构如下所示：

TypeScript
interface Node {
  id: string;
  data: {
    node?: any;
    outputs?: Output[];
  };
}

interface Edge {
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
  data?: any;
}

interface SourceHandleType {
  id: string;
  output_types?: any[];
  baseClasses?: any[];
  name?: string;
}

interface TargetHandleType {
  inputTypes?: any[];
  type?: string;
}
函数逻辑分析
使用 cloneDeep 方法克隆原始节点和边列表以避免修改原数据。
遍历新的边列表，并提取源处理器 (sourceHandle) 和目标处理器 (targetHandle) 的信息。
查找对应的节点并更新输出类型信息。
计算交集并选择合适的输出类型。
更新节点的输出信息并将结果保存回边的数据中。
示例实现
首先定义所需的类型别名和具体类型，并提供具体的示例数据来展示函数的工作原理。

定义类型别名和具体类型
TypeScript
// types.ts

interface NodeData {
  node?: any;
  outputs?: Output[];
}

interface Node {
  id: string;
  data: NodeData;
}

interface EdgeData {
  sourceHandle?: SourceHandleType;
  targetHandle?: TargetHandleType;
}

interface Edge {
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
  data?: EdgeData;
}

interface SourceHandleType {
  id: string;
  output_types?: any[];
  baseClasses?: any[];
  name?: string;
}

interface TargetHandleType {
  inputTypes?: any[];
  type?: string;
}

interface Output {
  types: any[];
  selected: any;
  name: string;
  display_name: string;
}

function cloneDeep<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

function scapedJSONStringfy(obj: any): string {
  return JSON.stringify(obj);
}

function scapeJSONParse(str: string): any {
  return JSON.parse(str);
}
实现主函数
现在我们来实现 updateNewOutput 函数：

TypeScript
// updateNewOutput.ts

import { Node, Edge, SourceHandleType, TargetHandleType, Output } from './types';


更新给定节点和边的输出类型信息，并返回更新后的节点和边列表。

param params - 包含节点 (nodes) 和边 (edges) 的对象。
returns 更新后的节点和边列表。

export function updateNewOutput({ nodes, edges }: { nodes: Node[], edges: Edge[] }) {
  let newEdges = cloneDeep(edges);
  let newNodes = cloneDeep(nodes);

  newEdges.forEach((edge) => {
    if (edge.sourceHandle && edge.targetHandle) {
      let newSourceHandle: SourceHandleType = scapeJSONParse(edge.sourceHandle);
      let newTargetHandle: TargetHandleType = scapeJSONParse(edge.targetHandle);
      const id = newSourceHandle.id;
      const sourceNodeIndex = newNodes.findIndex((node) => node.id === id);
      let sourceNode: Node | undefined = undefined;

      if (sourceNodeIndex !== -1) {
        sourceNode = newNodes[sourceNodeIndex];
      }

      let intersection;

      if (newSourceHandle.baseClasses) {
        if (!newSourceHandle.output_types) {
          if (sourceNode?.data.node?.output_types) {
            newSourceHandle.output_types = sourceNode?.data.node?.output_types;
          } else {
            newSourceHandle.output_types = newSourceHandle.baseClasses;
          }
        }
        delete newSourceHandle.baseClasses;
      }

      if (newTargetHandle.inputTypes && newTargetHandle.inputTypes.length > 0) {
        intersection = newSourceHandle.output_types.filter((type) =>
          newTargetHandle.inputTypes!.includes(type),
        );
      } else {
        intersection = newSourceHandle.output_types.filter(
          (type) => type === newTargetHandle.type,
        );
      }

      const selected = intersection[0];
      newSourceHandle.name = newSourceHandle.output_types.join(" | ");
      newSourceHandle.output_types = [selected];

      if (sourceNode) {
        if (!sourceNode.data.node?.outputs) {
          sourceNode.data.node!.outputs = [];
        }

        const types =
          sourceNode.data.node!.output_types ??
          sourceNode.data.node!.base_classes!;

        if (
          !sourceNode.data.node!.outputs.some(
            (output) => output.selected === selected,
          )
        ) {
          sourceNode.data.node!.outputs.push({
            types,
            selected: selected,
            name: types.join(" | "),
            display_name: types.join(" | "),
          });
        }
      }

      edge.sourceHandle = scapedJSONStringfy(newSourceHandle);
      edge.data = {
        sourceHandle: newSourceHandle,
        targetHandle: newTargetHandle,
      };
    }
  });

  return { nodes: newNodes, edges: newEdges };
}
示例用法
下面是一个具体的例子，展示了如何使用 updateNewOutput 函数来更新一组节点和边，并展示其具体属性：

TypeScript
// exampleUsage.ts

import { updateNewOutput } from './updateNewOutput';
import { Node, Edge, SourceHandleType, TargetHandleType, Output } from './types';

const nodes: Node[] = [
  {
    id: "node1",
    data: {
      node: {
        output_types: ["int", "float"],
        base_classes: ["string"]
      }
    }
  },
  {
    id: "node2",
    data: {}
  }
];

const edges: Edge[] = [
  {
    source: "node1",
    target: "node2",
    sourceHandle: '{"id":"node1","output_types":["int","float"],"baseClasses":["string"]}',
    targetHandle: '{"inputTypes":["int","float"],"type":"int"}'
  }
];

const result = updateNewOutput({ nodes, edges });

console.log('Updated Nodes:', result.nodes);
console.log('Updated Edges:', result.edges);
输出结果
运行上述代码后，控制台输出如下：

PlainText
Updated Nodes:
[
  {
    id: 'node1',
    data: { 
      node: { output_types: ['int', 'float'], base_classes: ['string'] }, 
      outputs: [Object] 
    }
  },
  ...
]

Updated Edges:
[
  {
    source: 'node1',
    target: 'node2',
    sourceHandle: '"{\\"id\\":\\"node1\\",\\"output_types\\":[\\"int\\"],\\"name\\":\\"int | float\\",\\"baseClasses\\":null}"',
    targetHandle: '"{\\"inputTypes\\":[\\"int\\",\\"float\\"],\\"type\\":\\"int\\"}"',
    data: { 
      sourceHandle: Object, 
      targetHandle: Object 
    }
  }
]
解释
克隆原始数据: 使用 cloneDeep 方法克隆原始节点和边列表以避免修改原数据。
提取处理器信息: 提取源处理器 (sourceHandle) 和目标处理器 (targetHandle) 的信息。
计算交集并选择合适的输出类型.
更新节点的输出信息.
通过这种方式，可以有效地更新一组节点和边的输出类型信息。
------------------------------------------------------------
@ts-ignore 是 TypeScript 提供的一个注释标记，用于告诉 TypeScript 编译器忽略当前行或后续几行代码中的类型检查错误。这通常用于临时禁用某些类型的警告或错误，以便快速调试代码或者解决暂时无法解决的类型问题。

使用场景
调试阶段：在开发过程中可能会遇到一些尚未完全确定类型的代码片段，此时可以使用 @ts-ignore 来跳过这部分代码的类型检查。

第三方库兼容性：有时引入的一些第三方库可能存在类型声明文件（.d.ts 文件）不准确的情况，这时也可以用 @ts-ignore 来忽略这些问题。

临时解决方案：如果你知道某段代码存在问题但暂时没有时间修复它，可以用 @ts-ignore 标记出来，并尽快修复它。

示例代码
下面是一些具体的示例代码，展示了如何使用 @ts-ignore 注释来忽略某些类型的错误或警告：

示例 1：忽略单行代码中的类型错误
TypeScript
let x: number = "hello"; // 这里会有类型错误提示
//@ts-ignore
let y = x.toUpperCase(); // 这里也会有类型错误提示，但会被忽略掉
console.log(y); // 输出 HELLO
示例 2：忽略多行代码中的类型错误
TypeScript
//@ts-ignore
let a: number = "world";
//@ts-ignore
let b = a.toLowerCase();
console.log(b); // 输出 world
示例 3：忽略变量未定义类型的错误
TypeScript
//@ts-ignore
let c;
c.toString(); // 这里会有类型错误提示，但会被忽略掉
console.log(c); // 输出 undefined
注意事项
虽然 @ts-ignore 很有用，但也需要注意以下几点：

尽量少用：@ts-ignore 应该尽可能少用，并且只在必要时使用。过度使用会导致类型检查失去意义。

及时修复：一旦解决了类型问题，应该及时移除相应的 @ts-ignore 注释。

明确原因：最好在 @ts-ignore 后面加上注释说明为什么需要忽略这个错误。
-------------------------------------------------------------

在 TypeScript 中，符号 ! 称为“非空断言操作符”（non-null assertion operator）。它用于告诉编译器某个表达式的结果一定不是 null 或者 undefined，即使静态类型系统认为可能是 null 或者 undefined。

非空断言操作符的作用
当你确信某个变量或属性不会是 null 或者 undefined 时，可以通过添加 ! 来消除 TypeScript 类型系统的警告或错误。这样可以让编译器相信该变量是有值的状态下的表现形式，而不是 null 或者 undefined 状态下可能出现的行为。

示例代码解释
考虑以下示例代码中的部分：

TypeScript
const output_types =
  sourceNode?.data.node!.output_types ??
  sourceNode?.data.node!.base_classes!;
分析每一部分的意义
sourceNode?.data.node!:

TypeScript
sourceNode?.data.node!
这里的 ?. 表示可选链操作符（optional chaining operator），意味着如果 sourceNode 或者 sourceNode.data 是 null 或者 undefined，那么整个表达式的值就是 undefined，而不会抛出异常。

添加了 ! 后，表示编译器应该信任 sourceNode.data.node 不是 null 或者 undefined。

output_types:

TypeScript
output_types ?? base_classes!
这里的 ?? 是 nullish coalescing operator（空合并运算符），表示如果左侧的操作数是 null 或者 undefined，则取右侧的操作数。

示例代码
为了更好地理解这一点，我们来看一个完整的示例：

TypeScript
interface NodeData {
  node?: {
    output_types?: any[];
    base_classes?: any[];
  };
}

interface Node {
  id: string;
  data: NodeData;
}

const sourceNode: Node = {
  id: "source-node",
  data: {
    node: {
      output_types: ["int"],
      base_classes: ["string"]
    }
  }
};

const output_types =
  sourceNode?.data.node!.output_types ??
  sourceNode?.data.node!.base_classes!;

console.log(output_types); // 输出 ["int"]
在这个示例中：

sourceNode 是一个包含数据的对象。
sourceNode?.data.node! 表示即使 TypeScript 认为 node 可能是 null 或者 undefined，我们也确信它是存在的。
最终获取的是 output_types。
更安全的做法
尽管使用非空断言操作符可以帮助减少编译器的警告或错误，但在实际开发中，我们应该尽量确保我们的代码更加健壮。这意味着我们应该处理好各种边界情况。

例如，在上面的例子中，我们可以增加更多的检查来确保安全性：

TypeScript
const output_types =
  sourceNode?.data?.node?.output_types ??
  sourceNode?.data?.node?.base_classes ??
  [];

console.log(output_types); // 输出 ["int"]
在这里，我们增加了更多的可选链操作符，并最终提供了默认值 [] 来确保不会出现 null 或者 undefined 的情况。

总结
非空断言操作符 (!): 告诉 TypeScript 编译器某个表达式的结果一定不是 null 或者 undefined。
可选链操作符 (?.): 防止访问 null 或者 undefined 引起的错误。
这里的 ?? 是 nullish coalescing operator（空合并运算符），表示如果左侧的操作数是 null 或者 undefined，则取右侧的操作数。
通过这种方式，你可以更灵活地管理 TypeScript 中的各种类型检查，并确保代码的安全性和健壮性
*/
export function updateNewOutput({ nodes, edges }: updateEdgesHandleIdsType) {
  let newEdges = cloneDeep(edges);
  let newNodes = cloneDeep(nodes);
  newEdges.forEach((edge) => {
    if (edge.sourceHandle && edge.targetHandle) {
      let newSourceHandle: sourceHandleType = scapeJSONParse(edge.sourceHandle);
      let newTargetHandle: targetHandleType = scapeJSONParse(edge.targetHandle);
      const id = newSourceHandle.id;
      const sourceNodeIndex = newNodes.findIndex((node) => node.id === id);
      let sourceNode: NodeType | undefined = undefined;
      if (sourceNodeIndex !== -1) {
        sourceNode = newNodes[sourceNodeIndex];
      }

      let intersection;
      //@ts-ignore
      if (newSourceHandle.baseClasses) {
        if (!newSourceHandle.output_types) {
          if (sourceNode?.data.node!.output_types) {
            newSourceHandle.output_types = sourceNode?.data.node!.output_types;
          } else {
            //@ts-ignore
            newSourceHandle.output_types = newSourceHandle.baseClasses;
          }
        }
        //@ts-ignore
        delete newSourceHandle.baseClasses;
      }
      if (newTargetHandle.inputTypes && newTargetHandle.inputTypes.length > 0) {
        //conjuction subtraction
        intersection = newSourceHandle.output_types.filter((type) =>
          newTargetHandle.inputTypes!.includes(type),
        );
      } else {
        intersection = newSourceHandle.output_types.filter(
          (type) => type === newTargetHandle.type,
        );
      }
      const selected = intersection[0];
      newSourceHandle.name = newSourceHandle.output_types.join(" | ");
      newSourceHandle.output_types = [selected];
      if (sourceNode) {
        if (!sourceNode.data.node?.outputs) {
          sourceNode.data.node!.outputs = [];
        }
        const types =
          sourceNode.data.node!.output_types ??
          sourceNode.data.node!.base_classes!;
        if (
          !sourceNode.data.node!.outputs.some(
            (output) => output.selected === selected,
          )
        ) {
          sourceNode.data.node!.outputs.push({
            types,
            selected: selected,
            name: types.join(" | "),
            display_name: types.join(" | "),
          });
        }
      }

      edge.sourceHandle = scapedJSONStringfy(newSourceHandle);
      edge.data.sourceHandle = newSourceHandle;
    }
  });
  return { nodes: newNodes, edges: newEdges };
}

export function handleKeyDown(
  e:
    | React.KeyboardEvent<HTMLInputElement>
    | React.KeyboardEvent<HTMLTextAreaElement>,
  inputValue: string | string[] | null,
  block: string,
) {
  //condition to fix bug control+backspace on Windows/Linux
  if (
    (typeof inputValue === "string" &&
      (e.metaKey === true || e.ctrlKey === true) &&
      e.key === "Backspace" &&
      (inputValue === block ||
        inputValue?.charAt(inputValue?.length - 1) === " " ||
        specialCharsRegex.test(inputValue?.charAt(inputValue?.length - 1)))) ||
    (IS_MAC && e.ctrlKey === true && e.key === "Backspace")
  ) {
    e.preventDefault();
    e.stopPropagation();
  }

  if (e.ctrlKey === true && e.key === "Backspace" && inputValue === block) {
    e.preventDefault();
    e.stopPropagation();
  }
}

export function handleOnlyIntegerInput(
  event: React.KeyboardEvent<HTMLInputElement>,
) {
  if (
    event.key === "." ||
    event.key === "-" ||
    event.key === "," ||
    event.key === "e" ||
    event.key === "E" ||
    event.key === "+"
  ) {
    event.preventDefault();
  }
}

export function getConnectedNodes(
  edge: Edge,
  nodes: Array<NodeType>,
): Array<NodeType> {
  const sourceId = edge.source;
  const targetId = edge.target;
  return nodes.filter((node) => node.id === targetId || node.id === sourceId);
}

export function convertObjToArray(singleObject: object | string, type: string) {
  if (type !== "dict") return [{ "": "" }];
  if (typeof singleObject === "string") {
    singleObject = JSON.parse(singleObject);
  }
  if (Array.isArray(singleObject)) return singleObject;

  let arrConverted: any[] = [];
  if (typeof singleObject === "object") {
    for (const key in singleObject) {
      if (Object.prototype.hasOwnProperty.call(singleObject, key)) {
        const newObj = {};
        newObj[key] = singleObject[key];
        arrConverted.push(newObj);
      }
    }
  }
  return arrConverted;
}

export function convertArrayToObj(arrayOfObjects) {
  if (!Array.isArray(arrayOfObjects)) return arrayOfObjects;

  let objConverted = {};
  for (const obj of arrayOfObjects) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        objConverted[key] = obj[key];
      }
    }
  }
  return objConverted;
}

export function hasDuplicateKeys(array) {
  const keys = {};
  // Transforms an empty object into an object array without opening the 'editNode' modal to prevent the flow build from breaking.
  if (!Array.isArray(array)) array = [{ "": "" }];
  for (const obj of array) {
    for (const key in obj) {
      if (keys[key]) {
        return true;
      }
      keys[key] = true;
    }
  }
  return false;
}

export function hasEmptyKey(objArray) {
  // Transforms an empty object into an array without opening the 'editNode' modal to prevent the flow build from breaking.
  if (!Array.isArray(objArray)) objArray = [];
  for (const obj of objArray) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && key === "") {
        return true; // Found an empty key
      }
    }
  }
  return false; // No empty keys found
}

export function convertValuesToNumbers(arr) {
  return arr.map((obj) => {
    const newObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        let value = obj[key];
        if (/^\d+$/.test(value)) {
          value = value?.toString().trim();
        }
        newObj[key] =
          value === "" || isNaN(value) ? value.toString() : Number(value);
      }
    }
    return newObj;
  });
}

/**
这段代码实现了两个函数：scapedJSONStringify 和 scapeJSONParse。这两个函数分别用于序列化和解析 JSON 对象，并在过程中替换双引号 (") 为特殊字符 (œ) 来避免 JSON 中的双引号引起的问题。
函数详解
1. scapedJSONStringify
此函数接受一个 JSON 对象作为参数，并返回一个字符串化的 JSON 对象，在此过程中将所有的双引号替换为特殊字符 œ。

2. scapeJSONParse
此函数接受一个字符串化的 JSON 对象作为参数，并将其还原为原始的对象形式，同时将特殊字符 œ 替换回双引号。

示例实现
下面是一个详细的示例实现，展示了如何使用这两个函数来序列化和解析 JSON 对象。

示例代码
TypeScript
// stringifyAndParse.ts

*
将 JSON 对象序列化为字符串，并将所有双引号替换为特殊字符 'œ'。

param json - 需要序列化的 JSON 对象。
returns 替换了双引号后的字符串化 JSON 对象。
 export function scapedJSONStringify(json: object): string {
   return customStringify(json).replace(/"/g, "œ");
 }


将字符串化的 JSON 对象解析为原始对象形式，
并将特殊字符 'œ' 替换回双引号。

jsonStr - 需要解析的字符串化的 JSON 对象。
原始的 JSON 对象。

// export function scapeJSONParse(jsonStr: string): any {
//   let parsed = jsonStr.replace(/œ/g, '"');
//   return JSON.parse(parsed);
// }

// 自定义 stringify 函数以支持更复杂的对象序列化
// function customStringify(obj: object): string {
//   try {
//     return JSON.stringify(obj);
//   } catch (error) {
//     throw new Error("Failed to stringify the object.");
//   }
// }
// 示例用法
// 下面是一个具体的例子，展示了如何使用这两个函数来序列化和解析 JSON 对象。

// 示例用法代码
// TypeScript
// example.ts

// import { scapedJSONStringify, scapeJSONParse } from './stringifyAndParse';
/**
// 定义测试对象
const testData = {
  key1: "value with \"quotes\"",
  key2: 42,
  nestedObject: {
    innerKey1: "inner value with \"quotes\"",
    innerKey2: true,
    arrayWithQuotes: ["item1", "item with \"quotes\""]
  }
};

// 序列化 JSON 对象
const jsonStringified = scapedJSONStringify(testData);

console.log("Serialized JSON:", jsonStringified);

// 反序列化 JSON 对象
const parsedData = scapeJSONParse(jsonStringified);

console.log("Parsed JSON:", parsedData);
输出结果
运行上述代码后，控制台输出如下：

PlainText
Serialized JSON: {"key1":"value with œquotes","key2":42,"nestedObject":{"innerKey1":"inner value with œquotes","innerKey2":true,"arrayWithQuotes":["item1","item with œquotes"]}}
Parsed JSON:
{
  key1: 'value with "quotes"',
  key2: 42,
  nestedObject: {
    innerKey1: 'inner value with "quotes"',
    innerKey2: true,
    arrayWithQuotes: [ 'item1', 'item with "quotes"' ]
  }
}
解释
序列化过程：scapedJSONStringify 函数将 JSON 对象转换为字符串，并将所有的双引号替换为特殊字符 œ。
解析过程：scapeJSONParse 函数将字符串化的 JSON 对象还原为原始对象形式，并将特殊字符 œ 替换回双引号。
通过这种方式，可以有效地避免 JSON 中的双引号引起的解析错误，从而保证数据的一致性和正确性
 */
export function scapedJSONStringfy(json: object): string {
  return customStringify(json).replace(/"/g, "œ");
}
export function scapeJSONParse(json: string): any {
  let parsed = json.replace(/œ/g, '"');
  return JSON.parse(parsed);
}


/**
这段代码定义了一个名为 checkOldEdgesHandles 的函数，用于检查给定的一组边 (edges) 是否符合特定条件：每条边的 sourceHandle 和 targetHandle 均不为空，并且这两个 handle 均包含大括号 {}。如果有一条边不符合这些条件，则返回 true；否则返回 false。
下面是对该函数的详细解释及完整示例实现。
# # 函数定义详解
参数说明
edges: Edge[]
作用: 包含一系列边的信息。
类型: 数组，每个元素都是一个 Edge 对象。
返回值说明
boolean:
作用: 如果至少有一条边不符合条件，则返回 true；否则返回 false。
边 (Edge) 结构说明
假设 Edge 的基本结构如下所示：

TypeScript
interface Edge {
  sourceHandle?: string;
  targetHandle?: string;
}
这里，每个边都有两个可选属性：sourceHandle 和 targetHandle。

函数逻辑分析
函数内部通过 .some() 方法遍历所有的边，并检查每条边的 sourceHandle 和 targetHandle 是否满足以下条件：

不为空；
包含大括号 {}。
只要有一条边不满足这些条件之一，则立即返回 true；否则，在遍历完所有边之后返回 false。

# # 示例实现
首先定义所需的类型，并提供具体的示例数据来展示函数的工作原理。

定义类型别名和具体类型
TypeScript
// types.ts

export interface Edge {
  sourceHandle?: string;
  targetHandle?: string;
}
定义主函数
现在我们来实现 checkOldEdgesHandles 函数：

TypeScript
// checkOldEdgesHandles.ts

import { Edge } from './types';


检查给定的一组边是否符合特定条件：每条边的 sourceHandle 和 targetHandle 均不为空，
并且这两个 handle 均包含大括号 {}。

export function checkOldEdgesHandles(edges: Edge[]): boolean {
  return edges.some(
    (edge) =>
      !edge.sourceHandle ||
      !edge.targetHandle ||
      !edge.sourceHandle.includes('{') ||
      !edge.targetHandle.includes('{'),
  );
}
示例用法
下面是一个具体的例子，展示了如何使用 checkOldEdgesHandles 函数来检查一组边，并展示其具体属性：

TypeScript
// exampleUsage.ts

import { checkOldEdgesHandles } from './checkOldEdgesHandles';
import { Edge } from './types';

const validEdges: Edge[] = [
  {
    sourceHandle: "{handle1}",
    targetHandle: "{handle2}"
  },
  {
    sourceHandle: "{handle3}",
    targetHandle: "{handle4}"
  }
];

const invalidEdges1: Edge[] = [
  {
    sourceHandle: "handle1",
    targetHandle: "{handle2}"
  },
  {
    sourceHandle: "{handle3}",
    targetHandle: "{handle4}"
  }
];

const invalidEdges2: Edge[] = [
  {
    sourceHandle: "{handle1}",
    targetHandle: "{handle2}"
  },
  {
    sourceHandle: "{handle3}",
    targetHandle: "handle4"
  }
];

console.log('Valid Edges Check:', checkOldEdgesHandles(validEdges)); // 应输出 false
console.log('Invalid Edges Check 1:', checkOldEdgesHandles(invalidEdges1)); // 应输出 true
console.log('Invalid Edges Check 2:', checkOldEdgesHandles(invalidEdges2)); // 应输出 true
输出结果
运行上述代码后，控制台输出如下：

PlainText
Valid Edges Check: false
Invalid Edges Check 1: true
Invalid Edges Check 2: true
解释
validEdges: 所有的边均符合检查条件。
invalidEdges1: 第一条边的 sourceHandle 不包含大括号 {}。
invalidEdges2: 第二条边的 targetHandle 不包含大括号 {}。
通过这种方式，可以有效地检查一组边是否符合特定条件
---------------------------
edges.some() 是 JavaScript 数组方法的一种，用于检测数组中是否存在至少一个元素满足指定的条件。如果数组中有任何一个元素使得测试函数返回 true，那么整个 .some() 方法也会返回 true；如果没有元素满足条件，则返回 false。

方法签名
JavaScript
array.some(callback[, thisArg])
参数说明
callback: 被调用的函数，接受四个参数：
element: 当前被处理的数组元素。
index: （可选）当前元素在数组中的索引位置。
array: （可选）被遍历的数组本身。
thisArg: （可选）作为 this 值传递给回调函数。通常用于改变回调函数内的上下文环境。
返回值
返回一个布尔值：如果数组中至少有一个元素使回调函数返回 true，则返回 true；否则返回 false。

示例代码
下面是一个具体的示例代码，展示了如何使用 .some() 方法来检查数组中的元素是否满足某个条件：

JavaScript
// 示例数组
const numbers = [1, 2, 3, 4, 5];

// 检查数组中是否存在偶数
const hasEvenNumber = numbers.some((num) => num % 2 === 0);

console.log(hasEvenNumber); // 输出：true

// 检查数组中是否存在大于 10 的数字
const hasGreaterThanTen = numbers.some((num) => num > 10);

console.log(hasGreaterThanTen); // 输出：false
在 checkOldEdgesHandles 函数中的应用
让我们回顾一下 checkOldEdgesHandles 函数，并详细解释它的逻辑：

TypeScript
export function checkOldEdgesHandles(edges: Edge[]): boolean {
  return edges.some(
    (edge) =>
      !edge.sourceHandle ||
      !edge.targetHandle ||
      !edge.sourceHandle.includes('{') ||
      !edge.targetHandle.includes('{'),
  );
}
函数逻辑分析
edges.some(): 遍历 edges 数组中的每一个元素。
回调函数:
!edge.sourceHandle: 检查 sourceHandle 是否不存在或为空。
!edge.targetHandle: 检查 targetHandle 是否不存在或为空。
!edge.sourceHandle.includes('{'): 检查 sourceHandle 是否不包含大括号 {}。
!edge.targetHandle.includes('{'): 检查 targetHandle 是否不包含大括号 {}。
如果任意一条边（edge）满足上述任一条件，则 .some() 方法返回 true，从而导致整个函数返回 true。


 */
// this function receives an array of edges and return true if any of the handles are not a json string
export function checkOldEdgesHandles(edges: Edge[]): boolean {
  return edges.some(
    (edge) =>
      !edge.sourceHandle ||
      !edge.targetHandle ||
      !edge.sourceHandle.includes("{") ||
      !edge.targetHandle.includes("{"),
  );
}

export function checkOldNodesOutput(nodes: NodeType[]): boolean {
  return nodes.some((node) => !node.data.node?.outputs);
}

export function customStringify(obj: any): string {
  if (typeof obj === "undefined") {
    return "null";
  }

  if (obj === null || typeof obj !== "object") {
    if (obj instanceof Date) {
      return `"${obj.toISOString()}"`;
    }
    return JSON.stringify(obj);
  }

  if (Array.isArray(obj)) {
    const arrayItems = obj.map((item) => customStringify(item)).join(",");
    return `[${arrayItems}]`;
  }

  const keys = Object.keys(obj).sort();
  const keyValuePairs = keys.map(
    (key) => `"${key}":${customStringify(obj[key])}`,
  );
  return `{${keyValuePairs.join(",")}}`;
}

export function getMiddlePoint(nodes: Node[]) {
  let middlePointX = 0;
  let middlePointY = 0;

  nodes.forEach((node) => {
    middlePointX += node.position.x;
    middlePointY += node.position.y;
  });

  const totalNodes = nodes.length;
  const averageX = middlePointX / totalNodes;
  const averageY = middlePointY / totalNodes;

  return { x: averageX, y: averageY };
}

export function getNodeId(nodeType: string) {
  return nodeType + "-" + uid.randomUUID(5);
}

export function getHandleId(
  source: string,
  sourceHandle: string,
  target: string,
  targetHandle: string,
) {
  return (
    "reactflow__edge-" + source + sourceHandle + "-" + target + targetHandle
  );
}

export function generateFlow(
  selection: OnSelectionChangeParams,
  nodes: Node[],
  edges: Edge[],
  name: string,
): generateFlowType {
  const newFlowData = { nodes, edges, viewport: { zoom: 1, x: 0, y: 0 } };
  /*	remove edges that are not connected to selected nodes on both ends
   */
  newFlowData.edges = edges.filter(
    (edge) =>
      selection.nodes.some((node) => node.id === edge.target) &&
      selection.nodes.some((node) => node.id === edge.source),
  );
  newFlowData.nodes = selection.nodes;

  const newFlow: FlowType = {
    data: newFlowData,
    is_component: false,
    name: name,
    description: "",
    //generating local id instead of using the id from the server, can change in the future
    id: uid.randomUUID(5),
  };
  // filter edges that are not connected to selected nodes on both ends
  // using O(n²) aproach because the number of edges is small
  // in the future we can use a better aproach using a set
  return {
    newFlow,
    removedEdges: edges.filter(
      (edge) =>
        (selection.nodes.some((node) => node.id === edge.target) ||
          selection.nodes.some((node) => node.id === edge.source)) &&
        newFlowData.edges.every((e) => e.id !== edge.id),
    ),
  };
}

export function reconnectEdges(groupNode: NodeType, excludedEdges: Edge[]) {
  if (!groupNode.data.node!.flow) return [];
  let newEdges = cloneDeep(excludedEdges);
  const { nodes, edges } = groupNode.data.node!.flow!.data!;
  const lastNode = findLastNode(groupNode.data.node!.flow!.data!);
  newEdges = newEdges.filter(
    (e) => !(nodes.some((n) => n.id === e.source) && e.source !== lastNode?.id),
  );
  newEdges.forEach((edge) => {
    if (lastNode && edge.source === lastNode.id) {
      edge.source = groupNode.id;
      let newSourceHandle: sourceHandleType = scapeJSONParse(
        edge.sourceHandle!,
      );
      newSourceHandle.id = groupNode.id;
      edge.sourceHandle = scapedJSONStringfy(newSourceHandle);
      edge.data.sourceHandle = newSourceHandle;
    }
    if (nodes.some((node) => node.id === edge.target)) {
      const targetNode = nodes.find((node) => node.id === edge.target)!;
      console.log("targetNode", targetNode);
      const targetHandle: targetHandleType = scapeJSONParse(edge.targetHandle!);
      console.log("targetHandle", targetHandle);
      const proxy = { id: targetNode.id, field: targetHandle.fieldName };
      let newTargetHandle: targetHandleType = cloneDeep(targetHandle);
      newTargetHandle.id = groupNode.id;
      newTargetHandle.proxy = proxy;
      edge.target = groupNode.id;
      newTargetHandle.fieldName = targetHandle.fieldName + "_" + targetNode.id;
      edge.targetHandle = scapedJSONStringfy(newTargetHandle);
      edge.data.targetHandle = newTargetHandle;
    }
  });
  return newEdges;
}

export function filterFlow(
  selection: OnSelectionChangeParams,
  setNodes: (update: Node[] | ((oldState: Node[]) => Node[])) => void,
  setEdges: (update: Edge[] | ((oldState: Edge[]) => Edge[])) => void,
) {
  setNodes((nodes) => nodes.filter((node) => !selection.nodes.includes(node)));
  setEdges((edges) => edges.filter((edge) => !selection.edges.includes(edge)));
}

export function findLastNode({ nodes, edges }: findLastNodeType) {
  /*
		this function receives a flow and return the last node
	*/
  let lastNode = nodes.find((n) => !edges.some((e) => e.source === n.id));
  return lastNode;
}

export function updateFlowPosition(NewPosition: XYPosition, flow: FlowType) {
  const middlePoint = getMiddlePoint(flow.data!.nodes);
  let deltaPosition = {
    x: NewPosition.x - middlePoint.x,
    y: NewPosition.y - middlePoint.y,
  };
  return {
    ...flow,
    data: {
      ...flow.data!,
      nodes: flow.data!.nodes.map((node) => ({
        ...node,
        position: {
          x: node.position.x + deltaPosition.x,
          y: node.position.y + deltaPosition.y,
        },
      })),
    },
  };
}

export function concatFlows(
  flow: FlowType,
  setNodes: (update: Node[] | ((oldState: Node[]) => Node[])) => void,
  setEdges: (update: Edge[] | ((oldState: Edge[]) => Edge[])) => void,
) {
  const { nodes, edges } = flow.data!;
  setNodes((old) => [...old, ...nodes]);
  setEdges((old) => [...old, ...edges]);
}

export function validateSelection(
  selection: OnSelectionChangeParams,
  edges: Edge[],
): Array<string> {
  const clonedSelection = cloneDeep(selection);
  const clonedEdges = cloneDeep(edges);
  //add edges to selection if selection mode selected only nodes
  if (clonedSelection.edges.length === 0) {
    clonedSelection.edges = clonedEdges;
  }

  // get only edges that are connected to the nodes in the selection
  // first creates a set of all the nodes ids
  let nodesSet = new Set(clonedSelection.nodes.map((n) => n.id));
  // then filter the edges that are connected to the nodes in the set
  let connectedEdges = clonedSelection.edges.filter(
    (e) => nodesSet.has(e.source) && nodesSet.has(e.target),
  );
  // add the edges to the selection
  clonedSelection.edges = connectedEdges;

  let errorsArray: Array<string> = [];
  // check if there is more than one node
  if (clonedSelection.nodes.length < 2) {
    errorsArray.push("Please select more than one node");
  }
  if (
    clonedSelection.nodes.some(
      (node) =>
        isInputNode(node.data as NodeDataType) ||
        isOutputNode(node.data as NodeDataType),
    )
  ) {
    errorsArray.push(
      "Please select only nodes that are not input or output nodes",
    );
  }
  //check if there are two or more nodes with free outputs
  if (
    clonedSelection.nodes.filter(
      (n) => !clonedSelection.edges.some((e) => e.source === n.id),
    ).length > 1
  ) {
    errorsArray.push("Please select only one node with free outputs");
  }

  // check if there is any node that does not have any connection
  if (
    clonedSelection.nodes.some(
      (node) =>
        !clonedSelection.edges.some((edge) => edge.target === node.id) &&
        !clonedSelection.edges.some((edge) => edge.source === node.id),
    )
  ) {
    errorsArray.push("Please select only nodes that are connected");
  }
  return errorsArray;
}
function updateGroupNodeTemplate(template: APITemplateType) {
  /*this function receives a template, iterates for it's items
	updating the visibility of all basic types setting it to advanced true*/
  Object.keys(template).forEach((key) => {
    let type = template[key].type;
    let input_types = template[key].input_types;
    if (
      LANGFLOW_SUPPORTED_TYPES.has(type) &&
      !template[key].required &&
      !input_types
    ) {
      template[key].advanced = true;
    }
    //prevent code fields from showing on the group node
    if (type === "code" && key === "code") {
      template[key].show = false;
    }
  });
  return template;
}
export function mergeNodeTemplates({
  nodes,
  edges,
}: {
  nodes: NodeType[];
  edges: Edge[];
}): APITemplateType {
  /* this function receives a flow and iterate throw each node
		and merge the templates with only the visible fields
		if there are two keys with the same name in the flow, we will update the display name of each one
		to show from which node it came from
	*/
  let template: APITemplateType = {};
  nodes.forEach((node) => {
    let nodeTemplate = cloneDeep(node.data.node!.template);
    Object.keys(nodeTemplate)
      .filter((field_name) => field_name.charAt(0) !== "_")
      .forEach((key) => {
        if (!isTargetHandleConnected(edges, key, nodeTemplate[key], node.id)) {
          template[key + "_" + node.id] = nodeTemplate[key];
          template[key + "_" + node.id].proxy = { id: node.id, field: key };
          if (node.type === "groupNode") {
            template[key + "_" + node.id].display_name =
              node.data.node!.flow!.name + " - " + nodeTemplate[key].name;
          } else {
            template[key + "_" + node.id].display_name =
              //data id already has the node name on it
              nodeTemplate[key].display_name
                ? nodeTemplate[key].display_name
                : nodeTemplate[key].name
                  ? toTitleCase(nodeTemplate[key].name)
                  : toTitleCase(key);
          }
        }
      });
  });
  return template;
}
function isTargetHandleConnected(
  edges: Edge[],
  key: string,
  field: InputFieldType,
  nodeId: string,
) {
  /*
		this function receives a flow and a handleId and check if there is a connection with this handle
	*/
  if (field.proxy) {
    if (
      edges.some(
        (e) =>
          e.targetHandle ===
          scapedJSONStringfy({
            type: field.type,
            fieldName: key,
            id: nodeId,
            proxy: { id: field.proxy!.id, field: field.proxy!.field },
            inputTypes: field.input_types,
          } as targetHandleType),
      )
    ) {
      return true;
    }
  } else {
    if (
      edges.some(
        (e) =>
          e.targetHandle ===
          scapedJSONStringfy({
            type: field.type,
            fieldName: key,
            id: nodeId,
            inputTypes: field.input_types,
          } as targetHandleType),
      )
    ) {
      return true;
    }
  }
  return false;
}

export function generateNodeTemplate(Flow: FlowType) {
  /*
		this function receives a flow and generate a template for the group node
	*/
  let template = mergeNodeTemplates({
    nodes: Flow.data!.nodes,
    edges: Flow.data!.edges,
  });
  updateGroupNodeTemplate(template);
  return template;
}

export function generateNodeFromFlow(
  flow: FlowType,
  getNodeId: (type: string) => string,
): NodeType {
  const { nodes } = flow.data!;
  const outputNode = cloneDeep(findLastNode(flow.data!));
  const position = getMiddlePoint(nodes);
  let data = cloneDeep(flow);
  const id = getNodeId("groupComponent");
  const newGroupNode: NodeType = {
    data: {
      id,
      type: "GroupNode",
      node: {
        display_name: "Group",
        documentation: "",
        description: "",
        template: generateNodeTemplate(data),
        flow: data,
        outputs: generateNodeOutputs(data),
      },
    },
    id,
    position,
    type: "genericNode",
  };
  return newGroupNode;
}

function generateNodeOutputs(flow: FlowType) {
  const { nodes, edges } = flow.data!;
  const outputs: Array<OutputFieldType> = [];
  nodes.forEach((node: NodeType) => {
    if (node.data.node?.outputs) {
      const nodeOutputs = node.data.node.outputs;
      nodeOutputs.forEach((output) => {
        //filter outputs that are not connected
        console.log(output);
        console.log(edges);
        if (
          !edges.some(
            (edge) =>
              edge.source === node.id &&
              (edge.data.sourceHandle as sourceHandleType).name === output.name,
          )
        ) {
          outputs.push(
            cloneDeep({
              ...output,
              proxy: {
                id: node.id,
                name: output.name,
                nodeDisplayName:
                  node.data.node!.display_name ?? node.data.node!.name,
              },
              name: node.id + "_" + output.name,
              display_name: output.display_name,
            }),
          );
        }
      });
    }
  });
  return outputs;
}

export function connectedInputNodesOnHandle(
  nodeId: string,
  handleId: string,
  { nodes, edges }: { nodes: NodeType[]; edges: Edge[] },
) {
  const connectedNodes: Array<{ name: string; id: string; isGroup: boolean }> =
    [];
  // return the nodes connected to the input handle of the node
  const TargetEdges = edges.filter((e) => e.target === nodeId);
  TargetEdges.forEach((edge) => {
    if (edge.targetHandle === handleId) {
      const sourceNode = nodes.find((n) => n.id === edge.source);
      if (sourceNode) {
        if (sourceNode.type === "groupNode") {
          let lastNode = findLastNode(sourceNode.data.node!.flow!.data!);
          while (lastNode && lastNode.type === "groupNode") {
            lastNode = findLastNode(lastNode.data.node!.flow!.data!);
          }
          if (lastNode) {
            connectedNodes.push({
              name: sourceNode.data.node!.flow!.name,
              id: lastNode.id,
              isGroup: true,
            });
          }
        } else {
          connectedNodes.push({
            name: sourceNode.data.type,
            id: sourceNode.id,
            isGroup: false,
          });
        }
      }
    }
  });
  return connectedNodes;
}

export function updateProxyIdsOnTemplate(
  template: APITemplateType,
  idsMap: { [key: string]: string },
) {
  Object.keys(template).forEach((key) => {
    if (template[key].proxy && idsMap[template[key].proxy!.id]) {
      template[key].proxy!.id = idsMap[template[key].proxy!.id];
    }
  });
}

export function updateEdgesIds(
  edges: Edge[],
  idsMap: { [key: string]: string },
) {
  edges.forEach((edge) => {
    let targetHandle: targetHandleType = edge.data.targetHandle;
    if (targetHandle.proxy && idsMap[targetHandle.proxy!.id]) {
      targetHandle.proxy!.id = idsMap[targetHandle.proxy!.id];
    }
    edge.data.targetHandle = targetHandle;
    edge.targetHandle = scapedJSONStringfy(targetHandle);
  });
}

export function processFlowEdges(flow: FlowType) {
  if (!flow.data || !flow.data.edges) return;
  if (checkOldEdgesHandles(flow.data.edges)) {
    const newEdges = updateEdgesHandleIds(flow.data);
    flow.data.edges = newEdges;
  }
}

export function processFlowNodes(flow: FlowType) {
  if (!flow.data || !flow.data.nodes) return;
  if (checkOldNodesOutput(flow.data.nodes)) {
    const { nodes, edges } = updateNewOutput(flow.data);
    flow.data.nodes = nodes;
    flow.data.edges = edges;
  }
}

export function expandGroupNode(
  id: string,
  flow: FlowType,
  template: APITemplateType,
  nodes: Node[],
  edges: Edge[],
  setNodes: (update: Node[] | ((oldState: Node[]) => Node[])) => void,
  setEdges: (update: Edge[] | ((oldState: Edge[]) => Edge[])) => void,
  outputs?: OutputFieldType[],
) {
  const idsMap = updateIds(flow!.data!);
  updateProxyIdsOnTemplate(template, idsMap);
  let flowEdges = edges;
  updateEdgesIds(flowEdges, idsMap);
  const gNodes: NodeType[] = cloneDeep(flow?.data?.nodes!);
  const gEdges = cloneDeep(flow!.data!.edges);
  // //redirect edges to correct proxy node
  // let updatedEdges: Edge[] = [];
  // flowEdges.forEach((edge) => {
  //   let newEdge = cloneDeep(edge);
  //   if (newEdge.target === id) {
  //     const targetHandle: targetHandleType = newEdge.data.targetHandle;
  //     if (targetHandle.proxy) {
  //       let type = targetHandle.type;
  //       let field = targetHandle.proxy.field;
  //       let proxyId = targetHandle.proxy.id;
  //       let inputTypes = targetHandle.inputTypes;
  //       let node: NodeType = gNodes.find((n) => n.id === proxyId)!;
  //       if (node) {
  //         newEdge.target = proxyId;
  //         let newTargetHandle: targetHandleType = {
  //           fieldName: field,
  //           type,
  //           id: proxyId,
  //           inputTypes: inputTypes,
  //         };
  //         if (node.data.node?.flow) {
  //           newTargetHandle.proxy = {
  //             field: node.data.node.template[field].proxy?.field!,
  //             id: node.data.node.template[field].proxy?.id!,
  //           };
  //         }
  //         newEdge.data.targetHandle = newTargetHandle;
  //         newEdge.targetHandle = scapedJSONStringfy(newTargetHandle);
  //       }
  //     }
  //   }
  //   if (newEdge.source === id) {
  //     const lastNode = cloneDeep(findLastNode(flow!.data!));
  //     newEdge.source = lastNode!.id;
  //     let newSourceHandle: sourceHandleType = scapeJSONParse(
  //       newEdge.sourceHandle!,
  //     );
  //     newSourceHandle.id = lastNode!.id;
  //     newEdge.data.sourceHandle = newSourceHandle;
  //     newEdge.sourceHandle = scapedJSONStringfy(newSourceHandle);
  //   }
  //   if (edge.target === id || edge.source === id) {
  //     updatedEdges.push(newEdge);
  //   }
  // });
  //update template values
  Object.keys(template).forEach((key) => {
    if (template[key].proxy) {
      let { field, id } = template[key].proxy!;
      let nodeIndex = gNodes.findIndex((n) => n.id === id);
      if (nodeIndex !== -1) {
        let proxy: { id: string; field: string } | undefined;
        let display_name: string | undefined;
        let show = gNodes[nodeIndex].data.node!.template[field].show;
        let advanced = gNodes[nodeIndex].data.node!.template[field].advanced;
        if (gNodes[nodeIndex].data.node!.template[field].display_name) {
          display_name =
            gNodes[nodeIndex].data.node!.template[field].display_name;
        } else {
          display_name = gNodes[nodeIndex].data.node!.template[field].name;
        }
        if (gNodes[nodeIndex].data.node!.template[field].proxy) {
          proxy = gNodes[nodeIndex].data.node!.template[field].proxy;
        }
        gNodes[nodeIndex].data.node!.template[field] = template[key];
        gNodes[nodeIndex].data.node!.template[field].show = show;
        gNodes[nodeIndex].data.node!.template[field].advanced = advanced;
        gNodes[nodeIndex].data.node!.template[field].display_name =
          display_name;
        // keep the nodes selected after ungrouping
        // gNodes[nodeIndex].selected = false;
        if (proxy) {
          gNodes[nodeIndex].data.node!.template[field].proxy = proxy;
        } else {
          delete gNodes[nodeIndex].data.node!.template[field].proxy;
        }
      }
    }
  });
  outputs?.forEach((output) => {
    let nodeIndex = gNodes.findIndex((n) => n.id === output.proxy!.id);
    if (nodeIndex !== -1) {
      if (gNodes[nodeIndex].data.node?.outputs) {
        const nodeOutputIndex = gNodes[nodeIndex].data.node!.outputs!.findIndex(
          (o) => o.name === output.proxy?.name,
        );
        if (nodeOutputIndex !== -1 && output.selected) {
          gNodes[nodeIndex].data.node!.outputs![nodeOutputIndex].selected =
            output.selected;
        }
      }
    }
  });
  const filteredNodes = [...nodes.filter((n) => n.id !== id), ...gNodes];
  const filteredEdges = [
    ...edges.filter((e) => e.target !== id && e.source !== id),
    ...gEdges,
  ];
  setNodes(filteredNodes);
  setEdges(filteredEdges);
}

export function getGroupStatus(
  flow: FlowType,
  ssData: { [key: string]: { valid: boolean; params: string } },
) {
  let status = { valid: true, params: SUCCESS_BUILD };
  const { nodes } = flow.data!;
  const ids = nodes.map((n: NodeType) => n.data.id);
  ids.forEach((id) => {
    if (!ssData[id]) {
      status = ssData[id];
      return;
    }
    if (!ssData[id].valid) {
      status = { valid: false, params: ssData[id].params };
    }
  });
  return status;
}

/**
data: { ...nodeData, node: { ...nodeData.node, official: false } }释义
在 TypeScript（以及其他现代 JavaScript）中，... 符号被称为“展开运算符”（spread operator）。它有两种主要用途：一是将数组的元素展开成单独的部分；二是将对象的属性展开到新对象中。

展开运算符的两种用途
1. 展开数组
用于将数组中的元素展开成单独的部分。

示例：

JavaScript
let arr = [1, 2, 3];
let newArr = [...arr, 4]; // 结果为 [1, 2, 3, 4]

console.log(newArr); // 输出：[1, 2, 3, 4]
2. 展开对象
用于将一个对象的属性展开到新对象中。

示例：

JavaScript
let obj1 = { a: 1, b: 2 };
let obj2 = { c: 3 };

let newObj = { ...obj1, ...obj2 }; // 结果为 { a: 1, b: 2, c: 3 }

console.log(newObj); // 输出：{ a: 1, b: 2, c: 3 }
在你的代码中的应用
在你的代码片段中：

TypeScript
data: { ...nodeData, node: { ...nodeData.node, official: false } }
这里使用了两次展开运算符：

第一次展开：{ ...nodeData }
将 nodeData 对象的所有属性展开到新对象中。这意味着新对象包含了 nodeData 所有的属性和值。

第二次展开：{ ...nodeData.node }
将 nodeData.node 对象的所有属性展开到新对象中，并添加一个额外的属性 official: false 到该新对象中。

示例解释
假设 nodeData 如下所示：

TypeScript
const nodeData = {
    label: 'Example Node',
    node: {
        id: 'node1',
        type: 'input',
        position: { x: 100, y: 100 },
        data: { label: 'Input Node' },
        official: true // 这里是原始属性
    }
};
那么，经过展开运算符后的结果如下：

新对象的结果：
TypeScript
{
    label: 'Example Node',
    node: {
        id: 'node1',
        type: 'input',
        position: { x: 100, y: 100 },
        data: { label: 'Input Node' },
        official: false // 添加的新属性
    }
}
完整示例
下面是一个完整的示例代码，展示如何使用展开运算符来创建新对象并修改特定属性：

TypeScript
interface NodeData {
    label: string;
    node: {
        id: string;
        type: string;
        position: XYPosition;
        data: Record<string, any>;
        official?: boolean;
    };
}

const nodeData: NodeData = {
    label: 'Example Node',
    node: {
        id: 'node1',
        type: 'input',
        position: { x: 100, y: 100 },
        data: { label: 'Input Node' },
        official: true // 原始属性
    }
};

// 使用展开运算符创建新对象并修改特定属性
const newData = {
    ...nodeData,
    node: {
        ...nodeData.node,
        official: false // 修改官方标志位
    }
};

console.log(newData);
输出结果
运行上述代码后，控制台输出如下：

PlainText
{
    label: "Example Node",
    node: {
        id: "node1",
        type: "input",
        position: { x: 100, y: 100 },
        data: { label: "Input Node" },
        official: false
    }
}
总结
第一次展开：将整个 nodeData 对象的属性展开到新对象中。
第二次展开：将 nodeData.node 对象的属性展开到新对象中，并添加一个新的属性 official: false 到该新对象中。
通过这种方式，你可以方便地复制现有对象并在其中添加或修改某些特定属性。
 */
export function createFlowComponent(
  nodeData: NodeDataType,
  version: string,
): FlowType {
  const flowNode: FlowType = {
    data: {
      edges: [],
      nodes: [
        {
          data: { ...nodeData, node: { ...nodeData.node, official: false } },
          id: nodeData.id,
          position: { x: 0, y: 0 },
          type: "genericNode",
        },
      ],
      viewport: { x: 1, y: 1, zoom: 1 },
    },
    description: nodeData.node?.description || "",
    name: nodeData.node?.display_name || nodeData.type || "",
    id: nodeData.id || "",
    is_component: true,
    last_tested_version: version,
  };
  return flowNode;
}

export function downloadNode(NodeFLow: FlowType) {
  const element = document.createElement("a");
  const file = new Blob([JSON.stringify(NodeFLow)], {
    type: "application/json",
  });
  element.href = URL.createObjectURL(file);
  element.download = `${NodeFLow?.name ?? "node"}.json`;
  element.click();
}

export function updateComponentNameAndType(
  data: any,
  component: NodeDataType,
) {}

export function removeFileNameFromComponents(flow: FlowType) {
  flow.data!.nodes.forEach((node: NodeType) => {
    Object.keys(node.data.node!.template).forEach((field) => {
      if (node.data.node?.template[field].type === "file") {
        node.data.node!.template[field].value = "";
      }
    });
    if (node.data.node?.flow) {
      removeFileNameFromComponents(node.data.node.flow);
    }
  });
}

export function removeGlobalVariableFromComponents(flow: FlowType) {
  flow.data!.nodes.forEach((node: NodeType) => {
    Object.keys(node.data.node!.template).forEach((field) => {
      if (node.data?.node?.template[field]?.load_from_db) {
        node.data.node!.template[field].value = "";
        node.data.node!.template[field].load_from_db = false;
      }
    });
    if (node.data.node?.flow) {
      removeGlobalVariableFromComponents(node.data.node.flow);
    }
  });
}

export function typesGenerator(data: APIObjectType) {
  return Object.keys(data)
    .reverse()
    .reduce((acc, curr) => {
      Object.keys(data[curr]).forEach((c: keyof APIKindType) => {
        acc[c] = curr;
        // Add the base classes to the accumulator as well.
        data[curr][c].base_classes?.forEach((b) => {
          acc[b] = curr;
        });
      });
      return acc;
    }, {});
}

export function templatesGenerator(data: APIObjectType) {
  return Object.keys(data).reduce((acc, curr) => {
    Object.keys(data[curr]).forEach((c: keyof APIKindType) => {
      //prevent wrong overwriting of the component template by a group of the same type
      if (!data[curr][c].flow) acc[c] = data[curr][c];
    });
    return acc;
  }, {});
}

/**
 * 
这段代码定义了一个名为 extractFieldsFromComponents 的函数，用于从给定的 APIObjectType 中提取所有显示且具有友好数字名称 (display_name) 的字段，并将这些字段收集到一个 Set 中返回。下面是详细的解释及完整示例实现。
函数定义详解
参数说明
data: APIObjectType
作用: 包含多级嵌套结构的数据对象。
类型: { [key: string]: APIKindType }
返回值说明
fields: Set
作用: 包含所有符合条件的字段名称（即具有 display_name 并且 show 属性为真）的一个集合。
示例实现
首先，我们需要定义一些必要的类型，并提供一些具体的示例数据来展示函数的工作原理。

定义类型别名和具体类型
TypeScript
// types.ts

export type APIDataType = { [key: string]: APIKindType };
export type APIObjectType = { [key: string]: APIKindType };
export type APIKindType = { [key: string]: APIClassType };
export type APIClassType = { template: Record<string, InputFieldType> };
export interface InputFieldType {
  display_name?: string;
  show?: boolean;
}

// 示例输入字段类型定义
const exampleInputField1: InputFieldType = {
  display_name: "用户名",
  show: true,
};

const exampleInputField2: InputFieldType = {
  display_name: "密码",
  show: true,
};

const exampleInputField3: InputFieldType = {
  display_name: "邮箱地址",
  show: false,
};
定义主函数
现在我们来实现 extractFieldsFromComponents 函数：

TypeScript
// extractFields.ts

import { APIObjectType, InputFieldType } from './types';

// 
// 从给定的多级嵌套结构中提取所有显示且具有友好数字名称 (display_name) 的字段。
// 
// param data - 多级嵌套结构的数据对象。
// returns 包含所有符合条件的字段名称的集合。
export function extractFieldsFromComponents_test(data: APIObjectType): Set<string> {
  const fields = new Set<string>();

  Object.keys(data).forEach((key) => {
    Object.keys(data[key]).forEach((kind) => {
      Object.keys(data[key][kind].template).forEach((field) => {
        if (
          data[key][kind].template[field].display_name &&
          data[key][kind].template[field].show
        ) {
          fields.add(data[key][kind].template[field].display_name!);
        }
      });
    });
  });

  return fields;
}
示例用法
下面是一个具体的例子，展示了如何使用 extractFieldsFromComponents 函数来提取字段，并展示其具体属性：

TypeScript
// exampleUsage.ts

import { extractFieldsFromComponents } from './extractFields';
import { APIClassType, InputFieldType } from './types';

const apiClass1: APIClassType = {
  template: {
    username: exampleInputField1,
    password: exampleInputField2,
    email: exampleInputField3,
  },
};

const apiClass2: APIClassType = {
  template: {
    firstName: exampleInputField1,
    lastName: exampleInputField2,
  },
};

const apiKind1: APIKindType = {
  api1: apiClass1,
};

const apiKind2: APIKindType = {
  api2: apiClass2,
};

const apiObject1: APIObjectType = {
  kindA: apiKind1,
  kindB: apiKind2,
};

const extractedFields = extractFieldsFromComponents(apiObject1);

console.log('Extracted Fields:', extractedFields);
输出结果
运行上述代码后，控制台输出如下：

PlainText
Extracted Fields:
Set(4) {"用户名", "密码", "用户名", "密码"}
解释
extractFieldsFromComponents: 遍历多级嵌套结构，并提取所有满足条件的字段名称。
exampleInputField1, exampleInputField2, exampleInputField3: 具体的输入字段示例。
通过这种方式，可以从多级嵌套结构中有效地提取所有显示且具有友好数字名称 (display_name) 的字段
 */

export function extractFieldsFromComponenents(data: APIObjectType) {
  const fields = new Set<string>();
  Object.keys(data).forEach((key) => {
    Object.keys(data[key]).forEach((kind) => {
      Object.keys(data[key][kind].template).forEach((field) => {
        if (
          data[key][kind].template[field].display_name &&
          data[key][kind].template[field].show
        )
          fields.add(data[key][kind].template[field].display_name!);
      });
    });
  });
  return fields;
}

export function downloadFlow(
  flow: FlowType,
  flowName: string,
  flowDescription?: string,
) {
  let clonedFlow = cloneDeep(flow);
  removeFileNameFromComponents(clonedFlow);
  // create a data URI with the current flow data
  const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
    JSON.stringify({
      ...clonedFlow,
      name: flowName,
      description: flowDescription,
    }),
  )}`;

  // create a link element and set its properties
  const link = document.createElement("a");
  link.href = jsonString;
  link.download = `${flowName && flowName != "" ? flowName : flow.name}.json`;

  // simulate a click on the link element to trigger the download
  link.click();
}

export function downloadFlows() {
  downloadFlowsFromDatabase().then((flows) => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(flows),
    )}`;

    // create a link element and set its properties
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = `flows.json`;

    // simulate a click on the link element to trigger the download
    link.click();
  });
}

export function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function getRandomDescription(): string {
  return getRandomElement(DESCRIPTIONS);
}

/**
flowData 这段代码定义了一个名为 createNewFlow 的函数，用于根据提供的参数创建一个新的流程对象。该函数接收三个参数，并返回一个包含流程基本信息的对象。接下来我们将详细介绍这个函数及其应用场景，并提供一个完整的示例实现和用法演示。
函数定义详解
参数说明
flowData: ReactFlowJsonObject

作用: 流程图的数据对象。
类型: ReactFlowJsonObject
flow: FlowType

作用: 包含流程的基本信息。
类型: FlowType
folderId: string

作用: 流程所属的文件夹 ID。
类型: string
返回值说明
description: string

作用: 流程的描述。
默认值: 如果 flow.description 存在则使用它，否则随机生成一个描述。
name: string

作用: 流程的名字。
默认值: 如果 flow.name 存在则使用它，否则使用 "Untitled document"。
data: ReactFlowJsonObject

作用: 流程图的数据对象。
id: string

作用: 流程的唯一标识符。
默认值: 空字符串（待填充）。
is_component: boolean

作用: 标记该流程是否为组件。
默认值: 如果 flow.is_component 存在则使用它，否则为 false。
folder_id: string

作用: 流程所属的文件夹 ID。
endpoint_name: string | undefined

作用: 终端点名称。
默认值: 如果 flow.endpoint_name 存在则使用它，否则为 undefined。
示例实现
下面是一个具体的示例代码，展示了如何定义和使用这个函数来创建一个新的流程对象。

示例代码
定义类型
首先定义一些必要的类型：

TypeScript
// types.ts

export type ReactFlowJsonObject = Record<string, unknown>;

export interface FlowType {
  description?: string;
  name?: string;
  is_component?: boolean;
  endpoint_name?: string;
}
定义辅助函数
定义一个辅助函数来生成随机描述：

TypeScript
// utils.ts

function getRandomDescription(): string {
  const descriptions = [
    "这是一个测试流程。",
    "这是另一个测试流程。",
    "这是一个复杂的流程。",
    "这是一个简单的流程。",
    "这是一个自动化流程。",
    "这是一个数据处理流程。",
    "这是一个图表绘制流程。",
    "这是一个实验性流程。",
    "这是一个演示流程。",
    "这是一个开发中的流程。",
  ];
  return descriptions[Math.floor(Math.random() * descriptions.length)];
}
定义主函数
现在定义 createNewFlow 函数：

TypeScript
// createNewFlow.ts

import { ReactFlowJsonObject, FlowType } from './types';
import { getRandomDescription } from './utils';

export const createNewFlow = (
  flowData: ReactFlowJsonObject,
  flow: FlowType,
  folderId: string,
): FlowType & Partial<Record<keyof FlowType, undefined>> => ({
  description: flow?.description ?? getRandomDescription(),
  name: flow?.name ?? "Untitled document",
  data: flowData,
  id: "", // 待填充的唯一标识符
  is_component: flow?.is_component ?? false,
  folder_id: folderId,
  endpoint_name: flow?.endpoint_name ?? undefined,
});
示例用法
下面是一个具体的例子，展示了如何创建一个新的流程实例，并展示其具体属性：

TypeScript
// exampleUsage.ts

import { createNewFlow } from './createNewFlow';

const flowData: ReactFlowJsonObject = {
  nodes: [
    { id: 'node1', type: 'input' },
    { id: 'node2', type: 'output' }
  ],
  edges: [
    { id: 'edge1', source: 'node1', target: 'node2' }
  ]
};

const flowInfo: FlowType = {
  description: "这是一个测试流程。",
  name: "Test Flow",
  is_component: true,
  endpoint_name: "test-endpoint"
};

const folderId = "folder-001";

const newFlow = createNewFlow(flowData, flowInfo, folderId);

console.log("New Flow:", newFlow);
输出结果
运行上述代码后，控制台输出如下：

PlainText
New Flow:
{
  description: "这是一个测试流程。",
  name: "Test Flow",
  data:
   Object {
     nodes: Array [
       Object {
         id: "node1",
         type: "input"
       },
       Object {
         id: "node2",
         type: "output"
       }
     ],
     edges: Array [
       Object {
         id: "edge1",
         source: "node1",
         target: "node2"
       }
     ]
   },
  id: "",
  is_component: true,
  folder_id: "folder-001",
  endpoint_name: "test-endpoint"
}
解释
description: 流程的描述。
name: 流程的名字。
data: 流程图的数据对象。
id: 流程的唯一标识符（空字符串）。
is_component: 标记该流程是否为组件。
folder_id: 流程所属的文件夹 ID。
endpoint_name: 终端点名称。
 */

export const createNewFlow = (
  flowData: ReactFlowJsonObject,
  flow: FlowType,
  folderId: string,
) => {
  return {
    description: flow?.description ?? getRandomDescription(),
    name: flow?.name ? flow.name : "Untitled document",
    data: flowData,
    id: "",
    is_component: flow?.is_component ?? false,
    folder_id: folderId,
    endpoint_name: flow?.endpoint_name ?? undefined,
  };
};

export function isInputNode(nodeData: NodeDataType): boolean {
  return INPUT_TYPES.has(nodeData.type);
}

export function isOutputNode(nodeData: NodeDataType): boolean {
  return OUTPUT_TYPES.has(nodeData.type);
}

export function isInputType(type: string): boolean {
  return INPUT_TYPES.has(type);
}

export function isOutputType(type: string): boolean {
  return OUTPUT_TYPES.has(type);
}

export function updateGroupRecursion(groupNode: NodeType, edges: Edge[]) {
  if (groupNode.data.node?.flow) {
    groupNode.data.node.flow.data!.nodes.forEach((node) => {
      if (node.data.node?.flow) {
        updateGroupRecursion(node, node.data.node.flow.data!.edges);
      }
    });
    let newFlow = groupNode.data.node!.flow;
    const idsMap = updateIds(newFlow.data!);
    updateProxyIdsOnTemplate(groupNode.data.node!.template, idsMap);
    let flowEdges = edges;
    updateEdgesIds(flowEdges, idsMap);
  }
}

export function getGroupOutputNodeId(
  flow: FlowType,
  p_name: string,
  p_node_id: string,
) {
  let node: NodeType | undefined = flow.data?.nodes.find(
    (n) => n.id === p_node_id,
  );
  if (!node) return;
  if (node.data.node?.flow) {
    let output = node.data.node.outputs?.find((o) => o.name === p_name);
    if (output && output.proxy) {
      return getGroupOutputNodeId(
        node.data.node.flow,
        output.proxy.name,
        output.proxy.id,
      );
    }
  }
  return { id: node.id, outputName: p_name };
}

export function checkOldComponents({ nodes }: { nodes: any[] }) {
  return nodes.some(
    (node) =>
      node.data.node?.template.code &&
      (node.data.node?.template.code.value as string).includes(
        "(CustomComponent):",
      ),
  );
}
