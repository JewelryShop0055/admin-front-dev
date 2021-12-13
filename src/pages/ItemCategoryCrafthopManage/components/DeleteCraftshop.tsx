import {
  Theme,
  createStyles,
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import { Button, TextField } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";

import { useEffect, useState } from "react";
import { useAppSelector } from "../../../modules/hooks";
import { drawerWidth } from "../../../components/Navigations/SubNavigation";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { actions } from "../../../store/craftshop/deleteCraftshop/slice";

const DeleteCraftshopStyles = makeStyles((theme: Theme) =>
  createStyles({
    contentsBase: {
      margin: theme.spacing(0, 0, 0, `${drawerWidth}px`),
    },
    inputBlock: {
      backgroundColor: theme.palette.background.paper,
      padding: "50px 48px 0 48px",
      minWidth: "600px",
    },
    deleteButton: {
      display: "flex",
      justifyContent: "flex-end",
      padding: "10px 0 10px 0",
    },
  })
);

const buttonTheme = createTheme({
  palette: {
    primary: blue,
  },
});

export default function DeleteCraftshop() {
  const classes = DeleteCraftshopStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <div className={classes.contentsBase}>
        <div className={classes.inputBlock}>
          <Typography variant="h5" gutterBottom>
            공방 삭제하기
          </Typography>

          <Typography variant="subtitle1" gutterBottom color="textSecondary">
            삭제 후 되돌릴 수 없습니다. 삭제하시려면 공방명을 입력해주세요.
          </Typography>

          <div className={classes.deleteButton}>
            <ThemeProvider theme={buttonTheme}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  dispatch(
                    actions.deleteCraftshopPending({
                      id: "21312",
                    })
                  );
                  history.push("/ItemCategoryCrafthopManage/Craftshop");
                }}
              >
                삭제하기
              </Button>
            </ThemeProvider>
          </div>
        </div>
      </div>
    </>
  );
}
