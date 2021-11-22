import { Button, createStyles, makeStyles, Theme } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";
import { useDispatch } from "react-redux";
import { actions as deleteActions } from "../../../store/deleteCategory/slice";
import { Category } from "../../../types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
    },
    paginationElements: {
      borderBottom: "black solid 0.5px",
      padding: "5px 0 5px 0",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
    },
  })
);

export default function CategoryPaginationElementRender(value: Category) {
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <div className={classes.paginationElements}>
      {/* <div>{"고유번호:" + contentsArray.}</div>
      <div>{"카테고리명:" + contentsArray.name}</div>
      <div>{"소속제품수:" + contentsArray.itemCount}</div> */}
      <Button
        variant="contained"
        color="secondary"
        size="small"
        startIcon={<DeleteIcon />}
        onClick={() => {
          // dispatch(
          //   deleteActions.deleteCategoryPending({
          //     categoryId: contentsArray.id,
          //     categoryName: contentsArray.name,
          //   })
          // );
          // dispatch(
          //   actions.getCategoryListPending({
          //     page: 0,
          //     limit: 10,
          //   })
          // );
        }}
      >
        Delete
      </Button>
    </div>
  );
}
