import "./index.css";
import { HashRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { AuthProvider } from "./auth";
import muiTheme from "./themes/muiTheme";
import Router from "./routes";
import { StyledEngineProvider } from "@mui/material/styles";

function App() {
  return (
    <ThemeProvider theme={muiTheme}>
      <StyledEngineProvider injectFirst>
        <HashRouter>
          <AuthProvider>
            <Router />
          </AuthProvider>
        </HashRouter>
      </StyledEngineProvider>
    </ThemeProvider>
  );
}

export default App;
