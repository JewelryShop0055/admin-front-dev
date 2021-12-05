import { call, put, takeLatest, all } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { actions, CategoryModalParams } from "./slice";

function* getInnerModalValueSaga(
  action: PayloadAction<Omit<CategoryModalParams, "isOpen">>
) {
  yield put(
    actions.getInnerModalValue({
      modalType: action.payload.modalType,
      id: action.payload.id,
      name: action.payload.name,
      itemCount: action.payload.itemCount,
    })
  );
}

function* watchOpenModalSaga() {
  yield takeLatest(actions.openModal.type, getInnerModalValueSaga);
}

export default function* rootSaga() {
  yield all([watchOpenModalSaga()]);
}
