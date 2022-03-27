import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Craftshop } from "../../../types";

export interface selectedCraftshopState extends Craftshop {
  isSelect: boolean;
}

const initialState: selectedCraftshopState = {
  id: "",
  name: "",
  postCode: "",
  address: "",
  detailAddress: "",
  phone: "",
  updatedAt: "",
  createdAt: "",
  isSelect: false,
};

export const selectedCraftshopSlice = createSlice({
  name: "selectedCraftshop",
  initialState,
  reducers: {
    selectElementPending: (
      state,
      action: PayloadAction<Omit<selectedCraftshopState, "isSelect">>
    ) => {
      state.isSelect = true;
    },
    selectElementFullfilled: (
      state,
      action: PayloadAction<Omit<selectedCraftshopState, "isSelect">>
    ) => {
      state.isSelect = false;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.postCode = action.payload.postCode;
      state.address = action.payload.address;
      state.detailAddress = action.payload.detailAddress;
      state.phone = action.payload.phone;
      state.updatedAt = action.payload.updatedAt;
      state.createdAt = action.payload.createdAt;
    },
    unselectedElement: (state) => {
      state.isSelect = false;
      state.id = "";
      state.name = "";
      state.postCode = "";
      state.address = "";
      state.detailAddress = "";
      state.phone = "";
      state.updatedAt = "";
      state.createdAt = "";
    },
  },
});

export const { actions } = selectedCraftshopSlice;
export default selectedCraftshopSlice.reducer;
