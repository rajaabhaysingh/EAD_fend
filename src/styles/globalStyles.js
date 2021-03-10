import { makeStyles } from "@material-ui/core";

const useGlobalStyles = makeStyles((theme) => ({
  menuItemPri: {
    "&:active": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.text.white,
    },
  },
  marTB_4: {
    marginTop: "4px",
    marginBottom: "4px",
  },
  marTB_8: {
    marginTop: "8px",
    marginBottom: "8px",
  },
  sqIconBtn: {
    border: `1px solid ${theme.palette.primary.main}`,
  },
  inputSearch: {
    backgroundColor: theme.palette.background.paperLight,
    height: "38px",
    maxWidth: "300px",
    borderRadius: "8px 0 0 8px",
    padding: "0 8px",
    boxSizing: "border-box",
    outline: "none",
    border: `1px solid rgba(0,0,0,0.25)`,
    "&:focus": {
      border: `1px solid ${theme.palette.primary.main}`,
    },
    color: theme.palette.text.primary,
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flex: "1",
      maxWidth: "100%",
      borderRadius: "4px 0 0 4px",
      "&:focus": {
        border: `1px solid ${
          theme.palette.type === "light"
            ? theme.palette.tertiary.main
            : theme.palette.primary.main
        }`,
      },
    },
  },
  searchBtn: {
    height: "38px",
    width: "60px",
    color: theme.palette.text.white,
    padding: "auto",
    borderRadius: "0 8px 8px 0",
    outline: "none",
    border: "none",
    backgroundColor: theme.palette.primary.main,
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      borderRadius: "0 4px 4px 0",
      backgroundColor:
        theme.palette.type === "light"
          ? theme.palette.tertiary.main
          : theme.palette.primary.main,
    },
  },
  bodyRoot: {
    backgroundColor: theme.palette.background.bg,
    width: "100%",
    position: "absolute",
    top: "92px",
    left: "0",
    [theme.breakpoints.down("sm")]: {
      top: "60px",
    },
  },
  navLink: {
    marginRight: "12px",
    fontSize: "0.85rem",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    borderRadius: "4px",
    padding: "0 4px",
    color: theme.palette.text.secondary,
    borderLeft: `4px solid rgba(0,0,0,0)`,
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9rem",
      padding: "12px 16px",
      borderRadius: "0 32px 32px 0",
      flex: "1",
    },
  },
  navLinkActive: {
    color: theme.palette.primary.main,
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    [theme.breakpoints.down("sm")]: {
      backgroundColor: "rgba(0,0,0,0.05)",
    },
  },
  simpleLabel: {
    color: theme.palette.text.secondary,
    marginRight: "4px",
  },
  imgContainer: {
    width: "100%",
    paddingTop: "50%",
    position: "relative",
    [theme.breakpoints.between("xs", "sm")]: {},
    [theme.breakpoints.between("sm", "md")]: {
      paddingTop: "25%",
    },
    [theme.breakpoints.between("md", "xl")]: {
      paddingTop: "16.66%",
    },
    [theme.breakpoints.up("xl")]: {
      paddingTop: "12.5%",
    },
  },
  carouselBanner: {
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    objectFit: "cover",
    objectPosition: "center",
    position: "absolute",
    top: "0px",
    left: "0px",
    [theme.breakpoints.up("xs")]: {
      borderRadius: "4px",
    },
  },
  secContainer: {
    padding: "16px 0",
    marginTop: "16px",
    [theme.breakpoints.down("sm")]: {
      padding: "8px 0",
      marginTop: "8px",
    },
    boxShadow: theme.shadows[6],
  },
  pclr_mobtb: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  pctb_moblr: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "row",
      alignItems: "center",
    },
  },
  pctb_moblr_spbw: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
  },
  pcMarT8: {
    marginTop: "8px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "0",
    },
  },
  pcPadB16: {
    paddingBottom: "16px",
    [theme.breakpoints.down("sm")]: {
      paddingBottom: "0",
    },
  },
  pcOfScr: {
    [theme.breakpoints.up("xs")]: {
      overflow: "scroll",
    },
  },
  pcTimeAgo: {
    [theme.breakpoints.up("xs")]: {
      position: "absolute",
      top: "0",
      right: "0",
    },
  },
  mobMarT8: {
    [theme.breakpoints.down("sm")]: {
      marginTop: "8px",
    },
  },
  mobMarL8: {
    [theme.breakpoints.down("sm")]: {
      marginLeft: "8px",
    },
  },
  hovActive: {
    background: theme.palette.divider,
    borderRadius: "33px",
    padding: "1px",
    marginRight: "16px",
    "&:hover": {
      background: `linear-gradient(${theme.palette.primary.main}, rgba(0,0,0,0))`,
      boxShadow: theme.shadows[16],
    },
    [theme.breakpoints.down("sm")]: {
      borderRadius: "0",
      padding: "0",
      marginRight: "0",
    },
  },
  pad_lr_8_16: {
    paddingLeft: "16px",
    paddingRight: "16px",
    boxSizing: "border-box",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "8px",
      paddingRight: "8px",
    },
  },
  custMobList: {
    [theme.breakpoints.down("sm")]: {
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: "8px",
    },
  },
  txtSmSec: {
    fontSize: "0.8rem",
    color: theme.palette.text.secondary,
  },
  txtSmPriCol: {
    color: theme.palette.primary.main,
    fontSize: "0.8rem",
  },
  smTag: {
    borderRadius: "4px",
    padding: "2px 4px",
    background: theme.palette.primary.main,
    color: theme.palette.text.white,
    fontSize: "0.75rem",
  },
  mainTitle: {
    fontSize: "1.5rem",
    textAlign: "center",
    fontWeight: "bold",
    color: theme.palette.text.secondary,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },
  },
  subTitle: {
    marginTop: "4px",
    fontSize: "0.8rem",
    color: theme.palette.text.secondary,
    textAlign: "center",
  },
  rounded: {
    borderRadius: "50px",
    textTransform: "none",
  },
}));

export default useGlobalStyles;
