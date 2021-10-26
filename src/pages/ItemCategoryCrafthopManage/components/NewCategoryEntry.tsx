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
import { useState } from "react";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { actions as categoryActions } from "../../../store/category/slice";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2, 6),
    },

    categoryForm: {
      display: "inline-block",
      padding: theme.spacing(0, 8, 0, 0),
    },

    entryButton: {
      display: "inline-block",
      padding: theme.spacing(2, 0, 0, 0),
      verticalAlign: "middle",
      boxSizing: "border-box",
      width: "200px",
      height: "auto",
    },
  })
);

const buttonTheme = createTheme({
  palette: {
    primary: blue,
  },
});

export default function NewCategoryEntry() {
  const classes = useStyles();

  const [categoryName, setCategoryName] = useState("");
  const handleChangeCategoryName: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const { value } = e.target;
    setCategoryName(value);
  };

  //true일때 빙글빙글, false일때 로딩다된 평소화면
  const { isLoadingCategory } = useAppSelector((state) => state.category);

  const dispatch = useAppDispatch();

  return (
    <>
      <div className={classes.root}>
        <Typography variant="h5" gutterBottom>
          신규 카테고리 등록하기
        </Typography>

        <form className={classes.categoryForm} noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            label="카테고리명 입력"
            variant="outlined"
            name="id"
            size="small"
            onChange={handleChangeCategoryName}
            value={categoryName}
          />
        </form>
        <div className={classes.entryButton}>
          <ThemeProvider theme={buttonTheme}>
            <Button
              variant="contained"
              color="primary"
              onClick={async (e) => {
                // dispatch(categoryActions.getCategoryPending(categoryName));
              }}
            >
              등록하기
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={async (e) => {
                console.log("123");
                await dispatch(
                  categoryActions.getCategoryPending(categoryName)
                );
                console.log(categoryActions.getCategoryPending);
              }}
            >
              리스트불러오기버튼
            </Button>
          </ThemeProvider>
        </div>
      </div>
    </>
  );
}
