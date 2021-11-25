import React from "react";
import { Button } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";

import { useDispatch } from "react-redux";
import { Category } from "../../../types";
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
  const history = useHistory();
  const dispatch = useDispatch();

  //===transition menuHander
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    dispatch(toggleModalAction.toggleModal());
  };

  return (
    <>
      <div className={classes.paginationCategoryElements}>
        <div className={classes.paginationElementId}>{"고유번호:" + id}</div>
        <div className={classes.paginationElementName}>
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
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={handleClose}>카테고리 수정</MenuItem>
          <MenuItem onClick={handleClose}>카테고리 삭제</MenuItem>
        </Menu>

        {/* <Button
          className={classes.paginationElementButton}
          variant="contained"
          color="primary"
          size="small"
          startIcon={<CreateIcon />}
          onClick={() => dispatch(toggleModalAction.toggleModal())}
        >
          수정/삭제
        </Button> */}
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
