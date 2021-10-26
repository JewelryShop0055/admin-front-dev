import axios from "axios";
import { ApiConfigProps } from "../../types";

export function createAxiosInstance(config: ApiConfigProps) {
  const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_BASE_URL}`,
    timeout: 20 * 1000,
    ...config.options,
    headers: {
      "Content-Type": `${config.contentsType}`,
      ...config.headers,
    },
  });
  return axiosInstance;
}
