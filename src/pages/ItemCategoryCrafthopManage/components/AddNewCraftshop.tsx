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
    inputContainer: {
      padding: "50px 48px 0 48px",

      display: "grid",
      gridAutoRows: "1fr 1fr 1fr 1fr 1fr 1fr",
      gridAutoColumns: "150px 150px 200px 200px",
      gridGap: "10px",
      gridTemplateAreas: `
      "inputHeader inputHeader inputHeader inputHeader"
      "craftshopName craftshopName . ."
      "craftshopPhoneNumber craftshopPhoneNumber . ."
      "craftshopPostCode findAddressCode . ."
      "craftshopAddress craftshopAddress craftshopAddress craftshopAddress"
      "craftshopDetailAddress craftshopDetailAddress craftshopAddressRef ."
      `,
    },
    inputHeader: {
      gridArea: "inputHeader",
    },
    craftshopName: {
      gridArea: "craftshopName",
    },
    craftshopPhoneNumber: {
      gridArea: "craftshopPhoneNumber",
    },
    craftshopPostCode: {
      gridArea: "craftshopPostCode",
    },
    findAddressCode: {
      gridArea: "findAddressCode",
    },
    craftshopAddress: {
      gridArea: "craftshopAddress",
    },
    craftshopDetailAddress: {
      gridArea: "craftshopDetailAddress",
    },
    craftshopAddressRef: {
      gridArea: "craftshopAddressRef",
    },
    submitBtn: {
      margin: "20px 0 0 680px ",
      minWidth: "100px",
    },
  })
);

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

  if (
    globalThis.location.pathname ===
    "/ItemCategoryCrafthopManage/Craftshop/replace"
  ) {
  }

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
        <div className={classes.inputContainer}>
          <Typography variant="h5" gutterBottom className={classes.inputHeader}>
            신규 공방 등록하기
          </Typography>

          <TextField
            className={classes.craftshopName}
            label="공방 이름"
            variant="outlined"
            name="craftshopName"
            size="small"
            onChange={handleCraftshopValue}
            value={craftshopName}
          />

          <TextField
            className={classes.craftshopPhoneNumber}
            label="공방 연락처"
            variant="outlined"
            name="craftshopPhoneNumber"
            size="small"
            onChange={handleCraftshopValue}
            value={craftshopPhoneNumber}
          />

          <TextField
            className={classes.craftshopPostCode}
            label="우편번호"
            variant="outlined"
            name="craftshopPostCode"
            size="small"
            disabled
            value={zoneCode}
          />

          <div className={classes.findAddressCode}>
            <FindAddressCode />
          </div>

          <TextField
            className={classes.craftshopAddress}
            label="주소"
            variant="outlined"
            name="craftshopAddress"
            size="small"
            disabled
            // fullWidth
            value={baseAddress}
          />

          <TextField
            className={classes.craftshopDetailAddress}
            label="상세주소"
            variant="outlined"
            name="craftshopDetailAddress"
            size="small"
            onChange={handleCraftshopValue}
            value={CraftshopDetailAddress}
          />
          <TextField
            className={classes.craftshopAddressRef}
            label="참고항목"
            variant="outlined"
            name="craftshopAddressRef"
            size="small"
            disabled
            value={addtionalAddress}
          />
        </div>

        <Button
          className={classes.submitBtn}
          variant="outlined"
          color="primary"
          onClick={() => {
            if (craftshopName === "" || craftshopPhoneNumber === "") {
              alert("공방 이름과 연락처는 필수로 입력해야합니다!");
              return;
            }
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
      </div>
    </>
  );
}
