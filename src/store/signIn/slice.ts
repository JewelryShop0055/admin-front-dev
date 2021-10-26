import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthToken, SignIn } from "../../types";

export interface AuthTokenSliceState {
  authToken?: AuthToken;
  isLoadingAuthToken: boolean;
}

const initialState: AuthTokenSliceState = {
  authToken: undefined,
  isLoadingAuthToken: false,
};

interface inputForm {
  username: string;
  password: string;
}

interface PayloadForm {
  username: string;
  password: string;
}

export const authTokenSlice = createSlice({
  name: "authToken",
  initialState,
  reducers: {
    getAuthTokenPending: (state, action: PayloadAction<SignIn>) => {
      console.log("pending실행", action.payload);
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
