import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { PaperElevation } from "../../../styleTypes";
import { ContentsBaseStyles } from "../../ItemCategoryCrafthopManagePage/utils/useStyles";
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
    <>
      <div className={classes.ContentsBase}>
        <Paper elevation={PaperElevation.BOTTOM}>
          <div className={classes.paginationBlock}>
            <PaginationTexts
              headerText={"등록된 공방"}
              mainText={"등록된 공방 리스트입니다."}
            />

            <div className={classes.craftShopListContainer}>
              <div className={classes.headerCraftName}>공방이름</div>
              <div className={classes.headerCraftAddress}>주소</div>
              <div className={classes.headerCraftPhone}>연락처</div>
              <div className={classes.craftElements}>
                <RenderCraftshopElements craftshopList={craftshopList} />
              </div>
            </div>

            <div className={classes.paginationAddButton}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                startIcon={<AddIcon />}
                onClick={() =>
                  history.push(
                    "/pages/ItemCategoryCrafthopManage/Craftshop/add"
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
    </>
  );
}
