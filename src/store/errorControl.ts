import { AxiosError } from "axios";
import { history } from "../modules/store";
import { ErrorEnvironment } from "../types";

interface ErrorParams {
  error: AxiosError;
  errorType: ErrorEnvironment;
}

export const ErrorControl = ({ error, errorType }: ErrorParams) => {
  switch (errorType) {
    case ErrorEnvironment.SignIn:
      if (error.response!.status >= 400 && error.response!.status < 500) {
        alert("아이디 또는 비밀번호가 잘못되었습니다.");
      }
      break;

    case ErrorEnvironment.RefreshToken:
      if (error.response!.status >= 400 && error.response!.status < 500) {
        alert("인증토큰에 오류가 발생했습니다. 로그인 페이지로 이동합니다.");
        history.push("/");
      }
      break;

    default:
      if (error.response!.status >= 500) {
        alert("서버의 상태가 좋지 않습니다. 관리자에게 연락바랍니다.");
      } else {
        alert("알 수 없는 에러입니다. 관리자에게 연락바랍니다.");
      }
  }
};
