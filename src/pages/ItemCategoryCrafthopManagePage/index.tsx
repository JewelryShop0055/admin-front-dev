import React from "react";
import AddNewCraftshop from "./components/AddNewCraftshop";
import CategoryContents from "./components/CategoryContents";
import CraftshopContents from "./components/CraftshopContents";
import DeleteCraftshop from "./components/DeleteCraftshop";
// import ReplaceCraftshop from "./components/ReplaceCraftshop";

export const ItemCategoryPage: React.FC = () => {
  return <CategoryContents />;
};

export const CraftshopPage: React.FC = () => {
  return <CraftshopContents />;
};

export enum CraftshopManageType {
  ADD = "Add",
  DELETE = "Delete",
  REPLACE = "Replace",
}

export const CraftshopManagePage: React.FC = () => {
  console.log("그냥찍어봄");
  switch (globalThis.location.pathname) {
    case "/pages/ItemCategoryCrafthopManage/Craftshop/add":
      return <AddNewCraftshop />;

    case "/pages/ItemCategoryCrafthopManage/Craftshop/delete":
      return <DeleteCraftshop />;

    case "/pages/ItemCategoryCrafthopManage/Craftshop/replace":
      return <AddNewCraftshop />;

    default:
      return <AddNewCraftshop />;
  }
};

export default ItemCategoryPage;
