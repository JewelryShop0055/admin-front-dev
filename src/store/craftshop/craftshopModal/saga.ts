import { call, put, takeLatest, all } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { actions, CraftshopModalParams } from "./slice";

function* getInnerModalValueSaga(
  action: PayloadAction<Omit<CraftshopModalParams, "isOpen">>
) {
  yield put(
    actions.getInnerModalValue({
      modalType: action.payload.modalType,
      name: action.payload.name,
      address: action.payload.address,
      phone: action.payload.phone,
    })
  );
}

function* watchOpenModalSaga() {
  yield takeLatest(actions.openModal.type, getInnerModalValueSaga);
}

export default function* rootSaga() {
  yield all([watchOpenModalSaga()]);
}
