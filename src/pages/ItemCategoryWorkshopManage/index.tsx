import React from "react";
import SubNavigation from "../../components/Navigations/SubNavigation";
import TopNavigation from "../../components/Navigations/TopNavigation";
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
      <WorkshopContents />
    </>
  );
};

export default ItemCategoryPage;
