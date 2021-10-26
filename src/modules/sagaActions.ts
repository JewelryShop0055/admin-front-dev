import { all } from "@redux-saga/core/effects";

import categorySaga from "../store/category/saga";
import signInSaga from "../store/signIn/saga";

export function* rootSaga() {
  yield all([
    categorySaga(),
    signInSaga(),
    //craftshopSaga(),
    //signOutSaga(),
  ]);
}
