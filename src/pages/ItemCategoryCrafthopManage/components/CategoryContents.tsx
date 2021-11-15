import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { drawerWidth } from "../../../components/Navigations/SubNavigation";
import CategoryList from "./CategoryList";
import NewCategoryEntry from "./NewCategoryEntry";
import { PaperElevation } from "../../../styleTypes";
import Pagonation from "./Pagination";
import { useAppSelector } from "../../../modules/hooks";

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

export default function CategoryContents() {
  const classes = useStyles();
  const CategoryList = useAppSelector(
    (state) => state.categoryList.categoryList
  );

  return (
    <>
      <div className={classes.root}>
        <div className={classes.paper}>
          <Paper elevation={PaperElevation.BOTTOM}>
            <NewCategoryEntry />

            <Pagonation CategoryList={CategoryList} />
          </Paper>
        </div>
      </div>
    </>
  );
}
