import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AddressInputValueState {
  baseAddress: string;
  addtionalAddress: string;
  zoneCode: string;
}

const initialState: AddressInputValueState = {
  baseAddress: "",
  addtionalAddress: "",
  zoneCode: "",
} as AddressInputValueState;

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    baseAddressState: (state, action: PayloadAction<string>) => {
      state.baseAddress = action.payload;
    },
    addtionalAddressState: (state, action: PayloadAction<string>) => {
      state.addtionalAddress = action.payload;
    },
    zoneCodeState: (state, action: PayloadAction<string>) => {
      state.zoneCode = action.payload;
    },
  },
});

export const { baseAddressState, addtionalAddressState, zoneCodeState } =
  addressSlice.actions;

export default addressSlice.reducer;
