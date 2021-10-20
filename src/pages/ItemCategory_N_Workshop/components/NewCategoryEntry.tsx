import {
  Theme,
  createStyles,
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { blue } from "@material-ui/core/colors";
import { useState } from "react";
import { addNewCategoryAPI, ProductType } from "../../../api/category";
import { AsyncButton } from "../../Login/components/AsyncButton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "block",
      padding: theme.spacing(2, 6),
      maxHeight: "20vh",
    },

    categoryForm: {
      display: "inline-block",
      width: "auto",
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

  return (
    <>
      <div className={classes.root}>
        <Typography variant="h5" gutterBottom>
          신규 카테고리 등록하기
        </Typography>

        <form
          className={classes.categoryForm}
          noValidate
          autoComplete="off"
          // onKeyPress={handleKeyPress}
        >
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
            <AsyncButton
              loadingMessage={"등록중..."}
              onClick={async () => {
                await new Promise(async (resolve) => {
                  console.log("등록버튼 클릭");
                  console.log("등록할 카테고리명:", categoryName);

                  await addNewCategoryAPI(categoryName, ProductType.product);
                  setCategoryName("");

                  setTimeout(resolve, 500);
                });
              }}
            >
              등록하기
            </AsyncButton>
          </ThemeProvider>
        </div>
      </div>
    </>
  );
}
