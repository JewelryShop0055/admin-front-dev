//https://github.com/iamhosseindhv/notistack/issues/30#issuecomment-832261019

import React from "react";
import { useSnackbar, WithSnackbarProps } from "notistack";
import { SnackBarParams } from "../types";

// Must be imported at least once in the app to initialize the ref
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
