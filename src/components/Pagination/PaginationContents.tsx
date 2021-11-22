import { createStyles, makeStyles, Theme } from "@material-ui/core";
import PagonationElementForm from "./PagonationElementForm";
import { Category, PaginationContentsArrayParams } from "../../types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
      padding: "50px 48px 0 48px",
    },
    paginationContents: {
      display: "grid",
      gridRow: "repeat(11, 1fr)",
    },
  })
);

// function List<ItemType extends { id: string }>(props: {
//   items: ItemType[];
//   renderItem: (item: ItemType) => React.ReactNode;
// }) {
//   return (
//     <ul>
//       {props.items.map((item) => (
//         <li key={item.id}>{props.renderItem(item)}</li>
//       ))}
//     </ul>
//   );
// }

type Categorytest = {
  id: number;
  name: string;
  type: string;
  depth: number;
  itemCount: number;
  createdAt: string;
  updatedAt: string;
};

type ArrayTypeForms = Category | Categorytest;

export default function PaginationContents<
  ArrayType extends ArrayTypeForms
>(props: {
  contentsArray: ArrayType[];
  contentsRenderComponent: (value: ArrayType) => JSX.Element;
}) {
  const classes = useStyles();

  return (
    <div className={classes.paginationContents}>
      {props.contentsArray.map((value) => {
        return (
          <>
            <div key={value.id}>
              {props.contentsRenderComponent(value)}
              {/* <PagonationElementForm contentsArray={value} /> */}
            </div>
          </>
        );
      })}
    </div>
  );
}
