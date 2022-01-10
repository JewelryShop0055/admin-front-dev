import { createStyles, makeStyles } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useState } from "react";
import { BackgroundColor, FontSize } from "../../../styleTypes";

const SearchCategoryStyles = makeStyles(
  createStyles({
    root: {
      height: "100%",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    icon: {
      marginLeft: "20px",
      fontSize: "40px",
    },
    input: {
      border: "none",
      marginLeft: "20px",
      width: "100%",
      fontSize: FontSize.MEDIUM_LARGE,
      "&:focus": {
        outline: "none",
      },
    },
  })
);
export default function SearchCategory() {
  const classes = SearchCategoryStyles();
  const [inputValue, setInputValue] = useState("");

  const inputValueHandler: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className={classes.root}>
      <SearchIcon className={classes.icon} />
      <input
        className={classes.input}
        type="text"
        placeholder="카테고리 이름 검색"
        value={inputValue}
        onChange={inputValueHandler}
      />
    </div>
  );
}
