import axios from "axios";
import test from "../localTestData.json";

interface LoginProps {
  userId?: string;
  userPassword?: string;
}

export const LoginToken = {
  access_token: "",
  token_type: "",
  expires_in: 0,
  refresh_token: "",
};

export async function LoginAPI({ userId, userPassword }: LoginProps) {
  const URL = `${process.env.REACT_APP_SERVER_BASE_URL}${process.env.REACT_APP_LOGIN_URL}`;
  const bodyProps = `username=${userId}&password=${userPassword}${process.env.REACT_APP_LOGIN_BODY_PARAMS}`;

  console.log(`${process.env.REACT_APP_LOGIN_BODY_PARAMS}`);
  await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": `${process.env.REACT_APP_LOGIN_HEADER_PARAMS}` },
    body: bodyProps,
  })
    .then((res) => res.json())
    .then((data) => {
      LoginToken.access_token = data.access_token;
      LoginToken.expires_in = data.expires_in;
      LoginToken.refresh_token = data.refresh_token;
      LoginToken.token_type = data.token_type;
    });
}

export async function LoginAPI_axios({ userId, userPassword }: LoginProps) {
  const URL = `${process.env.REACT_APP_SERVER_BASE_URL}${process.env.REACT_APP_LOGIN_URL}`;
  const bodyProps = `username=${userId}&password=${userPassword}${process.env.REACT_APP_LOGIN_BODY_PARAMS}`;
  return await axios.post(URL, bodyProps, {
    headers: { "Content-Type": `${process.env.REACT_APP_LOGIN_HEADER_PARAMS}` },
  });
}
