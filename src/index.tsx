import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./app/store";
import { ConnectedRouter } from "connected-react-router";
import { history, historyStore } from "./app/historyStore";

ReactDOM.render(
  <Provider store={historyStore()}>
    <ConnectedRouter history={history}>
      <Provider store={store}>
        {/* <BrowserRouter> */}
        <App />
      </Provider>
      {/* </BrowserRouter> */}
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
