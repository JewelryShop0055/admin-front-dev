import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthRouth } from "../../components/AuthRoute";
import SubNavigation from "../../components/Navigations/SubNavigation";
import TopNavigation from "../../components/Navigations/TopNavigation";
import Error404 from "../Error/Error404";
import CategoryContents from "./components/CategoryContents";
import WorkshopContents from "./components/WorkshopContents";

export const ItemCategoryPage: React.FC = () => {
  const subList = [
    ["카테고리 관리", "/Category_N_Workshop/Category"],
    ["공방 관리", "/Category_N_Workshop/Workshop"],
  ];

  return (
    <>
      <TopNavigation />
      <SubNavigation ListItemArray={subList} />

      {/* <Switch>
        <AuthRouth
          path="/Category_N_Workshop"
          exact
          component={CategoryContents}
        />

        <AuthRouth
          path="/Category_N_Workshop/Category"
          exact
          component={CategoryContents}
        />

        <AuthRouth
          path="/Category_N_Workshop/Workshop"
          exact
          component={CategoryContents}
        />

        <Route component={Error404} />
      </Switch> */}

      <CategoryContents />
    </>
  );
};

export const WorkshopPage: React.FC = () => {
  const subList = [
    ["카테고리 관리", "/Category_N_Workshop/Category"],
    ["공방 관리", "/Category_N_Workshop/Workshop"],
  ];

  return (
    <>
      <TopNavigation />
      <SubNavigation ListItemArray={subList} />

      {/* <Switch>
        <AuthRouth
          path="/Category_N_Workshop"
          exact
          component={CategoryContents}
        />

        <AuthRouth
          path="/Category_N_Workshop/Category"
          exact
          component={CategoryContents}
        />

        <AuthRouth
          path="/Category_N_Workshop/Workshop"
          exact
          component={CategoryContents}
        />

        <Route component={Error404} />
      </Switch> */}

      <WorkshopContents />
    </>
  );
};

export default ItemCategoryPage;
