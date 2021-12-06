import { all } from "@redux-saga/core/effects";

import craftshopAddress from "../util/CraftshopAddressSlice";
import topNavigation from "../util/TopNavigationSlice";

import signInSaga from "../store/signIn/saga";
import signIn from "../store/signIn/slice";
import signOut from "../store/signOut/slice";
import signOutSaga from "../store/signOut/saga";
import addNewCategory from "../store/category/addNewCategory/slice";
import addNewCategorySaga from "../store/category/addNewCategory/saga";
import categoryList from "../store/category/categoryList/slice";
import categoryListSaga from "../store/category/categoryList/saga";
import deleteCategory from "../store/category/deleteCategory/slice";
import deleteCategorySaga from "../store/category/deleteCategory/saga";
import replaceCurrentCategory from "../store/category/replaceCurrentCategory/slice";
import replaceCurrentCategorySaga from "../store/category/replaceCurrentCategory/saga";
import categoryModal from "../store/category/categoryModal/slice";
import categoryModalSaga from "../store/category/categoryModal/saga";
import addNewCraftshop from "../store/addNewCraftshop/slice";
import addNewCraftshopSaga from "../store/addNewCraftshop/saga";
import craftshopModal from "../store/craftshopModal/slice";
import craftshopModalSaga from "../store/craftshopModal/saga";

export const reducers = {
  topNavigation,
  signIn,
  signOut,
  addNewCategory,
  categoryList,
  deleteCategory,
  replaceCurrentCategory,
  categoryModal,
  addNewCraftshop,
  craftshopModal,

  craftshopAddress,
};

export function* rootSaga() {
  yield all([
    signInSaga(),
    signOutSaga(),
    addNewCategorySaga(),
    categoryListSaga(),
    replaceCurrentCategorySaga(),
    categoryModalSaga(),
    addNewCraftshopSaga(),
    craftshopModalSaga(),

    deleteCategorySaga(),
  ]);
}
