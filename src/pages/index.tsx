import { AuthRoute } from "../components/AuthRoute";
import ItemCategoryPage, {
  CraftshopManagePage,
  CraftshopPage,
} from "./ItemCategoryCrafthopManagePage";
import ProductCreatePage from "./ProductCreatePage";
import TodaysCheckListMainPage from "./TodaysCheckList/TodaysCheckListMainPage";

export const Pages = () => {
  return (
    <>
      <AuthRoute
        path="/TodaysChecklist"
        exact
        component={TodaysCheckListMainPage}
      />

      <AuthRoute
        path="/ItemCategoryCrafthopManage"
        exact
        component={ItemCategoryPage}
      />

      <AuthRoute
        path="/ItemCategoryCrafthopManage/Category"
        exact
        component={ItemCategoryPage}
      />

      <AuthRoute
        path="/ItemCategoryCrafthopManage/Craftshop"
        exact
        component={CraftshopPage}
      />

      <AuthRoute
        path="/ItemCategoryCrafthopManage/Craftshop/"
        component={CraftshopManagePage}
      />

      <AuthRoute path="/ProductCreate" exact component={ProductCreatePage} />
    </>
  );
};

export default Pages;
