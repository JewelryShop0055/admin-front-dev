import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Craftshop } from "../../../types";

interface DeleteCraftshopState extends Pick<Craftshop, "id"> {
  isLoadingDeleteCraftshop: boolean;
}

const initialState: DeleteCraftshopState = {
  id: "",
  isLoadingDeleteCraftshop: false,
};

export const deleteCraftshopSlice = createSlice({
  name: "deleteCraftshop",
  initialState,
  reducers: {
    deleteCraftshopPending: (
      state,
      action: PayloadAction<
        Omit<DeleteCraftshopState, "isLoadingDeleteCraftshop">
      >
    ) => {
      state.isLoadingDeleteCraftshop = true;
    },
    deleteCraftshopFullfilled: (state) => {
      state.isLoadingDeleteCraftshop = false;
    },
    deleteCraftshopRejected: (state) => {
      state.isLoadingDeleteCraftshop = false;
    },
  },
});

export const { actions } = deleteCraftshopSlice;
export default deleteCraftshopSlice.reducer;
