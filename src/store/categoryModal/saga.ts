import { call, put, takeLatest, all } from "@redux-saga/core/effects";
import { actions } from "./slice";

function* toggleCategoryModalSaga() {
  console.log("모달사가");
  yield actions.toggleModal();
}

//toggle 자체가 watch당하는 액션이므로, 이것으로 사가를 직접돌려버리면 무한히 반복되어 프리징걸림
function* watchToggleCategoryModalSaga() {
  yield takeLatest(actions.toggleModal.type, toggleCategoryModalSaga);
}

export default function* rootSaga() {
  yield all([watchToggleCategoryModalSaga()]);
}
