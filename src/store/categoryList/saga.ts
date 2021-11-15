import { call, put, takeLatest, all, delay } from "@redux-saga/core/effects";
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

import { actions as addNewCategoryActions } from "../addNewCategory/slice";

function* getCategoryListSaga(action: PayloadAction<ProductCategoryList>) {
  yield delay(200);
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
        page: action.payload.page,
        isCategoryListLoadComplete:
          result.length !== action.payload.limit ? true : false,
      })
    );
    if (result.length !== action.payload.limit) {
      return true;
    }
    return false;
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

function* addNewCategoryToCurrentListSaga() {
  yield console.log("list에 신규 카테고리반영");
  //일단 리스트 맨밑바닥에 신규카테고리를 넣어야하는데, 그러려면 현재 리스트가 전부 받아와져 있어야 한다.
  // => 일단 현재의 리스트 전부를 받아오고 그다음 신규카테고리를 최신화된 전체리스트 맨뒤에 추가
  let isCategoryListLoadComplete = false;
  // while (!isCategoryListLoadComplete) {
  //   yield console.log("나머지 list 받아오는중");
  //   yield actions.getCategoryListPending({

  //   })
  //     ? (isCategoryListLoadComplete = true)
  //     : (isCategoryListLoadComplete = false);
  // }

  // yield put(
  //   actions.getCategoryListFullFilled({
  //     categoryList: ,
  //     listLength: result.length,
  //     page: action.payload.page,
  //     isCategoryListLoadComplete:
  //       result.length !== action.payload.limit ? true : false,
  //   })
  // );
  // yield put(
  //   actions.getCategoryListFullFilled({})
  // )
}

function* watchGetCategory() {
  yield takeLatest(actions.getCategoryListPending.type, getCategoryListSaga);
  //미들웨어에서 카테고리가 정상적으로 추가된 엑션을 감지하여 현재의 리스트에 추가한 값을 반영한다.
  yield takeLatest(
    addNewCategoryActions.addNewCategoryFullfilled.type,
    addNewCategoryToCurrentListSaga
  );
}

export default function* rootSaga() {
  yield all([watchGetCategory()]);
}
