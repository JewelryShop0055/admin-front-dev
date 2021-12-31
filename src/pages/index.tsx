import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Route, Switch } from "react-router";

import { AuthRoute } from "../components/AuthRoute";
import TopNavigation from "../components/Navigations/TopNavigation";
import Error404 from "./ErrorPage/Error404";

import ItemCategoryPage, {
  CraftshopManagePage,
  CraftshopPage,
} from "./ItemCategoryCrafthopManagePage";
import ProductCreatePage from "./ProductCreatePage";
import TodaysCheckListMainPage from "./TodaysCheckList/TodaysCheckListMainPage";

const addNewCraftshopStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "grid",
      gridTemplateRows: "60px auto",
      gridTemplateAreas: `
        "topNavi"
        "pageContents"
      `,
    },
    topNavi: {
      gridArea: "topNavi",
    },
    pageContents: {
      gridArea: "pageContents",
    },
  })
);

export const Pages = () => {
  return (
    <>
      <TopNavigation />
      <div>
        <Switch>
          <AuthRoute path="/pages" exact component={TodaysCheckListMainPage} />

          <AuthRoute
            path="/pages/TodaysChecklist"
            exact
            component={TodaysCheckListMainPage}
          />

          <AuthRoute
            path="/pages/ItemCategoryCrafthopManage"
            exact
            component={ItemCategoryPage}
          />

          <AuthRoute
            path="/pages/ItemCategoryCrafthopManage/Category"
            exact
            component={ItemCategoryPage}
          />

          <AuthRoute
            path="/pages/ItemCategoryCrafthopManage/Craftshop"
            exact
            component={CraftshopPage}
          />

          <AuthRoute
            path="/pages/ItemCategoryCrafthopManage/Craftshop/"
            component={CraftshopManagePage}
          />

          <AuthRoute
            path="/pages/ProductCreate"
            exact
            component={ProductCreatePage}
          />

          <Route path="*" component={TodaysCheckListMainPage} />
        </Switch>
      </div>
    </>
  );
};

export default Pages;
