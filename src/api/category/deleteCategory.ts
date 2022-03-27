import { AxiosRequestConfig } from "axios";
import { DeleteCategoryParams } from "../../types";
import { getAuthTokenFromCookies } from "../../util/auth";
import { axiosInstance } from "../utils/apiForm";

export const deleteCategory = async (params: DeleteCategoryParams) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${getAuthTokenFromCookies("user_access_token")}`,
    },
  };

  const response = await axiosInstance(config).delete(
    `/v1/category/${params.categoryGroup}/${params.categoryId}`
  );

  return response.data;
};
