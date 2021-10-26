import { all } from "@redux-saga/core/effects";

import categorySaga from "../store/category/saga";

export function* rootSaga() {
  yield all([
    categorySaga(),
    //craftshopSaga(),
    //signInSaga(),
    //signOutSaga(),
  ]);
}
