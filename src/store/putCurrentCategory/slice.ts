import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type putCurrentCategoryParams = {
  targetId: number;
  currentCategoryName: string;
  putCategoryName: string;
};

interface putCurrentCategoryState {
  targetId: number;
  currentCategoryName: string;
  putCategoryName: string;
  isStandByPutCategoryName: boolean;
  isLoadingPutCategoryName: boolean;
  isPutCategoryName: boolean;
}

const initialState: putCurrentCategoryState = {
  targetId: 0,
  currentCategoryName: "",
  putCategoryName: "",
  isStandByPutCategoryName: false,
  isLoadingPutCategoryName: false,
  isPutCategoryName: false,
};

export const putCurrentCategorySlice = createSlice({
  name: "putCurrentCategory",
  initialState,
  reducers: {
    putCurrentCategoryStandBy: (
      state,
      action: PayloadAction<putCurrentCategoryParams>
    ) => {
      state.targetId = action.payload.targetId;
      state.currentCategoryName = action.payload.currentCategoryName;
      state.isStandByPutCategoryName = true;
    },
    putCurrentCategoryPending: (
      state,
      action: PayloadAction<putCurrentCategoryParams>
    ) => {
      state.putCategoryName = action.payload.putCategoryName;
      state.isLoadingPutCategoryName = true;
    },
    putCurrentCategoryFullfilled: (
      state
      //   action: PayloadAction<putCurrentCategoryParams>
    ) => {
      state.putCategoryName = "";
      state.isStandByPutCategoryName = false;
      state.isLoadingPutCategoryName = false;
      state.isPutCategoryName = true;
    },
    putCurrentCategoryRejected: (state) => {
      state.putCategoryName = "";
      state.isStandByPutCategoryName = false;
      state.isLoadingPutCategoryName = false;
    },
  },
});

export const { actions } = putCurrentCategorySlice;

export default putCurrentCategorySlice.reducer;
