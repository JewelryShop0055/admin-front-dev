import React, { useRef } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import { ListItemSecondaryAction } from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "../../../modules/hooks";
import { actions as getCategoryListActions } from "../../../store/categoryList/slice";
import { actions as deleteCategoryActions } from "../../../store/deleteCategory/slice";
import { Category } from "../../../types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
    },

    categoryList: {
      padding: theme.spacing(5, 6),

      "& > *": {
        padding: theme.spacing(0, 0, 1, 0),
      },
    },

    categoryListElements: {
      display: "flex",
      justifyContent: "space-between",
    },

    categoryListEnd: {
      color: "gray",
      display: "flex",
      justifyContent: "center",
    },
  })
);

interface ListItemElementsParams {
  itemIndex: number;
}

export function ListItemElements({ itemIndex }: ListItemElementsParams) {
  const classes = useStyles();

  const Response = useAppSelector((state) => state.categoryList.categoryList);
  const listLength = useAppSelector((state) => state.categoryList.listLength);
  const pageState = useAppSelector((state) => state.categoryList.page);
  const listLoadComplete = useAppSelector(
    (state) => state.categoryList.isCategoryListLoadComplete
  );

  const dispatch = useAppDispatch();
  if (itemIndex === listLength - 10 && !listLoadComplete) {
    dispatch(
      getCategoryListActions.getCategoryListPending({
        page: pageState + 1,
        limit: 20,
      })
    );
  }

  const initialCategoryList: Category[] = [
    {
      id: 0,
      name: "blank",
      type: "",
      depth: 0,
      itemCount: 0,
      createdAt: "",
      updatedAt: "",
    },
  ];
  const categoryList = (categoryListResponse: Category[] | undefined) => {
    if (categoryListResponse === undefined) {
      return initialCategoryList;
    } else {
      return categoryListResponse;
    }
  };

  if (categoryList(Response)[itemIndex] !== undefined) {
    return (
      <>
        <div className={classes.categoryListElements}>
          <ListItemText
            primary={`${itemIndex} 카테고리명 : ${
              categoryList(Response)[itemIndex].name
            }`}
          />
          <ListItemText
            primary={`소속 제품 수 : ${
              categoryList(Response)[itemIndex].itemCount
            } 고유id : ${categoryList(Response)[itemIndex].id}`}
          />
          <ListItemSecondaryAction>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              startIcon={<DeleteIcon />}
              onClick={() => {
                dispatch(
                  deleteCategoryActions.deleteCategoryPending({
                    categoryId: categoryList(Response)[itemIndex].id,
                    categoryName: categoryList(Response)[itemIndex].name,
                  })
                );
              }}
            >
              Delete
            </Button>
          </ListItemSecondaryAction>
        </div>
      </>
    );
  }

  return (
    <>
      <ListItemText
        className={classes.categoryListEnd}
        primary={`모든 리스트를 불러왔습니다.`}
      />
    </>
  );
}

export const ListItemElementsMemo = React.memo(ListItemElements);
