import axios, { AxiosError, AxiosResponse } from "axios";
import { getAuthToken } from "../util/auth";

interface LoginProps {
  userId: string;
  userPassword: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
}

export async function signIn({
  userId,
  userPassword,
}: LoginProps): Promise<TokenResponse> {
  const URL = `${process.env.REACT_APP_SERVER_BASE_URL}/admin/auth/token`;
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
}

//==============================================================================================================
//재발급 처리시 꼭 쿠키에 재저장처리도 해야 오류(400)나지 않는다

export async function refreshTokenAPI() {
  const refreshToken = getAuthToken("user_refresh_token");
  const URL = `${process.env.REACT_APP_SERVER_BASE_URL}/admin/auth/token`;
  const bodyProps = `refresh_token=${refreshToken}&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}&scope=${process.env.REACT_APP_SCOPE}&grant_type=refresh_token`;
  try {
    const response = await axios.post(URL, bodyProps, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return Object(response.data);
  } catch (e) {
    console.log("loginAPI 요청에서 문제발생: ", e);
    return String(e);
  }
}
