import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";

import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";

import ListItemText from "@material-ui/core/ListItemText";
import { StyledLink } from "../StyledLink";
import { signout } from "../../util/auth";
import { topNavigationHeight } from "./TopNavigation";
import { useHistory } from "react-router-dom";

export const drawerWidth = 280;

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
      width: theme.spacing(20),
      flexShrink: 0,
    },
    drawerPaper: {
      position: "absolute",
      top: "72px",
      width: `${drawerWidth}px`,
      height: `calc(100vh - ${topNavigationHeight}px)`,
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

interface SubNavigationProps {
  ListItemArray: string[][];
}

export default function SubNavigation({ ListItemArray }: SubNavigationProps) {
  const classes = useStyles();
  const history = useHistory();

  const handleLogout: React.MouseEventHandler<HTMLDivElement> = async (e) => {
    await signout();
  };

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
          <StyledLink to="/">
            <ListItem button onClick={handleLogout} key={"Logout"}>
              <ListItemText primary={"Logout"} />
            </ListItem>
          </StyledLink>
        </List>
        <Divider />
        <List>
          {ListItemArray.map((array) => (
            <ListItem button key={array[0]}>
              <ListItemText
                primary={array[0]}
                onClick={(e) => {
                  history.replace(array[1]);
                }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}

SubNavigation.defaultProps = {
  ListItemArray: [],
};
