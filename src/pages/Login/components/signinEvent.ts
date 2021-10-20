import { signinAPI } from "../../../api/signin";
import { saveAuthToken } from "../../../util/auth";

export async function signinEvent(
  userId: string,
  userPassword: string,
  setUserId: Function,
  setUserPassword: Function
) {
  if (!userId || !userPassword) {
    alert("아이디 또는 비밀번호를 입력해주세요");
    return false;
  }
  const token = await signinAPI({ userId, userPassword });
  if (token.access_token !== undefined && token.refresh_token !== undefined) {
    await saveAuthToken(token.access_token, token.refresh_token);
    return true;
  }
  setUserId("");
  setUserPassword("");
  alert("아이디 또는 비밀번호가 틀렸습니다");
}
