import { Edge, Node, Viewport } from "reactflow";
import { ChatInputType, ChatOutputType } from "../chat";
import { FlowType } from "../flow";
//kind and class are just representative names to represent the actual structure of the object received by the API
export type APIDataType = { [key: string]: APIKindType };
export type APIObjectType = { [key: string]: APIKindType };
export type APIKindType = { [key: string]: APIClassType };
export type APITemplateType = {
  [key: string]: InputFieldType;
};

export type CustomFieldsType = {
  [key: string]: Array<string>;
};

export type CustomComponentRequest = {
  data: APIClassType;
  type: string;
};


/**
 * 在这段 TypeScript 类型定义中，使用了索引签名（index signature）来定义一个泛型对象。这种对象允许动态添加任意数量的字符串键，并且每个键对应的值可以是多种类型的其中之一。具体来说，这里的值可以是：

数组形式的字符串 (Array<string>),
单个字符串 (string),
类型为 APITemplateType,
布尔值 (boolean),
类型为 FlowType,
类型为 CustomFieldsType,
不确定 (undefined),
数组形式的对象 { types: Array<string>; selected?: string }.
# # 类型定义详解
让我们详细解释一下这段类型的定义：

TypeScript
type MyObjectType = {
    [key: string]: 
        | Array<string> 
        | string 
        | APITemplateType 
        | boolean 
        | FlowType 
        | CustomFieldsType 
        | undefined 
        | Array<{ types: Array<string>; selected?: string }> 
};
逐行解释：
[key: string]: 指定对象的键可以是任意字符串。
| Array<string>: 键对应的值可以是一个字符串数组。
| string: 键对应的值可以是一个字符串。
| APITemplateType: 键对应的值可以是一个类型为 APITemplateType 的对象。
| boolean: 键对应的值可以是一个布尔值。
| FlowType: 键对应的值可以是一个类型为 FlowType 的对象。
| CustomFieldsType: 键对应的值可以是一个类型为 CustomFieldsType 的对象。
| undefined: 键对应的值可以是未定义（undefined）。
| Array<{ types: Array<string>; selected?: string }>: 键对应的值可以是一个对象数组，每个对象有一个 types 属性（字符串数组）以及一个可选的 selected 属性（字符串）。
# # 示例代码
下面是一个具体的示例，展示如何使用这种类型的对象。

定义辅助类型
首先定义一些辅助类型：

TypeScript
type APITemplateType = {
    url: string;
    method: string;
    headers: Record<string, string>;
};

type FlowType = {
    name: string;
    id: string;
    data: ReactFlowJsonObject | null;
    description: string;
    // 其他属性...
};

type CustomFieldsType = {
    field1: string;
    field2: number;
};

type ReactFlowJsonObject = Record<string, any>;
创建对象实例
接下来创建一个符合 MyObjectType 规定的对象实例：

TypeScript
const myObject: MyObjectType = {
    key1: ['value1', 'value2'],
    key2: 'singleValue',
    key3: {
        url: 'https://api.example.com/data',
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    },
    key4: true,
    key5: {
        name: 'Sample Flow',
        id: 'sample-flow-id',
        data: {
            nodes: [
                { id: 'node1', type: 'input', position: { x: 100, y: 100 } },
                { id: 'node2', type: 'output', position: { x: 300, y: 200 } }
            ],
            edges: [
                { id: 'edge1', source: 'node1', target: 'node2' }
            ]
        },
        description: '这是一个示例流程'
    },
    key6: {
        field1: 'field value',
        field2: 42
    },
    key7: undefined,
    key8: [
        { types: ['type1', 'type2'], selected: 'type1' },
        { types: ['type3'] }
    ]
};
使用对象实例
接下来展示如何在实际应用中使用这个对象实例：

TypeScript
function displayObjectDetails(obj: MyObjectType) {
    Object.keys(obj).forEach(key => {
        const value = obj[key];
        
        if (Array.isArray(value)) {
            console.log(`${key}: Array of strings`);
            value.forEach(item => console.log(` - ${item}`));
        } else if (typeof value === 'string') {
            console.log(`${key}: String - ${value}`);
        } else if ('url' in value && typeof value.url === 'string') {
            console.log(`${key}: APITemplateType`);
            console.log(` - URL: ${value.url}`);
            console.log(` - Method: ${value.method}`);
            console.log(` - Headers:`);
            Object.entries(value.headers).forEach(([headerKey, headerValue]) => console.log(`   - ${headerKey}: ${headerValue}`));
        } else if ('name' in value && typeof value.name === 'string') {
            console.log(`${key}: FlowType`);
            console.log(` - Name: ${value.name}`);
            console.log(` - ID: ${value.id}`);
            
            if (value.data && value.data.nodes && Array.isArray(value.data.nodes)) {
                console.log(` - Nodes:`);
                value.data.nodes.forEach(node => {
                    console.log(`   - ID: ${node.id}, Type: ${node.type}, Position: (${node.position.x}, ${node.position.y})`);
                });
                
                if (Array.isArray(value.data.edges)) {
                    console.log(` - Edges:`);
                    value.data.edges.forEach(edge => {
                        console.log(`   - ID: ${edge.id}, Source: ${edge.source}, Target: ${edge.target}`);
                    });
                }
            }
            
            if (value.description) {
                console.log(` - Description: ${value.description}`);
            }
        } else if ('field1' in value && typeof value.field1 === 'string') {
            console.log(`${key}: CustomFieldsType`);
            console.log(` - Field 1: ${value.field1}`);
            console.log(` - Field 2: ${value.field2}`);
        } else if (value === undefined) {
            console.log(`${key}: Undefined`);
        } else if (Array.isArray(value)) {
            console.log(`${key}: Array of objects with types and selected`);
            value.forEach(item => {
                console.log(` - Types: ${item.types.join(', ')}`);
                if (item.selected !== undefined) {
                    console.log(`   Selected: ${item.selected}`);
                }
            });
        } else {
            console.log(`${key}: Unknown Value`);
        }
    });
}

displayObjectDetails(myObject);
解释
定义类型：

MyObjectType 定义了一个泛型对象，其键可以是任意字符串，值可以是多种类型之一。
创建实例：

根据 MyObjectType 创建一个具体的对象实例，并填充各种类型的值。
显示详情：

定义一个函数来遍历对象的每一个键值对，并根据不同类型的值进行相应的处理和打印。
通过这种方式，你可以更好地理解和管理这种泛型对象，并确保代码的一致性和健壮性。
 */
export type APIClassType = {
  base_classes?: Array<string>;
  description: string;
  template: APITemplateType;
  display_name: string;
  icon?: string;
  edited?: boolean;
  is_input?: boolean;
  is_output?: boolean;
  conditional_paths?: Array<string>;
  input_types?: Array<string>;
  output_types?: Array<string>;
  custom_fields?: CustomFieldsType;
  beta?: boolean;
  documentation: string;
  error?: string;
  official?: boolean;
  outputs?: Array<OutputFieldType>;
  frozen?: boolean;
  flow?: FlowType;
  field_order?: string[];
  [key: string]:
    | Array<string>
    | string
    | APITemplateType
    | boolean
    | FlowType
    | CustomFieldsType
    | boolean
    | undefined
    | Array<{ types: Array<string>; selected?: string }>;
};

export type InputFieldType = {
  type: string;
  required: boolean;
  placeholder?: string;
  list: boolean;
  show: boolean;
  readonly: boolean;
  multiline?: boolean;
  value?: any;
  dynamic?: boolean;
  proxy?: { id: string; field: string };
  input_types?: Array<string>;
  display_name?: string;
  name?: string;
  real_time_refresh?: boolean;
  refresh_button?: boolean;
  refresh_button_text?: string;
  [key: string]: any;
};

export type OutputFieldProxyType = {
  id: string;
  name: string;
  nodeDisplayName: string;
};

export type OutputFieldType = {
  types: Array<string>;
  selected?: string;
  name: string;
  display_name: string;
  hidden?: boolean;
  proxy?: OutputFieldProxyType;
};
export type sendAllProps = {
  nodes: Node[];
  edges: Edge[];
  name: string;
  description: string;
  viewport: Viewport;
  inputs: { text?: string };
  chatKey: string;
  chatHistory: { message: string | object; isSend: boolean }[];
};
export type errorsTypeAPI = {
  function: { errors: Array<string> };
  imports: { errors: Array<string> };
};
export type PromptTypeAPI = {
  input_variables: Array<string>;
  frontend_node: APIClassType;
};

export type BuildStatusTypeAPI = {
  built: boolean;
};

export type InitTypeAPI = {
  flowId: string;
};

export type UploadFileTypeAPI = {
  file_path: string;
  flowId: string;
};

export type ProfilePicturesTypeAPI = {
  files: string[];
};

export type LoginType = {
  grant_type?: string;
  username: string;
  password: string;
  scrope?: string;
  client_id?: string;
  client_secret?: string;
};

export type LoginAuthType = {
  access_token: string;
  refresh_token: string;
  token_type?: string;
};

export type changeUser = {
  username?: string;
  is_active?: boolean;
  is_superuser?: boolean;
  password?: string;
  profile_image?: string;
};

export type resetPasswordType = {
  password?: string;
  profile_image?: string;
};

export type Users = {
  id: string;
  username: string;
  is_active: boolean;
  is_superuser: boolean;
  profile_image: string;
  create_at: Date;
  updated_at: Date;
};

export type Component = {
  name: string;
  description: string;
  data: Object;
  tags: [string];
};

export type VerticesOrderTypeAPI = {
  ids: Array<string>;
  vertices_to_run: Array<string>;
  run_id: string;
};

export type VertexBuildTypeAPI = {
  id: string;
  inactivated_vertices: Array<string> | null;
  next_vertices_ids: Array<string>;
  top_level_vertices: Array<string>;
  run_id?: string;
  valid: boolean;
  data: VertexDataTypeAPI;
  timestamp: string;
  params: any;
  messages: ChatOutputType[] | ChatInputType[];
  artifacts: any | ChatOutputType | ChatInputType;
};

export type ErrorLogType = {
  errorMessage: string;
  stackTrace: string;
};

export type OutputLogType = {
  message: any | ErrorLogType;
  type: string;
};

// data is the object received by the API
// it has results, artifacts, timedelta, duration
export type VertexDataTypeAPI = {
  results: { [key: string]: string };
  outputs: { [key: string]: OutputLogType };
  messages: ChatOutputType[] | ChatInputType[];
  inactive?: boolean;
  timedelta?: number;
  duration?: string;
  artifacts?: any | ChatOutputType | ChatInputType;
  message?: ChatOutputType | ChatInputType;
};

export type CodeErrorDataTypeAPI = {
  error: string | undefined;
  traceback: string | undefined;
};

// the error above is inside this error.response.data.detail.error
// which comes from a request to the API
// to type the error we need to know the structure of the object

// error that has a response, that has a data, that has a detail, that has an error
export type ResponseErrorTypeAPI = {
  response: { data: { detail: CodeErrorDataTypeAPI } };
};
export type ResponseErrorDetailAPI = {
  response: { data: { detail: string } };
};
