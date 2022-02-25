import { createStyles, makeStyles, TextField } from "@material-ui/core";
import { FontSize } from "../../../styleTypes";

const ItemMemoStyles = makeStyles(
  createStyles({
    root: {
      padding: "20px",

      "& > div:nth-child(n+1)": {
        marginBottom: "20px",
      },
    },
    header: {
      fontSize: FontSize.LARGE,
      fontWeight: "bold",
    },

    inputImage: {
      display: "none",
    },
  })
);

export function ItemMemo() {
  const classes = ItemMemoStyles();

  return (
    <div className={classes.root}>
      <div className={classes.header}>제품 상세 메모</div>
      <TextField
        id="outlined-multiline-static"
        label="Memo"
        multiline
        rows={4}
        variant="outlined"
      />
    </div>
  );
}

export default ItemMemo;
