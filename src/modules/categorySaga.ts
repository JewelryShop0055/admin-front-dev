import { call, delay, put, takeLatest } from "@redux-saga/core/effects";
import { addNewCategory, ProductType } from "../api/category";
// import { categorySlice } from "../util/CategorySlice";
import axios from "axios";

// export const fetchData = categorySlice;

interface AddCategoryProps {
  type: string;
  payload: string;
}

interface AddCategoryResponse {
  id: string;
  type: string;
  name: string;
}

//isloading, isError,

export function* addCategory({ type, payload }: AddCategoryProps) {
  console.log("middleware진입");
  yield delay(500);
  try {
    // const result: AddCategoryResponse = yield call(() =>
    //   addNewCategory({
    //     categoryGroup: ProductType.product,
    //     categoryName: payload,
    //   })
    // );
    // console.log("미들웨어 result", result);
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

export const ADD_CATEGORY = "ADD_CATEGORY";

export const categoryActions = {
  ADD_CATEGORY: "ADD_CATEGORY",
};

export function* categorySaga() {
  yield takeLatest(categoryActions.ADD_CATEGORY, addCategory);
}
