// import {
//   createAction,
//   createReducer,
//   createSelector,
//   createSlice,
// } from "@reduxjs/toolkit";
// import { delay, put, takeLeading } from "redux-saga/effects";

// const BUTTON_CLICK = "BUTTON_CLICK";
// const BUTTON_CLICK_ASYNC = "BUTTON_CLICK_ASYNC";

// export const buttonClick = () => ({ type: BUTTON_CLICK });
// export const buttonClickAsync = () => ({ type: BUTTON_CLICK_ASYNC });

// function* buttonClickSaga() {
//   yield delay(1000);
//   yield put(buttonClick());
// }

// export function* handleEventSaga() {
//   yield takeLeading(BUTTON_CLICK_ASYNC, buttonClickSaga);
// }

// export default function handleEvent(
//   event: React.MouseEventHandler<HTMLDivElement>,
//   action: typeof BUTTON_CLICK
// ) {
//   switch (action) {
//     case BUTTON_CLICK:
//       return event;
//     default:
//       return null;
//   }
// }

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../util/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
