import { Button, Theme, createStyles, makeStyles } from "@material-ui/core";
import { drawerWidth } from "../../../components/Navigations/SubNavigation";
import CreateIcon from "@material-ui/icons/Create";

import { useDispatch } from "react-redux";
import { Category } from "../../../types";
import { useHistory } from "react-router";
import { actions as replaceCurrentCategoryActions } from "../../../store/replaceCurrentCategory/slice";
import { useStyles } from "../utils/useStyles";

function CategoryElementsForm({
  id,
  name,
  itemCount,
}: Pick<Category, "id" | "name" | "itemCount">) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <>
      <div className={classes.paginationCategoryElements}>
        <div className={classes.paginationElementId}>{"고유번호:" + id}</div>
        <div className={classes.paginationElementName}>
          {"카테고리명:" + name}
        </div>
        <div className={classes.paginationElementItemCount}>
          {"소속제품수:" + itemCount}
        </div>
        <Button
          className={classes.paginationElementButton}
          variant="contained"
          color="primary"
          size="small"
          startIcon={<CreateIcon />}
          onClick={() => {
            history.push("/ItemCategoryCrafthopManage/CreateReplace");
            dispatch(
              replaceCurrentCategoryActions.replaceCurrentCategoryStandBy({
                targetId: id,
                currentCategoryName: name,
                newCategoryName: "",
              })
            );
          }}
        >
          수정/삭제
        </Button>
      </div>
    </>
  );
}

export default function renderCategoryElements(categoryList: Category[]) {
  return categoryList.map((value) => {
    return (
      <>
        <div key={value.id}>
          <CategoryElementsForm
            id={value.id}
            name={value.name}
            itemCount={value.itemCount}
          />
        </div>
      </>
    );
  });
}
