import React from "react";
import SubNavigation from "../../components/Navigations/SubNavigation";
import TopNavigation from "../../components/Navigations/TopNavigation";

const ItemCategoryPage: React.FC = () => {
  const subList = ["카테고리 관리", "공방 관리"];
  return (
    <>
      <TopNavigation />
      <SubNavigation ListItemArray={subList} />
      <div>아이템 카테고리를 만들어보자 영차영차</div>
    </>
  );
};

export default ItemCategoryPage;
