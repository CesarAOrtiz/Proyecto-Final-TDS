import { useState, useMemo } from "react";
import { Outlet } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/system/Box";
import { getRoutes } from "../routes";
import makeStyles from "./styles/mainLayout";
import { AppBar, SideBar, SideBarContent } from "./components";

export default function ResponsiveDrawer({ path }) {
  const [routes] = useState(getRoutes(path));
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={styles.root}>
      <AppBar styles={styles} handleDrawerToggle={handleDrawerToggle} title={"SISCONAD"} />

      <SideBar styles={styles} handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen}>
        <SideBarContent styles={styles} routes={routes} />
      </SideBar>

      <main style={styles.content}>
        <Box sx={styles.toolbar} />
        <Outlet />
      </main>
    </Box>
  );
}
