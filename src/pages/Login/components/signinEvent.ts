import { signIn } from "../../../api/signin";
import { saveAuthToken } from "../../../util/auth";

export async function signinEvent(
  userId: string,
  userPassword: string,
  setUserId: Function,
  setUserPassword: Function
) {
  // if (!userId || !userPassword) {
  //   alert("아이디 또는 비밀번호를 입력해주세요");
  //   return false;
  // }
  // try {
  //   const token = await signinAPI({ userId, userPassword });
  //   if (token.access_token !== undefined && token.refresh_token !== undefined) {
  //     await saveAuthToken(token.access_token, token.refresh_token);
  //     return true;
  //   }
  // } catch (e) {
  //   console.log(e);
  // }
  console.log("여기까진 돌겠지");
  const token = await signIn({ userId, userPassword });
  console.log("signinAPI 반환값", token);

  // if (token.access_token !== undefined && token.refresh_token !== undefined) {
  //   await saveAuthToken(token.access_token, token.refresh_token);
  //   return true;
  // }
  // setUserId("");
  // setUserPassword("");
}
