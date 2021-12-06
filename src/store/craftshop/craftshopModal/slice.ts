import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Craftshop, ModalType } from "../../../types";

export interface CraftshopModalParams
  extends Pick<Craftshop, "name" | "address" | "phone"> {
  isOpen: boolean;
  modalType: ModalType | null;
}

const initialState: CraftshopModalParams = {
  isOpen: false,
  modalType: null,
  name: "",
  address: "",
  phone: "",
};

export const craftshopModalSlice = createSlice({
  name: "craftshopModal",
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<Omit<CraftshopModalParams, "isOpen">>
    ) => {
      state.isOpen = true;
    },
    getInnerModalValue: (
      state,
      action: PayloadAction<Omit<CraftshopModalParams, "isOpen">>
    ) => {
      state.modalType = action.payload.modalType;
      state.name = action.payload.name;
      state.address = action.payload.address;
      state.phone = action.payload.phone;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.modalType = null;
      state.name = "";
      state.address = "";
      state.phone = "";
    },
  },
});

export const { actions } = craftshopModalSlice;
export default craftshopModalSlice.reducer;
