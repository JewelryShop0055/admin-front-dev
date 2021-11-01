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
} from "../../types";
import { saveAuthToken } from "../../util/auth";

import axios from "axios";
import { history } from "../../app/store";
import { refreshTokenGrantAuth } from "../../api/refreshToken";
import { ErrorControl } from "../errorControl";

function* getAuthTokenSaga(action: PayloadAction<SignIn>) {
  const params: SignInParams = {
    userId: action.payload.userId,
    userPassword: action.payload.userPassword,
  };
  try {
    const result: AuthToken = yield call(() => passwordGrantAuth(params));
    console.log(result);
    yield saveAuthToken(result.access_token, result.refresh_token);
    yield history.push("/TodaysChecklist");
    yield put(actions.getAuthTokenFullFilled(result));
  } catch (e) {
    if (axios.isAxiosError(e)) {
      yield ErrorControl({ error: e, errorType: ErrorEnvironment.SignIn });
    }
    //토스트메시지 reject액션을 통해서 상태 => 나오게하고, 토스트메시지 떠있고(아마걍 무조건 떠있게 컴포넌트 되어있을듯. 아니면 시간할당해야지) => 다시 집어넣게
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
  } catch (e) {
    if (axios.isAxiosError(e)) {
      yield ErrorControl({
        error: e,
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
