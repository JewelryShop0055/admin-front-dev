import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddNewCategory, DeleteCategory, ProductType } from "../../types";

interface deleteCategoryParams {
  categoryType: ProductType;
  categoryId: number;
  categoryName: string;
  isDeleteCategory: boolean;
  isLoadingDeleteCategory: boolean;
}

const initialState: deleteCategoryParams = {
  categoryType: ProductType.product,
  categoryId: -1,
  categoryName: "",
  isDeleteCategory: false,
  isLoadingDeleteCategory: false,
};

export const deleteCategorySlice = createSlice({
  name: "deleteCategory",
  initialState,
  reducers: {
    deleteCategoryPending: (state, action: PayloadAction<DeleteCategory>) => {
      state.categoryId = action.payload.categoryId;
      state.categoryName = action.payload.categoryName;
      state.isLoadingDeleteCategory = true;
    },
    deleteCategoryFullfilled: (
      state,
      action: PayloadAction<AddNewCategory>
    ) => {
      state.isDeleteCategory = true;
      state.isLoadingDeleteCategory = false;
    },
    deleteCategoryRejected: (state) => {
      state.isLoadingDeleteCategory = false;
    },
  },
});

export const { actions } = deleteCategorySlice;

export default deleteCategorySlice.reducer;
