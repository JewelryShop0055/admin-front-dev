import { call, delay, put, takeLatest, all } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ErrorEnvironment, SnackBarMessageType } from "../../types";
import alertSnackBarMessage from "../../util/snackBarUitls";
import { ErrorControl } from "../errorControl";
import { actions } from "./slice";
import { AddNewCraftshopParams, Craftshop } from "../../types";
import { addNewCraftshop } from "../../api/addNewCraftshop";

export function* addNewCraftshopSaga(
  action: PayloadAction<AddNewCraftshopParams>
) {
  const params: AddNewCraftshopParams = {
    name: action.payload.name,
    postCode: action.payload.postCode,
    address: action.payload.address,
    detailAddress: action.payload.detailAddress,
    phone: action.payload.phone,
  };
  try {
    const result: Craftshop = yield call(() => {
      addNewCraftshop(params);
    });
    alertSnackBarMessage({
      message: `"${action.payload.name}"을 추가했습니다.`,
      type: SnackBarMessageType.SUCCESS,
    });
    yield put(actions.addNewCraftshopFullfilled(result));
  } catch (e) {
    if (axios.isAxiosError(e)) {
      ErrorControl({
        error: e,
        errorType: ErrorEnvironment.ADDNEWCRAFTSHOP,
        referenceTextData: action.payload.name,
      });
    }
    yield put(actions.addNewCraftshopRejected());
  }
}

export function* watchAddNewCraftshopSaga() {
  yield takeLatest(actions.addNewCraftshopPending.type, addNewCraftshopSaga);
}

export default function* rootsaga() {
  yield all([watchAddNewCraftshopSaga()]);
}
