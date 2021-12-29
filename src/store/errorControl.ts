import { AxiosError } from "axios";
import { history } from "../modules/store";
import { ErrorEnvironment, SnackBarMessageType } from "../types";
import alertSnackBarMessage from "../util/snackBarUitls";

interface ErrorParams {
  error: AxiosError;
  errorType: ErrorEnvironment;
  referenceTextData?: string;
}

export const ErrorControl = ({
  error,
  errorType,
  referenceTextData,
}: ErrorParams) => {
  switch (errorType) {
    case ErrorEnvironment.SignIn:
      if (error.response!.status >= 400 && error.response!.status < 500) {
        alertSnackBarMessage({
          message: "아이디 또는 비밀번호가 잘못되었습니다.",
          type: SnackBarMessageType.ERROR,
        });
      }
      break;

    case ErrorEnvironment.RefreshToken:
      if (error.response!.status >= 400 && error.response!.status < 500) {
        alertSnackBarMessage({
          message:
            "인증토큰에 오류가 발생했습니다. 로그인 페이지로 이동합니다.",
          type: SnackBarMessageType.ERROR,
        });
        history.push("/");
      }
      break;

    case ErrorEnvironment.AddNewCategory:
      if (error.response!.status === 400) {
        alertSnackBarMessage({
          message: `"${referenceTextData}"는 이미 등록되어있는 카테고리입니다.`,
          type: SnackBarMessageType.ERROR,
        });
      } else {
        alertSnackBarMessage({
          message: `${referenceTextData}를 등록하지 못했습니다. 다시 시도해주세요`,
          type: SnackBarMessageType.ERROR,
        });
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
