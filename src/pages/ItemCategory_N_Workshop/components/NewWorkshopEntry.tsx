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
import { DebounceButton } from "../../Login/components/debounceButton";
import { useState } from "react";
import { FindAddressCode } from "./FindAddressCode";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2, 6),

      "& > *": {
        padding: theme.spacing(1, 0, 0, 0),
      },
    },

    workshopForm: {
      // padding: theme.spacing(0, 8, 0, 0),
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

export default function NewWorkshopEntry() {
  const classes = useStyles();

  const [workshopName, setWorkshopName] = useState("");
  const [workshopAddress, setWorkshopAddress] = useState("");
  const [workshopPhoneNumber, setWorkshopPhoneNumber] = useState("");

  //재사용성있게 바꾸기
  const handleWorkshopName: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const { value } = e.target;
    setWorkshopName(value);
  };
  const handleWorkshopAddress: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const { value } = e.target;
    setWorkshopAddress(value);
  };
  const handleWorkshopPhoneNumber: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const { value } = e.target;
    setWorkshopPhoneNumber(value);
  };

  return (
    <>
      <div className={classes.root}>
        <Typography variant="h5" gutterBottom>
          신규 공방 등록하기
        </Typography>
        <form className={classes.workshopForm} noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            label="우편번호"
            variant="outlined"
            name="id"
            size="small"
            disabled
            // onChange={handleWorkshopName}
            // value={workshopName}
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
            // onChange={handleWorkshopName}
            // value={workshopName}
          />
          <div />
          <TextField
            id="outlined-basic"
            label="상세주소"
            variant="outlined"
            name="id"
            size="small"

            // onChange={handleWorkshopName}
            // value={workshopName}
          />
          <TextField
            id="outlined-basic"
            label="참고항목"
            variant="outlined"
            name="id"
            size="small"
            disabled
            // onChange={handleWorkshopName}
            // value={workshopName}
          />
        </form>

        <div />

        <form className={classes.workshopForm} noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            label="공방 이름"
            variant="outlined"
            name="id"
            size="small"
            onChange={handleWorkshopName}
            value={workshopName}
          />
          {/* <TextField
            id="outlined-basic"
            label="공방 주소"
            variant="outlined"
            name="id"
            size="small"
            onChange={handleWorkshopAddress}
            value={workshopAddress}
          /> */}
          <TextField
            id="outlined-basic"
            label="공방 연락처"
            variant="outlined"
            name="id"
            size="small"
            onChange={handleWorkshopPhoneNumber}
            value={workshopPhoneNumber}
          />
        </form>
        <div className={classes.entryButton}>
          <ThemeProvider theme={buttonTheme}>
            <DebounceButton
              loadingMessage={"등록중..."}
              onClick={async () => {
                await new Promise(async (resolve) => {
                  console.log("등록버튼 클릭");
                  console.log(
                    "등록할 공방정보:",
                    workshopName,
                    workshopAddress,
                    workshopPhoneNumber
                  );
                  // await addNewCategoryAPI(CategoryName);
                  setWorkshopName("");
                  setWorkshopAddress("");
                  setWorkshopPhoneNumber("");

                  setTimeout(resolve, 500);
                });
              }}
            >
              등록하기
            </DebounceButton>
          </ThemeProvider>
        </div>
      </div>
    </>
  );
}
