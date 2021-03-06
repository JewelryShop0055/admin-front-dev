import { createStyles, makeStyles } from "@material-ui/core";
import { Border, FontColor, FontSize } from "../../../styleTypes";
import { Craftshop } from "../../../types";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import { CraftshopPageMode } from "..";
import AddNewCraftshop from "./AddNewCraftshop";
import UpdateCraftshop from "./UpdateCraftshop";
import DeleteCraftshop from "./DeleteCraftshop";

export interface CraftshopDetailProps {
  selectedCraftshop: Craftshop | undefined;
  mode: CraftshopPageMode;
  setMode: React.Dispatch<React.SetStateAction<CraftshopPageMode>>;
}

export const CraftShopDetailStyles = makeStyles(
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

export default function CraftshopDetail({
  selectedCraftshop,
  mode,
  setMode,
}: CraftshopDetailProps) {
  const classes = CraftShopDetailStyles();

  const detailHeadText = (mode: CraftshopPageMode) => {
    switch (mode) {
      case "create":
        return "?????? ????????????";

      case "update":
        return "?????? ????????????";

      case "delete":
        return "?????? ????????????";

      case "default":
        return "?????? ????????????";
      default:
        return "?????? ????????????";
    }
  };

  const detailHeadController = (mode: CraftshopPageMode) => {
    switch (mode) {
      case "default":
        return (
          <>
            <button
              onClick={() => {
                setMode(CraftshopPageMode.UPDATE);
              }}
            >
              <CreateIcon />
              ??????
            </button>
            <button
              onClick={() => {
                setMode(CraftshopPageMode.DELETE);
              }}
            >
              <DeleteIcon />
              ??????
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
        {selectedCraftshop === undefined ? null : detailHeadController(mode)}
      </div>

      <div className={classes.body}>
        {selectedCraftshop === undefined &&
        mode === CraftshopPageMode.DEFAULT ? (
          <EmptyValue />
        ) : (
          <CraftshopValue
            selectedCraftshop={selectedCraftshop}
            mode={mode}
            setMode={setMode}
          />
        )}
      </div>
    </div>
  );
}

function EmptyValue() {
  const classes = CraftShopDetailStyles();
  return <div className={classes.notSelect}>????????? ???????????? ???????????????.</div>;
}

function CraftshopValue({
  selectedCraftshop,
  mode,
  setMode,
}: CraftshopDetailProps) {
  const classes = CraftShopDetailStyles();

  switch (mode) {
    case "default":
      return (
        <>
          <div className={classes.innerHeader}>?????? ???</div>
          <div className={classes.innerElement}>{selectedCraftshop!.name}</div>
          <div className={classes.innerHeader}>?????????</div>
          <div className={classes.innerElement}>{selectedCraftshop!.phone}</div>
          <div className={classes.innerHeader}>????????????</div>
          <div className={classes.innerElement}>
            {selectedCraftshop!.postCode}
          </div>
          <div className={classes.innerHeader}>??????</div>
          <div className={classes.innerElement}>
            {selectedCraftshop!.address}
          </div>
          <div className={classes.innerHeader}>????????????</div>
          <div className={classes.innerElement}>
            {selectedCraftshop!.detailAddress}
          </div>
        </>
      );

    case "create":
      return <AddNewCraftshop setMode={setMode} />;

    case "update":
      if (selectedCraftshop === undefined) {
        return <div>?????? ???????????? ???????????????</div>;
      }
      return (
        <UpdateCraftshop
          selectedCraftshop={selectedCraftshop}
          setMode={setMode}
        />
      );

    case "delete":
      if (selectedCraftshop === undefined) {
        return <div>?????? ???????????? ???????????????</div>;
      }
      return (
        <DeleteCraftshop
          selectedCraftshop={selectedCraftshop}
          setMode={setMode}
        />
      );

    default:
      return (
        <>
          <div className={classes.innerHeader}>?????? ???</div>
          <div className={classes.innerElement}>{selectedCraftshop!.name}</div>
          <div className={classes.innerHeader}>?????????</div>
          <div className={classes.innerElement}>{selectedCraftshop!.phone}</div>
          <div className={classes.innerHeader}>????????????</div>
          <div className={classes.innerElement}>
            {selectedCraftshop!.postCode}
          </div>
          <div className={classes.innerHeader}>??????</div>
          <div className={classes.innerElement}>
            {selectedCraftshop!.address}
          </div>
          <div className={classes.innerHeader}>????????????</div>
          <div className={classes.innerElement}>
            {selectedCraftshop!.detailAddress}
          </div>
        </>
      );
  }
}
