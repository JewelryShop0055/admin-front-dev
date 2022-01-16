import { createStyles, makeStyles, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { FontSize } from "../../../styleTypes";
import shortid from "shortid";

const ItemUseStonesStyles = makeStyles(
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

    stoneListContainer: {
      "& > input > *": {
        marginRight: "10px",
      },
    },
    inputStoneName: {
      width: "80px",
    },
    inputStoneCount: {
      width: "80px",
    },
    inputStoneMemo: {
      width: "200px",
    },
  })
);

interface StoneInfo {
  id: string;
  name: string;
  unit: string;
  count: number;
  memo: string;
}

export function ItemUseStones() {
  const classes = ItemUseStonesStyles();
  const [stoneList, setStoneList] = useState<Array<StoneInfo>>([
    { id: shortid.generate(), name: "", unit: "", count: 0, memo: "" },
  ]);

  const handleListElement = (isLast: boolean, stoneId: string) => {
    if (!isLast) {
      const newStoneList = stoneList.filter((stone) => stone.id !== stoneId);
      setStoneList(newStoneList);
      return;
    }
    setStoneList([
      ...stoneList,
      { id: shortid.generate(), name: "", unit: "", count: 0, memo: "" },
    ]);
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>제품 사용원석</div>

      <div className={classes.stoneListContainer}>
        <div>사용원석</div>
        {stoneList.map((stone, idx) => {
          const isLast = idx + 1 === stoneList.length;
          return (
            <div key={stone.id}>
              <TextField
                className={classes.inputStoneName}
                label="원석"
                variant="filled"
                size="small"
              />
              <TextField
                className={classes.inputStoneCount}
                label="수량"
                variant="filled"
                size="small"
              />
              <TextField
                className={classes.inputStoneMemo}
                label="추가내용"
                variant="filled"
                size="small"
              />
              {isLast ? (
                <button onClick={() => handleListElement(isLast, stone.id)}>
                  추가버튼
                </button>
              ) : (
                <button onClick={() => handleListElement(isLast, stone.id)}>
                  삭제버튼
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ItemUseStones;
