import { Button, createStyles, makeStyles, Theme } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";
import { Category, getCategoryListResponse } from "../../../types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
    },
    paginationElements: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
    },
  })
);

interface ElementsProps {
  value: Category;
}

export default function PagonationElementForm({ value }: ElementsProps) {
  const classes = useStyles();
  console.log("PagonationElementForm", value);

  return (
    <div className={classes.paginationElements}>
      <div>{"고유 번호:" + value.id}</div>
      <div>{"카테고리명:" + value.name}</div>
      <div>{"소속 제품 수" + value.itemCount}</div>
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
