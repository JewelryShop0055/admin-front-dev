import { signoutAPI } from "../api/signout";

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

export async function signout() {
  await window.localStorage.setItem("signout", String(Date.now()));

  const tokens = [
    ["user_access_token", getAuthToken("user_access_token")],
    ["user_refresh_token", getAuthToken("user_refresh_token")],
  ];

  tokens.forEach((token) => {
    if (token[1] !== undefined) {
      deleteAuthToken(token[0]!.toString(), token[1]!.toString());
      if (token[0] === "user_access_token") {
        signoutAPI(token[1]!.toString());
      }
    }
  });
}
