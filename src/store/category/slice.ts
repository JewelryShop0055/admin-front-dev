import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "../../types";

export interface CategorySliceState {
  category?: Category;
  isLoadingCategory: boolean;
}

const initialState: CategorySliceState = {
  category: undefined,
  isLoadingCategory: false,
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    getCategoryPending: (state, action: PayloadAction<string>) => {
      state.isLoadingCategory = true;
    },
    getCategoryFullFilled: (state, action) => {
      console.log("slice전", state.category, action.payload);
      state.category = action.payload;
      console.log("slice후", state.category, action.payload);
      state.isLoadingCategory = false;
    },
    getCategoryRejected: (state) => {
      state.isLoadingCategory = false;
    },
  },
});

// export const { getCategoryPandding } = categorySlice.actions;

export const { actions } = categorySlice;

export default categorySlice.reducer;
