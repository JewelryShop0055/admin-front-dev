import { combineReducers, configureStore } from "@reduxjs/toolkit";
import handleEvent, { handleEventSaga } from "./slice";

const rootReducer = combineReducers({ handleEvent });

const store = configureStore({
  reducer: handleEventSaga,
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
