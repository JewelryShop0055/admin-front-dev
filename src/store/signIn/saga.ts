import { call, put, takeLatest, all } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { passwordGrantAuth } from "../../api/signIn";

import { actions } from "./slice";
import {
  AuthToken,
  ErrorEnvironment,
  RefreshToken,
  RefreshTokenParams,
  SignIn,
  SignInParams,
  SnackBarMessageType,
} from "../../types";
import { saveAuthToken } from "../../util/auth";

import axios from "axios";
import { history } from "../../modules/store";
import { refreshTokenGrantAuth } from "../../api/refreshToken";
import { ErrorControl } from "../errorControl";
import alertSnackBarMessage from "../../util/snackBarUitls";

function* getAuthTokenSaga(action: PayloadAction<SignIn>) {
  const params: SignInParams = {
    userId: action.payload.userId,
    userPassword: action.payload.userPassword,
  };
  try {
    const result: AuthToken = yield call(() => passwordGrantAuth(params));
    yield saveAuthToken(result.access_token, result.refresh_token);
    yield history.push("/TodaysChecklist");
    alertSnackBarMessage({
      message: "로그인 성공",
      type: SnackBarMessageType.SUCCESS,
    });
    yield put(actions.getAuthTokenFullFilled(result));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      yield ErrorControl({ error: error, errorType: ErrorEnvironment.SignIn });
    }
    alertSnackBarMessage({
      message: "로그인에 실패했습니다.",
      type: SnackBarMessageType.ERROR,
    });
    yield put(actions.getAuthTokenRejected());
  }
}

function* refreshAuthTokenSaga(action: PayloadAction<RefreshToken>) {
  const params: RefreshTokenParams = {
    refreshToken: action.payload.refreshToken,
  };
  try {
    const result: AuthToken = yield call(() => refreshTokenGrantAuth(params));
    yield saveAuthToken(result.access_token, result.refresh_token);
    yield put(actions.getAuthTokenFullFilled(result));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      yield ErrorControl({
        error: error,
        errorType: ErrorEnvironment.RefreshToken,
      });
    }
    yield put(actions.getAuthTokenRejected());
  }
}

function* watchGetAuthToken() {
  yield takeLatest(actions.getAuthTokenPending.type, getAuthTokenSaga);
  yield takeLatest(
    actions.getAuthTokenRefreshPending.type,
    refreshAuthTokenSaga
  );
}

export default function* rootSaga() {
  yield all([watchGetAuthToken()]);
}
