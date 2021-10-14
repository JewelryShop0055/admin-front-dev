import React, { Component, useEffect, useState } from "react";
import { Link, Route, useHistory } from "react-router-dom";
import { refreshTokenAPI } from "../api/signin";
import LoginPage from "../pages/Login";
import { saveAuthToken } from "../util/auth";
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

    if (
      tokenState.user_access_token === true &&
      tokenState.user_refresh_token === true
    ) {
      console.log("정상접근");
      setAuthenticated(true);
    }
    //====================
    if (
      tokenState.user_access_token === false &&
      tokenState.user_refresh_token === true
    ) {
      console.log("accesstoken 재발급");
      const newToken = await refreshTokenAPI();
      if (
        newToken.access_token !== undefined &&
        newToken.refresh_token !== undefined
      ) {
        console.log("재발급 토큰 저장");
        await saveAuthToken(newToken.access_token, newToken.refresh_token);
      }
      console.log("새로저장한 토큰의 유효성 검사");
      const newTokenState = await getTokenExpiredState();
      if (
        newTokenState.user_access_token === true &&
        newTokenState.user_refresh_token === true
      ) {
        console.log("신규토큰 정상");
        setAuthenticated(true);
      }
    }
    //====================
    if (tokenState.user_refresh_token === false) {
      return history.replace("/login");
    }
  };

  useEffect(() => {
    async function authCheckEffect() {
      console.log("useEffect start");
      await authCheck();
      console.log("useEffect end");
    }
    authCheckEffect();
  });

  if (authenticated) {
    return <Route exact={exact} path={path} component={component} />;
  } else {
    return <Route exact={exact} path={path} component={LoginPage} />;
  }
};
