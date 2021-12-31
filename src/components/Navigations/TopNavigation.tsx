import React, { useState } from "react";
import {
  makeStyles,
  withStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";

import { useHistory } from "react-router-dom";

export const topNavigationHeight = 70;

// TOP NAVIGATION
const StoreName = styled.div`
  display: block;
  font-size: 50px;
  font-weight: bold;
  text-align: center;
  padding-left: 70px;
  padding-right: 70px;
`;

const AntTabs = withStyles({
  root: {
    borderBottom: "1px solid #e8e8e8",
  },
  indicator: {
    backgroundColor: "#1890ff",
  },
})(Tabs);

const AntTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: "none",
      minWidth: 150,
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: "18px",
      marginRight: theme.spacing(2),
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:hover": {
        color: "#40a9ff",
        opacity: 1,
      },
      "&$selected": {
        color: "#1890ff",
        fontWeight: theme.typography.fontWeightMedium,
      },
      "&:focus": {
        color: "#40a9ff",
      },
    },
    selected: {},
  })
)((props: StyledTabProps) => <Tab disableRipple {...props} />);

interface StyledTabProps {
  label: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing(0),
  },
  topNavigation: {
    backgroundColor: theme.palette.background.paper,
  },
  demo2: {
    backgroundColor: "#2e1534",
  },
}));

export default function TopNavigation() {
  const classes = useStyles();

  const [nowTab, setNowTab] = useState(1);
  const history = useHistory();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setNowTab(newValue);
    if (newValue === 1) {
      return history.push("/TodaysChecklist");
    }
    // if (newValue === 2) {
    //   return history.push("/TodaysChecklist");
    // }
    // if (newValue === 3) {
    //   return history.push("/TodaysChecklist");
    // }
    if (newValue === 4) {
      return history.push("/ProductCreate");
    }
    if (newValue === 5) {
      return history.push("/ItemCategoryCrafthopManage");
    }
  };

  return (
    <>
      <div className={classes.root}>
        <div className={classes.topNavigation}>
          <AntTabs
            value={nowTab}
            onChange={handleChange}
            aria-label="ant example"
          >
            <StoreName>Raviluz</StoreName>

            <AntTab label="오늘의 체크리스트" />

            <AntTab label="손님 예약 일정" />

            <AntTab label="제품 검색/관리" />

            <AntTab label="제품 등록" />

            <AntTab label="제품카테고리, 공방 관리" />
          </AntTabs>
          <Typography className={classes.padding} />
        </div>
      </div>
    </>
  );
}
