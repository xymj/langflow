/**
 * 这行代码是在JavaScript项目中引入Axios库，Axios是一个基于Promise的HTTP客户端，用于浏览器和Node.js环境中的数据交互。它广泛用于发送异步HTTP请求，尤其是在与RESTful API进行通信时。

# # 解析
Import语句：这是ES6模块系统的导入语法，用于在当前文件中引入外部模块的功能。axios 是一个流行的第三方库，通过NPM或Yarn安装后，就可以在项目中使用此导入语句来访问它。

默认导入：由于没有使用大括号 {}，表明我们正在导入模块的默认导出。对于 axios 库而言，其默认导出的就是Axios的主要功能，包括发起GET、POST等各种HTTP方法的能力。

# # 使用场景
Axios可以用于多种场景，但最常见的是与服务器进行数据交换，例如：

发送GET请求以检索资源列表。
发送POST请求以创建新资源。
发送PUT或PATCH请求以更新现有资源。
发送DELETE请求以删除资源。
此外，Axios支持拦截器、取消请求、转换请求和响应数据等功能，使其成为一个强大且灵活的选择。

# # 示例代码
下面是一个使用Axios发送GET请求的基本示例：

JavaScript
import axios from 'axios';

const fetchData = async () => {
  try {
    const response = await axios.get('https://api.example.com/data');
    console.log(response.data); // 处理返回的数据
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
};

fetchData();
在这个例子中，axios.get() 方法用于向 'https://api.example.com/data' 发送GET请求。await 关键字用于等待Promise解析，然后处理响应数据或捕获任何发生的错误。

总之，import axios from "axios"; 允许你利用Axios的强大功能，简化与远程服务器的通信过程，提高代码的可读性和可维护性。
 */
import axios from "axios";
import { BASE_URL_API } from "../../constants/constants";

/**
 * Fetches the configuration data from the API.
 * @returns {Promise<any>} A promise that resolves to the configuration data.
 * @throws {Error} If there was an error fetching the configuration data.
 */
export async function fetchConfig() {
  try {
    const response = await axios.get(`${BASE_URL_API}config`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch configuration:", error);
    throw error;
  }
}

/**
 * Sets up default configurations for Axios.
 * Fetches the timeout configuration and sets it as the default timeout for Axios requests.
 */
export async function setupAxiosDefaults() {
  const config = await fetchConfig();
  // Create Axios instance with the fetched timeout configuration

  const timeoutInMilliseconds = config.frontend_timeout
    ? config.frontend_timeout * 1000
    : 30000;
  axios.defaults.baseURL = "";
  axios.defaults.timeout = timeoutInMilliseconds;
}
