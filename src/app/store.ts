import { configureStore } from "@reduxjs/toolkit";

import topNavigationReducer from "../util/TopNavigationSlice";

export const store = configureStore({
  reducer: {
    topNavigation: topNavigationReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
