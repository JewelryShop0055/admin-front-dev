import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CraftshopList, CraftshopListParams } from "../../../types";
import { categoryListSlice } from "../../category/categoryList/slice";

interface CraftshopListState extends CraftshopList {
  isLoadingCraftshopList: boolean;
}

const initialState: CraftshopListState = {
  craftshopList: [],
  currentPage: 0,
  maxPage: 0,
  isLoadingCraftshopList: false,
};

export const craftshopListSlice = createSlice({
  name: "craftshopList",
  initialState,
  reducers: {
    getCraftshopListPending: (
      state,
      action: PayloadAction<CraftshopListParams>
    ) => {
      state.isLoadingCraftshopList = true;
    },
    getCraftshopListFullfilled: (
      state,
      action: PayloadAction<CraftshopList>
    ) => {
      state.craftshopList = action.payload.craftshopList;
      state.currentPage = action.payload.currentPage;
      state.maxPage = action.payload.maxPage;
      state.isLoadingCraftshopList = false;
    },
    getCraftshopListRejected: (state) => {
      state.isLoadingCraftshopList = false;
    },
  },
});

export const { actions } = craftshopListSlice;
export default categoryListSlice.reducer;
