import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Switch, Router } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./app/store";
import { ConnectedRouter } from "connected-react-router";
import { history, historyStore } from "./app/historyStore";

//ConnectedRouter는 historyStore 내부에서 돌아야한다
//store는 historyStore,ConnectedRouter 내부에서 돌아야함 => 그래야 app/에서의 값을 받을수있음

ReactDOM.render(
  <Provider store={historyStore()}>
    <ConnectedRouter history={history}>
      <Provider store={store}>
        <App />
      </Provider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
