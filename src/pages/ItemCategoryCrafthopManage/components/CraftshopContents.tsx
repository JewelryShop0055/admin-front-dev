import {
  Theme,
  createStyles,
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { drawerWidth } from "../../../components/Navigations/SubNavigation";
import Typography from "@material-ui/core/Typography";
import { InputBlock } from "../../Login/components/LoginBlock_styled";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { topNavigationHeight } from "../../../components/Navigations/TopNavigation";
import { lightBlue, blue } from "@material-ui/core/colors";
import CategoryList from "./CategoryList";
import NewCategoryEntry from "./NewCategoryEntry";
import NewCraftshopEntry from "./NewCraftshopEntry";
import CraftshopList from "./CraftshopList";
import { PaperElevation } from "../../../styleTypes";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(0, 0, 0, `${drawerWidth}px`),
    },

    paper: {
      "& > *": {
        padding: theme.spacing(0, 0, 3, 0),
      },
    },

    paperElements: {
      padding: theme.spacing(0, 0, 3, 0),
    },
  })
);

export default function CraftshopContents() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <div className={classes.paper}>
          <Paper
            elevation={PaperElevation.BOTTOM}
            className={classes.paperElements}
          >
            <NewCraftshopEntry />
            <CraftshopList />
          </Paper>
        </div>
      </div>
    </>
  );
}
