import React, { useEffect, useState } from "react";
import { Route, useHistory } from "react-router-dom";
import { refreshTokenAPI } from "../api/signin";
import LoginPage from "../pages/Login";
import TodaysCheckListMainPage from "../pages/TodaysCheckList/TodaysCheckListMainPage";
import { saveAuthToken } from "../util/auth";
import { getTokenExpiredState } from "../util/tokenExpireCheck";

interface AuthRouteParams {
  exact?: boolean;
  path: string;
  component: React.ComponentType<any>;
}

export const SignInRoute = ({
  exact = false,
  path,
  component,
}: AuthRouteParams) => {
  const [authenticated, setAuthenticated] = useState(false);
  const history = useHistory();

  const authCheck = async () => {
    const tokenState = await getTokenExpiredState();

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
      const newToken = await refreshTokenAPI();
      if (
        newToken.access_token !== undefined &&
        newToken.refresh_token !== undefined
      ) {
        await saveAuthToken(newToken.access_token, newToken.refresh_token);
      }
      const newTokenState = await getTokenExpiredState();
      if (
        newTokenState.user_access_token === true &&
        newTokenState.user_refresh_token === true
      ) {
        setAuthenticated(true);
      }
    }

    if (tokenState.user_refresh_token === false) {
      return history.replace("/");
    }
  };

  useEffect(() => {
    authCheck();
  });

  if (authenticated) {
    return (
      <Route
        exact={exact}
        path={"/TodaysCheckList"}
        component={TodaysCheckListMainPage}
      />
    );
  } else {
    return <Route exact={exact} path={path} component={component} />;
  }
};
