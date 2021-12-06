import { Button } from "@material-ui/core";
import { actions as modalAction } from "../../../store/category/categoryModal/slice";
import { useDispatch } from "react-redux";
import { actions as addNewCategoryAction } from "../../../store/category/addNewCategory/slice";
import { actions as replaceCategoryAction } from "../../../store/category/replaceCurrentCategory/slice";
import { actions as deleteCategoryAction } from "../../../store/category/deleteCategory/slice";
import { ModalType } from "../../../types";

interface ModalContents {
  title: string;
  mainText: string;
  buttons: JSX.Element;
}

export interface SetCategoryModalContentsParams {
  _modalType: ModalType | null;
  _inputValue: string;
  setInputValue: (value: React.SetStateAction<string>) => void;
  modalValue: {
    _id: number;
    _name: string;
    _itemCount: number;
  };
}

export function SetModalContents(
  params: SetCategoryModalContentsParams
): ModalContents {
  const dispatch = useDispatch();
  const modalRenderValues: ModalContents = {
    title: "",
    mainText: "",
    buttons: <div />,
  };

  switch (params._modalType) {
    case "create":
      modalRenderValues.title = "카테고리 추가하기";
      modalRenderValues.mainText = "추가할 카테고리이름을 입력하세요";
      modalRenderValues.buttons = (
        <>
          <Button
            onClick={() => {
              if (params._inputValue === "") {
                alert("공백은 등록할 수 없습니다.");
                return;
              }
              dispatch(
                addNewCategoryAction.addNewCategoryPending({
                  categoryName: params._inputValue,
                })
              );
              dispatch(modalAction.closeModal());
              params.setInputValue("");
            }}
            color="primary"
          >
            추가하기
          </Button>
          <Button
            onClick={() => {
              dispatch(modalAction.closeModal());
              params.setInputValue("");
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
      modalRenderValues.mainText = `새 카테고리이름을 입력하세요.\n현재 카테고리 이름은 "${params.modalValue._name}" 입니다.`;
      modalRenderValues.buttons = (
        <>
          <Button
            onClick={() => {
              dispatch(
                replaceCategoryAction.replaceCurrentCategoryPending({
                  targetId: params.modalValue._id,
                  currentCategoryName: params.modalValue._name,
                  newCategoryName: params._inputValue,
                })
              );
              dispatch(modalAction.closeModal());
              params.setInputValue("");
            }}
            color="primary"
          >
            수정하기
          </Button>
          <Button
            onClick={() => {
              dispatch(modalAction.closeModal());
              params.setInputValue("");
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
      modalRenderValues.mainText = `삭제 후 되돌릴 수 없습니다. 삭제하시려면 카테고리명을 입력해주세요.\n현재 카테고리 이름은 "${params.modalValue._name}" 이며, ${params.modalValue._itemCount}개의 제품이 등록되어있습니다.`;
      modalRenderValues.buttons = (
        <>
          <Button
            onClick={() => {
              if (params._inputValue === params.modalValue._name) {
                dispatch(
                  deleteCategoryAction.deleteCategoryPending({
                    categoryId: params.modalValue._id,
                    categoryName: params._inputValue,
                  })
                );
                dispatch(modalAction.closeModal());
                params.setInputValue("");
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
              params.setInputValue("");
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
      modalRenderValues.mainText = "불러오는중...";
      break;
  }

  return modalRenderValues;
}
