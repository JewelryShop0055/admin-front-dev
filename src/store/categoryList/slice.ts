import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category, ProductCategoryList } from "../../types";

export interface CategoryListSliceState {
  categoryList: Category[];
  currentPage: number;
  maxPage: number;
  isLoadingCategory: boolean;
}

export interface CategoryListSliceParams {
  categoryList: Category[];
  currentPage: number;
  maxPage: number;
}

const initialState: CategoryListSliceState = {
  categoryList: [],
  currentPage: 0,
  maxPage: 0,
  isLoadingCategory: false,
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
      state.categoryList = action.payload.categoryList;
      state.currentPage = action.payload.currentPage;
      state.maxPage = action.payload.maxPage;
      state.isLoadingCategory = false;
    },
    getCategoryListRejected: (state) => {
      state.isLoadingCategory = false;
    },
  },
});

export const { actions } = categoryListSlice;

export default categoryListSlice.reducer;
