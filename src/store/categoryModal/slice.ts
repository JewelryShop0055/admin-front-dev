import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category, ModalType } from "../../types";

export interface CategoryModalParams
  extends Pick<Category, "id" | "name" | "itemCount"> {
  isOpen: boolean;
  modalType: ModalType | null;
}

const initialState: CategoryModalParams = {
  isOpen: false,
  modalType: null,
  id: 0,
  name: "",
  itemCount: 0,
};

export const categoryModalSlice = createSlice({
  name: "categoryModal",
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<Omit<CategoryModalParams, "isOpen">>
    ) => {
      state.isOpen = true;
    },
    getInnerModalValue: (
      state,
      action: PayloadAction<Omit<CategoryModalParams, "isOpen">>
    ) => {
      state.modalType = action.payload.modalType;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.itemCount = action.payload.itemCount;
    },
    closeModal: (state) => {
      //왜 state = initialState로 하면 안먹히지
      state.isOpen = false;
      state.modalType = null;
      state.id = 0;
      state.name = "";
      state.itemCount = 0;
    },
  },
});

export const { actions } = categoryModalSlice;

export default categoryModalSlice.reducer;
