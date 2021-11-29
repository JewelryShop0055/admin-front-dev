import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button } from "@material-ui/core";
import { actions as toggleModalAction } from "../../../store/categoryModal/slice";
import { useDispatch } from "react-redux";
import { useState } from "react";

interface CategoryModalProps {
  openModal: boolean;
}

const CategoryModal: React.FC<CategoryModalProps> = ({ openModal }) => {
  const dispatch = useDispatch();
  // const [open, setOpen] = useState(openModal);
  return (
    <>
      <Dialog
        open={openModal}
        onClose={() => {
          dispatch(toggleModalAction.closeModal());
          // setOpen(false);
        }}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          카테고리 추가하기(수정,삭제분리필요)
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            추가할 카테고리이름을 입력하세요
            <br />
            {/* {"가져온값:" + id + name + itemCount} */}
          </DialogContentText>
          <TextField
            margin="dense"
            // id="newCategoryName"
            label="새 카테고리 이름"
            type="text"
            fullWidth={true}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => dispatch(toggleModalAction.closeModal())}
            color="primary"
          >
            Reset
          </Button>
          <Button
            onClick={() => dispatch(toggleModalAction.closeModal())}
            color="primary"
          >
            Cancel
          </Button>
          <Button onClick={() => console.log(openModal)} color="primary">
            모달상태
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CategoryModal;
