import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(5),
        width: theme.spacing(80),
        height: theme.spacing(150),
      },
    },
  })
);

export default function TodaysCheckListMainPageContents() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={3}>발주대기리스트 대쉬보드</Paper>
      <Paper elevation={3}>금일출고물품 대쉬보드</Paper>
      <Paper elevation={3}>미수령제품 대쉬보드</Paper>
    </div>
  );
}
