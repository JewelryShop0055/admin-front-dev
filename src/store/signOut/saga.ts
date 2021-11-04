import { call, put, takeLatest, all } from "@redux-saga/core/effects";
import { signOut } from "../../api/signOut";
import { getAuthTokenFromCookies } from "../../util/auth";
import { history } from "../../modules/store";
import { ErrorEnvironment } from "../../types";
import { ErrorControl } from "../errorControl";
import axios from "axios";
import { actions } from "./slice";
import snackNotifications from "../../util/snackBarUitls";

function* deleteAuthTokenSaga() {
  try {
    yield call(() =>
      signOut({
        accessToken: getAuthTokenFromCookies("user_access_token")!.toString(),
      })
    );
    snackNotifications.success("정상적으로 로그아웃 되었습니다.");
    yield history.push("/");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      yield ErrorControl({ error: error, errorType: ErrorEnvironment.SignOut });
    }
    snackNotifications.error("로그아웃에 실패했습니다.");
    yield put(actions.getAuthTokenRejected());
  }
}

function* watchDeleteAuthToken() {
  yield takeLatest(actions.getSignOutPending.type, deleteAuthTokenSaga);
}

export default function* rootSaga() {
  yield all([watchDeleteAuthToken()]);
}
