import axios from "axios";

interface ConfigProps {
  options?: object;
  token?: string;
  categoryGroup?: string;
  page?: number;
  limit?: number;
  headers?: object;
}

export function createAxiosInstance(config: ConfigProps) {
  const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_BASE_URL}`,
    timeout: 20 * 1000,
    ...config.options,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${config}`,
      ...config.headers,
    },
  });
  return axiosInstance;
}
