import { AxiosRequestConfig } from "axios";
import { putCurrentCategoryParams } from "../store/putCurrentCategory/slice";
import { ProductType } from "../types";
import { getAuthTokenFromCookies } from "../util/auth";
import { axiosInstance } from "./utils/apiForm";

export const putCurrentCategory = async (params: putCurrentCategoryParams) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${getAuthTokenFromCookies("user_access_token")}`,
    },
  };

  const response = await axiosInstance(config).put(
    `/admin/category/${ProductType.product}/${params.targetId}`
  );

  return response.data;
};
