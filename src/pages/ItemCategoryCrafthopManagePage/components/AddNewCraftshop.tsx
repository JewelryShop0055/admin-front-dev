import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import { Button, TextField } from "@material-ui/core";

import { useEffect, useState } from "react";
import { FindAddressCode } from "./FindAddressCode";
import { useAppSelector } from "../../../modules/hooks";
import { useDispatch } from "react-redux";
import { actions as addNewCraftshopActions } from "../../../store/craftshop/addNewCraftshop/slice";
import { useHistory } from "react-router";
import { actions as findAddressActions } from "../../../store/findAddress/slice";
import { actions as updateCraftshopActions } from "../../../store/craftshop/updateCraftshop/slice";

const addNewCraftshopStyles = makeStyles((theme: Theme) =>
  createStyles({
    contentsBase: {},
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
    craftshopDetailAddress: "",
    craftshopPhoneNumber: "",
  });

  const { craftshopName, craftshopDetailAddress, craftshopPhoneNumber } =
    craftshopValue;
  const { baseAddress, addtionalAddress, zoneCode } = useAppSelector(
    (state) => state.findAddress
  );

  //공방수정시 적용되는 내용
  const selectedCraftshopValue = useAppSelector(
    (state) => state.selectCraftshop
  );
  const isReplace: boolean =
    globalThis.location.pathname ===
    "/pages/ItemCategoryCrafthopManage/Craftshop/replace"
      ? true
      : false;

  const handleCraftshopValue: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const { name, value } = e.target;
    setCraftshopValue({
      ...craftshopValue,
      [name]: value,
    });
  };

  const submitValue = () => {
    if (craftshopName === "" || craftshopPhoneNumber === "") {
      alert("공방 이름과 연락처는 필수로 입력해야합니다!");
      return;
    }

    //수정과정
    if (isReplace) {
      dispatch(
        updateCraftshopActions.updateCraftshopPending({
          id: selectedCraftshopValue.id,
          name: craftshopName,
          postCode: zoneCode,
          address: baseAddress + addtionalAddress,
          detailAddress: craftshopDetailAddress,
          phone: craftshopPhoneNumber,
        })
      );
    }

    //신규등록과정
    if (!isReplace) {
      dispatch(
        addNewCraftshopActions.addNewCraftshopPending({
          address: baseAddress + addtionalAddress,
          detailAddress: craftshopDetailAddress,
          name: craftshopName,
          phone: craftshopPhoneNumber,
          postCode: zoneCode,
        })
      );
    }

    dispatch(findAddressActions.getAddressValueReset());
    setCraftshopValue({
      craftshopName: "",
      craftshopDetailAddress: "",
      craftshopPhoneNumber: "",
    });
    history.push("/pages/ItemCategoryCrafthopManage/Craftshop");
    return;
  };

  useEffect(() => {
    if (isReplace) {
      setCraftshopValue({
        craftshopName: selectedCraftshopValue.name,
        craftshopPhoneNumber: selectedCraftshopValue.phone,
        craftshopDetailAddress: selectedCraftshopValue.detailAddress,
      });
      const initialCraftshopAddressValue = {
        baseAddress: selectedCraftshopValue.address,
        addtionalAddress: "",
        zoneCode: selectedCraftshopValue.postCode,
      };
      dispatch(
        findAddressActions.getAddressValuePending(initialCraftshopAddressValue)
      );
    }

    return () => {
      dispatch(findAddressActions.getAddressValueReset());
    };
  }, []);

  return (
    <>
      <div className={classes.contentsBase}>
        <div className={classes.inputContainer}>
          <Typography variant="h5" gutterBottom className={classes.inputHeader}>
            {isReplace ? "공방 수정하기" : "공방 등록하기"}
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
            onChange={handleCraftshopValue}
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
            onChange={handleCraftshopValue}
            value={baseAddress}
          />

          <TextField
            className={classes.craftshopDetailAddress}
            label="상세주소"
            variant="outlined"
            name="craftshopDetailAddress"
            size="small"
            onChange={handleCraftshopValue}
            value={craftshopDetailAddress}
          />
          <TextField
            className={classes.craftshopAddressRef}
            label="참고항목"
            variant="outlined"
            name="craftshopAddressRef"
            size="small"
            disabled
            onChange={handleCraftshopValue}
            value={addtionalAddress}
          />
        </div>

        <Button
          className={classes.submitBtn}
          variant="outlined"
          color="primary"
          onClick={() => {
            submitValue();
          }}
        >
          {isReplace ? "수정하기" : "등록하기"}
        </Button>
      </div>
    </>
  );
}
