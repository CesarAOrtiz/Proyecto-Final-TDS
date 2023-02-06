import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    gradient: {
      main: "linear-gradient(230deg, #d4cfcf 0%, #6e6d6d 100%)",
      secondary: "linear-gradient(75deg, #4c4c4eab 0%, #6e6d6d 100%)",
    },
    blue: {
      main: "#0498c0",
      light: "#05C5E1",
      dark: "#022A6F",
      contrastText: "#fff",
    },
    gray: {
      main: "#6e6d6d",
      light: "#e0e0e0",
      contrastText: "#fff",
    },
  },
});

export default theme;
