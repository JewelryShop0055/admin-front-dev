import React from "react";
import DaumPostcode from "react-daum-postcode";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

import {
  setAddtionalAddress,
  setBaseAddress,
  setZoneCode,
} from "../../../util/CraftshopAddressSlice";
import { useAppDispatch } from "../../../modules/hooks";

interface Address {
  zonecode: string;
  address: string;
  addressEnglish: string;
  addressType: "R" | "J";
  userSelectedType: "R" | "J";
  noSelected: "Y" | "N";
  userLanguageType: "K" | "E";
  roadAddress: string;
  roadAddressEnglish: string;
  jibunAddress: string;
  jibunAddressEnglish: string;
  autoRoadAddress: string;
  autoRoadAddressEnglish: string;
  autoJibunAddress: string;
  autoJibunAddressEnglish: string;
  buildingCode: string;
  buildingName: string;
  apartment: "Y" | "N";
  sido: string;
  sidoEnglish: string;
  sigungu: string;
  sigunguEnglish: string;
  sigunguCode: string;
  roadnameCode: string;
  bcode: string;
  roadname: string;
  roadnameEnglish: string;
  bname: string;
  bnameEnglish: string;
  bname1: string;
  bname1English: string;
  bname2: string;
  bname2English: string;
  hname: string;
  query: string;
}

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
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

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
        <DaumPostcode onComplete={handleComplete} />
      </Dialog>
    </>
  );
}
