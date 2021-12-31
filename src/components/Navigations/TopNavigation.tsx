import React, { useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { useHistory } from "react-router-dom";

export const topNavigationHeight = 60;

const useStyles = makeStyles(() => ({
  topNavigation: {
    width: "1000px",
    height: "60px",
    fontSize: "1rem",
    listStyle: "none",

    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr",
    gridTemplateAreas: `"stoneName tab1 tab2 tab3 tab4 tab5"`,
  },
  stoneName: {
    fontSize: "3rem",
    fontWeight: "bold",
    textAlign: "center",
    margin: "0 20px 0 50px",
  },
  tab: {
    width: "10rem",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
      color: "#40a9ff",
    },
  },
  seletedTab: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#1890ff",
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

  const selected = useRef<number>(0);

  return (
    <>
      <Tabs
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
