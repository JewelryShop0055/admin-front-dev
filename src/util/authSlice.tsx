import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: 0,
  reducers: {
    authulizwe: (state) => {
      state += 1;
    },
  },
});

export const { authulizwe } = authSlice.actions;

export default authSlice.reducer;
