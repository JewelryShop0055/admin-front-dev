import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { drawerWidth } from "../../../components/Navigations/SubNavigation";
import { topNavigationHeight } from "../../../components/Navigations/TopNavigation";
import CategoryList from "./CategoryList";
import NewCategoryEntry from "./NewCategoryEntry";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // display: "flex",
      margin: theme.spacing(0, 0, 0, `${drawerWidth}px`),
    },

    paper: {
      display: "block",
      width: `calc(100%-${drawerWidth}px)`,
      height: `calc(100vh - ${topNavigationHeight}px)`,
      flexShrink: 0,

      "& > *": {
        display: "block",
        padding: theme.spacing(0, 0, 3, 0),
        flexShrink: 0,
      },
    },
  })
);

export default function CategoryContents() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <div className={classes.paper}>
          <Paper elevation={3}>
            <NewCategoryEntry />

            <CategoryList />
          </Paper>
        </div>
      </div>
    </>
  );
}
