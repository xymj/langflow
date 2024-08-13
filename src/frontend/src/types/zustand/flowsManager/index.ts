/**
 * 这段代码的作用是从 reactflow 库中导入四个核心类型：Edge, Node, Viewport, 和 XYPosition。这些都是在使用 reactflow 构建图形界面时常用的类型定义。

类型解释
1. Edge
Edge 是描述图中的边（连线）的数据类型。

2. Node
Node 是描述图中的节点（元素）的数据类型。

3. Viewport
Viewport 描述视口（可视区域）的位置和缩放级别等信息。

4. XYPosition
XYPosition 描述二维空间中的点位置（x,y 坐标）。

示例代码
下面是一个详细的示例，展示了如何使用这些类型来创建简单的图形界面组件。

定义类型文件
首先，在当前文件中导入这些类型：

TypeScript
import { Edge, Node, Viewport, XYPosition } from "reactflow";
创建示例实例
接下来创建一些具体的示例实例：

节点（Node）
TypeScript
const node1: Node = {
    id: 'node1',
    type: 'input',
    data: { label: '输入节点' },
    position: { x: 100, y: 100 }
};

const node2: Node = {
    id: 'node2',
    type: 'output',
    data: { label: '输出节点' },
    position: { x: 300, y: 200 }
};
边（Edge）
TypeScript
const edge1: Edge = {
    id: 'edge1',
    source: 'node1',
    target: 'node2',
    type: 'smoothstep'
};
视口（Viewport）
TypeScript
const viewport: Viewport = {
    width: 800,
    height: 600,
    x: 0,
    y: 0,
    zoom: 1
};
使用实例
接下来展示如何在实际应用中使用这些类型：

TypeScript
function displayGraphDetails(nodes: Node[], edges: Edge[], viewport: Viewport) {
    console.log(`Viewport Width: ${viewport.width}`);
    console.log(`Viewport Height: ${viewport.height}`);
    console.log(`Viewport X Position: ${viewport.x}`);
    console.log(`Viewport Y Position: ${viewport.y}`);
    console.log(`Viewport Zoom Level: ${viewport.zoom}`);

    console.log('Nodes:');
    nodes.forEach(node => {
        console.log(` - ID: ${node.id}`);
        console.log(` - Type: ${node.type}`);
        console.log(` - Label: ${node.data.label}`);
        console.log(` - Position: (${node.position.x}, ${node.position.y})`);
    });

    console.log('Edges:');
    edges.forEach(edge => {
        console.log(` - ID: ${edge.id}`);
        console.log(` - Source: ${edge.source}`);
        console.log(` - Target: ${edge.target}`);
        console.log(` - Type: ${edge.type}`);
    });
}

const nodes = [node1, node2];
const edges = [edge1];

displayGraphDetails(nodes, edges, viewport);
解释
定义类型：

从 reactflow 库中导入四种常用类型：Edge, Node, Viewport, 和 XYPosition。
创建实例：

根据 Node 类型创建两个具体的节点实例，并填充必要的属性。
根据 Edge 类型创建一个具体的边实例，并填充必要的属性。
根据 Viewport 类型创建一个视口实例，并设置宽度、高度、位置和缩放级别。
显示详情：

定义一个函数来展示图形界面的详细信息。
输出视口的各项属性以及节点和边的具体值，便于调试和查看。
通过这种方式，你可以更好地理解和管理图形界面的数据结构
 */
import { Edge, Node, Viewport, XYPosition } from "reactflow";
import { FlowType } from "../../flow";

export type FlowsManagerStoreType = {
  getFlowById: (id: string) => FlowType | undefined;
  flows: Array<FlowType>;
  allFlows: Array<FlowType>;
  setAllFlows: (flows: FlowType[]) => void;
  setFlows: (flows: FlowType[]) => void;
  currentFlow: FlowType | undefined;
  currentFlowId: string;
  setCurrentFlowId: (currentFlowId: string) => void;
  saveLoading: boolean;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  refreshFlows: () => Promise<void>;
  saveFlow: (flow: FlowType, silent?: boolean) => Promise<void> | undefined;
  saveFlowDebounce: (
    flow: FlowType,
    silent?: boolean,
  ) => Promise<void> | undefined;
  autoSaveCurrentFlow: (
    nodes: Node[],
    edges: Edge[],
    viewport: Viewport,
  ) => void;
  uploadFlows: () => Promise<void>;
  uploadFlow: ({
    newProject,
    file,
    isComponent,
    position,
  }: {
    newProject: boolean;
    file?: File;
    isComponent: boolean | null;
    position?: XYPosition;
  }) => Promise<string | never>;
  addFlow: (
    newProject: boolean,
    flow?: FlowType,
    override?: boolean,
    position?: XYPosition,
    fromDragAndDrop?: boolean,
  ) => Promise<string | undefined>;
  deleteComponent: (key: string) => Promise<void>;
  removeFlow: (id: string | string[]) => Promise<void>;
  saveComponent: (
    component: any,
    override: boolean,
  ) => Promise<string | undefined>;
  undo: () => void;
  redo: () => void;
  takeSnapshot: () => void;
  examples: Array<FlowType>;
  setExamples: (examples: FlowType[]) => void;
  setCurrentFlow: (flow: FlowType) => void;
  setSearchFlowsComponents: (search: string) => void;
  searchFlowsComponents: string;
  selectedFlowsComponentsCards: string[];
  setSelectedFlowsComponentsCards: (selected: string[]) => void;
};

export type UseUndoRedoOptions = {
  maxHistorySize: number;
  enableShortcuts: boolean;
};
