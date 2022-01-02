import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";

import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";

import ListItemText from "@material-ui/core/ListItemText";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "../../modules/hooks";
import { actions } from "../../store/signOut/slice";
import { SubNavigationParams } from "../../types";
import { Border } from "../../styleTypes";
import subNavigationElements from "./subNavigationElements";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100%",
      borderRight: Border.DEFAULT_BORDER,
    },
    funtionDivider: {
      border: Border.DEFAULT_BORDER,
    },
  })
);

export default function SubNavigation() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useAppDispatch();

  const handleLogout: React.MouseEventHandler<HTMLDivElement> = async (e) => {
    dispatch(actions.getSignOutPending());
  };

  return (
    <div className={classes.root}>
      <List>
        <ListItem
          button
          onClick={(e) => {
            handleLogout(e);
            history.push("/loginPage");
          }}
          key="Logout"
        >
          <ListItemText primary={"Logout"} />
        </ListItem>

        <Divider className={classes.funtionDivider} />

        {subNavigationElements(globalThis.location.pathname).map((element) => (
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
    </div>
  );
}

SubNavigation.defaultProps = {
  ListItemArray: [],
};
