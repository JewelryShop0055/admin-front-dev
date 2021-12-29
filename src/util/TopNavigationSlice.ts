import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SelectState {
  value: number;
}

const initialState: SelectState = {
  value: 1,
} as SelectState;

export const topNavigationSlice = createSlice({
  name: "topNavigation",
  initialState,
  reducers: {
    selectState: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { selectState } = topNavigationSlice.actions;

export default topNavigationSlice.reducer;
