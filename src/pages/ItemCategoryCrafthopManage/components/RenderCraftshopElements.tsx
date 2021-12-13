import { Theme, createStyles, makeStyles } from "@material-ui/core";

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

export const CraftshopElementsStyles = makeStyles((theme: Theme) =>
  createStyles({
    paginationCraftshopElements: {
      borderBottom: "black solid 0.5px",
      padding: "5px 0 5px 0",
      display: "grid",
      gridAutoColumns: "2fr 5fr 2fr 1.5fr 1.5fr",
      gridTemplateAreas: `"id name itemCount button"`,
    },
    paginationElementName: {
      gridArea: "id",
      display: "flex",
      alignItems: "center",
      paddingLeft: "10px",
    },
    paginationElementAddress: {
      gridArea: "name",
      display: "block",
      width: "80%",
      margin: "auto",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    paginationElementPhone: {
      gridArea: "itemCount",
      display: "flex",
      alignItems: "center",
    },
  })
);

const CraftshopElementsForm: React.FC<{ props: Craftshop }> = ({ props }) => {
  const classes = CraftshopElementsStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  //===transition menuHander
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleReplaceButton = () => {
    setAnchorEl(null);
    //   dispatch(
    //     toggleModalAction.openModal({
    //       modalType: ModalType.REPLACE,
    //       id: id,
    //       name: name,
    //       itemCount: itemCount,
    //     })
    //   );
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
    history.push("/ItemCategoryCrafthopManage/Craftshop/delete");
  };

  return (
    <>
      <div className={classes.paginationCraftshopElements}>
        <div className={classes.paginationElementName}>
          {"공방명:" + props.name}
        </div>
        <div className={classes.paginationElementAddress}>
          {"공방주소:" + props.address}
        </div>
        <div className={classes.paginationElementPhone}>
          {"공방연락처:" + props.phone}
        </div>

        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
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

const RenderCraftshopElements: React.FC<{ craftshopList: Craftshop[] }> = ({
  craftshopList,
}) => {
  return (
    <>
      {craftshopList.map((value) => (
        <div key={value.id}>
          <CraftshopElementsForm props={value} />
        </div>
      ))}
    </>
  );
};

export default RenderCraftshopElements;
