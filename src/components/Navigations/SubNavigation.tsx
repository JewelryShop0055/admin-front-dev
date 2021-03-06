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

  //????????????????????????

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
          <div>Raviluz ??????????????? ??????</div>
        </ListItem>

        <div className={classes.managementHeader}>????????????</div>

        <ListItem
          button
          onClick={() => {
            history.push("/pages/dashboard");
          }}
          key="servicePageLink"
          className={classes.element}
        >
          <DashboardIcon className={classes.icon} />
          <div>????????????</div>
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
          <div>????????? ??????</div>
        </ListItem>

        <AccordianElement
          summaryText={"??????"}
          SummaryIcon={EventAvailableIcon}
          detailElement={[
            { title: "????????? ??????", path: "#" },
            { title: "????????? ??????", path: "#" },
          ]}
        />

        <AccordianElement
          summaryText={"????????????"}
          SummaryIcon={StoreIcon}
          detailElement={[
            { title: "?????? ?????? ??????", path: "#" },
            { title: "?????? ??????/??????", path: "/pages/items" },
            { title: "?????????????????? ??????/??????", path: "/pages/productCategory" },
          ]}
        />

        <AccordianElement
          summaryText={"????????????"}
          SummaryIcon={BusinessIcon}
          detailElement={[
            { title: "?????? ??????/??????", path: "/pages/craftshop" },
          ]}
        />
        {/* <details> => ????????? ??????????????? ??? ???????????? ????????????
          <summary>?????????????????????</summary>
          <span>????????? ????????????</span>
        </details> */}
      </List>
    </div>
  );
}
