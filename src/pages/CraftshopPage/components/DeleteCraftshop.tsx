import { Button, TextField } from "@material-ui/core";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../../../store/craftshop/deleteCraftshop/slice";
import { CraftShopDetailStyles } from "./CraftshopDetail";
import { Craftshop } from "../../../types";
import { CraftshopPageMode } from "..";

interface SelectedCraftshopProps {
  selectedCraftshop: Craftshop;
  setMode: React.Dispatch<React.SetStateAction<CraftshopPageMode>>;
}

export default function DeleteCraftshop({
  selectedCraftshop,
  setMode,
}: SelectedCraftshopProps) {
  const classes = CraftShopDetailStyles();
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState("");
  const handleChangeInputValue: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <div className={classes.innerHeader}>
        삭제하실 공방의 이름을 입력해주세요.
      </div>

      <div className={classes.innerElement}>
        {"공방명: " + selectedCraftshop.name}
      </div>
      <div className={classes.innerElement}>
        {"주소: " + selectedCraftshop.address}
      </div>

      <div className={classes.innerElement}>
        {"전화번호: " + selectedCraftshop.phone}
      </div>

      <form noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          label="공방 이름"
          variant="outlined"
          name="craftshopName"
          size="medium"
          onChange={handleChangeInputValue}
          value={inputValue}
        />
      </form>

      <Button
        variant="outlined"
        color="primary"
        onClick={() => {
          dispatch(
            actions.deleteCraftshopPending({
              id: selectedCraftshop.id,
              name: inputValue,
            })
          );
          setMode(CraftshopPageMode.DEFAULT);
        }}
      >
        삭제하기
      </Button>
    </>
  );
}
