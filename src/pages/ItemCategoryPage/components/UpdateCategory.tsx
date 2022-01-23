import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import { Button, TextField } from "@material-ui/core";

import { useEffect, useState } from "react";

import { useAppSelector } from "../../../modules/hooks";
import { useDispatch } from "react-redux";
import { actions as addNewCraftshopActions } from "../../../store/craftshop/addNewCraftshop/slice";
import { useHistory } from "react-router";
import { actions as findAddressActions } from "../../../store/findAddress/slice";
import { actions as updateCraftshopActions } from "../../../store/craftshop/updateCraftshop/slice";
import { Border, FontColor, FontSize, Padding } from "../../../styleTypes";
import { Category, Craftshop } from "../../../types";

import { ItemCategoryPageMode } from "..";
import { CategoryDetailStyles } from "./CategoryDetail";
import { actions as updateCategoryActions } from "../../../store/category/replaceCurrentCategory/slice";

interface SelectedCategoryProps {
  selectedCategory: Category;
  setSelectedCategory: React.Dispatch<
    React.SetStateAction<Category | undefined>
  >;
  setMode: React.Dispatch<React.SetStateAction<ItemCategoryPageMode>>;
}

export default function UpdateCategory({
  selectedCategory,
  setSelectedCategory,
  setMode,
}: SelectedCategoryProps) {
  const classes = CategoryDetailStyles();
  const dispatch = useDispatch();
  const newCategoryName = useAppSelector((state) => {
    console.log(state);
    return state.replaceCurrentCategory.newCategoryName;
  });

  const initialValue = Object.assign({}, selectedCategory);

  const [updateValue, setUpdateValue] = useState({
    categoryName: initialValue.name,
  });

  const { categoryName } = updateValue;

  const handleCategoryValue: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const { name, value } = e.target;
    setUpdateValue({
      ...updateValue,
      [name]: value,
    });
  };

  const submitValue = () => {
    if (initialValue.name === updateValue.categoryName) {
      alert("기존의 이름과 같습니다!");
      return;
    }
    if (updateValue.categoryName === "") {
      alert("카테고리명을 입력해주세요");
      return;
    }

    //수정과정

    dispatch(
      updateCategoryActions.replaceCurrentCategoryPending({
        targetId: initialValue.id,
        currentCategoryName: initialValue.name,
        newCategoryName: categoryName,
      })
    );

    setUpdateValue({
      categoryName: "",
    });

    setMode(ItemCategoryPageMode.DEFAULT);
    setSelectedCategory({
      ...selectedCategory,
      name: newCategoryName,
    });
  };

  return (
    <>
      <div className={classes.innerHeader}>현재 카테고리 명</div>
      <div className={classes.innerElement}>{initialValue.name}</div>
      <div className={classes.innerHeader}>현재 카테고리 등록 제품 수</div>
      <div className={classes.innerElement}>{initialValue.itemCount}</div>

      <div className={classes.innerHeader}>새 카테고리 명</div>
      <TextField
        className={classes.innerElement}
        label="새 카테고리 명"
        variant="outlined"
        name="categoryName"
        size="small"
        onChange={handleCategoryValue}
        value={categoryName}
      />

      <Button
        variant="outlined"
        color="primary"
        onClick={() => {
          submitValue();
        }}
      >
        수정하기
      </Button>
    </>
  );
}
