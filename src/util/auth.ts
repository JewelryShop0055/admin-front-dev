export function saveAuthToken(accessToken: string, refreshToken: string) {
  document.cookie = `user_access_token=${accessToken}; max-age=3599; samesite=lax;`;
  document.cookie = `user_refresh_token=${refreshToken}; max-age=3599; samesite=lax;`;
}

export function deleteAuthToken(name: string, value: string) {
  document.cookie = `${name}=${value}; max-age=-1;`;
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

export async function logout() {
  await window.localStorage.setItem("logout", String(Date.now()));

  const tokens = [
    ["user_access_token", getAuthToken("user_access_token")],
    ["user_refresh_token", getAuthToken("user_refresh_token")],
  ];

  console.log("쿠키의 토큰값 가져옴", tokens);

  tokens.forEach((token) => {
    if (token[1] !== undefined) {
      deleteAuthToken(token[0]!.toString(), token[1]!.toString());
    }
  });
}

export function checkTokenEXP() {
  // const authToken = deleteAuthToken();
  // const EXP = {
  //   access: false,
  //   refresh: false,
  // };
  // interface tokenDecode {
  //   tokenType: string;
  //   scope: string;
  //   iat: number;
  //   exp: number;
  //   iss: string;
  // }
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
