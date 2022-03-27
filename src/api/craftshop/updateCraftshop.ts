import { getAuthTokenFromCookies } from "../../util/auth";
import { AxiosRequestConfig } from "axios";

import { axiosInstance } from "../utils/apiForm";
import { UpdateCraftshopParams } from "../../store/craftshop/updateCraftshop/saga";

export const updateCraftshop = async (params: UpdateCraftshopParams) => {
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

  const response = await axiosInstance(config).put(
    `/admin/craftshop/${params.id}`,
    config.data
  );
  return response.data;
};
