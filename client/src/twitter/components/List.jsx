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
import TwitterIcon from "@mui/icons-material/Twitter";
import Grid from "@mui/material/Grid";
import InfoStack from "../components/InfoStack.jsx";

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
        {data.map((d) => (
          <React.Fragment key={d.tweet.id}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <MuiListItem alignItems="flex-start">
                  <MuiListItemAvatar>
                    <Tooltip title={setimentText[d.tweet.sentiment]}>
                      <Avatar style={{ background: setimentColor[d.tweet.sentiment] }}>
                        <TwitterIcon />
                      </Avatar>
                    </Tooltip>
                  </MuiListItemAvatar>
                  <MuiListItemText
                    primary={d.user}
                    secondary={
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {d.tweet.text}
                      </Typography>
                    }
                  />
                </MuiListItem>
              </Grid>

              <Grid item xs={12}>
                <InfoStack tweet={d.tweet} />
              </Grid>
            </Grid>
            <Divider />
            {/** */}
            {/* <MuiListItem alignItems="flex-start">
              <MuiListItemAvatar>
                <Avatar style={{ background: setimentColor[d.tweet.sentiment] }}>
                  <TwitterIcon />
                </Avatar>
              </MuiListItemAvatar>

              <MuiListItemText
                primary={d.user}
                secondary={
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {d.tweet.text}
                  </Typography>
                }
                title={d.tweet.text}
              />
            </MuiListItem> */}

            <Divider variant="inset" />
          </React.Fragment>
        ))}
      </MuiList>
    </>
  );
};

export default List;
