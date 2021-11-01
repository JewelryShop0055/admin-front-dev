import { AxiosRequestConfig } from "axios";
import { SignInParams } from "../types";
import { axiosInstance } from "./utils/apiForm";

export const passwordGrantAuth = async (params: SignInParams) => {
  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": `application/x-www-form-urlencoded`,
    },
  };
  const response = await axiosInstance(config).post(
    `/admin/auth/token`,
    `username=${params.userId}&password=${params.userPassword}&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}&scope=${process.env.REACT_APP_SCOPE}&grant_type=password`
  );
  return response.data;
};

//userID, userPassword, grant_type= password... 이런형식으로만 넣어도 post에서 알아먹게끔
