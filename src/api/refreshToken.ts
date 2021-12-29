import { AxiosRequestConfig } from "axios";
import { RefreshTokenParams } from "../types";
import { axiosInstance } from "./utils/apiForm";

export const refreshTokenGrantAuth = async (params: RefreshTokenParams) => {
  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": `application/x-www-form-urlencoded`,
    },
  };
  const response = await axiosInstance(config).post(
    `/admin/auth/token`,
    `refresh_token=${params.refreshToken}&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}&scope=${process.env.REACT_APP_SCOPE}&grant_type=refresh_token`
  );
  return response.data;
};
