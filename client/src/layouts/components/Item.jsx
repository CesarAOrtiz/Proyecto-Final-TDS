import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import List from "@mui/material/List";
import Collapse from "@mui/material/Collapse";
import { useTheme } from "@mui/material/styles";
import NavListItem from "./NavListItem";

export const Item = ({ route, pathname }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  return (
    <>
      <NavListItem
        to={route.href}
        text={route.name}
        active={pathname === route.href}
        Icon={route.Icon}
        component={NavLink}
        key={route.name}
        onClick={() => setOpen(!open)}
      />
      {route.children && (
        <Collapse
          in={open || route.children.map((r) => r.href).includes(pathname)}
          timeout="auto"
          unmountOnExit
        >
          <List component="div" disablePadding>
            {route.children
              .filter((r) => r.href)
              .map((s) => (
                <NavListItem
                  key={s.name}
                  to={s.href}
                  text={s.name}
                  active={pathname === s.href}
                  Icon={s.Icon}
                  component={NavLink}
                  style={{ paddingLeft: theme.spacing(4) }}
                />
              ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

export default Item;
