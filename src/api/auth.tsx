import Cookies from "universal-cookie";

const cookies = new Cookies();

export function saveRefreshToken(refresh_token: object) {
  cookies.set("refresh_token", refresh_token, { sameSite: "strict" });
}

export function eraseRefreshToken() {
  console.log("Refresh Token이 있는 cookie를 삭제합니다.");
  window.localStorage.setItem("logout", String(Date.now()));
  cookies.remove("refresh_token");
}
