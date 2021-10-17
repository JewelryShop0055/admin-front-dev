import React from "react";
import SubNavigation from "../../components/Navigations/SubNavigation";
import TopNavigation from "../../components/Navigations/TopNavigation";
import CategoryContents from "./components/CategoryContents";

const ItemCategoryPage: React.FC = () => {
  const subList = ["카테고리 관리", "공방 관리"];
  return (
    <>
      <TopNavigation />
      <SubNavigation ListItemArray={subList} />
      <CategoryContents />
    </>
  );
};

export default ItemCategoryPage;
