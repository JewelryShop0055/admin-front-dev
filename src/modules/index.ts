import { all } from "@redux-saga/core/effects";

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
import addNewCraftshop from "../store/craftshop/addNewCraftshop/slice";
import addNewCraftshopSaga from "../store/craftshop/addNewCraftshop/saga";
import craftshopList from "../store/craftshop/craftshopList/slice";
import craftshopListSaga from "../store/craftshop/craftshopList/saga";
import findAddress from "../store/findAddress/slice";
import deleteCraftshop from "../store/craftshop/deleteCraftshop/slice";
import deleteCraftshopSaga from "../store/craftshop/deleteCraftshop/saga";
import selectCraftshop from "../store/craftshop/selectedCraftshop/slice";
import selectCraftshopSaga from "../store/craftshop/selectedCraftshop/saga";
import updateCraftshop from "../store/craftshop/updateCraftshop/slice";
import updateCraftshopSaga from "../store/craftshop/updateCraftshop/saga";

export const reducers = {
  signIn,
  signOut,

  addNewCategory,
  categoryList,
  deleteCategory,
  replaceCurrentCategory,
  categoryModal,

  addNewCraftshop,
  craftshopList,
  deleteCraftshop,
  selectCraftshop,
  updateCraftshop,

  findAddress,
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

    craftshopListSaga(),
    deleteCraftshopSaga(),
    selectCraftshopSaga(),
    updateCraftshopSaga(),

    deleteCategorySaga(),
  ]);
}
