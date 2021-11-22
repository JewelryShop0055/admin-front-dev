import { Button, Theme, createStyles, makeStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { drawerWidth } from "../../../components/Navigations/SubNavigation";
import NewCategoryEntry from "./NewCategoryEntry";
import { PaperElevation } from "../../../styleTypes";
import CreateIcon from "@material-ui/icons/Create";

import { useAppSelector } from "../../../modules/hooks";
import PaginationTexts from "../../../components/Pagination/PaginationTexts";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { actions as getListActions } from "../../../store/categoryList/slice";
import Pagination from "@material-ui/lab/Pagination";
import { actions as deleteActions } from "../../../store/deleteCategory/slice";
import { ProductCategoryList } from "../../../types";
import { useHistory } from "react-router";
import { actions as putCategoryActions } from "../../../store/putCurrentCategory/slice";

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
    paginationAddButton: {
      display: "flex",
      justifyContent: "flex-end",
      padding: "10px 0 10px 0",
    },
  })
);

export default function CategoryContents() {
  const classes = useStyles();
  const { categoryList, maxPage } = useAppSelector(
    (state) => state.categoryList
  );

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    getCategoryList({
      page: 1,
      limit: 10,
    });
  }, []);

  function getCategoryList({ page, limit }: ProductCategoryList) {
    dispatch(
      getListActions.getCategoryListPending({
        page: page,
        limit: limit,
      })
    );
  }

  const [nowPage, setNowPage] = useState(1);

  const paginationNavigationHandler = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    console.log(value, "클릭");
    setNowPage(value);
    getCategoryList({
      page: value,
      limit: 10,
    });
  };

  return (
    <>
      <div className={classes.root}>
        <div className={classes.paper}>
          <Paper elevation={PaperElevation.BOTTOM}>
            {/* <NewCategoryEntry /> */}

            <div className={classes.paginationBlock}>
              <PaginationTexts
                headerText={"등록된 제품 카테고리"}
                mainText={
                  "소속된 제품이 있는 경우 삭제가 불가능합니다. 다른 카테고리로 이동 후 삭제해 주세요."
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
                        color="primary"
                        size="small"
                        startIcon={<CreateIcon />}
                        onClick={() => {
                          // dispatch(
                          //   deleteActions.deleteCategoryPending({
                          //     categoryId: value.id,
                          //     categoryName: value.name,
                          //   })
                          // );
                          // getCategoryList({
                          //   page: nowPage,
                          //   limit: 10,
                          // });
                          history.push(
                            "/ItemCategoryCrafthopManage/CreateRevise"
                          );
                          dispatch(
                            putCategoryActions.putCurrentCategoryStandBy({
                              targetId: value.id,
                              currentCategoryName: value.name,
                              putCategoryName: "",
                            })
                          );
                        }}
                      >
                        수정/삭제
                      </Button>
                    </div>
                  </>
                );
              })}

              <div className={classes.paginationAddButton}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  startIcon={<CreateIcon />}
                  onClick={() => {
                    history.push("/ItemCategoryCrafthopManage/CreateRevise");
                  }}
                >
                  추가하기
                </Button>
              </div>
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
