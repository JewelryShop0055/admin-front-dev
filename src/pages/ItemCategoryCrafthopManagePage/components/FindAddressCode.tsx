import React, { useEffect } from "react";
import DaumPostcode, { Address } from "react-daum-postcode";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { useDispatch } from "react-redux";
import { actions } from "../../../store/findAddress/slice";

export function FindAddressCode() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleComplete = (data: Address) => {
    if (!data) {
      alert("다음 주소 찾기 서비스장애입니다. 잠시 후 이용해주세요.");
      return;
    }
    const getValue = {
      baseAddress: data.address,
      addtionalAddress: data.bname.toString() + data.buildingName.toString(),
      zoneCode: data.zonecode,
    };
    dispatch(actions.getAddressValuePending(getValue));

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
        <DaumPostcode onComplete={handleComplete} />
      </Dialog>
    </>
  );
}
