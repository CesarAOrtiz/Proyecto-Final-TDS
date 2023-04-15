import React from "react";
import MuiList from "@mui/material/List";
import MuiListItem from "@mui/material/ListItem";
import MuiListItemText from "@mui/material/ListItemText";
import MuiListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Tooltip from "@mui/material/Tooltip";
import AlertTitle from "@mui/material/AlertTitle";
import MessageIcon from "@mui/icons-material/Message";
import Keywords from "../../components/Keywords";

const setimentColor = {
  "positive": "#1cc88a",
  "neutral": "#bdbdb",
  "negative": "#e74a3b",
};
const setimentText = {
  "positive": "Positivo",
  "neutral": "Neutral",
  "negative": "Negativo",
};

export const List = ({ data, loading, error, ...props }) => {
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {/* This is an error alert — <strong>check it out!</strong> */}
        Lo sentimos, ha ocurrido un error al realizar su búsqueda.
      </Alert>
    );
  }

  return (
    <>
      <MuiList sx={{ width: "100%", bgcolor: "background.paper" }}>
        {data.map((d, i) => (
          <React.Fragment key={i}>
            <MuiListItem alignItems="flex-start">
              <MuiListItemAvatar>
                <Tooltip title={setimentText[d.sentiment]}>
                  <Avatar style={{ background: setimentColor[d.sentiment] }}>
                    <MessageIcon />
                  </Avatar>
                </Tooltip>
              </MuiListItemAvatar>

              <MuiListItemText
                secondary={
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {d.text}
                  </Typography>
                }
                title={d.text}
              />
            </MuiListItem>

            <Box
              style={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "row-reverse",
                marginBottom: 16,
                gap: 10,
              }}
            >
              <Keywords data={d} />
            </Box>
            <Divider variant="inset" />
          </React.Fragment>
        ))}
      </MuiList>
    </>
  );
};

export default List;
