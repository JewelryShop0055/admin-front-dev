import { makeStyles, Paper, createStyles } from "@material-ui/core";
import { useState } from "react";
import { Craftshop } from "../../types";
import ItemBasicForm from "./components/ItemBasicForm";
import ItemClassifyBar from "./components/ItemClassifyBar";
import ItemImageForm from "./components/ItemImageForm";
import ItemMemo from "./components/ItemMemo";
import ItemPrice from "./components/ItemPrice";
import ItemSubmitBar from "./components/ItemSubmitBar";
import ItemUseStones from "./components/ItemUseStones";

const CraftShopPageStyles = makeStyles(
  createStyles({
    root: {
      padding: "20px",

      display: "grid",
      gridTemplateRows: "1fr 4fr 4fr auto",
      gridTemplateColumns: "3.5fr 3fr 2fr",
      gridGap: "20px",
      gridTemplateAreas: `
      "submitBar submitBar submitBar"
      "image basicForm classify"
      "useStones price classify"
      "memo memo memo "`,
    },
    itemSubmitBar: {
      gridArea: "submitBar",
      width: "100%",
      minWidth: "1000px",
      height: "60px",
    },
    itemClassify: {
      gridArea: "classify",
      background: "#CACACA",
    },
    itemImage: {
      gridArea: "image",
    },
    itemBasicForm: {
      gridArea: "basicForm",
    },
    itemUseStones: {
      gridArea: "useStones",
    },
    itemPrice: {
      gridArea: "price",
    },
    itemMemo: {
      gridArea: "memo",
    },
  })
);

export enum CraftshopPageMode {
  DEFAULT = "default",
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
}

export const ItemPage: React.FC = () => {
  const classes = CraftShopPageStyles();
  const [mode, setMode] = useState(CraftshopPageMode.DEFAULT);

  const [selectedCraftshop, setSelectedCraftshop] =
    useState<Craftshop | undefined>(undefined);

  return (
    <div className={classes.root}>
      <Paper className={classes.itemSubmitBar}>
        <ItemSubmitBar />
      </Paper>
      <Paper className={classes.itemClassify}>
        <ItemClassifyBar />
      </Paper>
      <Paper className={classes.itemImage}>
        <ItemImageForm />
      </Paper>
      <Paper className={classes.itemBasicForm}>
        <ItemBasicForm />
      </Paper>
      <Paper className={classes.itemUseStones}>
        <ItemUseStones />
      </Paper>
      <Paper className={classes.itemPrice}>
        <ItemPrice />
      </Paper>
      <Paper className={classes.itemMemo}>
        <ItemMemo />
      </Paper>
    </div>
  );
};
