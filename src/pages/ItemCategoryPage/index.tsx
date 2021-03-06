import { makeStyles, Paper, createStyles } from "@material-ui/core";
import { useState } from "react";
import { Category } from "../../types";
import CategoryContents from "./components/CategoryContents";
import CategoryDetail from "./components/CategoryDetail";
import SearchCategory from "./components/SearchCategory";

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

export enum ItemCategoryPageMode {
  DEFAULT = "default",
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
}

export const ItemCategoryPage: React.FC = () => {
  const classes = CraftShopPageStyles();
  const [mode, setMode] = useState(ItemCategoryPageMode.DEFAULT);

  const [selectedCategory, setSelectedCategory] =
    useState<Category | undefined>(undefined);

  return (
    <div className={classes.root}>
      <Paper className={classes.craftshopDetail}>
        <CategoryDetail
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          mode={mode}
          setMode={setMode}
        />
      </Paper>
      <Paper className={classes.craftshopSearch}>
        <SearchCategory />
      </Paper>
      <Paper className={classes.craftshopPagination}>
        <CategoryContents
          setSelectedCategory={setSelectedCategory}
          mode={mode}
          setMode={setMode}
        />
      </Paper>
    </div>
  );
};
