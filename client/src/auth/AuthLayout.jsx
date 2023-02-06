import { Outlet } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

export function AuthLayout(props) {
  const theme = useTheme();
  return (
    <main
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
        backgroundImage: theme.palette.gradient.main,
      }}
    >
      <Outlet />
    </main>
  );
}

export default AuthLayout;
