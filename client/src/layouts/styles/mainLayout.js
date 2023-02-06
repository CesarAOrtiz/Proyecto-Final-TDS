import { alpha } from "@mui/material/styles";

const drawerWidth = 280;

export const makeStyles = (theme) => ({
  root: {
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
    minHeight: "100vh",
  },
  appBar: {
    boxShadow: "none",
    backdropFilter: "blur(6px)",
    bgcolor: alpha(theme.palette.background.paper, 0.7),
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    marginLeft: 0,
    color: theme.palette.gray.main,
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  drawer: {
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  toolbar: {
    ...theme.mixins.toolbar,
    height: "80px",
    color: theme.palette.background.paper,
  },
  drawerPaper: {
    width: drawerWidth,
    background: theme.palette.gradient.main,
  },
  paperAnchorDockedLeft: {
    border: "none",
  },
  appBarTitle: {
    color: theme.palette.text.primary,
  },
  logo: {
    height: 40,
    width: 130,
    marginBottom: 10,
    marginRight: 5,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  list: {
    height: "100%",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default makeStyles;
