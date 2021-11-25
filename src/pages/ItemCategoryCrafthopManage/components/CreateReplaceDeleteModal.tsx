import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const CreateReplaceDeleteModal: React.FC<{ open: boolean }> = ({ open }) => {
  const [openState, setOpen] = useState(open);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log("추가하기 모달창 랜더");

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Forgot ID/PASSWORD?
      </Button>
      <Dialog
        open={openState}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Password Reset</DialogTitle>
        <DialogContent>
          <DialogContentText>
            인증을 통해 가입시 등록된 이메일 주소로 임시 비밀번호를 발급합니다.
            <br />
            재발급시 기존 비밀번호는 발급된 임시 비밀번호로 변경됩니다. <br />
            임시 비밀번호로 로그인 이후 비밀번호를 바꿔주세요.
          </DialogContentText>
          <TextField
            margin="dense"
            id="email"
            label="사용자 이메일 주소"
            type="email"
            fullWidth={true}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Reset
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateReplaceDeleteModal;
