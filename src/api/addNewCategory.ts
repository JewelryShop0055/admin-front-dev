import { getAuthTokenFromCookies } from "../util/auth";
import { AxiosRequestConfig } from "axios";
import { AddNewCategoryParams } from "../types";
import { axiosInstance } from "./utils/apiForm";

export const addNewCategory = async (params: AddNewCategoryParams) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${getAuthTokenFromCookies("user_access_token")}`,
    },
    data: {
      name: params.categoryName,
    },
  };

  const response = await axiosInstance(config).post(
    `/admin/category/${params.categoryGroup}`,
    config.data
  );
  return response.data;
};
