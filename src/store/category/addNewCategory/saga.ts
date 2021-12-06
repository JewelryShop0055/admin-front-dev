import { call, delay, put, takeLatest, all } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { addNewCategory } from "../../../api/addNewCategory";
import {
  AddNewCategory,
  AddNewCategoryParams,
  AddNewCategoryResponse,
  ErrorEnvironment,
  ProductType,
  SnackBarMessageType,
} from "../../../types";
import alertSnackBarMessage from "../../../util/snackBarUitls";
import { ErrorControl } from "../../errorControl";
import { actions } from "./slice";

export function* addNewCategorySaga(action: PayloadAction<AddNewCategory>) {
  const params: AddNewCategoryParams = {
    categoryGroup: ProductType.product,
    categoryName: action.payload.categoryName,
  };
  try {
    const result: AddNewCategoryResponse = yield call(() =>
      addNewCategory(params)
    );
    alertSnackBarMessage({
      message: `신규 카테고리 "${action.payload.categoryName}"을 추가했습니다.`,
      type: SnackBarMessageType.SUCCESS,
    });
    yield put(actions.addNewCategoryFullfilled(result));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      ErrorControl({
        error: error,
        errorType: ErrorEnvironment.AddNewCategory,
        referenceTextData: action.payload.categoryName,
      });
    }
    yield put(actions.addNewCategoryRejected());
  }
}

export function* watchAddNewCategory() {
  yield takeLatest(actions.addNewCategoryPending.type, addNewCategorySaga);
}

export default function* rootsaga() {
  yield all([watchAddNewCategory()]);
}
