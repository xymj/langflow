/**
 * 这段代码从 React 核心库中导入了一些类型定义，主要涉及到的是 React 元素（ReactElement）、任意类型的 React 节点（ReactNode）以及可用于 setState 的动作类型（SetStateAction）。下面是对于这几个概念的具体解释：

# # 导入的关键类型
JavaScript
import { ReactElement, ReactNode, SetStateAction } from 'react';
##反思与总结
###关于 ReactElement
定义: 表示一个具体的 React 元素实例。
用途: 当你需要精确地处理或比较具体的 JSX 元素时使用此类型。
###关于 ReactNode
定义: 可以是任何可以插入到 React 组件中的东西，包括但不限于文本节点、数字、null 或 false、JSX 元素、Fragment 或者函数组件的结果。
用途: 当你需要接受任何可被渲染的内容作为 prop 或者 state 的时候使用此类型。
###关于 SetStateAction<T>
定义: 代表在调用 setState 函数时所使用的动作类型。它可以是新的状态值 T 或者是一个接收旧状态作为参数并返回新状态的函数。
用途: 当你自定义 hook 或者高阶组件需要处理 state 更新逻辑的时候使用此类型。
# # 示例代码及应用场景分析
##场景一：定义通用组件接受任意类型的 children
假设我们想要创建一个通用容器组件，它可以接受任何形式的内容作为其子元素或文本内容：

JavaScriptReact
type Props = {
  children: ReactNode; // 接受任意可渲染的内容作为 children
};

function Container({ children }: Props) {
  return <div>{children}</div>;
}
在这个例子中，我们定义了一个名为 Container 的组件，它接受任意类型的 children prop，并将其直接渲染在其内部 div 元素内。

##场景二：自定义 hook 处理 state 更新逻辑
如果你正在开发自定义 hooks 或者高阶组件，并且需要处理 state 更新逻辑的话，那么 SetStateAction 类型就派上了大用场：

JavaScriptReact
type StateType = number;

function useCustomHook(): [number, (action: SetStateAction<number>) => void] {
  const [state, setState] = React.useState<StateType>(0);

  function customSetter(action: SetStateAction<number>) {
    if (typeof action === 'function') {
      setState(prev => action(prev));
    } else {
      setState(action);
    }
  }

  return [state, customSetter];
}

// 使用示例
const [currentNumber, updateNumber] = useCustomHook();

function increaseByOne() {
  updateNumber(prev => prev + 1); // 使用函数形式更新 state
}

function resetToZero() {
  updateNumber(0); // 使用具体数值更新 state
}
在这个例子中，我们创建了一个自定义 hook 名为 useCustomHook ，它返回当前 state 和一个用于更新 state 的 setter 函数。setter 函数接受一个泛型化的 SetStateAction<number> 参数，这意味着它可以接受具体的数值或者是计算出新 state 的函数。

##总结与扩展知识
理解并熟练掌握 React 中提供的类型定义对于编写健壮、易于维护的代码至关重要。通过使用像 ReactElement, ReactNode, 和 SetStateAction 这样的类型，你可以确保你的代码更加类型安全同时保持灵活性。此外，在实际开发过程中合理选择类型可以帮助减少潜在错误并提高代码质量。

通过上述示例和解释可以看出，React 提供的一系列类型定义不仅增强了代码的安全性与可读性，还极大地提高了开发效率。
 */
import { ReactElement, ReactNode, SetStateAction } from "react";
import { ReactFlowJsonObject } from "reactflow";
import { InputOutput } from "../../constants/enums";
import {
  APIClassType,
  APITemplateType,
  InputFieldType,
  OutputFieldProxyType,
} from "../api";
import { ChatMessageType } from "../chat";
import { FlowStyleType, FlowType, NodeDataType, NodeType } from "../flow/index";
import { sourceHandleType, targetHandleType } from "./../flow/index";
export type InputComponentType = {
  name?: string;
  autoFocus?: boolean;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  value?: string;
  disabled?: boolean;
  onChange?: (value: string, snapshot?: boolean) => void;
  password: boolean;
  required?: boolean;
  isForm?: boolean;
  editNode?: boolean;
  onChangePass?: (value: boolean | boolean) => void;
  showPass?: boolean;
  placeholder?: string;
  className?: string;
  id?: string;
  blurOnEnter?: boolean;
  optionsIcon?: string;
  optionsPlaceholder?: string;
  options?: string[];
  optionsButton?: ReactElement;
  optionButton?: (option: string) => ReactElement;
  selectedOption?: string;
  setSelectedOption?: (value: string) => void;
  selectedOptions?: string[];
  setSelectedOptions?: (value: string[]) => void;
  objectOptions?: Array<{ name: string; id: string }>;
  isObjectOption?: boolean;
  onChangeFolderName?: (e: any) => void;
};
export type ToggleComponentType = {
  enabled: boolean;
  setEnabled: (state: boolean) => void;
  disabled?: boolean | undefined;
  size: "small" | "medium" | "large";
  id?: string;
  editNode?: boolean;
};
export type DropDownComponentType = {
  disabled?: boolean;
  isLoading?: boolean;
  value: string;
  options: string[];
  onSelect: (value: string) => void;
  editNode?: boolean;
  id?: string;
  children?: ReactNode;
};
export type ParameterComponentType = {
  selected?: boolean;
  data: NodeDataType;
  title: string;
  conditionPath?: string | null;
  key: string;
  id: sourceHandleType | targetHandleType;
  colors: string[];
  left: boolean;
  type: string | undefined;
  required?: boolean;
  name?: string;
  tooltipTitle: string | undefined;
  optionalHandle?: Array<String> | null;
  info?: string;
  proxy?: { field: string; id: string };
  showNode?: boolean;
  index: number;
  onCloseModal?: (close: boolean) => void;
  outputName?: string;
  outputProxy?: OutputFieldProxyType;
};
export type InputListComponentType = {
  value: string[];
  onChange: (value: string[]) => void;
  disabled: boolean;
  editNode?: boolean;
  componentName?: string;
  playgroundDisabled?: boolean;
};

export type InputGlobalComponentType = {
  disabled: boolean;
  onChange: (value: string, snapshot?: boolean) => void;
  setDb: (value: boolean) => void;
  name: string;
  data: InputFieldType;
  editNode?: boolean;
  playgroundDisabled?: boolean;
};

export type KeyPairListComponentType = {
  value: any;
  onChange: (value: Object[]) => void;
  disabled: boolean;
  editNode?: boolean;
  duplicateKey?: boolean;
  editNodeModal?: boolean;
  isList?: boolean;
};

export type DictComponentType = {
  value: any;
  onChange: (value) => void;
  disabled?: boolean;
  editNode?: boolean;
  id?: string;
  left?: boolean;
  output?: boolean;
};

export type TextAreaComponentType = {
  field_name?: string;
  nodeClass?: APIClassType;
  setNodeClass?: (value: APIClassType) => void;
  disabled: boolean;
  onChange: (value: string[] | string, skipSnapshot?: boolean) => void;
  value: string;
  editNode?: boolean;
  id?: string;
  readonly?: boolean;
};

export type outputComponentType = {
  types: string[];
  selected: string;
  nodeId: string;
  frozen?: boolean;
  idx: number;
  name: string;
  proxy?: OutputFieldProxyType;
};

export type PromptAreaComponentType = {
  field_name?: string;
  nodeClass?: APIClassType;
  setNodeClass?: (value: APIClassType, code?: string) => void;
  disabled: boolean;
  onChange: (value: string[] | string, skipSnapshot?: boolean) => void;
  value: string;
  readonly?: boolean;
  editNode?: boolean;
  id?: string;
};

export type CodeAreaComponentType = {
  setOpenModal?: (bool: boolean) => void;
  disabled: boolean;
  onChange: (value: string[] | string, skipSnapshot?: boolean) => void;
  value: string;
  editNode?: boolean;
  nodeClass?: APIClassType;
  setNodeClass?: (value: APIClassType, code?: string) => void;
  dynamic?: boolean;
  id?: string;
  readonly?: boolean;
  open?: boolean;
  setOpen?: (open: boolean) => void;
};

export type FileComponentType = {
  IOInputProps?;
  disabled: boolean;
  onChange: (value: string[] | string, skipSnapshot?: boolean) => void;
  value: string;
  fileTypes: Array<string>;
  onFileChange: (value: string) => void;
  editNode?: boolean;
};

export type DisclosureComponentType = {
  children: ReactNode;
  defaultOpen: boolean;
  isChild?: boolean;
  button: {
    title: string;
    Icon: React.ElementType;
    buttons?: {
      Icon: ReactElement;
      title: string;
      onClick: (event?: React.MouseEvent) => void;
    }[];
  };
  testId?: string;
};

export type RangeSpecType = {
  min: number;
  max: number;
  step: number;
};

export type IntComponentType = {
  value: string;
  disabled?: boolean;
  rangeSpec: RangeSpecType;
  onChange: (value: string, skipSnapshot?: boolean) => void;
  editNode?: boolean;
  id?: string;
};

export type FloatComponentType = {
  value: string;
  disabled?: boolean;
  onChange: (value: string, skipSnapshot?: boolean) => void;
  rangeSpec: RangeSpecType;
  editNode?: boolean;
  id?: string;
};

export type FilePreviewType = {
  loading: boolean;
  file: File;
  error: boolean;
  id: string;
  path?: string;
};

export type TooltipComponentType = {
  children: ReactElement;
  title: string | ReactElement;
  placement?:
    | "bottom-end"
    | "bottom-start"
    | "bottom"
    | "left-end"
    | "left-start"
    | "left"
    | "right-end"
    | "right-start"
    | "right"
    | "top-end"
    | "top-start"
    | "top";
};

export type ProgressBarType = {
  children?: ReactElement;
  value?: number;
  max?: number;
};

export type AccordionComponentType = {
  children?: ReactElement;
  open?: string[];
  trigger?: string | ReactElement;
  disabled?: boolean;
  keyValue?: string;
  openDisc?: boolean;
  sideBar?: boolean;
  options?: { title: string; icon: string }[];
};
export type Side = "top" | "right" | "bottom" | "left";

export type ShadTooltipProps = {
  delayDuration?: number;
  side?: Side;
  content: ReactNode;
  children: ReactNode;
  style?: string;
};
export type ShadToolTipType = {
  content?: ReactNode | null;
  side?: "top" | "right" | "bottom" | "left";
  asChild?: boolean;
  children?: ReactElement;
  delayDuration?: number;
  styleClasses?: string;
};

export type TextHighlightType = {
  value?: string;
  side?: "top" | "right" | "bottom" | "left";
  asChild?: boolean;
  children?: ReactElement;
  delayDuration?: number;
};

export interface IVarHighlightType {
  name: string;
}

export type IconComponentProps = {
  name: string;
  className?: string;
  iconColor?: string;
  onClick?: () => void;
  stroke?: string;
  strokeWidth?: number;
  id?: string;
};

export type InputProps = {
  name: string | null;
  description: string | null;
  endpointName?: string;
  maxLength?: number;
  setName?: (name: string) => void;
  setDescription?: (description: string) => void;
  setEndpointName?: (endpointName: string) => void;
  invalidNameList?: string[];
};

export type TooltipProps = {
  selector: string;
  content?: string;
  disabled?: boolean;
  htmlContent?: React.ReactNode;
  className?: string; // This should use !impornant to override the default styles eg: '!bg-white'
  position?: "top" | "right" | "bottom" | "left";
  clickable?: boolean;
  children: React.ReactNode;
  delayShow?: number;
};

export type LoadingComponentProps = {
  remSize: number;
};

export type ContentProps = {
  children: ReactNode;
};
export type HeaderProps = { children: ReactNode; description: string };
export type TriggerProps = {
  children: ReactNode;
  tooltipContent?: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
};

export interface languageMap {
  [key: string]: string | undefined;
}

export type signUpInputStateType = {
  password: string;
  cnfPassword: string;
  username: string;
};

export type inputHandlerEventType = {
  target: {
    value: string;
    name: string;
  };
};
export type PaginatorComponentType = {
  pageSize: number;
  pageIndex: number;
  rowsCount?: number[];
  totalRowsCount: number;
  paginate: (pageIndex: number, pageSize: number) => void;
  storeComponent?: boolean;
};

export type ConfirmationModalType = {
  onCancel?: () => void;
  title: string;
  titleHeader?: string;
  destructive?: boolean;
  modalContentTitle?: string;
  cancelText: string;
  confirmationText: string;
  children:
    | [React.ReactElement<ContentProps>, React.ReactElement<TriggerProps>]
    | React.ReactElement<ContentProps>;
  icon: string;
  data?: any;
  index?: number;
  onConfirm: (index, data) => void;
  open?: boolean;
  onClose?: (close: boolean) => void;
  size?:
    | "x-small"
    | "smaller"
    | "small"
    | "medium"
    | "large"
    | "large-h-full"
    | "small-h-full"
    | "medium-h-full";
};

export type UserManagementType = {
  title: string;
  titleHeader: string;
  cancelText: string;
  confirmationText: string;
  children: ReactElement;
  icon: string;
  data?: any;
  index?: number;
  asChild?: boolean;
  onConfirm: (index, data) => void;
};

export type loginInputStateType = {
  username: string;
  password: string;
};

export type patchUserInputStateType = {
  password: string;
  cnfPassword: string;
  profilePicture: string;
  apikey: string;
};

export type UserInputType = {
  username: string;
  password: string;
  is_active?: boolean;
  is_superuser?: boolean;
  id?: string;
  create_at?: string;
  updated_at?: string;
};

export type ApiKeyType = {
  children: ReactElement;
  data?: any;
  onCloseModal: () => void;
};

export type StoreApiKeyType = {
  children: ReactElement;
  disabled?: boolean;
};
export type groupedObjType = {
  family: string;
  type: string;
  display_name?: string;
};

export type nodeGroupedObjType = {
  displayName: string;
  node: string[] | string;
};

type test = {
  [char: string]: string;
};

export type tweakType = Array<{
  [key: string]: {
    [char: string]: string;
  } & FlowStyleType;
}>;

export type uniqueTweakType = {
  [key: string]: {
    [char: string]: string;
  } & FlowStyleType;
};

export type apiModalTweakType = {
  current: Array<{
    [key: string]: {
      [char: string]: string | number;
    };
  }>;
};

export type nodeToolbarType = {
  data: {
    id: string;
    type: string;
    node: {
      base_classes: string[];
      description: string;
      display_name: string;
      documentation: string;
      edited: boolean;
      template: APITemplateType;
    };
    value: void;
  };
  deleteNode: (idx: string) => void;
  openPopUp: (element: JSX.Element) => JSX.Element;
};

export type chatTriggerPropType = {
  open: boolean;
  isBuilt: boolean;
  canOpen: boolean;
  setOpen: (can: boolean) => void;
};

export type headerFlowsType = {
  data: ReactFlowJsonObject | null;
  description: string;
  id: string;
  name: string;
  style?: FlowStyleType;
};

export type ChatInputType = {
  isDragging: boolean;
  files: FilePreviewType[];
  setFiles: (
    files: FilePreviewType[] | ((prev: FilePreviewType[]) => FilePreviewType[]),
  ) => void;
  chatValue: string;
  inputRef: {
    current: any;
  };
  lockChat: boolean;
  noInput: boolean;
  sendMessage: ({
    repeat,
    files,
  }: {
    repeat: number;
    files?: string[];
  }) => void;
  setChatValue: (value: string) => void;
};

export type editNodeToggleType = {
  advanced?: boolean;
  info?: string;
  list: boolean;
  multiline?: boolean;
  name?: string;
  password?: boolean;
  placeholder?: string;
  required: boolean;
  show: boolean;
  type: string;
};

export interface Props {
  language: string;
  value: string;
}

export type fileCardPropsType = {
  fileName: string;
  content: string;
  fileType: string;
  showFile?: boolean;
};

export type nodeToolbarPropsType = {
  //  openWDoubleClick: boolean;
  //  setOpenWDoubleClick: (open: boolean) => void;
  data: NodeDataType;
  deleteNode: (idx: string) => void;
  setShowNode: (boolean: any) => void;
  numberOfHandles: number;
  numberOfOutputHandles: number;
  showNode: boolean;
  name?: string;
  openAdvancedModal?: boolean;
  onCloseAdvancedModal?: (close: boolean) => void;
  isOutdated: boolean;
  setShowState: (show: boolean | SetStateAction<boolean>) => void;
  updateNode: () => void;
};

export type parsedDataType = {
  id: string;
  params: string;
  progress: number;
  valid: boolean;
};

export type SanitizedHTMLWrapperType = {
  className: string;
  content: string;
  onClick: () => void;
  suppressWarning?: boolean;
};

export type iconsType = {
  [key: string]: React.ElementType;
};

export type modalHeaderType = {
  children: ReactNode;
  description: string | JSX.Element | null;
};

export type codeAreaModalPropsType = {
  setValue: (value: string) => void;
  setOpenModal?: (bool: boolean) => void;
  value: string;
  nodeClass: APIClassType | undefined;
  setNodeClass: (
    Class: APIClassType,
    code?: string,
    type?: string,
  ) => void | undefined;
  children: ReactNode;
  dynamic?: boolean;
  readonly?: boolean;
  open?: boolean;
  setOpen?: (open: boolean) => void;
};

export type chatMessagePropsType = {
  chat: ChatMessageType;
  lockChat: boolean;
  lastMessage: boolean;
  setLockChat: (lock: boolean) => void;
  updateChat: (
    chat: ChatMessageType,
    message: string,
    stream_url?: string,
  ) => void;
};

export type genericModalPropsType = {
  field_name?: string;
  setValue: (value: string) => void;
  value: string;
  buttonText: string;
  modalTitle: string;
  type: number;
  disabled?: boolean;
  nodeClass?: APIClassType;
  setNodeClass?: (Class: APIClassType, code?: string) => void;
  children: ReactNode;
  id?: string;
  readonly?: boolean;
};

export type newFlowModalPropsType = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export type IOModalPropsType = {
  children: JSX.Element;
  open: boolean;
  setOpen: (open: boolean) => void;
  disable?: boolean;
  isPlayground?: boolean;
  cleanOnClose?: boolean;
};

export type buttonBoxPropsType = {
  onClick: () => void;
  title: string;
  description: string;
  icon: ReactNode;
  bgColor: string;
  textColor: string;
  deactivate?: boolean;
  size: "small" | "medium" | "big";
};

export type FlowSettingsPropsType = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export type groupDataType = {
  [char: string]: string;
};

export type cardComponentPropsType = {
  data: FlowType;
  onDelete?: () => void;
  button?: JSX.Element;
};

type tabsArrayType = {
  code: string;
  image: string;
  language: string;
  mode: string;
  name: string;
  description?: string;
};

type getValueNodeType = {
  id: string;
  node: NodeType;
  type: string;
  value: null;
};

type codeTabsFuncTempType = {
  [key: string]: string | boolean;
};

export type codeTabsPropsType = {
  flow?: FlowType;
  tabs: Array<tabsArrayType>;
  activeTab: string;
  setActiveTab: (value: string) => void;
  isMessage?: boolean;
  tweaks?: {
    tweak?: tweakType;
    tweaksList?: Array<string>;
    buildContent?: (value: string) => ReactNode;
    getValue?: (
      value: string,
      node: NodeType,
      template: InputFieldType,
      tweak: tweakType,
    ) => string;
    buildTweakObject?: (
      tw: string,
      changes: string | string[] | boolean | number | Object[] | Object,
      template: InputFieldType,
    ) => Promise<string | void>;
  };
  activeTweaks?: boolean;
  setActiveTweaks?: (value: boolean) => void;
  allowExport?: boolean;
};

export type crashComponentPropsType = {
  error: {
    message: string;
    stack: string;
  };
  resetErrorBoundary: (args) => void;
};

export type Log = {
  message: string;
};

export type validationStatusType = {
  id: string;
  data: object | any;
  outputs: Log[];
  progress?: number;
  valid: boolean;
  duration?: string;
};

export type ApiKey = {
  id: string;
  api_key: string;
  name: string;
  created_at: string;
  last_used_at: string;
  total_uses: number;
};
export type fetchErrorComponentType = {
  message: string;
  description: string;
  openModal?: boolean;
  setRetry: () => void;
  isLoadingHealth: boolean;
};

export type dropdownButtonPropsType = {
  firstButtonName: string;
  onFirstBtnClick: () => void;
  options: Array<{ name: string; onBtnClick: () => void }>;
  plusButton?: boolean;
  dropdownOptions?: boolean;
};

export type IOFieldViewProps = {
  type: InputOutput;
  fieldType: string;
  fieldId: string;
  left?: boolean;
};

export type UndrawCardComponentProps = { flow: FlowType };

export type chatViewProps = {
  sendMessage: ({
    repeat,
    files,
  }: {
    repeat: number;
    files?: string[];
  }) => void;
  chatValue: string;
  setChatValue: (value: string) => void;
  lockChat: boolean;
  setLockChat: (lock: boolean) => void;
};

export type IOFileInputProps = {
  field: InputFieldType;
  updateValue: (e: any, type: string) => void;
};

export type toolbarSelectItemProps = {
  value: string;
  icon: string;
  style?: string;
  dataTestId: string;
  ping?: boolean;
  shortcut: string;
};

export type clearChatPropsType = {
  lockChat: boolean;
  setLockChat: (lock: boolean) => void;
  setChatHistory: (chatHistory: ChatMessageType) => void;
  method: string;
};

export type handleSelectPropsType = {
  event: string;
  lockChat: boolean;
  setLockChat: (lock: boolean) => void;
  setChatHistory: (chatHistory: ChatMessageType) => void;
};
