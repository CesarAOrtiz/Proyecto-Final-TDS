import { useMemo } from "react";
import { NavLink } from "react-router-dom";
import { alpha } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const getStyles = (theme) => ({
  listItem: { color: "blue.contrastText" },
  activeListItem: { fontWeight: "bold" },
  item: {
    borderRadius: 50,
    textTransform: "capitalize",
    paddingLeft: 2,
    marginTop: 2,
    bgcolor: alpha(theme.palette.gray.main, 0.15),
    "&:hover": { bgcolor: "primary.main" },
  },
  activeItem: {
    bgcolor: "gray.main",
  },
});

const NavListItem = ({ Icon, text, active, ...other }) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <ListItem
      component={NavLink}
      sx={{
        ...styles.item,
        ...(active && styles.activeItem),
      }}
      {...other}
    >
      {Icon && (
        <ListItemIcon
          sx={{
            ...styles.listItem,
            ...(active && styles.activeListItem),
          }}
        >
          <Icon />
        </ListItemIcon>
      )}
      <ListItemText
        sx={{
          ...styles.listItem,
          ...(active && styles.activeListItem),
        }}
      >
        {text}
      </ListItemText>
    </ListItem>
  );
};

export default NavListItem;
