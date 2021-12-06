import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddNewCraftshopParams } from "../../../types";

interface AddNewCraftshopState extends AddNewCraftshopParams {
  isLoadingAddCategory: boolean;
}

const initialState: AddNewCraftshopState = {
  name: "",
  postCode: "",
  address: "",
  detailAddress: "",
  phone: "",
  isLoadingAddCategory: false,
};

export const addNewCraftshopSlice = createSlice({
  name: "addCraftshop",
  initialState,
  reducers: {
    addNewCraftshopPending: (
      state,
      action: PayloadAction<AddNewCraftshopState>
    ) => {
      state.isLoadingAddCategory = true;
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
      state.isLoadingAddCategory = false;
    },
    addNewCraftshopRejected: (state) => {
      state.isLoadingAddCategory = false;
    },
  },
});

export const { actions } = addNewCraftshopSlice;
export default addNewCraftshopSlice.reducer;
