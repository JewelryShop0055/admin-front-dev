import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, TextField } from "@material-ui/core";

import { ItemCategoryPageMode } from "..";
import { CategoryDetailStyles } from "./CategoryDetail";
import { actions as addNewCategoryActions } from "../../../store/category/addNewCategory/slice";
import { useAppSelector } from "../../../modules/hooks";

interface AddNewCategoryProps {
  setMode: React.Dispatch<React.SetStateAction<ItemCategoryPageMode>>;
}

export default function AddNewCategory({ setMode }: AddNewCategoryProps) {
  const classes = CategoryDetailStyles();
  const dispatch = useDispatch();
  const [categoryValue, setCategoryValue] = useState({
    name: "",
  });

  const handleCategoryValue: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const { name, value } = e.target;
    setCategoryValue({
      ...categoryValue,
      [name]: value,
    });
  };

  function submitValue() {
    dispatch(
      addNewCategoryActions.addNewCategoryPending({
        categoryName: categoryValue.name,
      })
    );
  }

  const state = useAppSelector((state) => state);

  useEffect(() => {
    console.log(state);
  }, [state, submitValue]);

  return (
    <>
      <div className={classes.innerHeader}>카테고리 명</div>
      <TextField
        className={classes.innerElement}
        label="카테고리 명"
        variant="outlined"
        name="name"
        size="small"
        onChange={handleCategoryValue}
        value={categoryValue.name}
      />

      <Button
        variant="outlined"
        color="primary"
        onClick={() => {
          submitValue();
          setMode(ItemCategoryPageMode.DEFAULT);
        }}
      >
        등록하기
      </Button>
    </>
  );
}
