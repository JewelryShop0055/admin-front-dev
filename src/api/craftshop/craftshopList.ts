import { AxiosRequestConfig } from "axios";
import { CraftshopListParams } from "../../types";
import { getAuthTokenFromCookies } from "../../util/auth";
import { axiosInstance } from "../utils/apiForm";

export const getCraftshopList = async (params: CraftshopListParams) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${getAuthTokenFromCookies("user_access_token")}`,
    },
  };
  const response = await axiosInstance(config).get(
    `/admin/craftshop?page=${params.page}&limit=${params.limit}&order=id_desc`
  );
  return response.data;
};
