import { LoadingComponentProps } from "../../types/components";

/**
 * 
 * 这段代码定义了一个名为LoadingComponent的React函数组件，它接受一个对象参数，该对象包含一个名为remSize的属性，
 * 类型为LoadingComponentProps。这里的LoadingComponentProps应该是在别处定义的TypeScript接口或类型，用于精确描述传入LoadingComponent的所有合法属性。
 * @param remSize: 这个属性看起来是用来控制加载组件大小的，单位是“rem”。在网页设计中，“rem”是一种相对单位，代表相对于根元素（通常是html标签）字体大小的比例。所以，remSize很可能是为了调整加载动画的大小，使其能更好地适应不同的屏幕或布局需求。
 * @returns JSX.Element: 这表明LoadingComponent返回的是一个React元素，也就是可以被React识别并在DOM中渲染的虚拟节点。这意味着LoadingComponent内部将包含一些HTML-like的结构，用于呈现加载动画或指示器。
 */
export default function LoadingComponent({
  remSize,
}: LoadingComponentProps): JSX.Element {
  return (
    <div role="status" className="flex flex-col items-center justify-center">
      <svg
        aria-hidden="true"
        className={`w-${remSize} h-${remSize} animate-spin fill-primary text-muted`}
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <br></br>
      <span className="animate-pulse text-lg text-primary">Loading...</span>
    </div>
  );
}
