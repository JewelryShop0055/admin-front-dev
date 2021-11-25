import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface modalHandleParam {
  isOpen: boolean;
}

const initialState: modalHandleParam = {
  isOpen: false,
};

export const categoryModalSlice = createSlice({
  name: "categoryModal",
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { actions } = categoryModalSlice;

export default categoryModalSlice.reducer;
