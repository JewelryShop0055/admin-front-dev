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
import { Category, getCategoryListResponse } from "../../../types";
import { useState } from "react";

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

//PagonationElements : 입력받을 한페이지에 보여줄 내용을 담은 리스트
export default function Pagonation({ CategoryList }: getCategoryListResponse) {
  const classes = useStyles();
  console.log(CategoryList);
  const [nowPage, setNowPage] = useState(1);

  const paginationNavigationHandler = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setNowPage(value);
  };

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
        {CategoryList.map((value: Category) => {
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
          count={10}
          showFirstButton
          showLastButton
          page={nowPage}
          onChange={paginationNavigationHandler}
        />
      </Paper>
    </div>
  );
}
