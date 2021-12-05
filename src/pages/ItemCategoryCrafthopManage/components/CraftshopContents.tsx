import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { drawerWidth } from "../../../components/Navigations/SubNavigation";
import NewCraftshopEntry from "./NewCraftshopEntry";
import CraftshopList from "./CraftshopList";
import { PaperElevation } from "../../../styleTypes";
import { ContentsBaseStyles } from "../utils/useStyles";
import PaginationTexts from "../../../components/Pagination/PaginationTexts";
import RenderCraftshopElements from "./RenderCraftshopElements";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import { Craftshop } from "../../../types";
import Pagination from "@material-ui/lab/Pagination";
import { useState } from "react";

export default function CraftshopContents() {
  const classes = ContentsBaseStyles();
  const dispatch = useDispatch();

  //임시값
  const craftshopList: Craftshop[] = [
    {
      id: "0010",
      name: "공방이름",
      postCode: "11234",
      address: "경기도",
      detailAddress: "판교동",
      phone: "010-2342-2452",
      updatedAt: "2021-12-05",
      createdAt: "2021-12-05",
    },
    {
      id: "0011",
      name: "공방공방",
      postCode: "11234",
      address: "경기도",
      detailAddress: "판교동",
      phone: "010-2342-2452",
      updatedAt: "2021-12-05",
      createdAt: "2021-12-05",
    },
  ];

  //====
  const [nowPage, setNowPage] = useState(1);

  const paginationNavigationHandler = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setNowPage(value);
    // getCategoryList({
    //   page: value,
    //   limit: 10,
    // });
  };

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
                  //   toggleModalAction.openModal({
                  //     modalType: ModalType.CREATE,
                  //     id: 0,
                  //     name: "",
                  //     itemCount: 0,
                  //   })
                  // )
                  console.log("공방추가버튼 클릭")
                }
              >
                추가하기
              </Button>
            </div>

            <Pagination
              className={classes.paginationNavigation}
              count={5}
              showFirstButton
              showLastButton
              page={1}
              onChange={paginationNavigationHandler}
            />
          </div>

          <NewCraftshopEntry />
          {/* <CraftshopList /> */}
        </Paper>
      </div>
    </>
  );
}
