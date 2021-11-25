import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type replaceCurrentCategoryParams = {
  targetId: number;
  currentCategoryName: string;
  newCategoryName: string;
};

interface putCurrentCategoryState {
  targetId: number;
  currentCategoryName: string;
  newCategoryName: string;
  isStandByPutCategoryName: boolean;
  isLoadingPutCategoryName: boolean;
  isPutCategoryName: boolean;
}

const initialState: putCurrentCategoryState = {
  targetId: 0,
  currentCategoryName: "",
  newCategoryName: "",
  isStandByPutCategoryName: false,
  isLoadingPutCategoryName: false,
  isPutCategoryName: false,
};

export const replaceCurrentCategorySlice = createSlice({
  name: "replaceCurrentCategory",
  initialState,
  reducers: {
    //스텐바이사용하는건 엄청 구리니까 다 지우고 다시하기
    replaceCurrentCategoryStandBy: (
      state,
      action: PayloadAction<replaceCurrentCategoryParams>
    ) => {
      state.targetId = action.payload.targetId;
      state.currentCategoryName = action.payload.currentCategoryName;
      state.isStandByPutCategoryName = true;
    },
    replaceCurrentCategoryPending: (
      state,
      action: PayloadAction<replaceCurrentCategoryParams>
    ) => {
      state.newCategoryName = action.payload.newCategoryName;
      state.isLoadingPutCategoryName = true;
    },
    replaceCurrentCategoryFullfilled: (state) => {
      state.newCategoryName = "";
      state.isStandByPutCategoryName = false;
      state.isLoadingPutCategoryName = false;
      state.isPutCategoryName = true;
    },
    replaceCurrentCategoryCancel: (state) => {
      state.targetId = 0;
      state.currentCategoryName = "";
      state.isStandByPutCategoryName = false;
      state.isLoadingPutCategoryName = false;
    },
    replaceCurrentCategoryRejected: (state) => {
      state.newCategoryName = "";
      state.isStandByPutCategoryName = false;
      state.isLoadingPutCategoryName = false;
    },
  },
});

export const { actions } = replaceCurrentCategorySlice;

export default replaceCurrentCategorySlice.reducer;
