import { AxiosRequestConfig } from "axios";
import { Craftshop } from "../../types";
import { getAuthTokenFromCookies } from "../../util/auth";
import { axiosInstance } from "../utils/apiForm";

export interface DeleteCraftshopParams extends Pick<Craftshop, "id"> {}

export const deleteCraftshop = async (params: DeleteCraftshopParams) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${getAuthTokenFromCookies("user_access_token")}`,
    },
  };

  const response = await axiosInstance(config).delete(
    `/v1/craftshop/${params.id}`
  );

  return response.data;
};
