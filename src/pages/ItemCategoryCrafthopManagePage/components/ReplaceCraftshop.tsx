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
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

const ReplaceCraftshopStyles = makeStyles((theme: Theme) =>
  createStyles({
    contentsBase: {},
    inputBlock: {
      backgroundColor: theme.palette.background.paper,
      padding: "50px 48px 0 48px",
      minWidth: "600px",
    },
    replaceButton: {
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

export default function ReplaceCraftshop() {
  const classes = ReplaceCraftshopStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const selectCraftshopValue = useAppSelector((state) => state.selectCraftshop);

  const [inputValue, setInputValue] = useState("");
  const handleChangeInputValue: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <div className={classes.contentsBase}>
        <div className={classes.inputBlock}>
          <Typography variant="h5" gutterBottom>
            공방 수정하기
          </Typography>

          <Typography variant="subtitle1" gutterBottom color="textSecondary">
            수정할 내용을 확인후 수정해주세요.
          </Typography>

          <Typography variant="subtitle1" gutterBottom color="textSecondary">
            {"공방명: " + selectCraftshopValue.name}
          </Typography>

          <Typography variant="subtitle1" gutterBottom color="textSecondary">
            {"주소: " + selectCraftshopValue.address}
          </Typography>

          <Typography variant="subtitle1" gutterBottom color="textSecondary">
            {"전화번호: " + selectCraftshopValue.phone}
          </Typography>

          <form noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              label="공방 이름"
              variant="outlined"
              name="craftshopName"
              size="medium"
              onChange={handleChangeInputValue}
              value={inputValue}
            />
          </form>

          <div className={classes.replaceButton}>
            <ThemeProvider theme={buttonTheme}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  // dispatch(
                  //   actions.deleteCraftshopPending({
                  //     id: selectCraftshopValue.id,
                  //     name: selectCraftshopValue.name,
                  //   })
                  // );
                  history.push("/pages/ItemCategoryCrafthopManage/Craftshop");
                }}
              >
                수정하기
              </Button>
            </ThemeProvider>
          </div>
        </div>
      </div>
    </>
  );
}
