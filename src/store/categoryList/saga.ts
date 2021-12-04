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
  const config: ProductCategoryListParams = {
    categoryGroup: ProductType.product,
    page: yield action.type === "categoryList/getCategoryListPending"
      ? 1
      : action.payload.page,
    limit: 10,
  };
  //신규추가일때만 1, 나머지는 페이지입력값을 받도록하자...그냥... 답이없다...
  yield console.log(action.type);

  try {
    const result: GetCategoryListResponse = yield call(() =>
      getCategoryList(config)
    );
    yield console.log("새로가져왔지롱", result, action.payload);

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

function* getNewCategoryListSaga(action: PayloadAction) {
  yield console.log("모달에서의 액션", action.type);
  yield console.log(
    action.type === "replaceCurrentCategory/replaceCurrentCategoryFullfilled"
  );
}

function* watchGetCategory() {
  yield takeLatest(actions.getCategoryListPending.type, getCategoryListSaga);
  yield takeEvery(
    [
      deleteAction.deleteCategoryFullfilled.type,
      replaceAction.replaceCurrentCategoryFullfilled.type,
      addAction.addNewCategoryFullfilled.type,
    ],
    getNewCategoryListSaga
  );
}

export default function* rootSaga() {
  yield all([watchGetCategory()]);
}
