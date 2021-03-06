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
import { Border, FontColor, FontSize, Padding } from "../../../styleTypes";
import { Craftshop } from "../../../types";
import { CraftshopDetailProps } from "./CraftshopDetail";
import { CraftshopPageMode } from "..";

const CraftShopDetailStyles = makeStyles(
  createStyles({
    root: {
      padding: "20px",

      display: "grid",
      gridTemplateRows: "1fr 14fr",
      gridTemplateAreas: `
        "header"
        "body"`,
    },
    header: {
      gridArea: "header",
      borderBottom: Border.DEFAULT_BORDER,
      paddingBottom: "10px",

      display: "flex",
      alignItems: "center",
      fontSize: FontSize.MEDIUM_LARGE,
      fontWeight: "bold",

      "& > div:nth-child(1)": {
        flex: "1",
      },
      "& > button:nth-child(n)": {
        border: "none",
        fontSize: FontSize.MEDIUM,
        background: "none",
        display: "flex",
        alignItems: "center",
      },
    },
    body: {
      gridArea: "body",
      marginTop: "10px",

      "& > *": {
        margin: "10px 0 10px 0",
      },
    },

    innerHeader: {
      fontSize: FontSize.MEDIUM_LARGE,
      fontWeight: "bold",
    },
    innerElement: {
      fontSize: FontSize.MEDIUM_LARGE,
      marginLeft: "20px",
    },

    notSelect: {
      position: "relative",
      top: "50%",

      fontSize: FontSize.MEDIUM_LARGE,
      color: FontColor.GRAY,

      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  })
);

interface SelectedCraftshopProps {
  selectedCraftshop: Craftshop;
  setMode: React.Dispatch<React.SetStateAction<CraftshopPageMode>>;
}

export default function UpdateCraftshop({
  selectedCraftshop,
  setMode,
}: SelectedCraftshopProps) {
  const classes = CraftShopDetailStyles();
  const dispatch = useDispatch();

  const initialValue = Object.assign({}, selectedCraftshop);
  console.log("initialValue", initialValue);

  const [updateValue, setUpdateValue] = useState({
    craftshopName: initialValue.name,
    craftshopPhoneNumber: initialValue.phone,
    craftshopPostCode: initialValue.postCode,
    craftshopAddress: initialValue.address,
    craftshopDetailAddress: initialValue.detailAddress,
    craftshopAddressRef: "",
  });

  const {
    craftshopName,
    craftshopPhoneNumber,
    craftshopPostCode,
    craftshopAddress,
    craftshopDetailAddress,
    craftshopAddressRef,
  } = updateValue;

  const handleCraftshopValue: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const { name, value } = e.target;
    setUpdateValue({
      ...updateValue,
      [name]: value,
    });
  };

  const { baseAddress, addtionalAddress, zoneCode } = useAppSelector(
    (state) => state.findAddress
  );

  useEffect(() => {
    if (baseAddress !== "") {
      setUpdateValue({
        ...updateValue,
        craftshopPostCode: zoneCode,
        craftshopAddress: baseAddress,
        craftshopAddressRef: addtionalAddress,
      });
    }
    return () => {
      dispatch(findAddressActions.getAddressValueReset());
    };
  }, [baseAddress, addtionalAddress, zoneCode]);

  const submitValue = () => {
    if (craftshopName === "" || craftshopPhoneNumber === "") {
      alert("?????? ????????? ???????????? ????????? ?????????????????????!");
      return;
    }

    //????????????

    dispatch(
      updateCraftshopActions.updateCraftshopPending({
        id: selectedCraftshop.id,
        name: craftshopName,
        postCode: craftshopPostCode,
        address: craftshopAddress + craftshopAddressRef,
        detailAddress: craftshopDetailAddress,
        phone: craftshopPhoneNumber,
      })
    );

    dispatch(findAddressActions.getAddressValueReset());
    setUpdateValue({
      craftshopName: "",
      craftshopPhoneNumber: "",
      craftshopPostCode: "",
      craftshopAddress: "",
      craftshopDetailAddress: "",
      craftshopAddressRef: "",
    });
    return;
  };

  return (
    <>
      <div className={classes.innerHeader}>?????? ???</div>
      <TextField
        className={classes.innerElement}
        label="?????? ??????"
        variant="outlined"
        name="craftshopName"
        size="small"
        onChange={handleCraftshopValue}
        value={craftshopName}
      />
      <div className={classes.innerHeader}>?????????</div>
      <TextField
        className={classes.innerElement}
        label="?????? ?????????"
        variant="outlined"
        name="craftshopPhoneNumber"
        size="small"
        onChange={handleCraftshopValue}
        value={craftshopPhoneNumber}
      />
      <div className={classes.innerHeader}>????????????</div>
      <TextField
        className={classes.innerElement}
        label="????????????"
        variant="outlined"
        name="craftshopPostCode"
        size="small"
        disabled
        onChange={handleCraftshopValue}
        value={craftshopPostCode}
      />

      <div className={classes.innerElement}>
        <FindAddressCode />
      </div>

      <div className={classes.innerHeader}>??????</div>
      <TextField
        className={classes.innerElement}
        label="??????"
        variant="outlined"
        name="craftshopAddress"
        size="small"
        disabled
        onChange={handleCraftshopValue}
        value={craftshopAddress}
      />
      <div className={classes.innerHeader}>????????????</div>
      <TextField
        className={classes.innerElement}
        label="????????????"
        variant="outlined"
        name="craftshopDetailAddress"
        size="small"
        onChange={handleCraftshopValue}
        value={craftshopDetailAddress}
      />
      <TextField
        className={classes.innerElement}
        label="????????????"
        variant="outlined"
        name="craftshopAddressRef"
        size="small"
        disabled
        onChange={handleCraftshopValue}
        value={craftshopAddressRef}
      />

      <Button
        // className={classes.submitBtn}
        variant="outlined"
        color="primary"
        onClick={() => {
          submitValue();
          setMode(CraftshopPageMode.DEFAULT);
        }}
      >
        ????????????
      </Button>
    </>
  );
}
