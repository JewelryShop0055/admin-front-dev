import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import { Link } from "react-router-dom";

const drawerWidth = 280;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      position: "absolute",
      top: "72px",
      width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
  })
);

export default function TodaysCheckListSubNavigation() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <List>
          <Link
            to="/WaitForOrderGoods"
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <ListItem button key={"전체 발주 대기리스트"}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"전체 발주 대기리스트"} />
            </ListItem>
          </Link>

          <Link
            to="/TodaysCompleteGoods"
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <ListItem button key={"전체 금일 출고 제품리스트"}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"전체 금일 출고 제품리스트"} />
            </ListItem>
          </Link>

          <Link
            to="/NotReciveGoods"
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <ListItem button key={"전체 고객 미수령 상품리스트"}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"전체 고객 미수령 상품리스트"} />
            </ListItem>
          </Link>
        </List>
        <Divider />
      </Drawer>
    </div>
  );
}
