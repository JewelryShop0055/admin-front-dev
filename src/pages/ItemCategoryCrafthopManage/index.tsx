import React from "react";
import SubNavigation from "../../components/Navigations/SubNavigation";
import TopNavigation from "../../components/Navigations/TopNavigation";
import { SubNavigationElements } from "../../types";
import AddNewCraftshop from "./components/AddNewCraftshop";
import CategoryContents from "./components/CategoryContents";
import CraftshopContents from "./components/CraftshopContents";
import DeleteCraftshop from "./components/DeleteCraftshop";

const subNaviElements: Array<SubNavigationElements> = [
  {
    elementName: "카테고리 리스트",
    elementLink: "/ItemCategoryCrafthopManage/Category",
  },
  {
    elementName: "공방 리스트",
    elementLink: "/ItemCategoryCrafthopManage/Craftshop",
  },
];

export const ItemCategoryPage: React.FC = () => {
  return (
    <>
      <TopNavigation />
      <SubNavigation elementsArray={subNaviElements} />
      <CategoryContents />
    </>
  );
};

export const CraftshopPage: React.FC = () => {
  return (
    <>
      <TopNavigation />
      <SubNavigation elementsArray={subNaviElements} />
      <CraftshopContents />
    </>
  );
};

export enum CraftshopManageType {
  ADD = "Add",
  DELETE = "Delete",
  REPLACE = "Replace",
}

export const CraftshopManagePage: React.FC = () => {
  switch (globalThis.location.pathname) {
    case "/ItemCategoryCrafthopManage/Craftshop/add":
      return (
        <>
          <TopNavigation />
          <SubNavigation elementsArray={subNaviElements} />
          <AddNewCraftshop />
        </>
      );

    case "/ItemCategoryCrafthopManage/Craftshop/delete":
      return (
        <>
          <TopNavigation />
          <SubNavigation elementsArray={subNaviElements} />
          <DeleteCraftshop />
        </>
      );

    case "/ItemCategoryCrafthopManage/Craftshop/replace":
      return (
        <>
          <TopNavigation />
          <SubNavigation elementsArray={subNaviElements} />
          {/* <RelplaceCraftshop /> */}
        </>
      );

    default:
      return (
        <>
          <TopNavigation />
          <SubNavigation elementsArray={subNaviElements} />
          <AddNewCraftshop />
        </>
      );
  }
};

export default ItemCategoryPage;
