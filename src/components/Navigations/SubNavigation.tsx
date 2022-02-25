import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import { useHistory } from "react-router-dom";
import { useAppDispatch } from "../../modules/hooks";
import { actions } from "../../store/signOut/slice";
import { BackgroundColor, Border, FontColor, FontSize } from "../../styleTypes";
import LinkIcon from "@material-ui/icons/Link";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import StoreIcon from "@material-ui/icons/Store";
import BusinessIcon from "@material-ui/icons/Business";
import AccordianElement from "./SubNavigationAccordianElement";

export const subNaviStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100%",
      minHeight: "100vh",
      borderRight: Border.DEFAULT_BORDER,
      color: FontColor.WHITE,
      background: BackgroundColor.SUBNAVI_BG,
    },
    stoneName: {
      fontSize: FontSize.STONE_NAME,
      fontWeight: "bold",
      lineHeight: "60px",
      borderBottom: Border.SUBNAVI_BORDER,

      display: "flex",
      justifyContent: "center",
      textAlign: "center",
    },
    icon: {
      marginRight: "10px",
    },
    moveServicePage: {
      fontSize: FontSize.MEDIUM,
      lineHeight: "40px",
      borderBottom: Border.SUBNAVI_BORDER,

      display: "flex",
      justifyContent: "flex-start",
      textAlign: "center",

      "&:hover": {
        background: "#252525",
      },
    },
    element: {
      fontSize: FontSize.MEDIUM,
      lineHeight: "40px",

      display: "flex",
      justifyContent: "flex-start",
      textAlign: "center",

      "&:hover": {
        background: "#252525",
      },
    },
    managementHeader: {
      color: "#bbbbbb",
      fontSize: FontSize.MEDIUM,
      lineHeight: "40px",
      paddingLeft: "20px",

      display: "flex",
      textAlign: "center",
    },
    accordionElement: {
      background: BackgroundColor.SUBNAVI_BG,
      color: FontColor.WHITE,
      padding: "8px 0 8px 0",
    },
    selectedAccordionElement: {
      background: BackgroundColor.BLUE,
      color: FontColor.WHITE,
    },
    accordionSummaryElement: {
      lineHeight: "22px",

      "&:hover": {
        background: "#252525",
      },
    },
    accordionDetailElement: {
      // background: BackgroundColor.BLUE,
      // color: FontColor.WHITE,

      "&:active": {
        background: "#252525",
      },
    },
  })
);

export default function SubNavigation() {
  const classes = subNaviStyles();
  const history = useHistory();

  //라우팅처리해야함

  return (
    <div className={classes.root}>
      <List disablePadding>
        <div className={classes.stoneName}>Raviluz</div>

        <ListItem
          button
          onClick={() => {
            history.push("#");
          }}
          key="servicePageLink"
          className={classes.moveServicePage}
        >
          <LinkIcon className={classes.icon} />
          <div>Raviluz 에약페이지 이동</div>
        </ListItem>

        <div className={classes.managementHeader}>점포관리</div>

        <ListItem
          button
          onClick={() => {
            history.push("/pages/dashboard");
          }}
          key="servicePageLink"
          className={classes.element}
        >
          <DashboardIcon className={classes.icon} />
          <div>대시보드</div>
        </ListItem>

        <ListItem
          button
          onClick={() => {
            history.push("#");
          }}
          key="servicePageLink"
          className={classes.element}
        >
          <PlaylistAddCheckIcon className={classes.icon} />
          <div>오늘의 할일</div>
        </ListItem>

        <AccordianElement
          summaryText={"예약"}
          SummaryIcon={EventAvailableIcon}
          detailElement={[
            { title: "오늘의 예약", path: "#" },
            { title: "어제의 예약", path: "#" },
          ]}
        />

        <AccordianElement
          summaryText={"제품관리"}
          SummaryIcon={StoreIcon}
          detailElement={[
            { title: "전체 제품 검색", path: "#" },
            { title: "제품 등록/수정", path: "/pages/items" },
            { title: "제품카테고리 등록/수정", path: "/pages/productCategory" },
          ]}
        />

        <AccordianElement
          summaryText={"공방관리"}
          SummaryIcon={BusinessIcon}
          detailElement={[
            { title: "공방 등록/수정", path: "/pages/craftshop" },
          ]}
        />
        {/* <details> => 이걸로 갈아버리면 더 심플하게 구현가능
          <summary>테스트아코디언</summary>
          <span>누르면 보이는거</span>
        </details> */}
      </List>
    </div>
  );
}
