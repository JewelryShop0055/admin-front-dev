import { call, put, takeLatest, all } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { putCurrentCategory } from "../../api/putCurrentCategory";
import { ErrorEnvironment, SnackBarMessageType } from "../../types";
import alertSnackBarMessage from "../../util/snackBarUitls";
import { ErrorControl } from "../errorControl";
import { actions, putCurrentCategoryParams } from "./slice";

function* putCurrentCategorySaga(
  action: PayloadAction<putCurrentCategoryParams>
) {
  console.log("수정 사가");
  const params: putCurrentCategoryParams = {
    targetId: action.payload.targetId,
    currentCategoryName: action.payload.currentCategoryName,
    putCategoryName: action.payload.putCategoryName,
  };
  try {
    yield call(() => putCurrentCategory(params));
    alertSnackBarMessage({
      message: `카테고리명 "${action.payload.currentCategoryName}"을 "${action.payload.putCategoryName}"으로 수정했습니다.`,
      type: SnackBarMessageType.SUCCESS,
    });
    yield put(actions.putCurrentCategoryFullfilled());
  } catch (error) {
    if (axios.isAxiosError(error)) {
      ErrorControl({
        error: error,
        errorType: ErrorEnvironment.DeleteCategory,
      });
    }
    alertSnackBarMessage({
      message: `카테고리를 수정하지 못했습니다.`,
      type: SnackBarMessageType.ERROR,
    });
    yield put(actions.putCurrentCategoryRejected());
  }
}

function* watchPutCurrentCategory() {
  yield takeLatest(
    actions.putCurrentCategoryPending.type,
    putCurrentCategorySaga
  );
}

export default function* rootSaga() {
  yield all([watchPutCurrentCategory()]);
}
