import { Theme, createStyles, makeStyles } from "@material-ui/core";
import { drawerWidth } from "../../../components/Navigations/SubNavigation";

//여기도 정리가 필요함
export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    CategoryContentsBase: {
      // margin: theme.spacing(0, 0, 0, `${drawerWidth}px`),
    },

    paperElements: {
      // padding: theme.spacing(0, 0, 3, 0),
    },

    //공통으로 빼는 스타일이 아니면 그냥 거기놔두는 것도 좋을지도?

    paginationNavigation: {
      display: "flex",
      justifyContent: "center",
    },

    paginationCategoryElements: {
      borderBottom: "black solid 0.5px",
      padding: "5px 0 5px 0",
      display: "grid",
      gridAutoColumns: "2fr 5fr 2fr 1.5fr 1.5fr",
      gridTemplateAreas: `"id name itemCount button"`,
    },

    paginationElementId: {
      gridArea: "id",
      display: "flex",
      alignItems: "center",
      paddingLeft: "10px",
    },

    paginationElementName: {
      gridArea: "name",
      display: "block",
      width: "80%",
      margin: "auto",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },

    paginationElementItemCount: {
      gridArea: "itemCount",
      display: "flex",
      alignItems: "center",
    },

    paginationElementButton: {
      gridArea: "button",
      display: "flex",
      alignItems: "center",
    },
  })
);

export const ContentsBaseStyles = makeStyles((theme: Theme) =>
  createStyles({
    ContentsBase: {},
    craftShopListContainer: {
      marginTop: "20px",
      display: "grid",
      gridTemplateRows: "1fr auto",
      gridTemplateColumns: "2fr 5fr 2fr 1fr",
      gridTemplateAreas: `
      "headerCraftName headerCraftAddress headerCraftPhone none"
      "elements elements elements elements"`,
    },
    headerCraftName: {
      gridArea: "headerCraftName",
      paddingLeft: "10px",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    headerCraftAddress: {
      gridArea: "headerCraftAddress",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    headerCraftPhone: {
      gridArea: "headerCraftPhone",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    craftElements: {
      gridArea: "elements",
      borderTop: "1px solid black",
    },
    paginationBlock: {
      backgroundColor: theme.palette.background.paper,
      padding: "50px 48px 0 48px",
      minWidth: "600px",
    },
    paginationAddButton: {
      display: "flex",
      justifyContent: "flex-end",
      padding: "10px 0 10px 0",
    },
    paginationNavigation: {
      display: "flex",
      justifyContent: "center",
    },
  })
);
