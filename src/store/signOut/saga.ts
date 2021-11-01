import { call, put, takeLatest, all } from "@redux-saga/core/effects";
import { signOut } from "../../api/signOut";
import { getAuthTokenFromCookies } from "../../util/auth";
import { history } from "../../app/store";
import { ErrorEnvironment } from "../../types";
import { ErrorControl } from "../errorControl";
import axios from "axios";
import { actions } from "./slice";

function* deleteAuthTokenSaga() {
  try {
    yield call(() =>
      signOut({
        accessToken: getAuthTokenFromCookies("user_access_token")!.toString(),
      })
    );
    yield history.push("/");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      yield ErrorControl({ error: error, errorType: ErrorEnvironment.SignOut });
    }
    yield put(actions.getAuthTokenRejected());
  }
}

function* watchDeleteAuthToken() {
  yield takeLatest(actions.getSignOutPending.type, deleteAuthTokenSaga);
}

export default function* rootSaga() {
  yield all([watchDeleteAuthToken()]);
}
