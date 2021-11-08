import { all } from "@redux-saga/core/effects";

import craftshopAddress from "../util/CraftshopAddressSlice";
import topNavigation from "../util/TopNavigationSlice";

import signInSaga from "../store/signIn/saga";
import signIn from "../store/signIn/slice";
import signOut from "../store/signOut/slice";
import signOutSaga from "../store/signOut/saga";
import addNewCategory from "../store/addNewCategory/slice";
import addNewCategorySaga from "../store/addNewCategory/saga";
import categoryList from "../store/categoryList/slice";
import categoryListSaga from "../store/categoryList/saga";
import deleteCategory from "../store/deleteCategory/slice";
import deleteCategorySaga from "../store/deleteCategory/saga";

export const reducers = {
  topNavigation,
  signIn,
  signOut,
  addNewCategory,
  categoryList,
  deleteCategory,

  craftshopAddress,
};

export function* rootSaga() {
  yield all([
    signInSaga(),
    signOutSaga(),
    addNewCategorySaga(),
    categoryListSaga(),
    deleteCategorySaga(),
  ]);
}
