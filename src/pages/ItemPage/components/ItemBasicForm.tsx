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

  const [itemBasicValue, setItemBasicValue] = useState({
    itemName: "",
    itemCode: "",
  });
  const { itemName, itemCode } = itemBasicValue;
  const [isCustom, setIsCustom] = useState(true);

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItemBasicValue({
      ...itemBasicValue,
      [name]: value,
    });
  };

  const handleCustomCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCustom(e.target.checked);
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>제품 기본정보</div>
      <div className={classes.itemNameForm}>
        상품명
        <form autoComplete="on">
          <TextField
            fullWidth
            name="itemName"
            label="상품명을 입력하세요"
            value={itemName}
            onChange={handleInputValue}
          />
        </form>
      </div>
      <div className={classes.itemCodeForm}>
        상품코드
        <form autoComplete="on">
          <TextField
            fullWidth
            name="itemCode"
            label="상품코드를 입력하세요"
            value={itemCode}
            onChange={handleInputValue}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isCustom}
                onChange={handleCustomCheck}
                name="checked"
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
