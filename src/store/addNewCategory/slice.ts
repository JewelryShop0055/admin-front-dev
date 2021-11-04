import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddNewCategory, ProductType } from "../../types";

interface addNewCategoryParams {
  categoryType: ProductType;
  categoryName: string;
  isLoadingAddCategory: boolean;
}

const initialState: addNewCategoryParams = {
  categoryType: ProductType.product,
  categoryName: "",
  isLoadingAddCategory: false,
};

export const addNewCategorySlice = createSlice({
  name: "addCategory",
  initialState,
  reducers: {
    addNewCategoryPending: (state, action: PayloadAction<AddNewCategory>) => {
      state.isLoadingAddCategory = true;
    },
    addNewCategoryFullfilled: (
      state,
      action: PayloadAction<AddNewCategory>
    ) => {
      state.categoryName = action.payload.categoryName;
      state.isLoadingAddCategory = false;
    },
    addNewCategoryRejected: (state) => {
      state.isLoadingAddCategory = false;
    },
  },
});

export const { actions } = addNewCategorySlice;

export default addNewCategorySlice.reducer;
