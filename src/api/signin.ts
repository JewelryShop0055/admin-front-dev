import axios, { AxiosResponse } from "axios";
import { ApiConfigProps } from "../types";
import { getAuthToken } from "../util/auth";
import { axiosInstance } from "./utils/apiForm";

interface SignInProps {
  grantType: "password" | "refresh_token";
  userId?: string;
  userPassword?: string;
  refreshToken?: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
}

export async function signIn({
  grantType,
  userId = "",
  userPassword = "",
  refreshToken = "",
}: SignInProps): Promise<TokenResponse> {
  const URL = `${process.env.REACT_APP_SERVER_BASE_URL}/admin/auth/token`;

  if (grantType === "password") {
    const bodyProps = `username=${userId}&password=${userPassword}&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}&scope=${process.env.REACT_APP_SCOPE}&grant_type=password`;
    const response = await axios.post<string, AxiosResponse<TokenResponse>>(
      URL,
      bodyProps,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        responseType: "json",
      }
    );
    return response.data;
  } else {
    const bodyProps = `refresh_token=${refreshToken}&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}&scope=${process.env.REACT_APP_SCOPE}&grant_type=refresh_token`;
    const response = await axios.post<string, AxiosResponse<TokenResponse>>(
      URL,
      bodyProps,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        responseType: "json",
      }
    );
    return response.data;
  }
}

//==repactoring

export const getAuthToken_New = async (config: ApiConfigProps) => {
  const response = await axiosInstance(config).post(
    `/admin/auth/token`,
    config.bodyProps
  );
  return response;
};

// (url: string, data?: undefined, config?: AxiosRequestConfig<never> | undefined)
