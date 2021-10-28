import { ConnectedRouter } from "connected-react-router";
import React from "react";
import { BrowserView, MobileView } from "react-device-detect";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Route, Switch } from "react-router";
import { history } from "./app/historyStore";

import { AuthRoute } from "./components/AuthRoute";
import Error404 from "./pages/Error/Error404";
import ItemCategoryPage, {
  CraftshopPage,
} from "./pages/ItemCategoryCrafthopManage";

import LoginPage from "./pages/Login";

import TodaysCheckListMainPage from "./pages/TodaysCheckList/TodaysCheckListMainPage";

const App: React.FC = () => {
  return (
    <>
      {/* <BrowserView> */}
      {/* <ConnectedRouter history={history}> */}
      <Switch>
        <Route path="/" component={LoginPage} exact />

        <AuthRoute
          path="/TodaysChecklist"
          exact
          component={TodaysCheckListMainPage}
        />

        <AuthRoute
          path="/ItemCategoryCrafthopManage"
          exact
          component={ItemCategoryPage}
        />

        <AuthRoute
          path="/ItemCategoryCrafthopManage/Category"
          exact
          component={ItemCategoryPage}
        />

        <AuthRoute
          path="/ItemCategoryCrafthopManage/Craftshop"
          exact
          component={CraftshopPage}
        />

        <Route component={Error404} />
      </Switch>
      {/* </ConnectedRouter> */}
      {/* </BrowserView> */}

      {/* <MobileView>
        <div>현재 모바일은 지원하지 않습니다. PC버전으로 사용해주세요</div>
      </MobileView> */}
    </>
  );
};

export default App;
