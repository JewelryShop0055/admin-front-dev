import React, { useEffect, useState } from "react";
import { Route, useHistory } from "react-router";
import { useAppDispatch } from "../modules/hooks";
import LoginPage from "../pages/LoginPage";
import { actions } from "../store/signIn/slice";
import { getAuthTokenFromCookies } from "../util/auth";
import { getTokenExpiredState } from "../util/tokenExpireCheck";

interface AuthRouteParams {
  exact?: boolean;
  path: string;
  component: React.ComponentType<any>;
}

export const AuthRoute = ({
  exact = false,
  path,
  component,
}: AuthRouteParams) => {
  const [authenticated, setAuthenticated] = useState(false);
  const history = useHistory();
  const dispatch = useAppDispatch();

  const authCheck = async () => {
    const tokenState = getTokenExpiredState();

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
      dispatch(
        actions.getAuthTokenRefreshPending({
          refreshToken:
            getAuthTokenFromCookies("user_refresh_token")!.toString(),
        })
      );
      const newTokenState = getTokenExpiredState();
      if (
        newTokenState.user_access_token === true &&
        newTokenState.user_refresh_token === true
      ) {
        setAuthenticated(true);
      }
    }

    if (tokenState.user_refresh_token === false) {
      alert("인증시간이 만료되었습니다. 로그인 페이지로 이동합니다.");
      return history.push("/loginPage");
    }
  };

  useEffect(() => {
    authCheck();
  }, []);

  if (authenticated) {
    return <Route exact={exact} path={path} component={component} />;
  } else {
    return <Route exact={exact} path={path} component={LoginPage} />;
  }
};
