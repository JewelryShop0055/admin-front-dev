import React, { useState } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";

import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";

import ListItemText from "@material-ui/core/ListItemText";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "../../modules/hooks";
import { actions } from "../../store/signOut/slice";
import { BackgroundColor, Border, FontColor, FontSize } from "../../styleTypes";
import subNavigationElements from "./subNavigationElements";
import LinkIcon from "@material-ui/icons/Link";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import StoreIcon from "@material-ui/icons/Store";
import BusinessIcon from "@material-ui/icons/Business";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@material-ui/core";
import AccordianElement from "./SubNavigationAccordianElement";

export const subNaviStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100%",
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
    },
    element: {
      fontSize: FontSize.MEDIUM,
      lineHeight: "40px",

      display: "flex",
      justifyContent: "flex-start",
      textAlign: "center",
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
      "&:active": {
        background: "#252525",
      },
    },
    selecedAccordionElement: {
      background: BackgroundColor.BLUE,
      color: FontColor.WHITE,
    },
    accordionSummaryElement: {
      lineHeight: "22px",
    },
  })
);

export default function SubNavigation() {
  const classes = subNaviStyles();
  const history = useHistory();
  const dispatch = useAppDispatch();

  const [isSelect, setIsSelect] = useState(false);

  //로그아웃
  const handleLogout = async () => {
    dispatch(actions.getSignOutPending());
  };

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
            history.push("#");
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

        <Accordion className={classes.accordionElement} square>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            className={classes.accordionSummaryElement}
          >
            <EventAvailableIcon className={classes.icon} />
            예약
          </AccordionSummary>
          <AccordionDetails>오늘의 예약</AccordionDetails>
          <AccordionDetails>어제의 예약</AccordionDetails>
        </Accordion>

        <AccordianElement
          isSelect={isSelect}
          setIsSelect={setIsSelect}
          summaryText={"제품관리"}
          SummaryIcon={StoreIcon}
          detailTexts={[
            "전체 제품 검색",
            "제품 등록/수정",
            "제품카테고리 등록/수정",
          ]}
        />

        <Accordion className={classes.accordionElement} square>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            // aria-controls="panel1a-content"
            // id="panel1a-header"
          >
            <BusinessIcon className={classes.icon} />
            공방관리
          </AccordionSummary>
          <AccordionDetails>공방 등록/수정</AccordionDetails>
        </Accordion>
      </List>
    </div>
  );
}
