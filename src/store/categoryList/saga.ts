import { call, put, takeLatest, all } from "@redux-saga/core/effects";
import { actions } from "./slice";
import { PayloadAction } from "@reduxjs/toolkit";
import { getCategoryList } from "../../api/categoryList";
import {
  Category,
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
  console.log("카테고리리스트를 가져오는 api를 보냈습니다.");
  try {
    const result: Category[] = yield call(() => getCategoryList(config));

    //받은 배열길이가 요청한 길이보다 짧을시, 마지막 undefined index까지의 배열을 다시 만들어서 result로 put
    yield put(
      actions.getCategoryListFullFilled({
        categoryList: result,
        listLength: result.length,
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
}

export default function* rootSaga() {
  yield all([watchGetCategory()]);
}
