import { call, put, takeLatest, all, delay } from "@redux-saga/core/effects";
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
  delay(300);
  const config: ProductCategoryListParams = {
    categoryGroup: ProductType.product,
    page: action.payload.page,
    limit: action.payload.limit,
  };
  console.log("카테고리리스트를 가져오는 api를 보냈습니다.");
  try {
    const result: GetCategoryListResponse = yield call(() =>
      getCategoryList(config)
    );

    yield put(
      actions.getCategoryListFullFilled({
        categoryList: result.data,
        currentPage: result.currentPage,
        maxPage: result.maxPage,
      })
    );
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
  yield takeLatest(
    deleteAction.deleteCategoryFullfilled.type,
    getCategoryListSaga
  );
  //신규 추가 및 수정시 현재 리스트 리랜더링은 수정사항
  // yield takeLatest(
  //   replaceAction.replaceCurrentCategoryFullfilled.type,
  //   getCategoryListSaga
  // );
  // yield takeLatest(
  //   addAction.addNewCategoryFullfilled.type,
  //   getCategoryListSaga
  // );
}

export default function* rootSaga() {
  yield all([watchGetCategory()]);
}
