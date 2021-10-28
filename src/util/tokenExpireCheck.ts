import jwt_decode from "jwt-decode";
import { getAuthTokenFromCookies } from "./auth";

interface tokenDecode {
  tokenType: string;
  scope: string;
  iat: number;
  exp: number;
  iss: string;
}

const initialDecodeValue = {
  tokenType: "none",
  scope: "none",
  iat: 0,
  exp: 0,
  iss: "none",
};

export function checkTokenExpired(tokenName: string) {
  const token = getAuthTokenFromCookies(tokenName);

  if (token === undefined) {
    return false;
  } else {
    const tokenDecode: tokenDecode = jwt_decode(token!.toString());
    const now = parseInt(Date.now().toString().substring(0, 10));
    return now < tokenDecode.exp ? true : false;
  }
}

export function getTokenExpiredState() {
  const tokenExpireState = {
    user_access_token: checkTokenExpired("user_access_token"),
    user_refresh_token: checkTokenExpired("user_refresh_token"),
  };
  return tokenExpireState;
}
