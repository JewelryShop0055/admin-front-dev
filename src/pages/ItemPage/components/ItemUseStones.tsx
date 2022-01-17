import { createStyles, Fab, makeStyles, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { FontSize } from "../../../styleTypes";
import shortid from "shortid";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

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
      display: "grid",
      gridTemplateColumns: "100px 50px 200px 50px",
      gridGap: "10px",
      gridTemplateAreas: `"name count memo button"`,
    },
    inputStoneName: {
      gridArea: "name",
    },
    inputStoneCount: {
      gridArea: "count",
    },
    inputStoneMemo: {
      gridArea: "memo",
    },
    inputStoneButton: {
      gridArea: "button",
    },
  })
);

interface StoneInfo {
  id: string;
  stoneName: string;
  unit: string;
  count: number;
  memo: string;
}

interface InputStoneInfoProps {
  handleListElement: (isLast: boolean, stoneInfo: StoneInfo) => void;
  stoneValue: StoneInfo;
  lastId: string;
  handleChangeListElement: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    elementId: string
  ) => void;
}

function InputStoneInfo({
  handleListElement,
  stoneValue,
  lastId,
  handleChangeListElement,
}: InputStoneInfoProps) {
  const classes = ItemUseStonesStyles();
  const [isLast, setIsLast] = useState(stoneValue.id === lastId);

  // const [stoneValues]
  const handleInputStoneInfo = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value, id } = e.target;
    // const newStoneList = [...stoneList];
    // newStoneList.forEach((stone) => {
    //   console.log(stone);
    //   if (id === stone.id) {
    //       stone[name as keyof typeof StoneInfo] = value
    //   }
    // }); => 행별로 분리해서 입력 onChange해야함
    // setStoneList(newStoneList);
  };

  useEffect(() => {
    setIsLast(stoneValue.id === lastId);
  }, [handleListElement, stoneValue.id, lastId]);

  return (
    <div key={stoneValue.id} className={classes.stoneListContainer}>
      <TextField
        className={classes.inputStoneName}
        label="원석"
        variant="filled"
        size="small"
        name="stoneName"
        type="text"
        id={stoneValue.id}
        value={stoneValue.stoneName}
        onChange={(e) => handleChangeListElement(e, stoneValue.id)}
      />
      <TextField
        className={classes.inputStoneCount}
        label="수량(개)"
        variant="filled"
        size="small"
        name="count"
        type="number"
        id={stoneValue.id}
        value={stoneValue.count}
        onChange={(e) => handleChangeListElement(e, stoneValue.id)}
      />
      <TextField
        className={classes.inputStoneMemo}
        label="추가내용"
        variant="filled"
        size="small"
        name="memo"
        type="text"
        id={stoneValue.id}
        value={stoneValue.memo}
        onChange={(e) => handleChangeListElement(e, stoneValue.id)}
      />
      <Fab
        color={isLast ? "primary" : "secondary"}
        size="small"
        onClick={() => handleListElement(isLast, stoneValue)}
      >
        {isLast ? <AddIcon /> : <RemoveIcon />}
      </Fab>
    </div>
  );
}

export function ItemUseStones() {
  const classes = ItemUseStonesStyles();
  const [stoneList, setStoneList] = useState<Array<StoneInfo>>([
    { id: shortid.generate(), stoneName: "", unit: "", count: 0, memo: "" },
  ]);
  const [lastId, setLastId] = useState(stoneList[0].id);

  const handleListElement = (isLast: boolean, stoneInfo: StoneInfo) => {
    if (!isLast) {
      const newStoneList = stoneList.filter((ele) => ele.id !== stoneInfo.id);
      setStoneList(newStoneList);
      return;
    }

    const newId = shortid.generate();
    setLastId(newId);
    setStoneList([
      ...stoneList,
      { id: newId, stoneName: "", unit: "", count: 0, memo: "" },
    ]);
  };

  //랜더링 최적화를 위해 각 elementId를 담은 객체를 매핑해서 만들고, 이를 참조하여서 랜더링하면 최적화 가능
  const handleChangeListElement = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    targetElementId: string
  ) => {
    console.log("입력이벤트발생");
    const newStoneList = [...stoneList].map((currentEle) => {
      if (currentEle.id === targetElementId) {
        const newEle = {
          ...currentEle,
          [e.target.name]: e.target.value,
        };
        return newEle;
      } else {
        return currentEle;
      }
    });
    console.log(newStoneList);
    setStoneList(newStoneList);
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>제품 사용원석</div>

      {stoneList.map((ele) => {
        return (
          <InputStoneInfo
            handleListElement={handleListElement}
            handleChangeListElement={handleChangeListElement}
            stoneValue={ele}
            lastId={lastId}
          />
        );
      })}
    </div>
  );
}

export default ItemUseStones;
