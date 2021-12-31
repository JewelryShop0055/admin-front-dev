import React from "react";
import { Route, Switch } from "react-router";

import { AuthRoute } from "./components/AuthRoute";

import Error404 from "./pages/ErrorPage/Error404";
import ItemCategoryPage, {
  CraftshopManagePage,
  CraftshopPage,
} from "./pages/ItemCategoryCrafthopManagePage";
import LoginPage from "./pages/LoginPage";
import ProductManagePage from "./pages/ProductManagePage";
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

        <AuthRoute
          path="/ItemCategoryCrafthopManage/Craftshop/"
          component={CraftshopManagePage}
        />

        <AuthRoute path="/ProductManage" exact component={ProductManagePage} />

        <Route component={Error404} />
      </Switch>
    </>
  );
};

export default App;
