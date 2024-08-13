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
    processFlowNodes(flow);
    //add animation to text type edges
    updateEdges(data.edges);
    // updateNodes(data.nodes, data.edges);
    if (refreshIds) updateIds(data); // Assuming updateIds is defined elsewhere
  }
  return data;
};

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
 * 
 * 这段代码实现了两个函数：scapedJSONStringify 和 scapeJSONParse。这两个函数分别用于序列化和解析 JSON 对象，并在过程中替换双引号 (") 为特殊字符 (œ) 来避免 JSON 中的双引号引起的问题。
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

/**
 * 将 JSON 对象序列化为字符串，并将所有双引号替换为特殊字符 'œ'。
 *
 * @param json - 需要序列化的 JSON 对象。
 * @returns 替换了双引号后的字符串化 JSON 对象。
// export function scapedJSONStringify(json: object): string {
//   return customStringify(json).replace(/"/g, "œ");
// }

/**
 * 将字符串化的 JSON 对象解析为原始对象形式，
 * 并将特殊字符 'œ' 替换回双引号。
 *
 * @param jsonStr - 需要解析的字符串化的 JSON 对象。
 * @returns 原始的 JSON 对象。
 */
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
 * 
 * @param nodeData 
 * 
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
 * @param version 
 * @returns 
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
