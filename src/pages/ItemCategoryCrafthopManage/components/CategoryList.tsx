import React, { useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import { ListItemSecondaryAction } from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "../../../modules/hooks";
import { actions } from "../../../store/categoryList/slice";
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
  })
);

interface asdf {
  index: number;
}

function ListItemElements({ index }: asdf) {
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(
  //     actions.getCategoryListPending({
  //       page: "0",
  //       limit: "20",
  //     })
  //   );
  // });

  const Response = useAppSelector((state) => state.categoryList.categoryList);
  console.log(index);
  const initialCategoryList: Category[] = [
    {
      id: 0,
      name: "black",
      type: "",
      depth: 0,
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

  if (Response !== undefined) {
    return (
      <>
        <ListItemText
          id="0"
          primary={`카테고리 ${index} ${categoryList(Response)[index]} `}
        />
        <ListItemSecondaryAction>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </ListItemSecondaryAction>
      </>
    );
  } else {
    return (
      <>
        <ListItemText id="0" primary={`카테고리 ${index}`} />
        <ListItemSecondaryAction>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </ListItemSecondaryAction>
      </>
    );
  }
}

function renderRow(props: ListChildComponentProps) {
  const { index, style } = props;

  return (
    <>
      <ListItem style={style} key={index} divider>
        <ListItemElements index={index} />
        {/* <div>{index}</div> */}
      </ListItem>
    </>
  );
}

export default function CategoryList() {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  // const categoryList = useAppSelector(
  //   (state) => state.categoryList.categoryList
  // );

  // if (categoryList !== undefined) {
  //   console.log(categoryList);
  // }

  return (
    <div className={classes.root}>
      <div className={classes.categoryList}>
        <Typography variant="h5" gutterBottom>
          등록된 제품 카테고리
        </Typography>

        <Typography variant="subtitle1" gutterBottom color="textSecondary">
          미분류 카테고리는 삭제가 불가능하며, 기존 카테고리 삭제시 미분류
          상품으로 자동 이동됩니다.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={async (e) => {
            await dispatch(
              actions.getCategoryListPending({
                page: "0",
                limit: "20",
              })
            );
          }}
        >
          리스트불러오기버튼
        </Button>
        <Paper elevation={5}>
          <FixedSizeList
            height={400}
            width={"100%"}
            itemSize={60}
            itemCount={20}
          >
            {renderRow}
          </FixedSizeList>
        </Paper>
      </div>
    </div>
  );
}
