import React from "react";
import SubNavigation from "../../components/Navigations/SubNavigation";
import TopNavigation from "../../components/Navigations/TopNavigation";
import CategoryContents from "./components/CategoryContents";
import CraftshopContents from "./components/CraftshopContents";

export const ItemCategoryPage: React.FC = () => {
  const subList = [
    ["카테고리 관리", "/ItemCategoryCrafthopManage/Category"],
    ["공방 관리", "/ItemCategoryCrafthopManage/Craftshop"],
  ];

  return (
    <>
      <TopNavigation />
      <SubNavigation ListItemArray={subList} />
      <CategoryContents />
    </>
  );
};

export const CraftshopPage: React.FC = () => {
  const subList = [
    ["카테고리 관리", "/ItemCategoryCrafthopManage/Category"],
    ["공방 관리", "/ItemCategoryCrafthopManage/Craftshop"],
  ];

  return (
    <>
      <TopNavigation />
      <SubNavigation ListItemArray={subList} />
      <CraftshopContents />
    </>
  );
};

export default ItemCategoryPage;
