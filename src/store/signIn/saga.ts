import { call, put, delay, takeLatest, all } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { getAuthToken_New } from "../../api/signIn";
import { ApiConfigProps, AuthToken, SignIn } from "../../types";
import { actions } from "./slice";

function* getAuthToken(action: PayloadAction<SignIn>) {
  yield delay(300);
  console.log("getAuthToken시작");
  const config: ApiConfigProps = {
    contentsType: "application/x-www-form-urlencoded",
    bodyProps: `username=${action.payload.userId}&password=${action.payload.userPassword}&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}&scope=${process.env.REACT_APP_SCOPE}&grant_type=password`,
  };
  yield console.log(config);
  try {
    const result: AuthToken = yield call(() => getAuthToken_New(config));
    console.log(result);
    yield put(actions.getAuthTokenFullFilled(result));
  } catch (e) {
    yield put(actions.getAuthTokenRejected());
  }
}

function* watchGetAuthToken() {
  yield takeLatest(actions.getAuthTokenPending.type, getAuthToken);
}

export default function* rootSaga() {
  yield all([watchGetAuthToken()]);
}
