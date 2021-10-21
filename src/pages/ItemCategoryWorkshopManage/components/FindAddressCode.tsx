import React from "react";
import DaumPostcode from "react-daum-postcode";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

interface AddressProps {
  address: string;
}

export function Postcode() {
  //   const handleComplete = (data) => {
  //     let fullAddress = data.address;
  //     let extraAddress = "";

  //     if (data.addressType === "R") {
  //       if (data.bname !== "") {
  //         extraAddress += data.bname;
  //       }
  //       if (data.buildingName !== "") {
  //         extraAddress +=
  //           extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
  //       }
  //       fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
  //     }

  //     console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
  //   };

  return (
    <DaumPostcode
    //   onComplete={handleComplete}
    //   { ...props }
    />
  );
}

export function FindAddressCode() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
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
        <DaumPostcode />
      </Dialog>
    </>
  );
}
