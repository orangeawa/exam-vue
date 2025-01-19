import axios, { type AxiosResponse } from "axios";
import { ElMessage } from "element-plus";
import { tansParams } from "./tools";

// 定义后端返回的数据结构
interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
  total?: number;
}

// 创建 Axios 实例
const req = axios.create({
  baseURL: import.meta.env.VITE_REQUEST_URL || "http://localhost:3000",
  timeout: 10000,
});
// 请求拦截器
req.interceptors.request.use((config) => {
  return config;
});
// 响应拦截器简化
req.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code === 200) {
      ElMessage.success(res.message);
      return response.data;
    } else if (res.code == 201) {
      return response.data;
    }
    ElMessage.error(res.message || "请求失败");
    return Promise.reject(new Error(res.message || "请求失败"));
  },
  (error) => {
    ElMessage.error(error.message || "请求失败，请检查网络连接");
    return Promise.reject(error);
  }
);

const get = <T>(url: string, params: any) => {
  // const queryString = tansParams(params)
  return req.get<T,ApiResponse<T>>(url,{params})
}

const post = <T>(url: string, data: any) => {
  return req.post<T,ApiResponse<T>>(url,data)
}

const put = <T>(url: string, data: any) => {
  return req.put<T,ApiResponse<T>>(url,data)
}

const del = <T>(url: string) => {
  return req.delete<T,ApiResponse<T>>(url)
}


export { get, post, put, del };
