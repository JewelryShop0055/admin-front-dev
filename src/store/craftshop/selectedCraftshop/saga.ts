import { call, put, takeLatest, all } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { actions, selectedCraftshopState } from "./slice";

function* selectElementSaga(
  action: PayloadAction<Omit<selectedCraftshopState, "isSelect">>
) {
  yield put(
    actions.selectElementFullfilled({
      id: action.payload.id,
      name: action.payload.name,
      postCode: action.payload.postCode,
      address: action.payload.address,
      detailAddress: action.payload.detailAddress,
      phone: action.payload.phone,
      updatedAt: action.payload.updatedAt,
      createdAt: action.payload.createdAt,
    })
  );
}

function* watchSelectElementSaga() {
  yield takeLatest(actions.selectElementPending.type, selectElementSaga);
}

export default function* rootSaga() {
  yield all([watchSelectElementSaga()]);
}
