import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Route, Switch } from "react-router";

import { AuthRoute } from "../components/AuthRoute";
import SubNavigation from "../components/Navigations/SubNavigation";
import TopNavigation from "../components/Navigations/TopNavigation";
import { BackgroundColor } from "../styleTypes";

import ItemCategoryPage, {
  CraftshopManagePage,
  CraftshopPage,
} from "./ItemCategoryCrafthopManagePage";
import ProductCreatePage from "./ProductCreatePage";
import TodaysCheckListMainPage from "./TodaysCheckList/TodaysCheckListMainPage";

const pagesStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "grid",
      gridTemplateRows: "auto auto",
      gridTemplateColumns: "230px auto",
      gridTemplateAreas: `
        "subNavi topNavi"
        "subNavi pageContents"
      `,
    },
    topNavi: {
      gridArea: "topNavi",
    },
    subNavi: {
      gridArea: "subNavi",
      background: BackgroundColor.SUBNAVI_BG,
    },
    pageContents: {
      gridArea: "pageContents",
      background: BackgroundColor.CONTENTS_BG,
    },
  })
);

export const Pages = () => {
  const classes = pagesStyles();

  return (
    <div className={classes.root}>
      <div className={classes.topNavi}>
        <TopNavigation />
      </div>

      <div className={classes.subNavi}>
        <SubNavigation />
      </div>

      <div className={classes.pageContents}>
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
    </div>
  );
};

export default Pages;
