import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import { reducers, rootSaga } from ".";

import { createBrowserHistory, History } from "history";
import { routerMiddleware } from "connected-react-router";

import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    ...reducers,
  });

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: createRootReducer(history),

  middleware: [sagaMiddleware, routerMiddleware(history)],
});

sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
