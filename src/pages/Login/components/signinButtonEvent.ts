import { signinAPI } from "../../../api/signin";
import { saveAuthToken } from "../../../util/auth";

interface signinButtonParams {
  userId: string;
  userPassword: string;
  setUserId: Function;
  setUserPassword: Function;
}

export async function signinButtonEvent(
  userId: string,
  userPassword: string,
  setUserId: Function,
  setUserPassword: Function
) {
  console.log("ID입력값:", userId);
  console.log("PW입력값:", userPassword);
  console.log("로그인");
  if (!userId || !userPassword) {
    return alert("아이디 또는 비밀번호를 입력해주세요");
  }
  const token = await signinAPI({ userId, userPassword });
  if (token.access_token !== undefined && token.refresh_token !== undefined) {
    return await saveAuthToken(token.access_token, token.refresh_token);
  }
  setUserId("");
  setUserPassword("");
  alert("아이디 또는 비밀번호가 틀렸습니다");
}
