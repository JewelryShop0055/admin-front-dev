import { makeStyles, Paper, createStyles } from "@material-ui/core";
import { useState } from "react";
import { Craftshop } from "../../types";
import CraftshopContents from "./components/CraftshopContents";
import CraftshopDetail from "./components/CraftshopDetail";
import SearchCraftshop from "./components/SearchCraftshop";

const CraftShopPageStyles = makeStyles(
  createStyles({
    root: {
      padding: "20px",

      display: "grid",
      gridTemplateRows: "1fr 11fr",
      gridTemplateColumns: "1fr 2fr",
      gridGap: "20px",
      gridTemplateAreas: `
      "detail search"
      "detail pagination"`,
    },
    craftshopDetail: {
      gridArea: "detail",
      minWidth: "300px",
      height: "100%",
    },
    craftshopSearch: {
      gridArea: "search",
    },
    craftshopPagination: {
      gridArea: "pagination",
    },
  })
);

export enum CraftshopPageMode {
  DEFAULT = "default",
  CREATE = "create",
  UPDATE = "delete",
  DELETE = "delete",
}

export const CraftshopPage: React.FC = () => {
  const classes = CraftShopPageStyles();
  const [mode, setMode] = useState(CraftshopPageMode.DEFAULT);

  const [selectedCraftshop, setSelectedCraftshop] =
    useState<Craftshop | undefined>(undefined);

  return (
    <div className={classes.root}>
      <Paper className={classes.craftshopDetail}>
        <CraftshopDetail
          selectedCraftshop={selectedCraftshop}
          mode={mode}
          setMode={setMode}
        />
      </Paper>
      <Paper className={classes.craftshopSearch}>
        <SearchCraftshop />
      </Paper>
      <Paper className={classes.craftshopPagination}>
        <CraftshopContents
          setSelectedCraftshop={setSelectedCraftshop}
          setMode={setMode}
        />
      </Paper>
    </div>
  );
};
