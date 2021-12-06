import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useAppSelector } from "../../../modules/hooks";
import { actions as modalAction } from "../../../store/craftshop/craftshopModal/slice";

interface CraftshopModalProps {
  openModal: boolean;
}

interface ModalContents {
  title: string;
  content: string;
  buttons: JSX.Element;
}

const CraftshopModal: React.FC<CraftshopModalProps> = ({ openModal }) => {
  const dispatch = useDispatch();

  const modalRenderValues: ModalContents = {
    title: "",
    content: "",
    buttons: <div />,
  };

  const [inputValue, setInputValue] = useState("");
  const handleChangeInputValue: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <Dialog
        open={openModal}
        onClose={() => {
          dispatch(modalAction.closeModal());
          setInputValue("");
        }}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {/* {modalRenderValues.title} */}
          빌드중
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {/* {modalRenderValues.content.split("\n").map((line) => (
              <span>
                {line}
                <br />
              </span>
            ))} */}
            내용미작성
          </DialogContentText>
          <TextField
            margin="dense"
            label={"대충입력하는곳"}
            type="text"
            value={inputValue}
            onChange={handleChangeInputValue}
            fullWidth={true}
          />
        </DialogContent>
        <DialogActions>{/* {modalRenderValues.buttons} */}</DialogActions>
      </Dialog>
    </>
  );
};

export default CraftshopModal;
