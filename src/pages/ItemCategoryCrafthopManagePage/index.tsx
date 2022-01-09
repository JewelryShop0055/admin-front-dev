import React from "react";
import AddNewCraftshop from "../CraftshopPage/components/AddNewCraftshop";
import CategoryContents from "./components/CategoryContents";
import CraftshopContents from "../CraftshopPage/components/CraftshopContents";
import DeleteCraftshop from "../CraftshopPage/components/DeleteCraftshop";
// import ReplaceCraftshop from "./components/ReplaceCraftshop";

export const ItemCategoryPage: React.FC = () => {
  return <CategoryContents />;
};

export enum CraftshopManageType {
  ADD = "Add",
  DELETE = "Delete",
  REPLACE = "Replace",
}

export const CraftshopManagePage: React.FC = () => {
  switch (globalThis.location.pathname) {
    case "/pages/ItemCategoryCrafthopManage/Craftshop/add":
    // return <AddNewCraftshop />;

    // case "/pages/ItemCategoryCrafthopManage/Craftshop/delete":
    // return <DeleteCraftshop />;

    case "/pages/ItemCategoryCrafthopManage/Craftshop/replace":
    // return <AddNewCraftshop />;

    default:
      return <div>asd</div>;
    // return <AddNewCraftshop />;
  }
};

export default ItemCategoryPage;
