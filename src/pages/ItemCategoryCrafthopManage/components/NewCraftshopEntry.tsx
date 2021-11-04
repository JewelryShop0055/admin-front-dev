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
import { FindAddressCode } from "./FindAddressCode";
import { useAppDispatch, useAppSelector } from "../../../modules/hooks";
import {
  setBaseAddress,
  setAddtionalAddress,
  setZoneCode,
} from "../../../util/CraftshopAddressSlice";
import { addNewCraftshop } from "../../../api/workshop";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2, 6),

      "& > *": {
        padding: theme.spacing(1, 0, 0, 0),
      },
    },

    entryButton: {
      padding: theme.spacing(2, 0, 0, 0),
    },
  })
);

const buttonTheme = createTheme({
  palette: {
    primary: blue,
  },
});

export default function NewCraftshopEntry() {
  const classes = useStyles();

  const [craftshopName, setCraftshopName] = useState("");
  const [CraftshopDetailAddress, setCraftshopDetailAddress] = useState("");
  const [craftshopPhoneNumber, setCraftshopPhoneNumber] = useState("");

  const baseAddress = useAppSelector(
    (state) => state.craftshopAddress.baseAddress
  );
  const addtionalAddress = useAppSelector(
    (state) => state.craftshopAddress.addtionalAddress
  );
  const zoneCode = useAppSelector((state) => state.craftshopAddress.zoneCode);
  const dispatch = useAppDispatch();

  const [timer, setTimer] = useState(0);

  //재사용성있게 바꾸기
  const handleCraftshopName: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const { value } = e.target;
    setCraftshopName(value);
  };
  const handleCraftshopDetailAddress: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const { value } = e.target;
    setCraftshopDetailAddress(value);
  };
  const handleCraftshopPhoneNumber: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const { value } = e.target;
    setCraftshopPhoneNumber(value);
  };

  return (
    <>
      <div className={classes.root}>
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
            value={`${zoneCode}`}
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
            value={`${baseAddress}`}
          />
          <div />
          <TextField
            id="outlined-basic"
            label="상세주소"
            variant="outlined"
            name="id"
            size="small"
            onChange={handleCraftshopDetailAddress}
            value={CraftshopDetailAddress}
          />
          <TextField
            id="outlined-basic"
            label="참고항목"
            variant="outlined"
            name="id"
            size="small"
            disabled
            value={`${addtionalAddress}`}
          />
        </form>

        <div />

        <form noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            label="공방 이름"
            variant="outlined"
            name="id"
            size="small"
            onChange={handleCraftshopName}
            value={craftshopName}
          />
          <TextField
            id="outlined-basic"
            label="공방 연락처"
            variant="outlined"
            name="id"
            size="small"
            onChange={handleCraftshopPhoneNumber}
            value={craftshopPhoneNumber}
          />
        </form>
        <div className={classes.entryButton}>
          <ThemeProvider theme={buttonTheme}>
            <Button
              variant="outlined"
              color="primary"
              onClick={async (e) => {
                if (timer) {
                  clearTimeout(timer);
                }
                const newTimer = window.setTimeout(async () => {
                  try {
                    await addNewCraftshop({
                      craftshopName: craftshopName,
                      zoneCode: zoneCode,
                      baseAddress: baseAddress,
                      addtionalAddress: addtionalAddress,
                      detailAddress: CraftshopDetailAddress,
                      phoneNumber: craftshopPhoneNumber,
                    });
                    dispatch(setBaseAddress(""));
                    dispatch(setAddtionalAddress(""));
                    dispatch(setZoneCode(""));

                    setCraftshopName("");
                    setCraftshopDetailAddress("");
                    setCraftshopPhoneNumber("");
                  } catch (e) {
                    console.error("error", e);
                  }
                }, 300);
                setTimer(newTimer);
              }}
            >
              등록하기
            </Button>
          </ThemeProvider>
        </div>
      </div>
    </>
  );
}
