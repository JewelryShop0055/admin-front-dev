import { createStyles, makeStyles, Theme } from "@material-ui/core";
import PagonationElementForm from "./PagonationElementForm";
import { contentsArrayParams } from "../../types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
      padding: "50px 48px 0 48px",
    },
    paginationContents: {
      display: "grid",
      gridRow: "repeat(11, 1fr)",
    },
  })
);

export default function PaginationContents({
  contentsArray,
}: contentsArrayParams) {
  const classes = useStyles();

  return (
    <div className={classes.paginationContents}>
      {contentsArray.map((value) => {
        return (
          <>
            <div key={value.id}>
              <PagonationElementForm value={value} />
            </div>
          </>
        );
      })}
    </div>
  );
}
