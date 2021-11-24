import { Theme, createStyles, makeStyles } from "@material-ui/core";
import { drawerWidth } from "../../../components/Navigations/SubNavigation";

//여기도 정리가 필요함
export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    CategoryContentsBase: {
      margin: theme.spacing(0, 0, 0, `${drawerWidth}px`),
    },

    paperElements: {
      padding: theme.spacing(0, 0, 3, 0),
    },

    paginationBlock: {
      backgroundColor: theme.palette.background.paper,
      padding: "50px 48px 0 48px",
    },

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
      display: "flex",
      alignItems: "center",
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

    paginationAddButton: {
      display: "flex",
      justifyContent: "flex-end",
      padding: "10px 0 10px 0",
    },
  })
);
