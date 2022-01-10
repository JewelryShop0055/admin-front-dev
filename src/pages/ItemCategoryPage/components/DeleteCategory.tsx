import { Button, TextField } from "@material-ui/core";

import { useState } from "react";
import { useAppSelector } from "../../../modules/hooks";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import { Category } from "../../../types";
import { ItemCategoryPageMode } from "..";
import { CategoryDetailStyles } from "./CategoryDetail";
import { actions as deleteCategoryActions } from "../../../store/category/deleteCategory/slice";

interface SelectedCategoryProps {
  selectedCategory: Category;
  setMode: React.Dispatch<React.SetStateAction<ItemCategoryPageMode>>;
}

export default function DeleteCategory({
  selectedCategory,
  setMode,
}: SelectedCategoryProps) {
  const classes = CategoryDetailStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const selectCraftshopValue = useAppSelector((state) => state.selectCraftshop);

  const [inputValue, setInputValue] = useState("");
  const handleChangeInputValue: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    setInputValue(e.target.value);
  };

  function submitValue() {
    if (inputValue !== selectedCategory.name) {
      alert("삭제하실 카테고리명과 일치하지 않습니다");
      return;
    }

    dispatch(
      deleteCategoryActions.deleteCategoryPending({
        categoryId: selectedCategory.id,
        categoryName: inputValue,
      })
    );

    setInputValue("");
  }

  return (
    <>
      <div className={classes.innerHeader}>
        삭제하실 공방의 이름을 입력해주세요.
      </div>

      <div className={classes.innerElement}>
        {"카테고리 명: " + selectedCategory.name}
      </div>

      <div className={classes.innerElement}>
        {"소속 제품 수: " + selectedCategory.itemCount}
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
          submitValue();
        }}
      >
        삭제하기
      </Button>
    </>
  );
}
