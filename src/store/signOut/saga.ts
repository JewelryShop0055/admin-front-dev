import { call, put, takeLatest, all } from "@redux-saga/core/effects";
import { signOut } from "../../api/signOut";
import { getAuthTokenFromCookies } from "../../util/auth";
import { history } from "../../modules/store";
import { ErrorEnvironment, SnackBarMessageType } from "../../types";
import { ErrorControl } from "../errorControl";
import axios from "axios";
import { actions } from "./slice";
import alertSnackBarMessage from "../../util/snackBarUitls";

function* deleteAuthTokenSaga() {
  try {
    yield call(() =>
      signOut({
        accessToken: getAuthTokenFromCookies("user_access_token")!.toString(),
      })
    );
    alertSnackBarMessage({
      message: "정상적으로 로그아웃 되었습니다.",
      type: SnackBarMessageType.SUCCESS,
    });
    yield history.push("/");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      yield ErrorControl({ error: error, errorType: ErrorEnvironment.SignOut });
    }
    alertSnackBarMessage({
      message: "로그아웃에 실패했습니다.",
      type: SnackBarMessageType.ERROR,
    });
    yield put(actions.getAuthTokenRejected());
  }
}

function* watchDeleteAuthToken() {
  yield takeLatest(actions.getSignOutPending.type, deleteAuthTokenSaga);
}

export default function* rootSaga() {
  yield all([watchDeleteAuthToken()]);
}
