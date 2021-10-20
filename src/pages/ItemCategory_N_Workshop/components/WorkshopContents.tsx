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
import NewWorkshopEntry from "./NewWorkshopEntry";
import WorkshopList from "./WorkshopList";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(0, 0, 0, `${drawerWidth}px`),
    },

    paper: {
      display: "block",
      width: `calc(100%-${drawerWidth}px)`,
      height: `calc(100vh - ${topNavigationHeight}px)`,
      // height: "100%",
      flexShrink: 0,

      "& > *": {
        display: "block",
        padding: theme.spacing(0, 0, 3, 0),
        flexShrink: 0,
      },
    },

    paperElements: {
      padding: theme.spacing(0, 0, 3, 0),
    },
  })
);

export default function WorkshopContents() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <div className={classes.paper}>
          <Paper elevation={0} className={classes.paperElements}>
            <NewWorkshopEntry />
            <WorkshopList />
          </Paper>
        </div>
      </div>
    </>
  );
}
