import { Button, createStyles, makeStyles, Theme } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { Category, getCategoryListResponse } from "../../../types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
    },
  })
);

interface Key {
  key: number;
}

export default function PagonationElementForm(
  { key }: Key,
  { id, name, type, depth, itemCount, createdAt, updatedAt }: Category
) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>{"고유 번호:" + id}</div>
      <div>{"카테고리명:" + name}</div>
      <div>{"소속 제품 수" + itemCount}</div>
      <Button
        variant="contained"
        color="secondary"
        size="small"
        startIcon={<DeleteIcon />}
        onClick={() => {
          // dispatch(
          //   deleteCategoryActions.deleteCategoryPending({
          //     categoryId: categoryList(Response)[itemIndex].id,
          //     categoryName: categoryList(Response)[itemIndex].name,
          //   })
          // );
          console.log("삭제버튼 클릭");
        }}
      >
        Delete
      </Button>
    </div>
  );
}
