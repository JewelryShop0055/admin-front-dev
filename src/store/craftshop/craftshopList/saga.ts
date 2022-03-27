import { call, put, takeLatest, all, delay } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { getCraftshopList } from "../../../api/craftshop/craftshopList";
import {
  CraftshopListParams,
  ErrorEnvironment,
  GetCraftshopListResponse,
  SnackBarMessageType,
} from "../../../types";
import alertSnackBarMessage from "../../../util/snackBarUitls";
import { ErrorControl } from "../../errorControl";
import { actions } from "./slice";

function* getCraftshopListSaga(action: PayloadAction<CraftshopListParams>) {
  yield delay(100);
  const config: CraftshopListParams = {
    page: action.payload.page,
    limit: action.payload.limit,
  };

  try {
    const result: GetCraftshopListResponse = yield call(() =>
      getCraftshopList(config)
    );
    yield put(actions.getCraftshopListFullfilled(result));
  } catch (e) {
    if (axios.isAxiosError(e)) {
      ErrorControl({
        error: e,
        errorType: ErrorEnvironment.GET_CRAFTSHOP_LIST,
      });
    }
    alertSnackBarMessage({
      message: "공방 리스트를 가져오는데 실패했습니다.",
      type: SnackBarMessageType.ERROR,
    });
    yield put(actions.getCraftshopListRejected());
  }
}

function* watchGetCraftshopList() {
  yield takeLatest(actions.getCraftshopListPending.type, getCraftshopListSaga);
  // yield takeEvery([/**추가/삭제/수정액션 올곳 */], getCraftshopListSaga)
}

export default function* rootSaga() {
  yield all([watchGetCraftshopList()]);
}
