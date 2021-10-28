import { call, put, delay, takeLatest, all } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { getAuthToken_New } from "../../api/signIn";

import { actions } from "./slice";
import { ApiConfigProps, AuthToken, SignIn } from "../../types";
import { saveAuthToken } from "../../util/auth";
import { useHistory } from "react-router";
import { history } from "../../app/historyStore";

function* getAuthToken(action: PayloadAction<SignIn>) {
  const config: ApiConfigProps = {
    contentsType: "application/x-www-form-urlencoded",
    bodyProps: `username=${action.payload.userId}&password=${action.payload.userPassword}&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}&scope=${process.env.REACT_APP_SCOPE}&grant_type=password`,
  };
  yield console.log(config);
  try {
    const result: AuthToken = yield call(() => getAuthToken_New(config));
    console.log("정상api res:", result);
    yield saveAuthToken(result.access_token, result.refresh_token);
    yield history.push("/TodaysChecklist");
    yield put(actions.getAuthTokenFullFilled(result));
  } catch (e) {
    console.log("api error발생:", e);
    yield put(actions.getAuthTokenRejected());
  }
}

function* refreshAuthToken(action: PayloadAction) {}

function* watchGetAuthToken() {
  yield takeLatest(actions.getAuthTokenPending.type, getAuthToken);
}

export default function* rootSaga() {
  yield all([watchGetAuthToken()]);
}
