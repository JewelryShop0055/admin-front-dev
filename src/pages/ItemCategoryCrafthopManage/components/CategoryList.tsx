import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import { ListItemSecondaryAction } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
    },

    categoryList: {
      padding: theme.spacing(5, 6),

      "& > *": {
        padding: theme.spacing(0, 0, 1, 0),
      },
    },
  })
);

function ListItemElements() {
  const categorys = ["목걸이", "팔찌", "반지"].map((props) => {
    // console.log(props);
  });
  return (
    <>
      {/* <ListItemText id={labelId} primary={`Line item ${value + 1}`} /> */}
      <ListItemText primary={`Line item `} />
      <ListItemSecondaryAction>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      </ListItemSecondaryAction>
    </>
  );
}

function renderRow(props: ListChildComponentProps) {
  const { index, style } = props;

  return (
    <>
      <ListItem style={style} key={index} divider>
        <ListItemElements />
        <div>{index}</div>
      </ListItem>
    </>
  );
}

export default function CategoryList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.categoryList}>
        <Typography variant="h5" gutterBottom>
          등록된 제품 카테고리
        </Typography>
        <Typography variant="subtitle1" gutterBottom color="textSecondary">
          미분류 카테고리는 삭제가 불가능하며, 기존 카테고리 삭제시 미분류
          상품으로 자동 이동됩니다.
        </Typography>
        <Paper elevation={5}>
          <FixedSizeList
            height={400}
            width={"100%"}
            itemSize={60}
            itemCount={3}
          >
            {renderRow}
          </FixedSizeList>
        </Paper>
      </div>
    </div>
  );
}
