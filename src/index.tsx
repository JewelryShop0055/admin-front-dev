import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { Provider } from "react-redux";
import { history, store } from "./modules/store";
import { ConnectedRouter } from "connected-react-router";
import { SnackbarProvider } from "notistack";
import { SnackbarUtilsConfigurator } from "./util/snackBarUitls";

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <SnackbarProvider maxSnack={3}>
        <SnackbarUtilsConfigurator />
        <App />
      </SnackbarProvider>
    </ConnectedRouter>
  </Provider>,

  document.getElementById("root")
);
