import { call, put, takeLatest, all } from "@redux-saga/core/effects";
import { actions } from "./slice";

function* toggleCategoryModalSaga() {
  yield actions.toggleModal();
}

function* watchToggleCategoryModalSaga() {
  yield takeLatest(actions.toggleModal.type, toggleCategoryModalSaga);
}

export default function* rootSaga() {
  yield all([watchToggleCategoryModalSaga()]);
}
