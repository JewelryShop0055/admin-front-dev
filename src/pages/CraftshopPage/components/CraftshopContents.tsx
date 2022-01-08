import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import {
  Border,
  FontColor,
  FontSize,
  Padding,
  PaperElevation,
} from "../../../styleTypes";
import PaginationTexts from "../../../components/Pagination/PaginationTexts";
import RenderCraftshopElements from "./RenderCraftshopElements";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import Pagination from "@material-ui/lab/Pagination";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../modules/hooks";
import { actions as craftshopListAction } from "../../../store/craftshop/craftshopList/slice";
import { useHistory } from "react-router";
import { Craftshop } from "../../../types";

interface CraftshopContentsProps {
  setSelectedCraftshop: React.Dispatch<
    React.SetStateAction<Craftshop | undefined>
  >;
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
      marginTop: "20px",
      display: "grid",
      gridTemplateRows: "1fr auto",
      gridTemplateColumns: "2fr 5fr 2fr 1fr",
      gridTemplateAreas: `
      "headerCraftName headerCraftAddress headerCraftPhone none"
      "elements elements elements elements"`,
    },
    headerCraftName: {
      gridArea: "headerCraftName",
      paddingLeft: "10px",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    headerCraftAddress: {
      gridArea: "headerCraftAddress",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    headerCraftPhone: {
      gridArea: "headerCraftPhone",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    craftElements: {
      gridArea: "elements",
      borderTop: "1px solid black",
    },

    paginationNavigation: {
      display: "flex",
      justifyContent: "center",
    },
    //

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

export default function CraftshopContents({
  setSelectedCraftshop,
}: CraftshopContentsProps) {
  const classes = ContentsBaseStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const { craftshopList, maxPage } = useAppSelector(
    (state) => state.craftshopList
  );

  const [nowPage, setNowPage] = useState(1);

  const paginationNavigationHandler = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setNowPage(page);
    dispatch(
      craftshopListAction.getCraftshopListPending({
        page: page,
        limit: 10,
      })
    );
  };

  useEffect(() => {
    dispatch(
      craftshopListAction.getCraftshopListPending({
        page: nowPage,
        limit: 10,
      })
    );
  }, []);

  return (
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
            onClick={() =>
              history.push("/pages/ItemCategoryCrafthopManage/Craftshop/add")
            }
          >
            추가하기
          </Button>
        </div>
      </div>

      <div className={classes.craftShopListContainer}>
        <div className={classes.headerCraftName}>공방이름</div>
        <div className={classes.headerCraftAddress}>주소</div>
        <div className={classes.headerCraftPhone}>연락처</div>
        <div className={classes.craftElements}>
          <RenderCraftshopElements
            craftshopList={craftshopList}
            setSelectedCraftshop={setSelectedCraftshop}
          />
        </div>
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
  );
}
