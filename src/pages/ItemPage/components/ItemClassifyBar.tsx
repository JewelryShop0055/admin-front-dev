import { useState } from "react";
import { createStyles, makeStyles } from "@material-ui/core";
import { FontSize } from "../../../styleTypes";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

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
      // paddingLeft: "10px",
    },
  })
);

export function ItemClassifyBar() {
  const classes = ItemClassifyBarStyles();

  const [age, setAge] = useState("");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as string);
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>분류</div>
      <div className={classes.category}>
        카테고리
        <FormControl className={classes.formControl}>
          <Select
            labelId="demo-simple-select-placeholder-label-label"
            id="demo-simple-select-placeholder-label"
            value={age}
            onChange={handleChange}
            displayEmpty
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={classes.craftshop}>
        제조공방
        <FormControl className={classes.formControl}>
          <Select
            labelId="demo-simple-select-placeholder-label-label"
            id="demo-simple-select-placeholder-label"
            value={age}
            onChange={handleChange}
            displayEmpty
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default ItemClassifyBar;
