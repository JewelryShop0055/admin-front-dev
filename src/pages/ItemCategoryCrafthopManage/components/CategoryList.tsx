import React, { useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { useAppDispatch, useAppSelector } from "../../../modules/hooks";
import { actions as getCategoryListActions } from "../../../store/categoryList/slice";
import { PaperElevation } from "../../../styleTypes";
import { ListItemElements } from "./CategoryListElements";
import Pagination from "@material-ui/lab/Pagination";

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

function renderRow(props: ListChildComponentProps) {
  const { index, style } = props;
  //여기서의 index는 유니크한 값이 필요함 from Props

  return (
    <>
      <ListItem style={style} key={index} divider>
        <ListItemElements itemIndex={index} />
      </ListItem>
    </>
  );
}

//pagination
// function renderList() {
//   // const { index, style } = props;
//   const testList = ["a", "b", "c"];

//   return testList.map((value) => {
//     return (
//       // <div key={index} style={style}>
//       <div>{value}</div>
//       // </div>
//     );
//   });
// }

const renderList = (
  elements = ["a", "b", "c", "b", "c", "b", "c", "b", "c", "b"]
) => {
  elements.map((value, index) => {
    return <ListItemElements key={index} itemIndex={index} />;
  });
};

export default function CategoryList() {
  /* {리스트에 해당하는 값을 받아와서 재사용성있게} */

  // props: ListChildComponentProps
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const listLength = useAppSelector((state) => state.categoryList.listLength);
  //list상태값만 가져와서 .length로 listLength값을 만들어서 사용하기

  useEffect(() => {
    console.log("카테고리 리스트처음 렌더링");
    dispatch(
      getCategoryListActions.getCategoryListPending({
        page: 0,
        limit: 20,
      })
    );
    // return () => {
    //   console.log("카테고리 리스트페이지에서 떠남");
    // };
  }, []);

  console.log("현재 리스트길이: ", listLength);

  const elements = ["a", "b", "c", "b", "c", "b", "c", "b", "c", "b"];
  // const { index, style } = props;

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

        <Paper elevation={PaperElevation.LOW}>
          {elements.map((value, index) => {
            return <ListItemElements key={index} itemIndex={index} />;
          })}

          <Pagination count={10} showFirstButton showLastButton />
        </Paper>
      </div>
    </div>
  );
}
