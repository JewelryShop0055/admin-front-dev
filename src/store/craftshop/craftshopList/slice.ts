import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Craftshop,
  CraftshopList,
  CraftshopListParams,
  GetCraftshopListResponse,
} from "../../../types";

interface CraftshopListState {
  craftshopList: Craftshop[];
  currentPage: number;
  maxPage: number;
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
      action: PayloadAction<GetCraftshopListResponse>
    ) => {
      state.craftshopList = action.payload.data;
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
export default craftshopListSlice.reducer;
