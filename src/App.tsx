import React from "react";
import { Route, Switch } from "react-router";

import { AuthRoute } from "./components/AuthRoute";

import LoginPage from "./pages/LoginPage";
import Pages from "./pages";
import Error404 from "./pages/ErrorPage/Error404";

const App: React.FC = () => {
  return (
    <>
      <Switch>
        <Route path="/" exact component={LoginPage} />

        <AuthRoute path="/" component={Pages} />

        <Route component={Error404} />
      </Switch>
    </>
  );
};

export default App;
