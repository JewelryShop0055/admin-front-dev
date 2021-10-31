import { call, put, takeLatest, all } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { passwordGrantAuth } from "../../api/signIn";

import { actions } from "./slice";
import {
  AuthToken,
  RefreshToken,
  RefreshTokenParams,
  SignIn,
  SignInParams,
} from "../../types";
import { saveAuthToken } from "../../util/auth";

import axios from "axios";
import { history } from "../../app/store";
import { refreshTokenGrantAuth } from "../../api/refreshToken";

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
      if (e.response!.status >= 400 && e.response!.status < 500) {
        alert("아이디 또는 비밀번호가 잘못되었습니다.");
      } else if (e.response!.status > 500) {
        alert("서버의 상태가 좋지 않습니다. 관리자에게 연락바랍니다.");
      } else {
        alert("알 수 없는 에러입니다. 관리자에게 연락바랍니다.");
      }
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
    saveAuthToken(result.access_token, result.refresh_token);
    yield put(actions.getAuthTokenFullFilled(result));
  } catch (e) {
    if (axios.isAxiosError(e)) {
      //에러처리용 추상화 필요
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
