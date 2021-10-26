import { call, delay, put, takeLatest, all } from "@redux-saga/core/effects";
import { addNewCategory, ProductType } from "../../api/category";
import { actions, categorySlice } from "./slice";
import axios from "axios";
import { PayloadAction } from "@reduxjs/toolkit";
import { getCategoryList, getCategoryList_New } from "../../api/categoryList";
import { getAuthToken } from "../../util/auth";

export const fetchData = categorySlice;

//완벽히 추론이 안되므로 이걸로 result타입을 박아줘야함 => 휴먼에러!
interface AddCategoryResponse {
  id: string;
  type: string;
  name: string;
}

export function* CategoryCreate(action: PayloadAction<string>) {
  //     const URL = `${process.env.REACT_APP_SERVER_BASE_URL}/admin/category/${categoryGroup}`;
  //   const accessToken = getAuthToken("user_access_token");
  //   const bodyProps = {
  //     name: categoryName,
  //   }; => 이걸 여기서 만들고 saga의 yield call에 박게함. api call은 진짜 딲 api콜만
  console.log("middleware진입");
  yield delay(500);
  try {
    const result: AddCategoryResponse = yield call(() =>
      addNewCategory({
        categoryGroup: ProductType.product,
        categoryName: action.payload,
      })
    );
    console.log("미들웨어 result", result);
    // yield put(fetchData.actions.setCategory({ payload: result }));
  } catch (e) {
    if (axios.isAxiosError(e)) {
      if (e.response!.status === 401) {
        alert("인증이 만료되었습니다. 다시 로그인 해주세요.");
      } else if (e.response!.status >= 400 && e.response!.status < 500) {
        alert("이미 등록된 카테고리입니다.");
      } else if (e.response!.status > 500) {
        alert("서버의 상태가 좋지 않습니다. 관리자에게 연락바랍니다.");
      } else {
        alert("알 수 없는 에러입니다. 관리자에게 연락바랍니다.");
      }
      yield put({ type: "FETCH_FAILED", payload: e });
    }
  }
}

export function* categorySaga() {
  yield takeLatest(actions.getCategoryPending, CategoryCreate);
}

interface ResponseElements {
  id: number;
  name: string;
  type: string;
  depth: number;
  createdAt: string;
  updatedAt: string;
}

interface Response {
  categoryList: Array<ResponseElements>[];
}

function* getCategory(action: PayloadAction<string>) {
  const config = {
    categoryGroup: ProductType.product,
    headers: {
      Authorization: `Bearer ${getAuthToken("user_access_token")}`,
    },
  };
  try {
    const result: Response = yield call(() => getCategoryList_New(config));
    console.log("개선 api res", result);
    yield put(actions.getCategoryFullFilled(result));
  } catch (e) {
    yield put(actions.getCategoryRejected());
  }
}

function* watchGetCategory() {
  yield takeLatest(actions.getCategoryPending.type, getCategory);
}

export default function* rootSaga() {
  yield all([watchGetCategory()]);
}
