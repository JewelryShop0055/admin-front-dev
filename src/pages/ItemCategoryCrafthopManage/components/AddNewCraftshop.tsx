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
import { FindAddressCode } from "./FindAddressCode";
import { useAppSelector } from "../../../modules/hooks";
import { drawerWidth } from "../../../components/Navigations/SubNavigation";
import { useDispatch } from "react-redux";
import { actions as addNewCraftshopActions } from "../../../store/craftshop/addNewCraftshop/slice";
import { useHistory } from "react-router";
import { actions as findAddressActions } from "../../../store/findAddress/slice";

const addNewCraftshopStyles = makeStyles((theme: Theme) =>
  createStyles({
    contentsBase: {
      margin: theme.spacing(0, 0, 0, `${drawerWidth}px`),
    },
    inputBlock: {
      backgroundColor: theme.palette.background.paper,
      padding: "50px 48px 0 48px",
      minWidth: "600px",
    },
    paginationAddButton: {
      display: "flex",
      justifyContent: "flex-end",
      padding: "10px 0 10px 0",
    },
    paginationNavigation: {
      display: "flex",
      justifyContent: "center",
    },
  })
);

const buttonTheme = createTheme({
  palette: {
    primary: blue,
  },
});

export default function AddNewCraftshop() {
  const classes = addNewCraftshopStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [craftshopValue, setCraftshopValue] = useState({
    craftshopName: "",
    CraftshopDetailAddress: "",
    craftshopPhoneNumber: "",
  });

  const { craftshopName, CraftshopDetailAddress, craftshopPhoneNumber } =
    craftshopValue;
  const { baseAddress, addtionalAddress, zoneCode } = useAppSelector(
    (state) => state.findAddress
  );

  const handleCraftshopValue: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const { name, value } = e.target;
    setCraftshopValue({
      ...craftshopValue,
      [name]: value,
    });
  };

  useEffect(() => {
    return () => {
      dispatch(findAddressActions.getAddressValueReset());
    };
  }, []);

  return (
    <>
      <div className={classes.contentsBase}>
        <div className={classes.inputBlock}>
          <Typography variant="h5" gutterBottom>
            신규 공방 등록하기
          </Typography>
          <form noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              label="우편번호"
              variant="outlined"
              name="id"
              size="small"
              disabled
              value={zoneCode}
            />

            <FindAddressCode />

            <div />
            <TextField
              id="outlined-basic"
              label="주소"
              variant="outlined"
              name="id"
              size="small"
              disabled
              fullWidth
              value={baseAddress}
            />
            <div />
            <TextField
              id="outlined-basic"
              label="상세주소"
              variant="outlined"
              name="CraftshopDetailAddress"
              size="small"
              onChange={handleCraftshopValue}
              value={CraftshopDetailAddress}
            />
            <TextField
              id="outlined-basic"
              label="참고항목"
              variant="outlined"
              name="id"
              size="small"
              disabled
              value={addtionalAddress}
            />
          </form>

          <div />

          <form noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              label="공방 이름"
              variant="outlined"
              name="craftshopName"
              size="small"
              onChange={handleCraftshopValue}
              value={craftshopName}
            />
            <TextField
              id="outlined-basic"
              label="공방 연락처"
              variant="outlined"
              name="craftshopPhoneNumber"
              size="small"
              onChange={handleCraftshopValue}
              value={craftshopPhoneNumber}
            />
          </form>
          <div className={classes.paginationAddButton}>
            <ThemeProvider theme={buttonTheme}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  dispatch(
                    addNewCraftshopActions.addNewCraftshopPending({
                      address: baseAddress + addtionalAddress,
                      detailAddress: CraftshopDetailAddress,
                      name: craftshopName,
                      phone: craftshopPhoneNumber,
                      postCode: zoneCode,
                    })
                  );
                  dispatch(findAddressActions.getAddressValueReset());
                  setCraftshopValue({
                    craftshopName: "",
                    CraftshopDetailAddress: "",
                    craftshopPhoneNumber: "",
                  });
                  history.push("/ItemCategoryCrafthopManage/Craftshop");
                }}
              >
                등록하기
              </Button>
            </ThemeProvider>
          </div>
        </div>
      </div>
    </>
  );
}
