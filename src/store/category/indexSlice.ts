import {
  createAction,
  AnyAction,
  PayloadAction,
  createReducer,
  createSlice,
  Action,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { PendingActionFromAsyncThunk } from "@reduxjs/toolkit/dist/matchers";
import { stat } from "fs";
import { passwordGrantAuth } from "../../api/signIn";
import { Category, ProductType, SignInParams } from "../../types";

enum ControlModeType {
  CREATE = "create",
  READ = "read",
  UPDATE = "update",
  DELETE = "delete",
}

enum ProcessModeType {
  PENDING = "pending",
  FULFILLED = "fulfilled",
  REJECTED = "rejected",
}

// const changeHandleMode = (action: AnyAction): action is PayloadAction<ControlModeType> => {
//     return typeof action.type
// }

// const categoryReducers = createReducer(
//     initialCategoryState,
//     (builder) => {
//         builder
//             .addCase(addNewCategoryActions.pending, (state, action) => {
//                 state.actionState = action.payload.actionState
//                 state.data = action.payload.data
//             })

//     }
// )

// interface CategoryStateType {
//     actionType: {
//         mode: ControlModeType,
//         process: ProcessModeType
//     }
//   data: Category;
// }

// const initialState: CategoryStateType = {
//     actionType: {
//         mode: ControlModeType.READ,
//         process: ProcessModeType.FULFILLED,
//     },
//   data: {
//       id: 0,
//       name: "",
//       type: "",
//       itemCount: 0,
//       depth: 0,
//       createdAt: "",
//       updatedAt: "",
//   }
// };

const initialState: addNewCategoryParams = {
  name: undefined,
  type: "",
  isLoading: false,
};

interface addNewCategoryParams {
  name: ProductType | undefined;
  type: string;
  isLoading: boolean;
}

const addNewCategoryInitialState: addNewCategoryParams = {
  name: undefined,
  type: "",
  isLoading: false,
};

const addNewCategoryActions = {
  pending: createAction<addNewCategoryParams, "addNewCategoryPending">(
    "addNewCategoryPending"
  ),
  fulfilled: createAction<addNewCategoryParams, "addNewCategoryFulfilled">(
    "addNewCategoryFulfilled"
  ),
  rejected: createAction<addNewCategoryParams, "addNewCategoryRejected">(
    "addNewCategoryRejected"
  ),
};

// const addNewCategoryReducer = createReducer(addNewCategoryInitialState, {
//   [addNewCategoryPending.type]: (state, action) => {
//     state.name = action.payload.name;
//     state.type = ProductType.product;
//     state.isLoading = true;
//   },
// });

const categoryAddSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addPending: (state, action) => {
      state.isLoading = true;
    },
  },
  extraReducers: (builder) => {
    // builder
    //     .addCase(fetchUserById.fulfilled, (state,action) => {
    //     })
  },
});

const categoryDeleteSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    deletePending: (state, action) => {
      state.isLoading = true;
    },
  },
  extraReducers: (builder) => {
    // builder
    //     .addCase(fetchUserById.fulfilled, (state,action) => {
    //     })
  },
});

//이런식으로 하나의 initialState를 가지고 각각 pending/fulfilled/reject로 나눠 사용
// => 이러면 구조는 현재와 비슷하지만, 한 category state로 통합된다
