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
    setBaseAddress: (state, action: PayloadAction<string>) => {
      state.baseAddress = action.payload;
    },
    setAddtionalAddress: (state, action: PayloadAction<string>) => {
      state.addtionalAddress = action.payload;
    },
    setZoneCode: (state, action: PayloadAction<string>) => {
      state.zoneCode = action.payload;
    },
  },
});

export const { setBaseAddress, setAddtionalAddress, setZoneCode } =
  addressSlice.actions;

export default addressSlice.reducer;
