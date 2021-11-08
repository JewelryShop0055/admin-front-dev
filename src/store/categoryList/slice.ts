import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";
import { Category, ProductCategoryList } from "../../types";

export interface CategoryListSliceState {
  categoryList: Category[];
  listLength: number;
  page: number;
  isLoadingCategory: boolean;
  isCategoryListLoadComplete: boolean;
}

export interface CategoryListSliceParams {
  categoryList: Category[];
  listLength: number;
  page: number;
  isCategoryListLoadComplete: boolean;
}

const initialState: CategoryListSliceState = {
  categoryList: [],
  listLength: 0,
  page: 0,
  isLoadingCategory: false,
  isCategoryListLoadComplete: false,
};

export const categoryListSlice = createSlice({
  name: "categoryList",
  initialState,
  reducers: {
    getCategoryListPending: (
      state,
      action: PayloadAction<ProductCategoryList>
    ) => {
      state.isLoadingCategory = true;
    },
    getCategoryListFullFilled: (
      state,
      action: PayloadAction<CategoryListSliceParams>
    ) => {
      state.categoryList = state.categoryList.concat(
        action.payload.categoryList
      );
      state.listLength += action.payload.listLength;
      state.page = action.payload.page;
      state.isLoadingCategory = false;
      state.isCategoryListLoadComplete =
        action.payload.isCategoryListLoadComplete;
    },
    getCategoryListRejected: (state) => {
      state.isLoadingCategory = false;
    },
  },
});

// export const { getCategoryPandding } = categorySlice.actions;

export const { actions } = categoryListSlice;

export default categoryListSlice.reducer;
