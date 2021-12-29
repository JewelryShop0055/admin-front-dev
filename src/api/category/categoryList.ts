import { AxiosRequestConfig } from "axios";
import { ProductCategoryListParams } from "../../types";

import { getAuthTokenFromCookies } from "../../util/auth";
import { axiosInstance } from "../utils/apiForm";

export const getCategoryList = async (params: ProductCategoryListParams) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${getAuthTokenFromCookies("user_access_token")}`,
    },
  };
  const response = await axiosInstance(config).get(
    `/admin/category/${params.categoryGroup}?page=${params.page}&limit=${params.limit}&order=id_desc`
  );
  return response.data;
};
