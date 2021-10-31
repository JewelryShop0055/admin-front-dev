import axios, { AxiosRequestConfig } from "axios";
import { ApiConfigProps } from "../../types";

export function axiosInstance(config: AxiosRequestConfig) {
  const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_BASE_URL}`,
    timeout: 20 * 1000,
    ...config,
    // option 내에있는 bodyprops를 여기서넣을 필욘 없음 => 이건 axios. post, get... 메서드에서 넣을수있으니까!
    headers: {
      "Content-Type": "application/json",
      // "Content-Type": `${config.contentsType}`, => ...config.headers,에서 다시금 넣어주면 위에꺼에 씌워진다
      ...config.headers,
    },
  });
  return axiosInstance;
}
