import { Button, Theme, createStyles, makeStyles } from "@material-ui/core";
import { drawerWidth } from "../../../components/Navigations/SubNavigation";
import CreateIcon from "@material-ui/icons/Create";

import { useDispatch } from "react-redux";
import { Category } from "../../../types";
import { useHistory } from "react-router";
import { actions as replaceCurrentCategoryActions } from "../../../store/replaceCurrentCategory/slice";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paginationElements: {
      borderBottom: "black solid 0.5px",
      padding: "5px 0 5px 0",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
    },
  })
);

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
      <div className={classes.paginationElements}>
        <div>{"고유번호:" + id}</div>
        <div>{"카테고리명:" + name}</div>
        <div>{"소속제품수:" + itemCount}</div>
        <Button
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
