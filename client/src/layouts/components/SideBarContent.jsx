import React from "react";
import { useLocation } from "react-router-dom";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
// import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
import TwitterIcon from "@mui/icons-material/Twitter";
// import FacebookIcon from "@mui/icons-material/Facebook";
import { useAuth } from "../../auth/contexts/AuthContext";
import Item from "./Item";

const defaultRoutes = [
  // {
  //   path: "",
  //   name: "Dashboard",
  //   href: "/home",
  //   Icon: TroubleshootIcon,
  // },
  {
    path: "",
    name: "Twitter",
    href: "/twitter",
    Icon: TwitterIcon,
  },
  // {
  //   path: "",
  //   name: "Facebook",
  //   href: "/facebook",
  //   Icon: FacebookIcon,
  // },
  {
    path: "",
    name: "Usuarios",
    href: "/users",
    Icon: AccountCircleIcon,
    adminRequired: true,
  },
  {
    path: "",
    name: "Perfil",
    href: "/users/profile",
    Icon: ManageAccountsIcon,
  },
];

export default function SideBarContent({ styles, routes }) {
  const { pathname } = useLocation();
  const { userData } = useAuth();

  return (
    <>
      <Toolbar>
        <img src="/img/logo.png" alt="SISCONAD" style={{ margin: "auto", height: 105 }} />
      </Toolbar>

      <List sx={styles.list}>
        {defaultRoutes
          .filter((item) => item.name && item.href)
          .filter((item) => !item.adminRequired || userData.isAdmin)
          .map((route) => (
            <Item key={route.name} route={route} pathname={pathname} />
          ))}
      </List>
    </>
  );
}
