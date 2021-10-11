import axios from "axios";
import { getAuthToken } from "../util/auth";

interface LoginProps {
  userId?: string;
  userPassword?: string;
}

export async function signinAPI({ userId, userPassword }: LoginProps) {
  const URL = `${process.env.REACT_APP_SERVER_BASE_URL}${process.env.REACT_APP_SIGNIN_URL}`;
  const bodyProps = `username=${userId}&password=${userPassword}${process.env.REACT_APP_SIGNIN_BODY_PARAMS}`;
  try {
    const response = await axios.post(URL, bodyProps, {
      headers: {
        "Content-Type": `${process.env.REACT_APP_SIGNIN_HEADER_PARAMS}`,
      },
    });
    return Object(response.data);
  } catch (e) {
    console.log("loginAPI 요청에서 문제발생: ", e);
    return String(e);
  }
}

//==============================================================================================================
//재발급 처리시 꼭 쿠키에 재저장처리도 해야 오류(400)나지 않는다

export async function refreshTokenAPI() {
  const refreshToken = getAuthToken("user_refresh_token");
  const URL = `${process.env.REACT_APP_SERVER_BASE_URL}${process.env.REACT_APP_REFRESH_TOKEN_URL}`;
  const bodyProps = `refresh_token=${refreshToken}${process.env.REACT_APP_REFRESH_TOKEN_BODY_PARAMS}`;
  try {
    const response = await axios.post(URL, bodyProps, {
      headers: {
        "Content-Type": `${process.env.REACT_APP_REFRESH_TOKEN_HEADER_PARAMS}`,
      },
    });
    return Object(response.data);
  } catch (e) {
    console.log("loginAPI 요청에서 문제발생: ", e);
    return String(e);
  }
}
