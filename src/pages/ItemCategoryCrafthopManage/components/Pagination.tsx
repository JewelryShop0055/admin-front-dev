import {
  createStyles,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import { PaperElevation } from "../../../styleTypes";
import Pagination from "@material-ui/lab/Pagination";
import PagonationElementForm from "./PagonationElementForm";
import { Category, getCategoryListResponse } from "../../../types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
    },
  })
);

//PagonationElements : 입력받을 한페이지에 보여줄 내용을 담은 리스트
export default function Pagonation({ CategoryList }: getCategoryListResponse) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h5" gutterBottom>
        등록된 제품 카테고리
      </Typography>

      <Typography variant="subtitle1" gutterBottom color="textSecondary">
        미분류 카테고리는 삭제가 불가능하며, 기존 카테고리 삭제시 미분류
        상품으로 자동 이동됩니다.
      </Typography>

      <Paper elevation={PaperElevation.LOW}>
        {CategoryList.map((value: Category, index: number) => {
          //여기에 PagonationElementForm에 value, 넣고 키값으로 index사용
          //<PagonationElementForm key={index} value={value}>
          const { id, name, type, depth, itemCount, createdAt, updatedAt } =
            value;
          return <PagonationElementForm key={index} />;
        })}
        <Pagination count={10} showFirstButton showLastButton />
      </Paper>
    </div>
  );
}
