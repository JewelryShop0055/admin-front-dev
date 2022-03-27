import { createStyles, makeStyles } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useState } from "react";
import { FontSize } from "../../../styleTypes";

const SearchCraftshopStyles = makeStyles(
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
export default function SearchCraftshop() {
  const classes = SearchCraftshopStyles();
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
        placeholder="공방 이름, 전화번호 검색"
        value={inputValue}
        onChange={inputValueHandler}
      />
    </div>
  );
}
