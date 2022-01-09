import React from "react";
import { Route, Switch, useHistory } from "react-router";

import { AuthRoute } from "./components/AuthRoute";

import LoginPage from "./pages/LoginPage";
import Pages from "./pages";
import Error404 from "./pages/ErrorPage/Error404";

const App: React.FC = () => {
  const history = useHistory();
  if (globalThis.location.pathname === "/") {
    history.replace("/loginPage");
  }
  return (
    <>
      <Switch>
        <Route path="/loginPage" exact component={LoginPage} />

        <AuthRoute path="/pages" component={Pages} />

        <Route component={Error404} />
      </Switch>
    </>
  );
};

export default App;
