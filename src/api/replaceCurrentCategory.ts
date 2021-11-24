import { AxiosRequestConfig } from "axios";
import { replaceCurrentCategoryParams } from "../store/replaceCurrentCategory/slice";
import { ProductType } from "../types";
import { getAuthTokenFromCookies } from "../util/auth";
import { axiosInstance } from "./utils/apiForm";

export const replaceCurrentCategory = async (
  params: replaceCurrentCategoryParams
) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${getAuthTokenFromCookies("user_access_token")}`,
    },
    data: {
      name: params.newCategoryName,
    },
  };

  const response = await axiosInstance(config).put(
    `/admin/category/${ProductType.product}/${params.targetId}`,
    config.data
  );

  return response.data;
};
