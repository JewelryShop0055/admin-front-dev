import React, { useState } from "react";
import { Button } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";

import { useDispatch } from "react-redux";
import { Category, ModalType } from "../../../types";
import { useHistory } from "react-router";
import { actions as replaceCurrentCategoryActions } from "../../../store/replaceCurrentCategory/slice";
import { useStyles } from "../utils/useStyles";

import { actions as toggleModalAction } from "../../../store/categoryModal/slice";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";

import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";

function CategoryElementsForm({
  id,
  name,
  itemCount,
}: Pick<Category, "id" | "name" | "itemCount">) {
  const classes = useStyles();
  const dispatch = useDispatch();

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
    dispatch(
      toggleModalAction.openModal({
        modalType: ModalType.REPLACE,
        id: id,
        name: name,
        itemCount: itemCount,
      })
    );
  };

  const handleDeleteButton = () => {
    setAnchorEl(null);
    dispatch(
      toggleModalAction.openModal({
        modalType: ModalType.DELETE,
        id: id,
        name: name,
        itemCount: itemCount,
      })
    );
  };

  return (
    <>
      <div className={classes.paginationCategoryElements}>
        <div className={classes.paginationElementId}>{"고유번호:" + id}</div>
        <div className={classes.paginationElementName} title={name}>
          {"카테고리명:" + name}
        </div>
        <div className={classes.paginationElementItemCount}>
          {"소속제품수:" + itemCount}
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
          <MenuItem onClick={handleReplaceButton}>카테고리 수정</MenuItem>
          <MenuItem onClick={handleDeleteButton}>카테고리 삭제</MenuItem>
        </Menu>
      </div>
    </>
  );
}

const RenderCategoryElements: React.FC<{
  categoryList: Category[];
}> = ({ categoryList }) => {
  return (
    <>
      {categoryList.map((value) => (
        <div key={value.id}>
          <CategoryElementsForm
            id={value.id}
            name={value.name}
            itemCount={value.itemCount}
          />
        </div>
      ))}
    </>
  );
};

export default RenderCategoryElements;
