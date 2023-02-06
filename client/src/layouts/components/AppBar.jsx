import React from "react";
import { NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import { logout } from "../../firebase/auth";

export default function NavBar({ styles, handleDrawerToggle }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" sx={styles.appBar}>
      <Toolbar style={{ height: 89, padding: "0 24px" }}>
        <IconButton
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={styles.menuButton}
        >
          <MenuIcon />
        </IconButton>

        <Box
          sx={{
            height: { xs: 40, sm: 50, md: 60, lg: 60, xl: 60 },
          }}
          style={{ display: "flex", alignItems: "center" }}
        >
          <img src="/img/logo.png" alt="Logo Defensor Del Pueblo" height={50} />
        </Box>
        <Box sx={{ flexGrow: 1 }} />

        <div>
          <IconButton onClick={handleMenu} sx={{ p: 0 }}>
            <Tooltip title="Opciones">
              <Avatar sx={{ bgcolor: "primary.main", "&:hover": { bgcolor: "primary.dark" } }}>
                <AccountCircle />
              </Avatar>
            </Tooltip>
          </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            keepMounted
            open={!!anchorEl}
            onClose={handleClose}
          >
            <NavLink to="../users/profile" style={{ textDecoration: "none", color: "#212121" }}>
              <MenuItem>Perfil</MenuItem>
            </NavLink>

            <MenuItem onClick={logout}>Cerrar Sesión</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}
