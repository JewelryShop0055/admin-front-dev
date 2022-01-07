import { createStyles, makeStyles } from "@material-ui/core";
import { Border, FontColor, FontSize } from "../../../styleTypes";
import { Craftshop } from "../../../types";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";

interface CraftshopDetailProps {
  selectedCraftshop: Craftshop | undefined;
}

const CraftShopDetailStyles = makeStyles(
  createStyles({
    root: {
      padding: "20px",

      display: "grid",
      gridTemplateRows: "1fr 14fr",
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

export default function CraftshopDetail({
  selectedCraftshop,
}: CraftshopDetailProps) {
  const classes = CraftShopDetailStyles();

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div>공방 상세정보</div>
        <button>
          <CreateIcon />
          수정
        </button>
        <button>
          <DeleteIcon />
          삭제
        </button>
      </div>

      <div className={classes.body}>
        {selectedCraftshop === undefined ? (
          <EmptyValue />
        ) : (
          <CraftshopValue selectedCraftshop={selectedCraftshop} />
        )}
      </div>
    </div>
  );
}

function EmptyValue() {
  const classes = CraftShopDetailStyles();
  return <div className={classes.notSelect}>공방을 선택하지 않았습니다.</div>;
}

function CraftshopValue({ selectedCraftshop }: CraftshopDetailProps) {
  const classes = CraftShopDetailStyles();
  return (
    <>
      <div className={classes.innerHeader}>공방 명</div>
      <div className={classes.innerElement}>{selectedCraftshop!.name}</div>
      <div className={classes.innerHeader}>연락처</div>
      <div className={classes.innerElement}>{selectedCraftshop!.phone}</div>
      <div className={classes.innerHeader}>우편번호</div>
      <div className={classes.innerElement}>{selectedCraftshop!.postCode}</div>
      <div className={classes.innerHeader}>주소</div>
      <div className={classes.innerElement}>{selectedCraftshop!.address}</div>
      <div className={classes.innerHeader}>상세주소</div>
      <div className={classes.innerElement}>
        {selectedCraftshop!.detailAddress}
      </div>
    </>
  );
}
