import {
  createStyles,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import { PaperElevation } from "../../../styleTypes";
import Pagination from "@material-ui/lab/Pagination";
import PagonationElementForm from "./PagonationElementForm";
import { Category } from "../../../types";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../modules/hooks";
import { useDispatch } from "react-redux";
import { actions } from "../../../store/categoryList/slice";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
      padding: "50px 48px 0 48px",
    },
    paginationPage: {
      display: "grid",
      gridRow: "repeat(11, 1fr)",
    },
    paginationNavigation: {
      display: "flex",
      justifyContent: "center",
    },
  })
);

export default function Pagonation() {
  const classes = useStyles();

  const [nowPage, setNowPage] = useState(1);

  const { categoryList, maxPage } = useAppSelector(
    (state) => state.categoryList
  );
  const dispatch = useDispatch();

  const paginationNavigationHandler = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    console.log("페이지 버튼 클릭하여 해당 페이지 로딩");
    setNowPage(value);
    dispatch(
      actions.getCategoryListPending({
        page: value,
        limit: 10,
      })
    );
  };

  useEffect(() => {
    console.log("최초 1페이지 로딩");
    dispatch(
      actions.getCategoryListPending({
        page: 1,
        limit: 10,
      })
    );
  }, []);

  return (
    <div className={classes.root}>
      <Typography variant="h5" gutterBottom>
        등록된 제품 카테고리
      </Typography>

      <Typography variant="subtitle1" gutterBottom color="textSecondary">
        미분류 카테고리는 삭제가 불가능하며, 기존 카테고리 삭제시 미분류
        상품으로 자동 이동됩니다.
      </Typography>

      <Paper elevation={PaperElevation.LOW} className={classes.paginationPage}>
        {categoryList.map((value: Category) => {
          return (
            <>
              <div key={value.id}>
                <PagonationElementForm value={value} />
              </div>
            </>
          );
        })}
        <Pagination
          className={classes.paginationNavigation}
          count={maxPage}
          showFirstButton
          showLastButton
          page={nowPage}
          onChange={paginationNavigationHandler}
        />
      </Paper>
    </div>
  );
}
