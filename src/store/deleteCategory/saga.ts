import { call, put, takeLatest, all } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { deleteCategory } from "../../api/deleteCategory";
import {
  DeleteCategory,
  DeleteCategoryParams,
  ErrorEnvironment,
  ProductType,
  SnackBarMessageType,
} from "../../types";
import alertSnackBarMessage from "../../util/snackBarUitls";
import { ErrorControl } from "../errorControl";
import { actions } from "./slice";

function* deleteCategorySaga(action: PayloadAction<DeleteCategory>) {
  console.log("삭제 사가 시작");
  const params: DeleteCategoryParams = {
    categoryGroup: ProductType.product,
    categoryId: action.payload.categoryId,
  };
  try {
    yield call(() => deleteCategory(params));
    alertSnackBarMessage({
      message: `"${action.payload.categoryName}"를 삭제했습니다.`,
      type: SnackBarMessageType.SUCCESS,
    });
    console.log("삭제 사가 끝");
    yield put(
      actions.deleteCategoryFullfilled({
        categoryName: action.payload.categoryName,
      })
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      ErrorControl({
        error: error,
        errorType: ErrorEnvironment.DeleteCategory,
      });
    }
    alertSnackBarMessage({
      message: `카테고리를 삭제하지 못했습니다.`,
      type: SnackBarMessageType.ERROR,
    });
    yield put(actions.deleteCategoryRejected());
  }
}

function* watchDeleteCategory() {
  yield takeLatest(actions.deleteCategoryPending.type, deleteCategorySaga);
}

export default function* rootSaga() {
  yield all([watchDeleteCategory()]);
}
