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

    paginationElements: {
      display: "grid",
      gridRow: "repeat(11, 1fr)",
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

export default function CategoryList() {
  /* {리스트에 해당하는 값을 받아와서 재사용성있게} */
  //여기서는 리스트값만 받고, ListItemElements => 이걸 각 항목에 대한 CSS Form으로 만들어서 값이 들어가면 자동으로
  //pagination이 형성되도록 만든다. 또한 CategoryList에 limit값을 받아서 한페이지에 몇개씩 받아올지도 설정할 수 있다면 좋겠지...

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

        <Paper
          elevation={PaperElevation.LOW}
          className={classes.paginationElements}
        >
          {elements.map((value, index) => {
            return <ListItemElements key={index} itemIndex={index} />;
          })}

          <Pagination count={10} showFirstButton showLastButton />
        </Paper>
      </div>
    </div>
  );
}
