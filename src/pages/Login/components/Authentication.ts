import { signIn } from "../../../api/signIn";
import { saveAuthToken } from "../../../util/auth";
import { AxiosError } from "axios";
interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
}

export async function Authentication(
  userId: string,
  userPassword: string,
  setUserId: Function,
  setUserPassword: Function
) {
  if (!userId || !userPassword) {
    alert("아이디 또는 비밀번호를 입력해주세요");
    return false;
  }

  try {
    const token: TokenResponse = await signIn({ userId, userPassword });
    if (token.access_token !== undefined && token.refresh_token !== undefined) {
      await saveAuthToken(token.access_token, token.refresh_token);
      return true;
    }
  } catch (e) {
    if (
      (e as AxiosError).response!.status >= 400 &&
      (e as AxiosError).response!.status < 500
    ) {
      alert("아이디 또는 비밀번호가 잘못되었습니다.");
    } else if ((e as AxiosError).response!.status > 500) {
      alert("서버의 상태가 좋지 않습니다. 관리자에게 연락바랍니다.");
    } else {
      alert("알 수 없는 에러입니다. 관리자에게 연락바랍니다.");
    }
  }

  setUserId("");
  setUserPassword("");
}
