import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category, ProductCategoryList } from "../../types";

export interface CategoryListSliceState {
  categoryList: Category[];
  listLength: number;
  isLoadingCategory: boolean;
}

export interface CategoryListSliceParams {
  categoryList: Category[];
  listLength: number;
}

const initialState: CategoryListSliceState = {
  categoryList: [],
  listLength: 0,
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
      state.categoryList = state.categoryList.concat(
        action.payload.categoryList
      );
      state.listLength += action.payload.listLength;
      state.isLoadingCategory = false;
    },
    getCategoryListRejected: (state) => {
      state.isLoadingCategory = false;
    },
  },
});

// export const { getCategoryPandding } = categorySlice.actions;

export const { actions } = categoryListSlice;

export default categoryListSlice.reducer;
