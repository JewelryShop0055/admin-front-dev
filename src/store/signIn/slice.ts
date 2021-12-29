import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthToken, RefreshToken, SignIn } from "../../types";

export interface AuthTokenSliceState {
  authToken?: AuthToken;
  isLoadingAuthToken: boolean;
}

const initialState: AuthTokenSliceState = {
  authToken: undefined,
  isLoadingAuthToken: false,
};

export const authTokenSlice = createSlice({
  name: "authToken",
  initialState,
  reducers: {
    getAuthTokenPending: (state, action: PayloadAction<SignIn>) => {
      state.isLoadingAuthToken = true;
    },
    getAuthTokenRefreshPending: (
      state,
      action: PayloadAction<RefreshToken>
    ) => {
      state.isLoadingAuthToken = true;
    },
    getAuthTokenFullFilled: (state, action: PayloadAction<AuthToken>) => {
      state.authToken = action.payload;
      state.isLoadingAuthToken = false;
    },
    getAuthTokenRejected: (state) => {
      state.isLoadingAuthToken = false;
    },
  },
});

export const { actions } = authTokenSlice;

export default authTokenSlice.reducer;
