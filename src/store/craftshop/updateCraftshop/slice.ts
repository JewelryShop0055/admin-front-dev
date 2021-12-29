import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddNewCraftshopParams, Craftshop } from "../../../types";

interface UpdateCraftshopState
  extends Omit<Craftshop, "updatedAt" | "createdAt"> {
  isLoadingUpdateCraftshop: boolean;
}

const initialState: UpdateCraftshopState = {
  id: "",
  name: "",
  postCode: "",
  address: "",
  detailAddress: "",
  phone: "",
  isLoadingUpdateCraftshop: false,
};

export const updateCraftshopSlice = createSlice({
  name: "updateCraftshop",
  initialState,
  reducers: {
    updateCraftshopPending: (
      state,
      action: PayloadAction<
        Omit<UpdateCraftshopState, "isLoadingUpdateCraftshop">
      >
    ) => {
      state.isLoadingUpdateCraftshop = true;
    },
    updateCraftshopFullfilled: (
      state,
      action: PayloadAction<UpdateCraftshopState>
    ) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.postCode = action.payload.postCode;
      state.address = action.payload.address;
      state.detailAddress = action.payload.detailAddress;
      state.phone = action.payload.phone;
      state.isLoadingUpdateCraftshop = false;
    },
    updateCraftshopRejected: (state) => {
      state.isLoadingUpdateCraftshop = false;
    },
  },
});
