import axios from "axios";

interface LoginProps {
  userId?: string;
  userPassword?: string;
}

export async function LoginAPI({ userId, userPassword }: LoginProps) {
  const URL = `${process.env.REACT_APP_SERVER_BASE_URL}${process.env.REACT_APP_LOGIN_URL}`;
  const bodyProps = `username=${userId}&password=${userPassword}${process.env.REACT_APP_LOGIN_BODY_PARAMS}`;
  try {
    const response = await axios.post(URL, bodyProps, {
      headers: {
        "Content-Type": `${process.env.REACT_APP_LOGIN_HEADER_PARAMS}`,
      },
    });
    return Object(response.data);
  } catch (e) {
    console.log("loginAPI 요청에서 문제발생: ", e);
    return String(e);
  }
}
