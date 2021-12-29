import { createSlice } from "@reduxjs/toolkit";

export interface AuthTokenSliceState {
  isTokenDelete: boolean;
  isLoadingAuthToken: boolean;
}

const initialState: AuthTokenSliceState = {
  isTokenDelete: false,
  isLoadingAuthToken: false,
};

export const signOutSlice = createSlice({
  name: "signOut",
  initialState,
  reducers: {
    getSignOutPending: (state) => {
      state.isLoadingAuthToken = true;
    },
    getAuthTokenFullFilled: (state) => {
      state.isTokenDelete = true;
      state.isLoadingAuthToken = false;
    },
    getAuthTokenRejected: (state) => {
      state.isLoadingAuthToken = false;
    },
  },
});

export const { actions } = signOutSlice;

export default signOutSlice.reducer;
