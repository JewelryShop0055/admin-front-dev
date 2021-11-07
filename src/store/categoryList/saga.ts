import { call, put, takeLatest, all } from "@redux-saga/core/effects";
import { actions } from "./slice";
import { PayloadAction } from "@reduxjs/toolkit";
import { getCategoryList } from "../../api/categoryList";
import {
  ErrorEnvironment,
  getCategoryListResponse,
  ProductCategoryList,
  ProductCategoryListParams,
  ProductType,
  SnackBarMessageType,
} from "../../types";
import { ErrorControl } from "../errorControl";
import axios from "axios";
import alertSnackBarMessage from "../../util/snackBarUitls";

function* getCategoryListSaga(action: PayloadAction<ProductCategoryList>) {
  const config: ProductCategoryListParams = {
    categoryGroup: ProductType.product,
    page: action.payload.page,
    limit: action.payload.limit,
  };
  try {
    const result: getCategoryListResponse = yield call(() =>
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
}

export default function* rootSaga() {
  yield all([watchGetCategory()]);
}
