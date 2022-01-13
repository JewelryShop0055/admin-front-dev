import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import { Button, TextField } from "@material-ui/core";

import { useEffect, useState } from "react";
import { FindAddressCode } from "./FindAddressCode";
import { useAppSelector } from "../../../modules/hooks";
import { useDispatch } from "react-redux";
import { actions as addNewCraftshopActions } from "../../../store/craftshop/addNewCraftshop/slice";
import { useHistory } from "react-router";
import { actions as findAddressActions } from "../../../store/findAddress/slice";
import { actions as updateCraftshopActions } from "../../../store/craftshop/updateCraftshop/slice";
import { Border, FontColor, FontSize, Padding } from "../../../styleTypes";
import { CraftShopDetailStyles } from "./CraftshopDetail";
import { CraftshopPageMode } from "..";

interface AddNewCraftshopProps {
  setMode: React.Dispatch<React.SetStateAction<CraftshopPageMode>>;
}

export default function AddNewCraftshop({ setMode }: AddNewCraftshopProps) {
  const classes = CraftShopDetailStyles();
  const dispatch = useDispatch();
  const [craftshopValue, setCraftshopValue] = useState({
    craftshopName: "",
    craftshopDetailAddress: "",
    craftshopPhoneNumber: "",
  });

  const { craftshopName, craftshopDetailAddress, craftshopPhoneNumber } =
    craftshopValue;
  const { baseAddress, addtionalAddress, zoneCode } = useAppSelector(
    (state) => state.findAddress
  );

  //공방수정시 적용되는 내용
  const selectedCraftshopValue = useAppSelector(
    (state) => state.selectCraftshop
  );
  const isReplace: boolean =
    globalThis.location.pathname ===
    "/pages/ItemCategoryCrafthopManage/Craftshop/replace"
      ? true
      : false;

  const handleCraftshopValue: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const { name, value } = e.target;
    setCraftshopValue({
      ...craftshopValue,
      [name]: value,
    });
  };

  const submitValue = () => {
    if (craftshopName === "" || craftshopPhoneNumber === "") {
      alert("공방 이름과 연락처는 필수로 입력해야합니다!");
      return;
    }

    //수정과정
    if (isReplace) {
      dispatch(
        updateCraftshopActions.updateCraftshopPending({
          id: selectedCraftshopValue.id,
          name: craftshopName,
          postCode: zoneCode,
          address: baseAddress + addtionalAddress,
          detailAddress: craftshopDetailAddress,
          phone: craftshopPhoneNumber,
        })
      );
    }

    //신규등록과정
    if (!isReplace) {
      dispatch(
        addNewCraftshopActions.addNewCraftshopPending({
          address: baseAddress + addtionalAddress,
          detailAddress: craftshopDetailAddress,
          name: craftshopName,
          phone: craftshopPhoneNumber,
          postCode: zoneCode,
        })
      );
    }

    dispatch(findAddressActions.getAddressValueReset());
    setCraftshopValue({
      craftshopName: "",
      craftshopDetailAddress: "",
      craftshopPhoneNumber: "",
    });
    return;
  };

  useEffect(() => {
    if (isReplace) {
      setCraftshopValue({
        craftshopName: selectedCraftshopValue.name,
        craftshopPhoneNumber: selectedCraftshopValue.phone,
        craftshopDetailAddress: selectedCraftshopValue.detailAddress,
      });
      const initialCraftshopAddressValue = {
        baseAddress: selectedCraftshopValue.address,
        addtionalAddress: "",
        zoneCode: selectedCraftshopValue.postCode,
      };
      dispatch(
        findAddressActions.getAddressValuePending(initialCraftshopAddressValue)
      );
    }

    return () => {
      dispatch(findAddressActions.getAddressValueReset());
    };
  }, []);

  return (
    <>
      <div className={classes.innerHeader}>공방 명</div>
      <TextField
        className={classes.innerElement}
        label="공방 이름"
        variant="outlined"
        name="craftshopName"
        size="small"
        onChange={handleCraftshopValue}
        value={craftshopName}
      />
      <div className={classes.innerHeader}>연락처</div>
      <TextField
        className={classes.innerElement}
        label="공방 연락처"
        variant="outlined"
        name="craftshopPhoneNumber"
        size="small"
        onChange={handleCraftshopValue}
        value={craftshopPhoneNumber}
      />
      <div className={classes.innerHeader}>우편번호</div>
      <TextField
        className={classes.innerElement}
        label="우편번호"
        variant="outlined"
        name="craftshopPostCode"
        size="small"
        disabled
        onChange={handleCraftshopValue}
        value={zoneCode}
      />

      <div className={classes.innerElement}>
        <FindAddressCode />
      </div>

      <div className={classes.innerHeader}>주소</div>
      <TextField
        className={classes.innerElement}
        label="주소"
        variant="outlined"
        name="craftshopAddress"
        size="small"
        disabled
        onChange={handleCraftshopValue}
        value={baseAddress}
      />
      <div className={classes.innerHeader}>상세주소</div>
      <TextField
        className={classes.innerElement}
        label="상세주소"
        variant="outlined"
        name="craftshopDetailAddress"
        size="small"
        onChange={handleCraftshopValue}
        value={craftshopDetailAddress}
      />
      <TextField
        className={classes.innerElement}
        label="참고항목"
        variant="outlined"
        name="craftshopAddressRef"
        size="small"
        disabled
        onChange={handleCraftshopValue}
        value={addtionalAddress}
      />

      <Button
        // className={classes.submitBtn}
        variant="outlined"
        color="primary"
        onClick={() => {
          submitValue();
          setMode(CraftshopPageMode.DEFAULT);
        }}
      >
        등록하기
      </Button>
    </>
  );
}
