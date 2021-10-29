import { ApiConfigProps } from "../types";
import { axiosInstance } from "./utils/apiForm";

export const getAuthToken = async (config: ApiConfigProps) => {
  const response = await axiosInstance(config).post(
    `/admin/auth/token`,
    config.options?.data
  );
  return response.data;
};
