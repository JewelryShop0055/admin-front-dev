import React from "react";
import { Route, Switch } from "react-router";

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
    </>
  );
};

export default App;
