import React from "react";
import { useLocation } from "react-router-dom";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
// import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
import TwitterIcon from "@mui/icons-material/Twitter";
import MessageIcon from "@mui/icons-material/Message";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import TranslateIcon from "@mui/icons-material/Translate";
import AssistantIcon from "@mui/icons-material/Assistant";
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
    name: "Texto",
    href: "/text",
    Icon: MessageIcon,
  },
  {
    path: "",
    name: "Twitter",
    href: "/twitter",
    Icon: TwitterIcon,
  },
  {
    path: "",
    name: "Preguntas",
    href: "/chat/questions",
    Icon: LiveHelpIcon,
  },
  {
    path: "",
    name: "Traducción",
    href: "/chat/translate",
    Icon: TranslateIcon,
  },
  {
    path: "",
    name: "Chat Bot",
    href: "/chat/assistant",
    Icon: AssistantIcon,
  },
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
