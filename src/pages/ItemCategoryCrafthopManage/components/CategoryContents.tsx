import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { drawerWidth } from "../../../components/Navigations/SubNavigation";
import NewCategoryEntry from "./NewCategoryEntry";
import { PaperElevation } from "../../../styleTypes";

import { useAppSelector } from "../../../modules/hooks";
import { Category, GetCategoryListResponse } from "../../../types";
import PagonationElementForm from "../../../components/Pagination/PagonationElementForm";
import PaginationTexts from "../../../components/Pagination/PaginationTexts";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { actions } from "../../../store/categoryList/slice";
import Pagination from "@material-ui/lab/Pagination";
import PaginationContents from "../../../components/Pagination/PaginationContents";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(0, 0, 0, `${drawerWidth}px`),
    },

    paper: {
      "& > *": {
        padding: theme.spacing(0, 0, 3, 0),
      },
    },

    paperElements: {
      padding: theme.spacing(0, 0, 3, 0),
    },
    paginationBlock: {
      backgroundColor: theme.palette.background.paper,
      padding: "50px 48px 0 48px",
    },
    paginationNavigation: {
      display: "flex",
      justifyContent: "center",
    },
  })
);

export default function CategoryContents() {
  const classes = useStyles();
  const { categoryList, maxPage } = useAppSelector(
    (state) => state.categoryList
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      actions.getCategoryListPending({
        page: 1,
        limit: 10,
      })
    );
  }, []);

  const [nowPage, setNowPage] = useState(1);
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

  return (
    <>
      <div className={classes.root}>
        <div className={classes.paper}>
          <Paper elevation={PaperElevation.BOTTOM}>
            <NewCategoryEntry />

            <div className={classes.paginationBlock}>
              <PaginationTexts
                headerText={"등록된 제품 카테고리"}
                mainText={
                  "미분류 카테고리는 삭제가 불가능하며, 기존 카테고리 삭제시 미분류 상품으로 이동됩니다."
                }
              />
              <PaginationContents contentsArray={categoryList} />

              <Pagination
                className={classes.paginationNavigation}
                count={maxPage}
                showFirstButton
                showLastButton
                page={nowPage}
                onChange={paginationNavigationHandler}
              />
            </div>
          </Paper>
        </div>
      </div>
    </>
  );
}
