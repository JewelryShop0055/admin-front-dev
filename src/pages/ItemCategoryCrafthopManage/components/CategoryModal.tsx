import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button } from "@material-ui/core";
import { actions as modalAction } from "../../../store/categoryModal/slice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useAppSelector } from "../../../modules/hooks";
import { actions as addNewCategoryAction } from "../../../store/addNewCategory/slice";
import { actions as replaceCategoryAction } from "../../../store/replaceCurrentCategory/slice";
import { actions as deleteCategoryAction } from "../../../store/deleteCategory/slice";

interface CategoryModalProps {
  openModal: boolean;
}

interface ModalContents {
  title: string;
  content: string;
  buttons: JSX.Element;
}

const CategoryModal: React.FC<CategoryModalProps> = ({ openModal }) => {
  const dispatch = useDispatch();
  const { modalType, id, name, itemCount } = useAppSelector(
    (state) => state.categoryModal
  );

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

  switch (modalType) {
    case "create":
      modalRenderValues.title = "카테고리 추가하기";
      modalRenderValues.content = "추가할 카테고리이름을 입력하세요";
      modalRenderValues.buttons = (
        <>
          <Button
            onClick={() => {
              if (inputValue === "") {
                alert("공백은 등록할 수 없습니다.");
                return;
              }
              dispatch(
                addNewCategoryAction.addNewCategoryPending({
                  categoryName: inputValue,
                })
              );
              dispatch(modalAction.closeModal());
              setInputValue("");
            }}
            color="primary"
          >
            추가하기
          </Button>
          <Button
            onClick={() => {
              dispatch(modalAction.closeModal());
              setInputValue("");
            }}
            color="primary"
          >
            취소하기
          </Button>
        </>
      );
      break;

    case "replace":
      modalRenderValues.title = "카테고리 수정하기";
      modalRenderValues.content = `새 카테고리이름을 입력하세요.\n현재 카테고리 이름은 "${name}" 입니다.`;
      modalRenderValues.buttons = (
        <>
          <Button
            onClick={() => {
              dispatch(
                replaceCategoryAction.replaceCurrentCategoryPending({
                  targetId: id,
                  currentCategoryName: name,
                  newCategoryName: inputValue,
                })
              );
              dispatch(modalAction.closeModal());
              setInputValue("");
            }}
            color="primary"
          >
            수정하기
          </Button>
          <Button
            onClick={() => {
              dispatch(modalAction.closeModal());
              setInputValue("");
            }}
            color="primary"
          >
            취소하기
          </Button>
        </>
      );
      break;

    case "delete":
      modalRenderValues.title = "카테고리 삭제하기";
      modalRenderValues.content = `삭제 후 되돌릴 수 없습니다. 삭제하시려면 카테고리명을 입력해주세요.\n현재 카테고리 이름은 "${name}" 이며, ${itemCount}개의 제품이 등록되어있습니다.`;
      modalRenderValues.buttons = (
        <>
          <Button
            onClick={() => {
              if (inputValue === name) {
                dispatch(
                  deleteCategoryAction.deleteCategoryPending({
                    categoryId: id,
                    categoryName: inputValue,
                  })
                );
                dispatch(modalAction.closeModal());
                setInputValue("");
              } else {
                alert("입력문자가 틀렸습니다.");
              }
            }}
            color="primary"
          >
            삭제하기
          </Button>
          <Button
            onClick={() => {
              dispatch(modalAction.closeModal());
              setInputValue("");
            }}
            color="primary"
          >
            취소하기
          </Button>
        </>
      );
      break;

    default:
      modalRenderValues.title = "불러오는중......";
      modalRenderValues.content = "불러오는중...";
      break;
  }

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
            {modalRenderValues.content.split("\n").map((line) => (
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
