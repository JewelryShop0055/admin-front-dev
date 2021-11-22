import React from "react";
import SubNavigation from "../../components/Navigations/SubNavigation";
import TopNavigation from "../../components/Navigations/TopNavigation";
import { SubNavigationElements } from "../../types";
import CategoryContents from "./components/CategoryContents";
import CraftshopContents from "./components/CraftshopContents";
import CreatePutDeleteElements from "./components/CreatePutDeleteElements";

const subNaviElements: Array<SubNavigationElements> = [
  {
    elementName: "카테고리 리스트",
    elementLink: "/ItemCategoryCrafthopManage/Category",
  },
  {
    elementName: "공방 리스트",
    elementLink: "/ItemCategoryCrafthopManage/Craftshop",
  },
  {
    elementName: "카테고리/공방 등록하기",
    elementLink: "/ItemCategoryCrafthopManage/CreateRevise",
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

export const AddCategoryElementsPage: React.FC = () => {
  return (
    <>
      <TopNavigation />
      <SubNavigation elementsArray={subNaviElements} />
      <CreatePutDeleteElements />
    </>
  );
};

export default ItemCategoryPage;
