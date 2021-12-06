import React from "react";
import SubNavigation from "../../components/Navigations/SubNavigation";
import TopNavigation from "../../components/Navigations/TopNavigation";
import { SubNavigationElements } from "../../types";
import AddNewCraftshop from "./components/AddNewCraftshop";
import CategoryContents from "./components/CategoryContents";
import CraftshopContents from "./components/CraftshopContents";

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

export const AddNewCraftshopPage: React.FC = () => {
  return (
    <>
      <TopNavigation />
      <SubNavigation elementsArray={subNaviElements} />
      <AddNewCraftshop />
    </>
  );
};

export default ItemCategoryPage;
