import { call, put, takeLatest, all } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { actions, CategoryModalParams } from "./slice";

function* getInnerModalValueSaga(
  action: PayloadAction<Omit<CategoryModalParams, "isOpen">>
) {
  console.log("모달에 필요한 데이터를 가져옴");
  //일단은 비동기처리를 할수있게 해둬야함 => 추후 해당 리스트를 클라이언트에서 가져오는게 아니라, 서버에서 가져와서, 그동안 변할수도있던 여지를 커버하기 위함
  yield put(
    actions.getInnerModalValue({
      id: action.payload.id,
      name: action.payload.name,
      itemCount: action.payload.itemCount,
    })
  );
}

//toggle 자체가 watch당하는 액션이므로, 이것으로 사가를 직접돌려버리면 무한히 반복되어 프리징걸림
function* watchOpenModalSaga() {
  yield takeLatest(actions.openModal.type, getInnerModalValueSaga);
}

export default function* rootSaga() {
  yield all([watchOpenModalSaga()]);
}
