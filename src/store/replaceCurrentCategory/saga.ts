import { call, put, takeLatest, all } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { replaceCurrentCategory } from "../../api/replaceCurrentCategory";
import { ErrorEnvironment, SnackBarMessageType } from "../../types";
import alertSnackBarMessage from "../../util/snackBarUitls";
import { ErrorControl } from "../errorControl";
import { actions, replaceCurrentCategoryParams } from "./slice";

function* replaceCurrentCategorySaga(
  action: PayloadAction<replaceCurrentCategoryParams>
) {
  console.log("수정 사가");
  const params: replaceCurrentCategoryParams = {
    targetId: action.payload.targetId,
    currentCategoryName: action.payload.currentCategoryName,
    newCategoryName: action.payload.newCategoryName,
  };
  try {
    yield call(() => replaceCurrentCategory(params));
    alertSnackBarMessage({
      message: `카테고리명 "${action.payload.currentCategoryName}"을 "${action.payload.newCategoryName}"으로 수정했습니다.`,
      type: SnackBarMessageType.SUCCESS,
    });
    yield put(actions.replaceCurrentCategoryFullfilled());
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
    yield put(actions.replaceCurrentCategoryRejected());
  }
}

function* watchPutCurrentCategory() {
  yield takeLatest(
    actions.replaceCurrentCategoryPending.type,
    replaceCurrentCategorySaga
  );
}

export default function* rootSaga() {
  yield all([watchPutCurrentCategory()]);
}