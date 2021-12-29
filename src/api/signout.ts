import { AccessTokenParams } from "../types";
import { axiosInstance } from "./utils/apiForm";
import { AxiosRequestConfig } from "axios";

export const signOut = async (params: AccessTokenParams) => {
  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": `application/x-www-form-urlencoded`,
    },
  };

  const response = await axiosInstance(config).delete(
    "/admin/account/signout",
    { data: `access_token=${params.accessToken}` }
  );

  return response.data;
};
