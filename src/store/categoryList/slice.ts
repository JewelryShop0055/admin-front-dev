import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category, ProductCategoryList } from "../../types";

export interface CategoryListSliceState {
  categoryList?: Category[];
  isLoadingCategory: boolean;
}

const initialState: CategoryListSliceState = {
  categoryList: undefined,
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
    getCategoryListFullFilled: (state, action) => {
      state.categoryList = action.payload;
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
