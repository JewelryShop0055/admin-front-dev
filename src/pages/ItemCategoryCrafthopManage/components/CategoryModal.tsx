import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { actions as modalAction } from "../../../store/category/categoryModal/slice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useAppSelector } from "../../../modules/hooks";
import {
  SetModalContents,
  SetCategoryModalContentsParams,
} from "./SetCategoryModalContents";

interface CategoryModalProps {
  openModal: boolean;
}

const CategoryModal: React.FC<CategoryModalProps> = ({ openModal }) => {
  const dispatch = useDispatch();
  const { modalType, id, name, itemCount } = useAppSelector(
    (state) => state.categoryModal
  );

  const [inputValue, setInputValue] = useState("");

  const modalRenderParams: SetCategoryModalContentsParams = {
    _modalType: modalType,
    _inputValue: inputValue,
    setInputValue,
    modalValue: {
      _id: id,
      _name: name,
      _itemCount: itemCount,
    },
  };

  const modalRenderValues = SetModalContents(modalRenderParams);

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
          {modalRenderValues.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {modalRenderValues.mainText.split("\n").map((line) => (
              <span>
                {line}
                <br />
              </span>
            ))}
          </DialogContentText>
          <TextField
            margin="dense"
            label={
              modalType === "delete"
                ? `현재 카테고리 이름을 입력하세요`
                : "새 카테고리 이름을 입력하세요"
            }
            type="text"
            value={inputValue}
            onChange={handleChangeInputValue}
            fullWidth={true}
          />
        </DialogContent>
        <DialogActions>{modalRenderValues.buttons}</DialogActions>
      </Dialog>
    </>
  );
};

export default CategoryModal;
