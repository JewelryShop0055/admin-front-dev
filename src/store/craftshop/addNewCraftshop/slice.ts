import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddNewCraftshopParams } from "../../../types";

interface AddNewCraftshopState extends AddNewCraftshopParams {
  isLoadingAddNewCraftshop: boolean;
}

const initialState: AddNewCraftshopState = {
  name: "",
  postCode: "",
  address: "",
  detailAddress: "",
  phone: "",
  isLoadingAddNewCraftshop: false,
};

export const addNewCraftshopSlice = createSlice({
  name: "addCraftshop",
  initialState,
  reducers: {
    addNewCraftshopPending: (
      state,
      action: PayloadAction<
        Omit<AddNewCraftshopState, "isLoadingAddNewCraftshop">
      >
    ) => {
      state.isLoadingAddNewCraftshop = true;
    },
    addNewCraftshopFullfilled: (
      state,
      action: PayloadAction<AddNewCraftshopParams>
    ) => {
      state.name = action.payload.name;
      state.postCode = action.payload.postCode;
      state.address = action.payload.address;
      state.detailAddress = action.payload.detailAddress;
      state.phone = action.payload.phone;
      state.isLoadingAddNewCraftshop = false;
    },
    addNewCraftshopRejected: (state) => {
      state.isLoadingAddNewCraftshop = false;
    },
  },
});

export const { actions } = addNewCraftshopSlice;
export default addNewCraftshopSlice.reducer;
