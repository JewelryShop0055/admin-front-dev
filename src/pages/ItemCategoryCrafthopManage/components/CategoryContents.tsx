import { Button, Theme, createStyles, makeStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { drawerWidth } from "../../../components/Navigations/SubNavigation";
import NewCategoryEntry from "./NewCategoryEntry";
import { PaperElevation } from "../../../styleTypes";
import DeleteIcon from "@material-ui/icons/Delete";

import { useAppSelector } from "../../../modules/hooks";
import PaginationTexts from "../../../components/Pagination/PaginationTexts";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { actions as getListActions } from "../../../store/categoryList/slice";
import Pagination from "@material-ui/lab/Pagination";
import { actions as deleteActions } from "../../../store/deleteCategory/slice";

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
    paginationElements: {
      borderBottom: "black solid 0.5px",
      padding: "5px 0 5px 0",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
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
      getListActions.getCategoryListPending({
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
      getListActions.getCategoryListPending({
        page: nowPage,
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
              {/* <PaginationContents
                contentsArray={categoryList}
                contentsRenderComponent={CategoryPaginationElementRender}
                /> */}
              {categoryList.map((value) => {
                return (
                  <>
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
                            getListActions.getCategoryListPending({
                              page: nowPage,
                              limit: 10,
                            })
                          );
                        }}
                      >
                        Delete
                      </Button>
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
            </div>
          </Paper>
        </div>
      </div>
    </>
  );
}
