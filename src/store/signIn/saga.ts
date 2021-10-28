import { call, put, takeLatest, all } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { getAuthToken } from "../../api/signIn";

import { actions } from "./slice";
import { ApiConfigProps, AuthToken, RefreshToken, SignIn } from "../../types";
import { saveAuthToken } from "../../util/auth";

import { history } from "../../app/historyStore";

function* getAuthTokenSaga(action: PayloadAction<SignIn>) {
  const config: ApiConfigProps = {
    contentsType: "application/x-www-form-urlencoded",
    bodyProps: `username=${action.payload.userId}&password=${action.payload.userPassword}&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}&scope=${process.env.REACT_APP_SCOPE}&grant_type=password`,
  };
  try {
    const result: AuthToken = yield call(() => getAuthToken(config));
    yield saveAuthToken(result.access_token, result.refresh_token);
    yield history.push("/TodaysChecklist");
    yield put(actions.getAuthTokenFullFilled(result));
  } catch (e) {
    yield put(actions.getAuthTokenRejected());
  }
}

function* refreshAuthTokenSaga(action: PayloadAction<RefreshToken>) {
  const config: ApiConfigProps = {
    contentsType: "application/x-www-form-urlencoded",
    bodyProps: `refresh_token=${action.payload.token}&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}&scope=${process.env.REACT_APP_SCOPE}&grant_type=refresh_token`,
  };
  try {
    const result: AuthToken = yield call(() => getAuthToken(config));
    yield saveAuthToken(result.access_token, result.refresh_token);
    yield put(actions.getAuthTokenFullFilled(result));
  } catch (e) {
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
