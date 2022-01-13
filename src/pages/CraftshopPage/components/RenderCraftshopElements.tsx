import { createStyles, makeStyles } from "@material-ui/core";

import React, { useState } from "react";

import { useDispatch } from "react-redux";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";

import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Craftshop } from "../../../types";
import { useHistory } from "react-router-dom";
import { actions as selectAction } from "../../../store/craftshop/selectedCraftshop/slice";
import { CraftshopPageMode } from "..";

export const CraftshopElementsStyles = makeStyles(
  createStyles({
    paginationCraftshopElements: {
      borderBottom: "black solid 0.5px",
      padding: "5px 0 5px 0",
      display: "grid",
      gridTemplateColumns: ".5fr 2fr 2fr 2fr 1fr",
      gridTemplateAreas: `"checkbox name address phone menuBtn"`,
    },
    paginationElementCheckBox: {
      gridArea: "checkbox",

      margin: "auto",
    },
    paginationElementName: {
      gridArea: "name",
      display: "flex",
      alignItems: "center",
      paddingLeft: "10px",
    },
    paginationElementAddress: {
      gridArea: "address",
      display: "block",
      width: "80%",
      marginTop: "auto",
      marginBottom: "auto",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    paginationElementPhone: {
      gridArea: "phone",
      display: "flex",
      alignItems: "center",
    },
    paginationElementBtn: {
      gridArea: "menuBtn",
      display: "flex",
      alignItems: "center",
    },
  })
);

const CraftshopElementsForm: React.FC<{
  props: Craftshop;
}> = ({ props }) => {
  const classes = CraftshopElementsStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  //===transition menuHander
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const [check, setCheck] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleReplaceButton = () => {
    setAnchorEl(null);
    dispatch(
      selectAction.selectElementPending({
        id: props.id,
        name: props.name,
        postCode: props.postCode,
        address: props.address,
        detailAddress: props.detailAddress,
        phone: props.phone,
        updatedAt: props.updatedAt,
        createdAt: props.createdAt,
      })
    );
    history.push("/pages/ItemCategoryCrafthopManage/Craftshop/replace");
  };

  const handleDeleteButton = () => {
    setAnchorEl(null);
    dispatch(
      selectAction.selectElementPending({
        id: props.id,
        name: props.name,
        postCode: props.postCode,
        address: props.address,
        detailAddress: props.detailAddress,
        phone: props.phone,
        updatedAt: props.updatedAt,
        createdAt: props.createdAt,
      })
    );
    history.push("/pages/ItemCategoryCrafthopManage/Craftshop/delete");
  };

  function prettyDate(rawDate: string) {
    const YYYYMMDD = rawDate.split("T")[0];
    return YYYYMMDD;
  }

  return (
    <>
      <div className={classes.paginationCraftshopElements}>
        <input
          type="checkbox"
          className={classes.paginationElementCheckBox}
          checked={check}
          onChange={(e) => {
            setCheck(!check);
          }}
        />
        <div className={classes.paginationElementName}>{props.name}</div>
        <div className={classes.paginationElementAddress}>{props.phone}</div>
        <div className={classes.paginationElementPhone}>
          {prettyDate(props.updatedAt)}
        </div>

        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
          className={classes.paginationElementBtn}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="fade-menu"
          anchorEl={anchorEl}
          keepMounted
          open={menuOpen}
          onClose={handleMenuClose}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={handleReplaceButton}>공방 수정</MenuItem>
          <MenuItem onClick={handleDeleteButton}>공방 삭제</MenuItem>
        </Menu>
      </div>
    </>
  );
};

const RenderCraftshopElements: React.FC<{
  craftshopList: Craftshop[];
  setSelectedCraftshop: React.Dispatch<
    React.SetStateAction<Craftshop | undefined>
  >;
  setMode: React.Dispatch<React.SetStateAction<CraftshopPageMode>>;
}> = ({ craftshopList, setSelectedCraftshop, setMode }) => {
  return (
    <>
      {craftshopList.map((value) => (
        <div
          key={value.id}
          onClick={() => {
            setMode(CraftshopPageMode.DEFAULT);
            setSelectedCraftshop(value);
          }}
        >
          <CraftshopElementsForm props={value} />
        </div>
      ))}
    </>
  );
};

export default RenderCraftshopElements;
