import {
  call,
  put,
  takeLatest,
  all,
  delay,
  takeEvery,
} from "@redux-saga/core/effects";
import { actions } from "./slice";
import { PayloadAction } from "@reduxjs/toolkit";
import { getCategoryList } from "../../api/categoryList";
import {
  Category,
  ErrorEnvironment,
  GetCategoryListResponse,
  ProductCategoryList,
  ProductCategoryListParams,
  ProductType,
  SnackBarMessageType,
} from "../../types";
import { ErrorControl } from "../errorControl";
import axios from "axios";
import alertSnackBarMessage from "../../util/snackBarUitls";

import { actions as deleteAction } from "../deleteCategory/slice";
import { actions as replaceAction } from "../replaceCurrentCategory/slice";
import { actions as addAction } from "../addNewCategory/slice";

function* getCategoryListSaga(action: PayloadAction<ProductCategoryList>) {
  yield delay(100);
  const config: ProductCategoryListParams = {
    categoryGroup: ProductType.product,
    page: action.payload.page,
    limit: 10,
  };

  try {
    const result: GetCategoryListResponse = yield call(() =>
      getCategoryList(config)
    );
    yield put(actions.getCategoryListFullFilled(result));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      ErrorControl({
        error: error,
        errorType: ErrorEnvironment.GetCategoryList,
      });
    }
    alertSnackBarMessage({
      message: "카테고리 리스트를 가져오는데 실패했습니다.",
      type: SnackBarMessageType.ERROR,
    });
    yield put(actions.getCategoryListRejected());
  }
}

function* watchGetCategory() {
  yield takeLatest(actions.getCategoryListPending.type, getCategoryListSaga);
  yield takeEvery(
    [
      deleteAction.deleteCategoryFullfilled.type,
      replaceAction.replaceCurrentCategoryFullfilled.type,
      addAction.addNewCategoryFullfilled.type,
    ],
    getCategoryListSaga
  );
}

export default function* rootSaga() {
  yield all([watchGetCategory()]);
}
