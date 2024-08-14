import { Edge, Node, Viewport } from "reactflow";
import { ChatInputType, ChatOutputType } from "../chat";
import { FlowType } from "../flow";


/**
 * 这段代码定义了几个 TypeScript 类型别名，用于描述不同层次的 API 数据结构。具体来说，包括 APIDataType、APIObjectType 和 APIKindType。这些类型分别代表不同的抽象层次，并最终指向具体的 APIClassType。下面我们逐一解释这些类型的含义及用途，并提供一个完整的示例实现和用法演示。

类型定义详解
1. APIDataType
作用: 表示顶层的数据结构。
形式: 键值对集合，其中键为字符串类型，值为 APIKindType 类型。
用途: 可以用来组织一组 API 种类数据。
2. APIObjectType
作用: 表示中间层的数据结构。
形式: 键值对集合，其中键为字符串类型，值为 APIKindType 类型。
用途: 可以用来组织一组特定种类下的 API 对象数据。
3. APIKindType
作用: 表示具体的 API 种类数据结构。
形式: 键值对集合，其中键为字符串类型，值为 APIClassType 类型。
用途: 可以用来组织一组具体的 API 实例。
4. APIClassType
作用: 表示具体的 API 实例类型。
形式: 具体的类或接口类型。
用途: 存储具体的 API 实现细节。
示例实现
为了更好地理解这些类型之间的关系以及如何使用它们，我们可以通过一个具体的例子来展示整个过程。

定义类型别名和具体类型
TypeScript
// types.ts

export type APIDataType = { [key: string]: APIKindType };
export type APIObjectType = { [key: string]: APIKindType };
export type APIKindType = { [key: string]: APIClassType };

// 具体的 API 类型定义
export interface APIClassType {
  name: string;
  url: string;
  method: string;
  headers?: Record<string, string>;
  body?: Record<string, unknown>;
}
创建具体的 API 数据结构
TypeScript
// apiData.ts

import { APIDataType, APIClassType } from './types';

// 创建具体的 API 实例
const apiClass1: APIClassType = {
  name: 'Get User Info',
  url: '/api/user/info',
  method: 'GET',
};

const apiClass2: APIClassType = {
  name: 'Create New User',
  url: '/api/user/create',
  method: 'POST',
  body: { username: 'john_doe', password: 'secret' },
};

// 创建 API 种类数据
const apiKind1: APIKindType = {
  api1: apiClass1,
  api2: apiClass2,
};

// 创建 API 对象数据
const apiObject1: APIObjectType = {
  kindA: apiKind1,
};

// 创建顶层 API 数据结构
const apiData: APIDataType = {
  groupA: apiObject1,
};

console.log('API Data:', apiData);
输出结果
运行上述代码后，控制台输出如下：

PlainText
API Data:
{
  groupA:
   Object {
     kindA:
      Object {
        api1:
         Object {
           body: undefined,
           headers: undefined,
           method: "GET",
           name: "Get User Info",
           url: "/api/user/info"
         },
        api2:
         Object {
           body:
            Object {
              password: "secret",
              username: "john_doe"
            },
           headers: undefined,
           method: "POST",
           name: "Create New User",
           url: "/api/user/create"
         }
      }
   }
}
解释
groupA: 表示顶层的数据分组。
kindA: 表示中间层的 API 种类分组。
api1 和 api2: 分别表示具体的 API 实例。
 */
//kind and class are just representative names to represent the actual structure of the object received by the API
export type APIDataType = { [key: string]: APIKindType };
export type APIObjectType = { [key: string]: APIKindType };
export type APIKindType = { [key: string]: APIClassType };

/**
 * 这段代码定义了一个 TypeScript 类型 APITemplateType，用于表示 API 模板的结构。其中每个键对应一种输入字段类型。接下来我们将详细介绍这个类型及其应用场景。

类型定义详解
属性说明
[key: string]: 泛型键值对，表示任意数量的键值对。
InputFieldType: 表示每个键对应的值类型。
示例实现
假设我们需要定义一个 API 模板类型 APITemplateType，其中包含多个输入字段类型 InputFieldType。我们可以先定义 InputFieldType 的具体内容，然后再定义 APITemplateType。

定义输入字段类型
TypeScript
// inputFieldTypes.ts

// 输入字段类型定义
export interface InputFieldType {
  type: string;
  required?: boolean;
  defaultValue?: any;
}

// 示例输入字段类型定义
const exampleInputField: InputFieldType = {
  type: "string",
  required: true,
  defaultValue: "default value"
};
定义 API 模板类型
基于上面定义的 InputFieldType，我们现在可以定义 APITemplateType：

TypeScript
// apitemplateType.ts

import { InputFieldType } from "./inputFieldTypes";

// API 模板类型定义
export type APITemplateType = {
  [key: string]: InputFieldType;
};

// 示例 API 模板数据结构
const exampleAPI: APITemplateType = {
  username: {
    type: "string",
    required: true,
    defaultValue: "john_doe"
  },
  password: {
    type: "password",
    required: true,
    defaultValue: "secure_password"
  },
  email: {
    type: "email",
    required: false,
    defaultValue: "john@example.com"
  }
};

console.log("Example API Template:", exampleAPI);
示例用法
下面是一个具体的例子，展示了如何使用 APITemplateType 来创建一个 API 模板实例。

示例代码
TypeScript
import { APITemplateType, InputFieldType } from "./apitemplateType";

// 创建一个 API 模板实例
const apiTemplate: APITemplateType = {
  username: {
    type: "string",
    required: true,
    defaultValue: "john_doe"
  },
  password: {
    type: "password",
    required: true,
    defaultValue: "secure_password"
  },
  email: {
    type: "email",
    required: false,
    defaultValue: "john@example.com"
  }
};

console.log("API Template:", apiTemplate);
输出结果
运行上述代码后，控制台输出如下：

PlainText
API Template:
{
  username:
   { type: 'string', required: true, defaultValue: 'john_doe' },
  password:
   { type: 'password', required: true, defaultValue: 'secure_password' },
  email:
   { type: 'email', required: false, defaultValue: 'john@example.com' }
}
解释
username: 表示用户名字段。
password: 表示密码字段。
email: 表示电子邮件字段。
每个字段都包含以下属性：

type: 字段类型（如 string, password, email）。
required: 是否必填，默认为可选。
defaultValue: 默认值，默认为可选。
通过这种方式，可以有效地管理和描述 API 模板中的各个输入字段及其相关信息
 */
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



/**
 * 这段代码定义了一个 TypeScript 类型 InputFieldType，用于描述表单输入字段的各种属性。接下来我们将详细介绍这个类型及其应用场景，并提供一个完整的示例实现和用法演示。

类型定义详解
属性说明
type:

作用: 指定输入字段的类型（如 'text', 'number', 'date', 'checkbox', 'select', 'textarea', 'file', 'email', 'url', 'password', 'radio', 'range', 'search', 'tel', 'time', 'month', 'week', 'color', 'datetime-local', 'hidden', 'submit', 'button', 'reset', 'image', 'search', 'url' 等）。
默认值: 必填项。
required:

作用: 标记该字段是否必填。
默认值: 必填项（布尔值）。
placeholder?:

作用: 提供占位符文本提示用户输入内容。
默认值: 可选（默认为 undefined）。
list:

作用: 标记该字段是否包含列表选择项（如 <datalist>）。
默认值: 必填项（布尔值）。
show:

作用: 标记该字段是否可见。
默认值: 必填项（布尔值）。
readonly:

作用: 标记该字段是否只读。
默认值: 必填项（布尔值）。
multiline?:

作用: 标记该字段是否允许多行输入（仅适用于文本字段）。
默认值: 可选（默认为 undefined）。
value?:

作用: 设置初始值或当前值。
默认值: 可选（默认为 undefined）。
dynamic?:

作用: 标记该字段是否动态更新。
默认值: 可选（默认为 undefined）。
proxy?:

作用: 关联其他字段或外部数据源。
默认值: 可选（默认为 undefined）。
属性:
id: 关联的唯一标识符。
field: 关联的具体字段名。
input_types?:

作用: 列出该字段支持的所有子类型。
默认值: 可选（默认为 undefined）。
类型: 字符串数组。
display_name?:

作用: 显示给用户的友好名称。
默认值: 可选（默认为 undefined）。
name?:

作用: 字段的实际名称（提交表单时使用的名称）。
默认值: 可选（默认为 undefined）。
real_time_refresh?:

作用: 标记该字段是否实时刷新。
默认值: 可选（默认为 undefined）。
refresh_button?:

作用: 标记该字段是否有刷新按钮。
默认值: 可选（默认为 undefined）。
refresh_button_text?:

作用: 刷新按钮的文字提示。
默认值: 可选（默认为 undefined）。
扩展属性
[key: string]: any:
作用: 允许扩展额外的自定义属性。
示例实现
下面是一个具体的示例代码，展示了如何定义和使用这种类型的输入字段数据结构。

定义输入字段类型
TypeScript
// inputFieldTypes.ts

// 输入字段类型定义
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
使用输入字段类型
下面是一个具体的例子，展示了如何创建一个输入字段实例，并展示其具体属性。

TypeScript
// exampleUsage.ts

import { InputFieldType } from "./inputFieldTypes";

// 创建一个输入字段实例
const inputField: InputFieldType = {
  type: "text",
  required: true,
  placeholder: "请输入用户名",
  list: false,
  show: true,
  readonly: false,
  multiline: false,
  value: "",
  dynamic: false,
  proxy: undefined,
  input_types: ["text"],
  display_name: "用户名",
  name: "username",
  real_time_refresh: false,
  refresh_button: false,
  refresh_button_text: ""
};

console.log("Input Field:", inputField);
输出结果
运行上述代码后，控制台输出如下：

PlainText
Input Field:
{
  type: 'text',
  required: true,
  placeholder: '请输入用户名',
  list: false,
  show: true,
  readonly: false,
  multiline: false,
  value: '',
  dynamic: false,
  proxy: undefined,
  input_types: [ 'text' ],
  display_name: '用户名',
  name: 'username',
  real_time_refresh: false,
  refresh_button: false,
  refresh_button_text: ''
}
解释
type: 字段类型（如 'text', 'number', 'date', 'checkbox', 'select', 'textarea', 'file', 'email', 'url', 'password', 'radio', 'range', 'search', 'tel', 'time', 'month', 'week', 'color', 'datetime-local', 'hidden', 'submit', 'button', 'reset', 'image', 'search', 'url' 等）。
required: 是否必填（布尔值）。
placeholder?: 占位符文本提示（可选）。
list: 是否包含列表选择项（布尔值）。
show: 是否可见（布尔值）。
readonly: 是否只读（布尔值）。
multiline?: 是否允许多行输入（仅适用于文本字段）（可选）。
value?: 初始值或当前值（可选）。
dynamic?: 是否动态更新（可选）。
proxy?: 关联其他字段或外部数据源（可选）。
input_types?: 支持的所有子类型列表（可选）。
display_name?: 显示给用户的友好名称（可选）。
name?: 字段的实际名称（提交表单时使用的名称）（可选）。
real_time_refresh?: 是否实时刷新（可选）。
refresh_button?: 是否有刷新按钮（可选）。
refresh_button_text?: 刷新按钮的文字提示（可选）。
 */
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
