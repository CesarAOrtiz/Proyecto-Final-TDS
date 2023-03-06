import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import MuiList from "@mui/material/List";
import MuiListItem from "@mui/material/ListItem";
import Tooltip from "@mui/material/Tooltip";
import ListItemText from "@mui/material/ListItemText";
import MuiListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import Modal from "./Modal";

export const Keywords = ({ data, ...props }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Tooltip title="Palabras Clave">
        <Button size="small" variant="outlined" onClick={(e) => setOpen(true)}>
          <Box sx={{ display: { xs: "none", sm: "block" }, mx: 1 }}>
            <Typography>Palabras Clave</Typography>
          </Box>
          <SearchIcon />
        </Button>
      </Tooltip>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        style={{ width: "90%", maxWidth: "400px", maxHeight: 600 }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" fontWeight="bold"></Typography>
          <Button onClick={() => setOpen(false)} variant="outlined" color="error">
            <CloseIcon />
          </Button>
        </div>

        <Box id="keywords">
          <MuiList sx={{ overflowY: "auto", maxHeight: 500 }}>
            {data.keywords.map((k, i) => (
              <MuiListItem alignItems="flex-start" style={{ alignItems: "center" }}>
                <MuiListItemAvatar>
                  <Avatar>
                    <PriorityHighIcon />
                  </Avatar>
                </MuiListItemAvatar>

                <ListItemText
                  primary={""}
                  secondary={
                    <Typography sx={{ fontWeight: "bold" }} variant="body1" color="text.primary">
                      {k}
                    </Typography>
                  }
                />
                {/* <Typography variant="body1" style={{ fontWeight: "bold" }}>
                  {k}
                </Typography> */}
              </MuiListItem>
            ))}
          </MuiList>
        </Box>
      </Modal>
    </>
  );
};

export default Keywords;
