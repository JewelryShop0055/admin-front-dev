import { all } from "@redux-saga/core/effects";

import categorySaga from "../store/category/saga";
import category from "../store/category/slice";
import signInSaga from "../store/signIn/saga";
import craftshopAddress from "../util/CraftshopAddressSlice";
import topNavigation from "../util/TopNavigationSlice";
import signIn from "../store/signIn/slice";
import signOut from "../store/signOut/slice";

//object
export const reducers = {
  topNavigation,
  craftshopAddress,
  category,
  signIn,
  signOut,
};

export function* rootSaga() {
  yield all([
    categorySaga(),
    signInSaga(),

    //redux도 reducers = {...여러 리듀서들} => 여기서 합쳐서 store로 보낸다
    //craftshopSaga(),
    //signOutSaga(),
  ]);
}
