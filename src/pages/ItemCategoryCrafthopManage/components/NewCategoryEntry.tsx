import {
  Theme,
  createStyles,
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import { TextField } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import { useState } from "react";
import { addNewCategory, ProductType } from "../../../api/category";
import { AsyncButton } from "../../Login/components/AsyncButton";

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

  const [timer, setTimer] = useState(0);

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
            <AsyncButton
              loadingMessage={"등록중..."}
              onClick={async (e) => {
                if (timer) {
                  clearTimeout(timer);
                }
                const newTimer = window.setTimeout(async () => {
                  try {
                    await addNewCategory({
                      categoryName: categoryName,
                      categoryGroup: ProductType.product,
                    });
                    setCategoryName("");
                  } catch (e) {
                    console.error("error", e);
                  }
                }, 300);
                setTimer(newTimer);
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
