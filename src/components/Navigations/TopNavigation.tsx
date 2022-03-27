import { makeStyles } from "@material-ui/core/styles";
import { BackgroundColor, FontSize, FontColor } from "../../styleTypes";
import AutoSignOut from "./AutoSignOut";

export const topNavigationHeight = 60;

export const topNavigaionStyles = makeStyles(() => ({
  topNavigation: {
    width: "auto",
    height: "60px",
    borderBottom: "1px solid #bbbbbb",

    display: "grid",
    gridTemplateColumns: "auto auto 160px 160px",
    gridTemplateAreas: `"userName remainTime extendTimeBtn signOutBtn"`,
  },
  userName: {
    gridArea: "userName",
    fontWeight: "bold",
    fontSize: FontSize.LARGE,

    marginLeft: "20px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  remainTime: {
    gridArea: "remainTime",
    fontSize: FontSize.MEDIUM_LARGE,

    marginRight: "20px",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  extendTimeBtn: {
    gridArea: "extendTimeBtn",
    margin: "10px",
    border: "none",
    background: BackgroundColor.BUTTON_BG_PINK,
    borderRadius: "5px",
    color: FontColor.WHITE,
    fontSize: FontSize.MEDIUM_LARGE,
    fontWeight: "bold",
  },
  signOutBtn: {
    gridArea: "signOutBtn",
    margin: "10px 10px 10px 10px",
    border: "none",
    background: BackgroundColor.BUTTON_BG_GRAY,
    borderRadius: "5px",
    color: FontColor.WHITE,
    fontSize: FontSize.MEDIUM_LARGE,
    fontWeight: "bold",
  },
}));

export default function TopNavigation() {
  const classes = topNavigaionStyles();

  const username = "엄준식";

  return (
    <>
      <div className={classes.topNavigation}>
        <div className={classes.userName}>안녕하세요 {username} 님</div>
        <AutoSignOut />
      </div>
    </>
  );
}
