import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Route, Switch } from "react-router";

import { AuthRoute } from "../components/AuthRoute";
import SubNavigation from "../components/Navigations/SubNavigation";
import TopNavigation from "../components/Navigations/TopNavigation";
import { BackgroundColor } from "../styleTypes";
import { CraftshopPage } from "./CraftshopPage";
import { DashBoardPage } from "./DashBoardPage";
import { ItemCategoryPage } from "./ItemCategoryPage";
import { ItemPage } from "./ItemPage";

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
          <AuthRoute path="/pages" exact component={DashBoardPage} />

          <AuthRoute path="/pages/dashboard" exact component={DashBoardPage} />

          <AuthRoute
            path="/pages/productCategory"
            exact
            component={ItemCategoryPage}
          />

          <AuthRoute path="/pages/craftshop" exact component={CraftshopPage} />

          <AuthRoute path="/pages/items" exact component={ItemPage} />

          {/* 이하는 구 라우팅 */}
          {/* <AuthRoute
              path="/pages/TodaysChecklist"
              exact
              component={TodaysCheckListMainPage}
            /> */}
          {/* <AuthRoute
            path="/pages/ItemCategoryCrafthopManage/Craftshop/"
            component={CraftshopManagePage}
          /> */}

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
