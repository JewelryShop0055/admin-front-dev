import React, { Component, useEffect, useState } from "react";
import { Link, Route, useHistory } from "react-router-dom";
import { refreshTokenAPI } from "../api/signin";
import LoginPage from "../pages/Login";
import { getTokenExpiredState } from "../util/tokenExpireCheck";

interface AuthRouteParams {
  exact: boolean;
  path: string;
  component: React.ComponentType<any>;
  cycleCount?: number;
}

export const AuthRouth = ({
  exact = false,
  path,
  component,
}: AuthRouteParams) => {
  const [authenticated, setAuthenticated] = useState(false);
  const history = useHistory();

  const authCheck = async () => {
    const tokenState = await getTokenExpiredState();

    // if ( cycleCount > 3) {
    //   return history.replace("/login");
    // }

    if (
      tokenState.user_access_token === true &&
      tokenState.user_refresh_token === true
    ) {
      setAuthenticated(true);
    }
    if (
      tokenState.user_access_token === false &&
      tokenState.user_refresh_token === true
    ) {
      await refreshTokenAPI();
      return AuthRouth({ exact, path, component });
    }
    if (tokenState.user_refresh_token === false) {
      return history.replace("/login");
    }
  };

  useEffect(() => {
    authCheck();
  });

  if (authenticated) {
    return <Route exact={exact} path={path} component={component} />;
  } else {
    return <Route exact={exact} path={path} component={LoginPage} />;
  }
};
