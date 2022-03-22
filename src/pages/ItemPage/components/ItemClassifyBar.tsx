import { useState } from "react";
import { createStyles, makeStyles } from "@material-ui/core";
import { FontSize } from "../../../styleTypes";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import SelectableSearchBar from "../../../components/SelectableSearchBar";

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
    },
  })
);

interface SelectListProps {
  targetName: string;
  selectedValue: string;
  handleChangeSelectedValue: (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => void;
}

function SelectList({
  targetName,
  selectedValue,
  handleChangeSelectedValue,
}: SelectListProps) {
  const classes = ItemClassifyBarStyles();

  return (
    <FormControl className={classes.formControl}>
      <Select
        native
        value={selectedValue}
        onChange={handleChangeSelectedValue}
        inputProps={{
          name: targetName,
          id: "age-native-simple",
        }}
      >
        <option aria-label="공방을 선택하세요" value="">
          카테고리를 선택하세요
        </option>
        {/* 추후 option의 value는 해당 항목의 id값을 배정해야함 */}
        <option value={10}>Ten</option>
        <option value={20}>Twenty</option>
        <option value={30}>Thirty</option>
      </Select>
    </FormControl>
  );
}

export function ItemClassifyBar() {
  const classes = ItemClassifyBarStyles();

  const [selectedValue, setSelectedValue] = useState<{
    category: string;
    craftshop: string;
  }>({
    category: "카테고리를 선택하세요",
    craftshop: "",
  });

  const handleChangeSelectedValue = (
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof selectedValue;
    setSelectedValue({
      ...selectedValue,
      [name]: event.target.value,
    });
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>분류</div>
      <div className={classes.category}>
        카테고리
        <SelectList
          targetName={"category"}
          selectedValue={selectedValue.category}
          handleChangeSelectedValue={handleChangeSelectedValue}
        />
      </div>
      <div className={classes.craftshop}>
        제조공방
        <SelectList
          targetName={"craftshop"}
          selectedValue={selectedValue.craftshop}
          handleChangeSelectedValue={handleChangeSelectedValue}
        />
      </div>
      <button
        onClick={() =>
          alert(selectedValue.category + "|" + selectedValue.craftshop)
        }
      >
        임시 선택값 확인 버튼
      </button>
      <SelectableSearchBar />
    </div>
  );
}

export default ItemClassifyBar;
