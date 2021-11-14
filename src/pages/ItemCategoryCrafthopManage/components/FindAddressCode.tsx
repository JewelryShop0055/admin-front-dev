import React from "react";
import DaumPostcode, { Address } from "react-daum-postcode";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

import {
  setAddtionalAddress,
  setBaseAddress,
  setZoneCode,
} from "../../../util/CraftshopAddressSlice";
import { useAppDispatch } from "../../../modules/hooks";

export function FindAddressCode() {
  const [open, setOpen] = React.useState(false);

  const dispatch = useAppDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleComplete = (data: Address) => {
    dispatch(setBaseAddress(data.address));
    dispatch(setAddtionalAddress(`(${data.bname} ${data.buildingName})`));
    dispatch(setZoneCode(data.zonecode));

    setOpen(false);
  };

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        size="large"
        onClick={handleClickOpen}
      >
        우편번호 찾기
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        {/* 나중에 검색페이지 크기 최적화추가하기 DaumPostcode width props... */}
        <DaumPostcode onComplete={handleComplete} />
      </Dialog>
    </>
  );
}
