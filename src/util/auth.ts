import jwt_decode from "jwt-decode";

export function saveAuthToken(accessToken: string, refreshToken: string) {
  document.cookie = `user_access_token=${accessToken}; max-age=3599; samesite=lax;`;
  document.cookie = `user_refresh_token=${refreshToken}; max-age=3599; samesite=lax;`;
}

export function eraseAuthToken() {
  const accessToken = getAuthToken("user_access_token");
  const refreshToken = getAuthToken("user_refresh_token");
  window.localStorage.setItem("logout", String(Date.now()));
  document.cookie = `user_access_token=${accessToken}; max-age=-1;`;
  document.cookie = `user_refresh_token=${refreshToken}; max-age=-1;`;
}

export const getAuthToken = (name: string) => {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export function checkTokenEXP() {
  //   const authToken = getAuthToken();
  //   const EXP = {
  //     access: false,
  //     refresh: false,
  //   };
  //   interface tokenDecode {
  //     tokenType: String;
  //     scope: String;
  //     iat: number;
  //     exp: number;
  //     iss: String;
  //   }
  // const accessTokenDecode: tokenDecode = jwt_decode(authToken.access_token);
  // const refreshTokenDecode: tokenDecode = jwt_decode(authToken.refresh_token);
  // const now = Date.now();
  // console.log("현재시간", now);
  // if (now < accessTokenDecode.exp) {
  //   EXP.access = true;
  // }
  // if (now < refreshTokenDecode.exp) {
  //   EXP.access = true;
  // }
  // return EXP;
}

export function eraseCookie() {
  console.log("Refresh Token이 있는 cookie를 삭제");
  window.localStorage.setItem("logout", String(Date.now()));
  document.cookie = "user=admin; max-age=-1;";
}
