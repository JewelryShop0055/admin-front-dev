import { createStyles, makeStyles } from "@material-ui/core";
import { FontSize } from "../../../styleTypes";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const ItemSubmitBarStyles = makeStyles(
  createStyles({
    root: {
      display: "flex",
      padding: "10px",

      justifyContent: "flex-start",
      alignItems: "center",

      "& > button": {
        marginLeft: "10px",
        width: "130px",
      },
    },
    header: {
      fontSize: FontSize.LARGE,
      fontWeight: "bold",
      paddingLeft: "10px",
      flex: "1",

      display: "flex",
    },
  })
);
export function ItemSubmitBar() {
  const classes = ItemSubmitBarStyles();

  return (
    <div className={classes.root}>
      <div className={classes.header}>제품등록</div>
      <Button
        variant="outlined"
        color="primary"
        size="large"
        onClick={() => {}}
      >
        취소
      </Button>
      <Button
        variant="outlined"
        color="primary"
        size="large"
        startIcon={<AddIcon />}
        onClick={() => {}}
      >
        추가하기
      </Button>
    </div>
  );
}

export default ItemSubmitBar;
