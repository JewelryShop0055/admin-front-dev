import { signOut } from "../api/signOut";

export function saveAuthToken(accessToken: string, refreshToken: string) {
  window.localStorage.setItem("signin", String(Date.now()));
  document.cookie = `user_access_token=${accessToken}; max-age=3599; samesite=lax;`;
  document.cookie = `user_refresh_token=${refreshToken}; max-age=3599; samesite=lax;`;
}

export function deleteAuthToken(name: string, value: string) {
  document.cookie = `${name}=${value}; max-age=-1;`;
}

export const getAuthTokenFromCookies = (name: string) => {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export function deleteCookieToken() {
  window.localStorage.setItem("signout", String(Date.now()));

  const tokens = [
    ["user_access_token", getAuthTokenFromCookies("user_access_token")],
    ["user_refresh_token", getAuthTokenFromCookies("user_refresh_token")],
  ];

  tokens.forEach((token) => {
    if (token[1] !== undefined) {
      deleteAuthToken(token[0]!.toString(), token[1]!.toString());
      if (token[0] === "user_access_token") {
        signOut({ accessToken: token[1]!.toString() });
      }
    }
  });
}
