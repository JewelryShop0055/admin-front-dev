import { call, put, takeLatest, all } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ErrorEnvironment, SnackBarMessageType } from "../../../types";
import alertSnackBarMessage from "../../../util/snackBarUitls";
import { ErrorControl } from "../../errorControl";
import { actions, UpdateCraftshopState } from "./slice";
import { Craftshop } from "../../../types";
import { updateCraftshop } from "../../../api/craftshop/updateCraftshop";

export interface UpdateCraftshopParams
  extends Omit<UpdateCraftshopState, "isLoadingUpdateCraftshop"> {}

function* updateCraftshopSaga(action: PayloadAction<UpdateCraftshopParams>) {
  const params: UpdateCraftshopParams = {
    id: action.payload.id,
    name: action.payload.name,
    postCode: action.payload.postCode,
    address: action.payload.address,
    detailAddress: action.payload.detailAddress,
    phone: action.payload.phone,
  };
  try {
    const result: Craftshop = yield call(() => {
      updateCraftshop(params);
    });
    alertSnackBarMessage({
      message: `"${action.payload.name}"으로 수정했습니다.`,
      type: SnackBarMessageType.SUCCESS,
    });
    yield put(actions.updateCraftshopFullfilled(result));
  } catch (err) {
    if (axios.isAxiosError(err)) {
      ErrorControl({
        error: err,
        errorType: ErrorEnvironment.ADD_NEWCRAFT_SHOP,
        referenceTextData: action.payload.name,
      });
    }
    yield put(actions.updateCraftshopRejected());
  }
}

export function* watchUpdateCraftshopSaga() {
  yield takeLatest(actions.updateCraftshopPending.type, updateCraftshopSaga);
}

export default function* rootsaga() {
  yield all([watchUpdateCraftshopSaga()]);
}
