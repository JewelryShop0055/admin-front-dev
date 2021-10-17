import {
  Theme,
  createStyles,
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { drawerWidth } from "../../../components/Navigations/SubNavigation";
import Typography from "@material-ui/core/Typography";
import { InputBlock } from "../../Login/components/LoginBlock_styled";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { topNavigationHeight } from "../../../components/Navigations/TopNavigation";
import { lightBlue, blue } from "@material-ui/core/colors";
import CategoryList from "./CategoryList";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(0, 0, 0, `${drawerWidth}px`),
    },

    categorySubmit: {
      display: "block",
      width: `calc(100%-${drawerWidth}px)`,
      height: `calc(100vh - ${topNavigationHeight}px)`,
      padding: theme.spacing(2, 6),

      "& > *": {
        display: "block",
        padding: theme.spacing(0, 0, 3, 0),
      },
    },

    categoryForm: {
      display: "flex",
      width: theme.spacing(30),
      padding: theme.spacing(0, 0, 10, 0),
    },

    categoryList: {
      display: "inline-block",
    },
  })
);

const buttonTheme = createTheme({
  palette: {
    primary: blue,
  },
});

export default function CategoryContents() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Paper elevation={5}>
          <div className={classes.categorySubmit}>
            <Typography variant="h4" gutterBottom>
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
                //   onChange={}
                //   value={}
              />
              <ThemeProvider theme={buttonTheme}>
                <Button variant="contained" color="primary">
                  등록하기
                </Button>
              </ThemeProvider>
            </form>

            <div className={classes.categoryList}>
              <Typography variant="h4" gutterBottom>
                등록된 제품 카테고리
              </Typography>
              <Typography
                variant="subtitle1"
                gutterBottom
                color="textSecondary"
              >
                미분류 카테고리는 삭제가 불가능하며, 기존 카테고리 삭제시 미분류
                상품으로 자동 이동됩니다.
              </Typography>
              <CategoryList />
            </div>
          </div>
        </Paper>
      </div>
    </>
  );
}
