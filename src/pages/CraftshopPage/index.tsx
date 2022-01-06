import { makeStyles, Paper, createStyles } from "@material-ui/core";
import { useState } from "react";
import { Craftshop } from "../../types";
import CraftshopContents from "./components/CraftshopContents";
import CraftshopDetail from "./components/CraftshopDetail";

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

export const CraftshopPage: React.FC = () => {
  const classes = CraftShopPageStyles();

  const [selectedCraftshop, setSelectedCraftshop] =
    useState<Craftshop | undefined>(undefined);

  return (
    <div className={classes.root}>
      <Paper className={classes.craftshopDetail}>
        <CraftshopDetail selectedCraftshop={selectedCraftshop} />
      </Paper>
      <Paper className={classes.craftshopSearch}>공방검색</Paper>
      <Paper className={classes.craftshopPagination}>
        <CraftshopContents setSelectedCraftshop={setSelectedCraftshop} />
      </Paper>
    </div>
  );
};
