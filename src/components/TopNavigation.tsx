import React from "react";
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
import { Link } from "react-router-dom";

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
      marginRight: theme.spacing(10),
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

interface StyledTabsProps {
  value: number;
  onChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
}

// const StyledTabs = withStyles({
//   indicator: {
//     display: "flex",
//     justifyContent: "center",
//     backgroundColor: "transparent",
//     "& > span": {
//       maxWidth: 40,
//       width: "100%",
//       backgroundColor: "#635ee7",
//     },
//   },
// })((props: StyledTabsProps) => (
//   <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />
// ));

interface StyledTabProps {
  label: string;
}

const StyledTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: "none",
      color: "#fff",
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.pxToRem(15),
      marginRight: theme.spacing(1),
      "&:focus": {
        opacity: 1,
      },
    },
  })
)((props: StyledTabProps) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing(3),
  },
  topNavigation: {
    backgroundColor: theme.palette.background.paper,
  },
  demo2: {
    backgroundColor: "#2e1534",
  },
}));

// Sub NAVIGATION

export default function TopNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(3);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      {/* TOP NAVIGATION  */}
      <div className={classes.root}>
        <div className={classes.topNavigation}>
          <AntTabs
            value={value}
            onChange={handleChange}
            aria-label="ant example"
          >
            <StoreName>Raviluz</StoreName>

            <AntTab label="오늘의 체크리스트" />

            <AntTab label="손님 예약 일정" />

            <Link
              to="/CustomerReservation"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <AntTab label="상품 관리" />
            </Link>
          </AntTabs>
          <Typography className={classes.padding} />
        </div>
      </div>
    </>
  );
}
