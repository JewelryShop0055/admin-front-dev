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
import { Postcode } from "./DaumPostcode";

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

        <form
          className={classes.categoryForm}
          noValidate
          autoComplete="off"
          // onKeyPress={handleKeyPress}
        >
          <TextField
            id="outlined-basic"
            label="공방 이름"
            variant="outlined"
            name="id"
            size="small"
            onChange={handleWorkshopName}
            value={workshopName}
          />
          <TextField
            id="outlined-basic"
            label="공방 주소"
            variant="outlined"
            name="id"
            size="small"
            onChange={handleWorkshopAddress}
            value={workshopAddress}
          />
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
          <Postcode />
        </div>
      </div>
    </>
  );
}
