import { makeStyles, Paper, createStyles } from "@material-ui/core";

const DashBoardPageStyles = makeStyles(
  createStyles({
    root: {
      padding: "20px",

      display: "grid",
      gridTemplateRows: "repeat(8, 1fr)",
      gridTemplateColumns: "repeat(8, 1fr)",
      gridGap: "20px",
      gridTemplateAreas: `
      "detail search . . . . . ."
      "detail search . . . . . ."
      "detail search . . . . . ."
      "detail search . . . . . ."
      "detail search . . . . . ."
      "detail search . . . . . ."
      "detail search . . . . . ."
      "detail pagination . . . . . ."`,
      //   grid보다는 flex를 이용해서 정렬을 해보는게 좋을듯
    },
    craftshopDetail: {
      gridArea: "detail",
      minWidth: "300px",
      height: "100%",
      background: "green",
    },
    craftshopSearch: {
      gridArea: "search",
      background: "purple",
    },
    craftshopPagination: {
      gridArea: "pagination",
      background: "blue",
    },
  })
);

export enum CraftshopPageMode {
  DEFAULT = "default",
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
}

export const DashBoardPage: React.FC = () => {
  const classes = DashBoardPageStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.craftshopDetail}>
        <div>구역1</div>
      </Paper>
      <Paper className={classes.craftshopSearch}>
        <div>구역2</div>
      </Paper>
      <Paper className={classes.craftshopPagination}>
        <div>구역3</div>
      </Paper>
    </div>
  );
};
