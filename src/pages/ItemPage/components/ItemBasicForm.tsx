import {
  Checkbox,
  createStyles,
  FormControlLabel,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { useState } from "react";
import { FontSize } from "../../../styleTypes";

const ItemBasicFormStyles = makeStyles(
  createStyles({
    root: {
      padding: "20px",

      "& > div:nth-child(n+1)": {
        marginBottom: "20px",
      },
    },
    header: {
      fontSize: FontSize.LARGE,
      fontWeight: "bold",
    },

    itemNameForm: {
      fontSize: FontSize.MEDIUM_LARGE,

      display: "flex",
      flexDirection: "column",
      width: "200px",
    },

    itemCodeForm: {
      fontSize: FontSize.MEDIUM_LARGE,

      display: "flex",
      flexDirection: "column",

      "& > form:nth-child(1)": {
        display: "flex",

        "& > div:nth-child(1)": {
          width: "200px",
          marginRight: "20px",
        },
      },
    },
    itemCodeCheckBox: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      fontSize: FontSize.MEDIUM,
    },
  })
);

export function ItemBasicForm() {
  const classes = ItemBasicFormStyles();

  const [checked, setChecked] = useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>제품 기본정보</div>
      <div className={classes.itemNameForm}>
        상품명
        <form autoComplete="on">
          <TextField
            fullWidth
            id="standard-basic"
            label="상품명을 입력하세요"
          />
        </form>
      </div>
      <div className={classes.itemCodeForm}>
        상품명
        <form autoComplete="on">
          <TextField
            fullWidth
            id="standard-basic"
            label="상품코드를 입력하세요"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={handleChange}
                name="checkedB"
                color="primary"
              />
            }
            label="커스텀 제품"
          />
        </form>
      </div>
    </div>
  );
}

export default ItemBasicForm;
