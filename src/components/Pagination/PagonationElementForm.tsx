import { Button, createStyles, makeStyles, Theme } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";
import { useDispatch } from "react-redux";
import { actions } from "../../store/categoryList/slice";
import { actions as deleteActions } from "../../store/deleteCategory/slice";
import { Category } from "../../types";

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

interface ElementsProps {
  value: Category;
}

export default function PagonationElementForm({ value }: ElementsProps) {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <div className={classes.paginationElements}>
      <div>{"고유번호:" + value.id}</div>
      <div>{"카테고리명:" + value.name}</div>
      <div>{"소속제품수:" + value.itemCount}</div>
      <Button
        variant="contained"
        color="secondary"
        size="small"
        startIcon={<DeleteIcon />}
        onClick={() => {
          dispatch(
            deleteActions.deleteCategoryPending({
              categoryId: value.id,
              categoryName: value.name,
            })
          );
          dispatch(
            actions.getCategoryListPending({
              page: 0,
              limit: 10,
            })
          );
        }}
      >
        Delete
      </Button>
    </div>
  );
}
