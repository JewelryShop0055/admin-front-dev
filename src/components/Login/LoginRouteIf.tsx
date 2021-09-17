import React, { PropsWithChildren } from "react";
import { Route } from "react-router-dom";

interface LoginRouteIfProps {
  path: string;
  component: React.Component;
  allTyped: boolean;
}

const LoginRouteIf: React.FC<LoginRouteIfProps> = ({
  path,
  component,
  allTyped,
}: LoginRouteIfProps) => {
  return (
    <>
      <Route
        render={() => {
          if (allTyped === false) {
            return <div>넌모찌나간다</div>;
          } else {
            return <div>지나가세요</div>;
          }
        }}
      />
    </>
  );
};

export default LoginRouteIf;
