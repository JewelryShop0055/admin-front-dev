import { call, put, takeLatest, all } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
  deleteCraftshop,
  DeleteCraftshopParams,
} from "../../../api/craftshop/deleteCraftshop";
import {
  Craftshop,
  ErrorEnvironment,
  SnackBarMessageType,
} from "../../../types";
import alertSnackBarMessage from "../../../util/snackBarUitls";
import { ErrorControl } from "../../errorControl";
import { actions } from "./slice";

function* deleteCraftshopSaga(
  action: PayloadAction<Pick<Craftshop, "id" | "name">>
) {
  const params: Pick<DeleteCraftshopParams, "id"> = {
    id: action.payload.id,
  };
  try {
    yield call(() => deleteCraftshop(params));
    alertSnackBarMessage({
      message: `"${action.payload.name}"를 삭제했습니다.`,
      type: SnackBarMessageType.SUCCESS,
    });
    yield put(actions.deleteCraftshopFullfilled());
  } catch (err) {
    if (axios.isAxiosError(err)) {
      ErrorControl({
        error: err,
        errorType: ErrorEnvironment.DELETE_CRAFTSHOP,
      });
    }
    alertSnackBarMessage({
      message: `공방을 삭제하지 못했습니다.`,
      type: SnackBarMessageType.ERROR,
    });
    yield put(actions.deleteCraftshopRejected());
  }
}

function* watchDeleteCraftshop() {
  yield takeLatest(actions.deleteCraftshopPending.type, deleteCraftshopSaga);
}

export default function* rootSaga() {
  yield all([watchDeleteCraftshop()]);
}
