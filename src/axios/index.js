/*
 * @FilePath: \hz-project\src\axios\index.js
 * @Description:
 */
import axios from "axios";
import router from "../router";
import { message } from "ant-design-vue";
// axios.defaults.baseURL = 'http://127.0.0.1:3000'

// export default function setAxios () {
//   // 请求拦截
//   axios.interceptors.request.use(
//     config => {
//       // if(store.state.token){ /* 在状态管理中判断是否有token 有的话我们就加到请求头里去 */
//       //     config.headers['Authorization']= `Bearer ${store.state.token}`
//       // }
//       return config /* 没有token的话，我们直接return 配置 */
//     }
//   )
// }

// 创建axios实例
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  baseURL:
    process.env === "dev" ? "http://127.0.0.1:3000" : "http://127.0.0.1:3000",
  timeout: 5000, // request timeout
});

// 请求拦截
service.interceptors.request.use((config) => {
  // 不是登录或注册接口时，接口要加上token
  if (
    config.url.indexOf("login") === -1 ||
    config.url.indexOf("register") === -1
  ) {
    config.headers["Authorization"] = "Bearer " + localStorage.getItem("token");
  }
  return config;
});

// 响应拦截
service.interceptors.response.use((response) => {
  const res = response.data;
  if (res.code === 200) {
    return res;
  } else {
    message.error(res.message);
  }
  if (res.code === 401) {
    message.error("登录已过期，请重新登录!");
    router.push("/login");
  }
});

// 封装请求函数
export const request = (options) => {
  if (options.method === "get") {
    options.params = options.data;
  }
  return new Promise((resolve, reject) => {
    service
      .request(options)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default service;
