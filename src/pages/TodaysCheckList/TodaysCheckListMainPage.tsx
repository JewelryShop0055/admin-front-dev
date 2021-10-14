import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import TodoCheckListsSubNavigation from "./TodaysCheckListSubNavigation";
import TodaysCheckListMainPageContents from "./TodaysCheckListMainPageContents";
import TopNavigation from "../../components/Navigations/TopNavigation";

const drawerWidth = 240;

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

    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
  })
);

export default function TodaysCheckListMainPage() {
  const classes = useStyles();

  return (
    <>
      <TopNavigation />
      <div className={classes.root}>
        <CssBaseline />
        <TodoCheckListsSubNavigation />

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <TodaysCheckListMainPageContents />
        </main>
      </div>
    </>
  );
}
