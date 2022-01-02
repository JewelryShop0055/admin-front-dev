import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { useHistory } from "react-router-dom";
import { FontSize } from "../../styleTypes";

export const topNavigationHeight = 60;

const useStyles = makeStyles(() => ({
  topNavigation: {
    width: "auto",
    height: "60px",
    fontSize: "1rem",
    borderBottom: "1px solid #bbbbbb",
  },
  stoneName: {
    fontSize: FontSize.STONE_NAME,
    fontWeight: "bold",
    textAlign: "center",
    margin: "0 20px 0 50px",
  },
}));

export default function TopNavigation() {
  const classes = useStyles();

  const [nowTab, setNowTab] = useState(1);
  const history = useHistory();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setNowTab(newValue);
    if (newValue === 1) {
      return history.push("/pages/TodaysChecklist");
    }
    // if (newValue === 2) {
    //   return history.push("/TodaysChecklist");
    // }
    // if (newValue === 3) {
    //   return history.push("/TodaysChecklist");
    // }
    if (newValue === 4) {
      return history.push("/pages/ProductCreate");
    }
    if (newValue === 5) {
      return history.push("/pages/ItemCategoryCrafthopManage");
    }
  };

  return (
    <>
      <Tabs
        className={classes.topNavigation}
        value={nowTab}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
      >
        <div className={classes.stoneName}>Raviluz</div>
        <Tab label="오늘의 체크리스트" />
        <Tab label="손님 예약 일정" />
        <Tab label="제품 검색/관리" />
        <Tab label="제품 등록" />
        <Tab label="제품카테고리/공방 관리" />
      </Tabs>
    </>
  );
}
