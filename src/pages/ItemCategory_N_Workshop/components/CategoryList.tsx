import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "block",
      width: "100%",
      height: "100%",

      //이거 나중에 minHeight = 100vh - topNavi - categoryEntry로 수정해야함
      minHeight: "72vh ",

      backgroundColor: theme.palette.background.paper,
    },

    categoryList: {
      display: "block",
      padding: theme.spacing(5, 6),

      "& > *": {
        display: "block",
        padding: theme.spacing(0, 0, 3, 0),
      },
    },

    listElement: {
      display: "flex",
    },

    listValue: {
      display: "inline-block",
      flexGrow: 1,
      verticalAlign: "middle",
    },

    listButton: {
      display: "inline-block",
      verticalAlign: "middle",
    },
  })
);

export function ListItemElements() {
  const classes = useStyles();
  return (
    <>
      <div className={classes.listElement}>
        <div className={classes.listValue}>
          <Typography variant="h5" gutterBottom>
            {`목걸이 등록된 제품: 20개`}
          </Typography>
        </div>

        <div className={classes.listButton}>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </div>
      </div>
    </>
  );
}

function renderRow(props: ListChildComponentProps) {
  const { index, style } = props;

  return (
    <>
      <ListItem style={style} key={index} divider>
        <ListItemElements />
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
            itemSize={80}
            itemCount={10}
          >
            {renderRow}
          </FixedSizeList>
        </Paper>
      </div>
    </div>
  );
}
