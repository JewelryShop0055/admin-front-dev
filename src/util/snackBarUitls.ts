//https://github.com/iamhosseindhv/notistack/issues/30#issuecomment-832261019

import React from "react";
import { useSnackbar, WithSnackbarProps } from "notistack";
import { SnackBarParams } from "../types";

// Must be imported at least once in the app to initialize the ref

//그때이거 page마다 얹어서 썼어야해서 추상화못했는데 어떤문제있었는지 생각다시 해보고
//snackbarRef 동작 구조확인해보기
let snackbarRef: WithSnackbarProps;
export const SnackbarUtilsConfigurator: React.FC = () => {
  snackbarRef = useSnackbar();
  return null;
};

export default function alertSnackBarMessage(config: SnackBarParams) {
  snackbarRef.enqueueSnackbar(config.message, {
    variant: config.type,
    ...config.options,
  });
}
