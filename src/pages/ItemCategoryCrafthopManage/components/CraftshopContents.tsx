import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { drawerWidth } from "../../../components/Navigations/SubNavigation";
import NewCraftshopEntry from "./AddNewCraftshop";
import CraftshopList from "./CraftshopList";
import { PaperElevation } from "../../../styleTypes";
import { ContentsBaseStyles } from "../utils/useStyles";
import PaginationTexts from "../../../components/Pagination/PaginationTexts";
import RenderCraftshopElements from "./RenderCraftshopElements";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import { Craftshop, ModalType } from "../../../types";
import Pagination from "@material-ui/lab/Pagination";
import { useEffect, useState } from "react";
import CraftshopModal from "./CraftshopModal";
import { useAppSelector } from "../../../modules/hooks";
import { actions as modalAction } from "../../../store/craftshop/craftshopModal/slice";
import { actions as craftshopListAction } from "../../../store/craftshop/craftshopList/slice";
import { useHistory } from "react-router";

export default function CraftshopContents() {
  const classes = ContentsBaseStyles();
  const dispatch = useDispatch();
  const openModal = useAppSelector((state) => state.craftshopModal.isOpen);
  const history = useHistory();

  const { craftshopList, maxPage } = useAppSelector(
    (state) => state.craftshopList
  );

  const [nowPage, setNowPage] = useState(1);

  const paginationNavigationHandler = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setNowPage(value);
  };

  useEffect(() => {
    if (!openModal) {
      dispatch(
        craftshopListAction.getCraftshopListPending({
          page: nowPage,
          limit: 10,
        })
      );
    }
    return () => {
      if (openModal) {
      }
    };
  }, []);

  // useEffect(() => {
  //   if (!openModal) {
  //     getCategoryList({
  //       page: nowPage,
  //       limit: 10,
  //     });
  //   }
  //   return () => {
  //     if (openModal) {
  //       dispatch(toggleModalAction.closeModal());
  //     }
  //   };
  // }, [dispatch, openModal]);

  return (
    <>
      <div className={classes.ContentsBase}>
        <Paper elevation={PaperElevation.BOTTOM}>
          <div className={classes.paginationBlock}>
            <PaginationTexts
              headerText={"등록된 공방"}
              mainText={"등록된 공방 리스트입니다."}
            />

            <RenderCraftshopElements craftshopList={craftshopList} />

            <div className={classes.paginationAddButton}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                startIcon={<AddIcon />}
                onClick={() =>
                  // dispatch(
                  //   modalAction.openModal({
                  //     modalType: ModalType.CREATE,
                  //     name: "",
                  //     address: "",
                  //     phone: "",
                  //   })
                  // )
                  history.push("/ItemCategoryCrafthopManage/Craftshop/add")
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

          {/* <NewCraftshopEntry /> */}
          {/* <CraftshopList /> */}
        </Paper>
      </div>
      <CraftshopModal openModal={openModal} />
    </>
  );
}
