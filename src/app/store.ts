import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import topNavigationSlice from "../util/TopNavigationSlice";
import CraftshopAddressSlice from "../util/CraftshopAddressSlice";
import categorySlice from "../store/category/slice";
import signInSlice from "../store/signIn/slice";

import { rootSaga } from "../modules/sagaActions";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    //slice 통합용 파일 따로 만들어놓기 => 공식문서에 묶어놓는방법 나와있음
    topNavigation: topNavigationSlice,
    craftshopAddress: CraftshopAddressSlice,
    category: categorySlice,
    signIn: signInSlice,
  },

  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
