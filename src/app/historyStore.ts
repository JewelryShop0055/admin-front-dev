import { combineReducers } from "@reduxjs/toolkit";
import { createBrowserHistory } from "history";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { RouteComponentProps } from "react-router-dom";

export const history = createBrowserHistory();

//any나중에 타입 확인해서 지워야함
const createRootReducer = (history: any) =>
  combineReducers({
    router: connectRouter(history),
  });

export const historyStore = function configureStore() {
  const store = createStore(
    createRootReducer(history),
    compose(applyMiddleware(routerMiddleware(history), thunk))
  );

  console.log("historyStore", history);
  return store;
};
