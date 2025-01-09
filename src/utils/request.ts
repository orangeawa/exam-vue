import type { response } from "@/model/Res";
import axios from "axios";
import { ElMessage } from "element-plus";

const req = axios.create({
  baseURL: import.meta.env.VITE_REQUEST_URL || "http://localhost:3000",
  timeout: 10000,
});

// req.interceptors.request.use((config) => {})
req.interceptors.response.use(
  (response) => {
    const res = response.data;

    if (res.code !== 200) {
      ElMessage.error(res.msg);
      return Promise.reject(new Error(res.msg));
    }

    return Promise.resolve(res);
  },
  (error) => {
    console.log(error);

    ElMessage.error(error.message);
    return Promise.reject(error);
  }
);

export default req;
