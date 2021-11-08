import React, { useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import { ListItemSecondaryAction } from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "../../../modules/hooks";
import { actions as getCategoryListActions } from "../../../store/categoryList/slice";
import { actions as deleteCategoryActions } from "../../../store/deleteCategory/slice";
import { Category } from "../../../types";

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

    categoryListElements: {
      display: "flex",
      justifyContent: "space-between",
    },

    categoryListEnd: {
      color: "gray",
      display: "flex",
      justifyContent: "center",
    },
  })
);

interface ListItemElementsParams {
  itemIndex: number;
}

function ListItemElements({ itemIndex }: ListItemElementsParams) {
  const classes = useStyles();

  const Response = useAppSelector((state) => state.categoryList.categoryList);
  const listLength = useAppSelector((state) => state.categoryList.listLength);
  const pageState = useAppSelector((state) => state.categoryList.page);
  const listLoadComplete = useAppSelector(
    (state) => state.categoryList.isCategoryListLoadComplete
  );

  //맨마지막페이지 로딩시 더이상 api콜하지 않도록해야함
  //신규 카테고리 등록시 바로 맨밑에 추가되어서 보이도록 해야함
  const dispatch = useAppDispatch();
  if (itemIndex === listLength - 10 && !listLoadComplete) {
    dispatch(
      getCategoryListActions.getCategoryListPending({
        page: pageState + 1,
        limit: 20,
      })
    );
  }

  const initialCategoryList: Category[] = [
    {
      id: 0,
      name: "blank",
      type: "",
      depth: 0,
      itemCount: 0,
      createdAt: "",
      updatedAt: "",
    },
  ];
  const categoryList = (categoryListResponse: Category[] | undefined) => {
    if (categoryListResponse === undefined) {
      return initialCategoryList;
    } else {
      return categoryListResponse;
    }
  };

  if (categoryList(Response)[itemIndex] !== undefined) {
    return (
      <>
        <div className={classes.categoryListElements}>
          <ListItemText
            primary={`${itemIndex} 카테고리명 : ${
              categoryList(Response)[itemIndex].name
            }`}
          />
          <ListItemText
            primary={`소속 제품 수 : ${
              categoryList(Response)[itemIndex].itemCount
            } 고유id : ${categoryList(Response)[itemIndex].id}`}
          />
          <ListItemSecondaryAction>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              startIcon={<DeleteIcon />}
              onClick={() => {
                dispatch(
                  deleteCategoryActions.deleteCategoryPending({
                    categoryId: categoryList(Response)[itemIndex].id,
                    categoryName: categoryList(Response)[itemIndex].name,
                  })
                );
              }}
            >
              Delete
            </Button>
          </ListItemSecondaryAction>
        </div>
      </>
    );
  } else {
    return (
      <>
        <ListItemText
          className={classes.categoryListEnd}
          primary={`모든 리스트를 불러왔습니다.`}
        />
      </>
    );
  }
}

function renderRow(props: ListChildComponentProps) {
  const { index, style } = props;

  return (
    <>
      <ListItem style={style} key={index} divider>
        <ListItemElements itemIndex={index} />
      </ListItem>
    </>
  );
}

//처음에는 30개의 리스트를 가져오고, 그다음에는 스크롤할때 이미가져온것 외의 추가 리스트를 랜더링 해야할때
//다시 api요청을 해서 가져오는 형식으로...
//ex 현재 list페이지의 최하단이 index10이며 보유가이드라인이 10개일때 가지고있는것이 15까지라면 5개가 부족하기에 추가 요청필요
//=> api 추가 요청을 통해 리스트 배열에 추가해야한다.

export default function CategoryList() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const listLength = useAppSelector((state) => state.categoryList.listLength);

  useEffect(() => {
    console.log("카테고리 리스트처음 렌더링");
    //여기서 카테고리 리스트 0번째 페이지 (20개)를 api콜로 요청한다.
    //이후 리스트를 스크롤하면서 맨밑인덱스가 10에 도달해서 잔여갯수가 10이하가 되는순간 api콜을 위에서 또 보내서 20개를 보충한다
    //다만, 처음랜더링할때는 로딩된 element의 인덱스 외의 21번째~부터는 Loading...이라는 문구로 표시하도록 설정한다
    dispatch(
      getCategoryListActions.getCategoryListPending({
        page: 0,
        limit: 20,
      })
    );
    return () => {
      console.log("카테고리 리스트페이지에서 떠남");
    };
  }, []);

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
            itemCount={listLength + 1}
          >
            {renderRow}
          </FixedSizeList>
        </Paper>
      </div>
    </div>
  );
}
