import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddNewCategory, Category, ProductType } from "../../types";

interface addNewCategoryParams {
  categoryType: ProductType;
  categoryName: string;
  isLoadingAddCategory: boolean;
  categoryResponse?: Category;
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
    addNewCategoryFullfilled: (state, action: PayloadAction<Category>) => {
      console.log("새로 추가된 카테고리:", action.payload.name);
      state.categoryName = action.payload.name;
      state.categoryResponse = action.payload;
      state.isLoadingAddCategory = false;
    },
    addNewCategoryRejected: (state) => {
      state.isLoadingAddCategory = false;
    },
  },
});

export const { actions } = addNewCategorySlice;

export default addNewCategorySlice.reducer;
