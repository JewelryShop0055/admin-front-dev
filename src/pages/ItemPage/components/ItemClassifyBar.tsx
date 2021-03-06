import { useState } from "react";
import { createStyles, makeStyles } from "@material-ui/core";
import { FontSize } from "../../../styleTypes";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import SelectableSearchBar from "../../../components/SelectableSearchBar";

const ItemClassifyBarStyles = makeStyles(
  createStyles({
    root: {
      display: "flex",
      padding: "20px",

      flexDirection: "column",

      "& > div:nth-child(n+1)": {
        marginBottom: "20px",
      },
    },
    header: {
      fontSize: FontSize.LARGE,
      fontWeight: "bold",
    },
    category: {
      fontSize: FontSize.MEDIUM_LARGE,

      display: "flex",
      flexDirection: "column",
    },
    craftshop: {
      fontSize: FontSize.MEDIUM_LARGE,

      display: "flex",
      flexDirection: "column",
    },

    formControl: {
      minWidth: 120,
      background: "#EEEEEE",
    },
  })
);

export function ItemClassifyBar() {
  const classes = ItemClassifyBarStyles();

  const [categoryValue, setCategoryValue] = useState<string>("");
  const [craftShopValue, setCraftShopValue] = useState<string>("");

  return (
    <div className={classes.root}>
      <div className={classes.header}>분류</div>
      <div className={classes.category}>
        카테고리
        <SelectableSearchBar
          placeholderText="지정할 카테고리를 입력"
          dispatchValue={setCategoryValue}
        />
      </div>
      <div className={classes.craftshop}>
        제조공방
        <SelectableSearchBar
          placeholderText="지정할 카테고리를 입력"
          dispatchValue={setCraftShopValue}
        />
      </div>
      <button
        onClick={() => {
          console.log(categoryValue, craftShopValue);
        }}
      >
        선택값 체크
      </button>
    </div>
  );
}

export default ItemClassifyBar;
