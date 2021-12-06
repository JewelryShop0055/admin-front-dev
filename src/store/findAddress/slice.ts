import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Address } from "react-daum-postcode";

export interface FindAddressValueState {
  baseAddress: string;
  addtionalAddress: string;
  zoneCode: string;
}

const initialState: FindAddressValueState = {
  baseAddress: "",
  addtionalAddress: "",
  zoneCode: "",
};

const findAddressSlice = createSlice({
  name: "findAddress",
  initialState,
  reducers: {
    getAddressValueFullfilled: (state, action: PayloadAction<Address>) => {
      state.baseAddress = action.payload.baseAddress;
      state.addtionalAddress = action.payload.addtionalAddress;
      state.zoneCode = action.payload.zoneCode;
    },
  },
});

export const { actions } = findAddressSlice;
export default findAddressSlice.reducer;
