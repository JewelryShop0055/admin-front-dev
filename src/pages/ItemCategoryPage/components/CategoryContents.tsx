import { Button } from "@material-ui/core";
import { Border, FontColor, FontSize, Padding } from "../../../styleTypes";
import AddIcon from "@material-ui/icons/Add";
import { Theme, createStyles, makeStyles } from "@material-ui/core";

import { useAppSelector } from "../../../modules/hooks";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { actions as getListActions } from "../../../store/category/categoryList/slice";
import Pagination from "@material-ui/lab/Pagination";
import { Category, ProductCategoryList } from "../../../types";

import RenderCategoryElements from "./RenderCategoryElements";

import { actions as toggleModalAction } from "../../../store/category/categoryModal/slice";

import { ItemCategoryPageMode } from "..";

interface CategoryContentsProps {
  setSelectedCategory: React.Dispatch<
    React.SetStateAction<Category | undefined>
  >;
  mode: ItemCategoryPageMode;
  setMode: React.Dispatch<React.SetStateAction<ItemCategoryPageMode>>;
}

export const ContentsBaseStyles = makeStyles((theme: Theme) =>
  createStyles({
    //
    paginationBlock: {
      backgroundColor: theme.palette.background.paper,
      padding: Padding.CONTENTS_CONTAINER,
      paddingTop: "20px",
      minWidth: "600px",
    },
    craftShopListContainer: {
      display: "grid",
      gridTemplateRows: "40px auto",
      gridTemplateColumns: ".5fr 2fr 2fr 2fr 1fr",
      gridTemplateAreas: `
      "checkBox headerCraftName headerCraftAddress headerCraftPhone none"
      "elements elements elements elements elements"`,

      "& > input:nth-child(1)": {
        height: "50px",
      },
    },
    headerCheckBox: {
      gridArea: "checkBox",
      margin: "auto",
    },
    headerCraftName: {
      gridArea: "headerCraftName",
      paddingLeft: "10px",
      fontWeight: "bold",
      margin: "auto 0 auto 0",
    },
    headerCraftAddress: {
      gridArea: "headerCraftAddress",
      fontWeight: "bold",
      margin: "auto 0 auto 0",
    },
    headerCraftPhone: {
      gridArea: "headerCraftPhone",
      fontWeight: "bold",
      margin: "auto 0 auto 0",
    },
    craftElements: {
      gridArea: "elements",
      borderTop: "1px solid black",
    },

    paginationNavigation: {
      display: "flex",
      justifyContent: "center",
    },

    paginationAddButton: {
      display: "flex",
      justifyContent: "flex-end",
      padding: "10px 0 10px 0",
    },

    craftshopListHeader: {
      display: "flex",
      justifyContent: "flex-start",
      borderBottom: Border.DEFAULT_BORDER,
      paddingBottom: "10px",
    },

    totalCraftshop: {
      flex: "1",
      display: "flex",
      alignItems: "center",

      fontSize: FontSize.LARGE,

      "& > div:nth-child(1)": {
        marginBottom: "3px",
        marginLeft: "20px",
        color: FontColor.BLUE,
        display: "flex",
        alignItems: "center",
      },
    },
  })
);

export default function CategoryContents({
  mode,
  setMode,
  setSelectedCategory,
}: CategoryContentsProps) {
  const classes = ContentsBaseStyles();
  const dispatch = useDispatch();
  const openModal = useAppSelector((state) => state.categoryModal.isOpen);
  const { categoryList, maxPage } = useAppSelector(
    (state) => state.categoryList
  );

  const [nowPage, setNowPage] = useState(1);

  function getCategoryList({ page, limit }: ProductCategoryList) {
    dispatch(
      getListActions.getCategoryListPending({
        page: page,
        limit: limit,
      })
    );
  }

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
    if (!openModal) {
      getCategoryList({
        page: nowPage,
        limit: 10,
      });
    }
    return () => {
      if (openModal) {
        dispatch(toggleModalAction.closeModal());
      }
    };
  }, [dispatch, openModal]);

  return (
    <>
      <div className={classes.paginationBlock}>
        <div className={classes.craftshopListHeader}>
          <div className={classes.totalCraftshop}>
            전체 공방
            <div>12</div>
          </div>

          <div className={classes.paginationAddButton}>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              startIcon={<AddIcon />}
              onClick={() => setMode(ItemCategoryPageMode.CREATE)}
            >
              추가하기
            </Button>
          </div>
        </div>

        <RenderCategoryElements
          categoryList={categoryList}
          setSelectedCategory={setSelectedCategory}
          setMode={setMode}
        />

        <Pagination
          className={classes.paginationNavigation}
          count={maxPage}
          showFirstButton
          showLastButton
          page={nowPage}
          onChange={paginationNavigationHandler}
        />
      </div>
    </>
  );
}
