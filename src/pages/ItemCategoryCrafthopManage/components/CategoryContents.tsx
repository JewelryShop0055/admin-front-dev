import { Button } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { PaperElevation } from "../../../styleTypes";
import AddIcon from "@material-ui/icons/Add";

import { useAppSelector } from "../../../modules/hooks";
import PaginationTexts from "../../../components/Pagination/PaginationTexts";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { actions as getListActions } from "../../../store/categoryList/slice";
import Pagination from "@material-ui/lab/Pagination";
import { ModalType, ProductCategoryList } from "../../../types";

import RenderCategoryElements from "./RenderCategoryElements";
import { useStyles } from "../utils/useStyles";

import { actions as toggleModalAction } from "../../../store/categoryModal/slice";
import CategoryModal from "./CategoryModal";

export default function CategoryContents() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { categoryList, maxPage, currentPage } = useAppSelector(
    (state) => state.categoryList
  );
  const openModal = useAppSelector((state) => state.categoryModal.isOpen);

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
    setNowPage(value);
    getCategoryList({
      page: value,
      limit: 10,
    });
  };

  useEffect(() => {
    if (!openModal && nowPage === 1) {
      getCategoryList({
        page: 1,
        limit: 10,
      });
    }
    return () => {
      if (openModal) {
        dispatch(toggleModalAction.closeModal());
        setNowPage(1);
      }
    };
  }, [dispatch, openModal]);

  return (
    <>
      <div className={classes.CategoryContentsBase}>
        <Paper elevation={PaperElevation.BOTTOM}>
          <div className={classes.paginationBlock}>
            <PaginationTexts
              headerText={"등록된 제품 카테고리"}
              mainText={
                "소속된 제품이 있는 경우 삭제가 불가능합니다. 다른 카테고리로 이동 후 삭제해 주세요."
              }
            />

            <RenderCategoryElements categoryList={categoryList} />

            <div className={classes.paginationAddButton}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                startIcon={<AddIcon />}
                onClick={() =>
                  dispatch(
                    toggleModalAction.openModal({
                      modalType: ModalType.CREATE,
                      id: 0,
                      name: "",
                      itemCount: 0,
                    })
                  )
                }
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

      <CategoryModal openModal={openModal} />
    </>
  );
}
