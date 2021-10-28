import { combineReducers } from "@reduxjs/toolkit";
import { createBrowserHistory, History } from "history";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";

export const history = createBrowserHistory();

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
  });

export const historyStore = function configureStore() {
  const store = createStore(
    createRootReducer(history),
    compose(applyMiddleware(routerMiddleware(history), thunk))
  );
  return store;
};
