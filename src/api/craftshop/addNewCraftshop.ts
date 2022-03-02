import { getAuthTokenFromCookies } from "../../util/auth";
import { AxiosRequestConfig } from "axios";
import { AddNewCraftshopParams } from "../../types";
import { axiosInstance } from "../utils/apiForm";

export const addNewCraftshop = async (params: AddNewCraftshopParams) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${getAuthTokenFromCookies("user_access_token")}`,
    },
    data: {
      name: params.name,
      postCode: params.postCode,
      address: params.address,
      detailAddress: params.detailAddress,
      phone: params.phone,
    },
  };

  const response = await axiosInstance(config).post(
    "/v1/craftshop/",
    config.data
  );
  return response.data;
};
