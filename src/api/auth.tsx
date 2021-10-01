import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";

const cookies = new Cookies();

export function saveAuthToken(refresh_token: object) {
  cookies.set("auth_token", refresh_token, { sameSite: "strict" });
}

export function eraseAuthToken() {
  console.log("Refresh Token이 있는 cookie를 삭제합니다.");
  window.localStorage.setItem("logout", String(Date.now()));
  cookies.remove("auth_token");
}

export const getAuthToken = () => {
  return cookies.get("auth_token");
};

export function checkTokenEXP() {
  const authToken = getAuthToken();
  const EXP = {
    access: false,
    refresh: false,
  };

  interface tokenDecade {
    tokenType: String;
    scope: String;
    iat: number;
    exp: number;
    iss: String;
  }
  const accessTokenDecode: tokenDecade = jwt_decode(authToken.access_token);
  const refreshTokenDecode: tokenDecade = jwt_decode<tokenDecade>(
    authToken.refresh_token
  );

  const now = Date.now();
  console.log("현재시간", now);
  if (now < accessTokenDecode.exp) {
    EXP.access = true;
  }
  if (now < refreshTokenDecode.exp) {
    EXP.access = true;
  }

  return EXP;
}
