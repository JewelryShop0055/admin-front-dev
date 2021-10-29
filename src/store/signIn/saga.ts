import { call, put, takeLatest, all } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { getAuthToken } from "../../api/signIn";

import { actions } from "./slice";
import { ApiConfigProps, AuthToken, RefreshToken, SignIn } from "../../types";
import { saveAuthToken } from "../../util/auth";

import { history } from "../../app/historyStore";
import axios from "axios";

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
    if (axios.isAxiosError(e)) {
      if (e.response!.status >= 400 && e.response!.status < 500) {
        alert("아이디 또는 비밀번호가 잘못되었습니다.");
      } else if (e.response!.status > 500) {
        alert("서버의 상태가 좋지 않습니다. 관리자에게 연락바랍니다.");
      } else {
        alert("알 수 없는 에러입니다. 관리자에게 연락바랍니다.");
      }
    }
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
    if (axios.isAxiosError(e)) {
      if (e.response!.status >= 400 && e.response!.status < 500) {
        alert("인증토큰에 오류가 발생했습니다. 로그인 페이지로 이동합니다.");
        yield history.push("/");
      } else if (e.response!.status > 500) {
        alert("서버의 상태가 좋지 않습니다. 관리자에게 연락바랍니다.");
      } else {
        alert("알 수 없는 에러입니다. 관리자에게 연락바랍니다.");
      }
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
