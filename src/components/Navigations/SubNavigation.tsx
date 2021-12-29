import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";

import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";

import ListItemText from "@material-ui/core/ListItemText";
import { topNavigationHeight } from "./TopNavigation";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "../../modules/hooks";
import { actions } from "../../store/signOut/slice";
import { SubNavigationParams } from "../../types";

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
      // padding: theme.spacing(3),
    },

    divider: {
      border: "1px solid lightgray",
    },
  })
);

export default function SubNavigation({ elementsArray }: SubNavigationParams) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useAppDispatch();

  const handleLogout: React.MouseEventHandler<HTMLDivElement> = async (e) => {
    await dispatch(actions.getSignOutPending());
  };

  return (
    <div className={classes.root}>
      <Drawer
        // className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <List>
          <ListItem button onClick={handleLogout} key={"Logout"}>
            <ListItemText primary={"Logout"} />
          </ListItem>
        </List>
        <Divider className={classes.divider} />
        <List>
          {elementsArray.map((element) => (
            <ListItem
              divider
              button
              key={element.elementName}
              onClick={() => {
                history.push(element.elementLink);
              }}
            >
              <ListItemText primary={element.elementName} />
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
