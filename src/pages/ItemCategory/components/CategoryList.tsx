import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      height: 400,
      //   maxWidth: 300,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

function renderRow(props: ListChildComponentProps) {
  const { index, style } = props;

  return (
    <ListItem button style={style} key={index}>
      <ListItemText primary={`목걸이 ${index + 1} 등록된 제품: 20개`} />
    </ListItem>
  );
}

export default function CategoryList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={5}>
        <FixedSizeList height={400} width={"100%"} itemSize={80} itemCount={10}>
          {renderRow}
        </FixedSizeList>
      </Paper>
    </div>
  );
}
