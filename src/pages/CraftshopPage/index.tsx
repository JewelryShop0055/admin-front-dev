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
      gridTemplateAreas: `
      "detail search"
      "detail pagination"`,
    },
    craftshopDetail: {
      gridArea: "detail",
      marginRight: "20px",
      height: "100%",
    },
    craftshopSearch: {
      gridArea: "search",
      marginBottom: "20px",
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
        <CraftshopDetail craftshopValue={selectedCraftshop} />
      </Paper>
      <Paper className={classes.craftshopSearch}>공방검색</Paper>
      <Paper className={classes.craftshopPagination}>
        <CraftshopContents setSelectedCraftshop={setSelectedCraftshop} />
      </Paper>
    </div>
  );
};
