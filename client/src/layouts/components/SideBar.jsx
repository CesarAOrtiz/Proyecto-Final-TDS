import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

export default function SideBar({ children, styles, mobileOpen, handleDrawerToggle, ...props }) {
  const window = props.window;
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      component={"nav"}
      sx={styles.drawer}
      style={{
        backgroundColor: "#f5f5f5",
      }}
    >
      <Box sx={{ display: { md: "none", xs: "block" } }}>
        <Drawer
          container={container}
          variant="temporary"
          anchor={"left"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          PaperProps={{
            style: {
              ...styles.drawerPaper,
              ...styles.paperAnchorDockedLeft,
            },
          }}
          // classes={{
          //   paper: classes.drawerPaper,
          //   paperAnchorDockedLeft: classes.paperAnchorDockedLeft,
          // }}
        >
          {children}
        </Drawer>
      </Box>
      <Box sx={{ display: { md: "block", xs: "none" } }}>
        <Drawer
          variant="permanent"
          open
          PaperProps={{
            style: {
              ...styles.drawerPaper,
              ...styles.paperAnchorDockedLeft,
            },
          }}
        >
          {children}
        </Drawer>
      </Box>
    </Box>
  );
}
