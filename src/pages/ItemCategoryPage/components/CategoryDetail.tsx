import { createStyles, makeStyles } from "@material-ui/core";
import { Border, FontColor, FontSize } from "../../../styleTypes";
import { Category, Craftshop } from "../../../types";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import { ItemCategoryPageMode } from "..";
// import AddNewCraftshop from "./AddNewCraftshop";
// import UpdateCraftshop from "./UpdateCraftshop";
// import DeleteCraftshop from "./DeleteCraftshop";
import AddNewCategory from "./AddNewCategory";
import UpdateCategory from "./UpdateCategory";
import DeleteCategory from "./DeleteCategory";
import { useAppSelector } from "../../../modules/hooks";

export interface CategoryDetailProps {
  selectedCategory: Category | undefined;
  setSelectedCategory: React.Dispatch<
    React.SetStateAction<Category | undefined>
  >;
  mode: ItemCategoryPageMode;
  setMode: React.Dispatch<React.SetStateAction<ItemCategoryPageMode>>;
}

export const CategoryDetailStyles = makeStyles(
  createStyles({
    root: {
      padding: "20px",

      display: "grid",
      gridTemplateRows: "50px 14fr",
      gridTemplateAreas: `
        "header"
        "body"`,
    },
    header: {
      gridArea: "header",
      borderBottom: Border.DEFAULT_BORDER,
      paddingBottom: "10px",

      display: "flex",
      alignItems: "center",
      fontSize: FontSize.MEDIUM_LARGE,
      fontWeight: "bold",

      "& > div:nth-child(1)": {
        flex: "1",
      },
      "& > button:nth-child(n)": {
        border: "none",
        fontSize: FontSize.MEDIUM,
        background: "none",
        display: "flex",
        alignItems: "center",
      },
    },
    body: {
      gridArea: "body",
      marginTop: "10px",

      "& > *": {
        margin: "10px 0 10px 0",
      },
    },

    innerHeader: {
      fontSize: FontSize.MEDIUM_LARGE,
      fontWeight: "bold",
    },
    innerElement: {
      fontSize: FontSize.MEDIUM_LARGE,
      marginLeft: "20px",
    },

    notSelect: {
      position: "relative",
      top: "50%",

      fontSize: FontSize.MEDIUM_LARGE,
      color: FontColor.GRAY,

      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  })
);

export default function CategoryDetail({
  selectedCategory,
  setSelectedCategory,
  mode,
  setMode,
}: CategoryDetailProps) {
  const classes = CategoryDetailStyles();

  const detailHeadText = (mode: ItemCategoryPageMode) => {
    switch (mode) {
      case "create":
        return "카테고리 등록하기";

      case "update":
        return "카테고리 수정하기";

      case "delete":
        return "카테고리 삭제하기";

      case "default":
        return "카테고리 상세정보";
      default:
        return "카테고리 상세정보";
    }
  };

  const detailHeadController = (mode: ItemCategoryPageMode) => {
    switch (mode) {
      case "default":
        return (
          <>
            <button
              onClick={() => {
                setMode(ItemCategoryPageMode.UPDATE);
              }}
            >
              <CreateIcon />
              수정
            </button>
            <button
              onClick={() => {
                setMode(ItemCategoryPageMode.DELETE);
              }}
            >
              <DeleteIcon />
              삭제
            </button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div>{detailHeadText(mode)}</div>
        {selectedCategory === undefined ? null : detailHeadController(mode)}
      </div>

      <div className={classes.body}>
        {selectedCategory === undefined &&
        mode === ItemCategoryPageMode.DEFAULT ? (
          <EmptyValue />
        ) : (
          <CraftshopValue
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            mode={mode}
            setMode={setMode}
          />
        )}
      </div>
    </div>
  );
}

function EmptyValue() {
  const classes = CategoryDetailStyles();
  return (
    <div className={classes.notSelect}>카테고리를 선택하지 않았습니다.</div>
  );
}

function CraftshopValue({
  selectedCategory,
  setSelectedCategory,
  mode,
  setMode,
}: CategoryDetailProps) {
  const classes = CategoryDetailStyles();

  switch (mode) {
    case "default":
      return (
        <>
          <div className={classes.innerHeader}>카테고리 명</div>
          <div className={classes.innerElement}>{selectedCategory!.name}</div>
          <div className={classes.innerHeader}>등록 제품 수</div>
          <div className={classes.innerElement}>
            {selectedCategory!.itemCount}
          </div>
        </>
      );

    case "create":
      return <AddNewCategory setMode={setMode} />;

    case "update":
      if (selectedCategory === undefined) {
        return <div>값이 선택되지 않았습니다</div>;
      }
      return (
        <UpdateCategory
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          setMode={setMode}
        />
      );

    case "delete":
      if (selectedCategory === undefined) {
        return <div>값이 선택되지 않았습니다</div>;
      }
      return (
        <DeleteCategory selectedCategory={selectedCategory} setMode={setMode} />
      );

    default:
      return (
        <>
          <div className={classes.innerHeader}>카테고리 명</div>
          <div className={classes.innerElement}>{selectedCategory!.name}</div>
          <div className={classes.innerHeader}>등록 제품 수</div>
          <div className={classes.innerElement}>
            {selectedCategory!.itemCount}
          </div>
        </>
      );
  }
}
