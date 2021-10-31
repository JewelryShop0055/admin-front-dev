import { ApiConfigProps, RefreshTokenParams, SignInParams } from "../types";
import { axiosInstance } from "./utils/apiForm";

const config: ApiConfigProps = {
  //   headers: {
  //   },
};

export const refreshTokenGrantAuth = async (params: RefreshTokenParams) => {
  const response = await axiosInstance(config).post(
    `/admin/auth/token`,
    `refresh_token=${params.refreshToken}&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}&scope=${process.env.REACT_APP_SCOPE}&grant_type=refresh_token`
  );
  return response.data;
};

//userID, userPassword, grant_type= password... 이런형식으로만 넣어도 post에서 알아먹게끔
