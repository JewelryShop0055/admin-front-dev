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
import NewCategoryEntry from "./NewCategoryEntry";
import NewCraftshopEntry from "./NewCraftshopEntry";
import CraftshopList from "./CraftshopList";
import { PaperElevation } from "../../../styleTypes";
import { useAppSelector } from "../../../modules/hooks";
import { useState } from "react";
import { actions as replaceCurrentCategoryActions } from "../../../store/replaceCurrentCategory/slice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(0, 0, 0, `${drawerWidth}px`),
    },

    paper: {
      "& > *": {
        padding: theme.spacing(0, 0, 3, 0),
      },
    },

    paperElements: {
      padding: theme.spacing(0, 0, 3, 0),
    },
  })
);

export default function CreateReplaceDeleteElements() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  //페이지 넘나드는 행위에서 상태관리쓰면 구림 => 그냥 history로 go/back
  const { isStandByPutCategoryName, currentCategoryName, targetId } =
    useAppSelector((state) => state.replaceCurrentCategory);

  const [inputNameValue, setInputNameValue] = useState("");

  const handleChangeCategoryName: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const { value } = e.target;
    setInputNameValue(value);
  };

  const isStandByDeleteCategory = true;

  if (isStandByPutCategoryName || isStandByDeleteCategory) {
    return (
      <>
        <div className={classes.root}>
          <Typography variant="h5" gutterBottom>
            카테고리 수정하기
          </Typography>

          <Typography variant="h5" gutterBottom>
            {`현재 이름:${currentCategoryName}`}
          </Typography>

          <form noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              label="카테고리명 입력"
              variant="outlined"
              name="id"
              size="small"
              onChange={handleChangeCategoryName}
              value={inputNameValue}
            />
          </form>
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                console.log("카테고리수정버튼 클릭");
                if (inputNameValue === "") {
                  alert("바꿀 이름을 입력해주세요");
                } else {
                  dispatch(
                    replaceCurrentCategoryActions.replaceCurrentCategoryPending(
                      {
                        targetId: targetId,
                        currentCategoryName: currentCategoryName,
                        newCategoryName: inputNameValue,
                      }
                    )
                  );
                  setInputNameValue("");
                  history.push("/ItemCategoryCrafthopManage/Category");
                }
              }}
            >
              수정하기
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                console.log("카테고리수정취소버튼 클릭");
                dispatch(
                  replaceCurrentCategoryActions.replaceCurrentCategoryCancel()
                );
                setInputNameValue("");
                history.push("/ItemCategoryCrafthopManage/Category");
              }}
            >
              취소하기
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={classes.root}>
        <div className={classes.paper}>
          <Paper
            elevation={PaperElevation.BOTTOM}
            className={classes.paperElements}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => {}}
            >
              카테고리 추가하기
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => {}}
            >
              공방 추가하기
            </Button>

            {/* 카테고리 추가버튼누르면 카테고리 추가하는 컴포넌트 랜더링, 공방등록이면 공방등록 컴포넌트 렌더링 */}
            <NewCategoryEntry />
            <NewCraftshopEntry />
          </Paper>
        </div>
      </div>
    </>
  );
}
