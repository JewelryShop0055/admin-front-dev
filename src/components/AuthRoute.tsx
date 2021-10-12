import React from "react";
import { Route, Redirect } from "react-router-dom";

function AuthRoute({
  authenticated: boolean,
  component: Component,
  render,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? (
          render ? (
            render(props)
          ) : (
            <Component {...props} />
          )
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}
