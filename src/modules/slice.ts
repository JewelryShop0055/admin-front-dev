import {
  createAction,
  createReducer,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { delay, put, takeLeading } from "redux-saga/effects";

const BUTTON_CLICK = "BUTTON_CLICK";
const BUTTON_CLICK_ASYNC = "BUTTON_CLICK_ASYNC";

export const buttonClick = () => ({ type: BUTTON_CLICK });
export const buttonClickAsync = () => ({ type: BUTTON_CLICK_ASYNC });

function* buttonClickSaga() {
  yield delay(1000);
  yield put(buttonClick());
}

export function* handleEventSaga() {
  yield takeLeading(BUTTON_CLICK_ASYNC, buttonClickSaga);
}

export default function handleEvent(
  event: React.MouseEventHandler<HTMLDivElement>,
  action: typeof BUTTON_CLICK
) {
  switch (action) {
    case BUTTON_CLICK:
      return event;
    default:
      return null;
  }
}
