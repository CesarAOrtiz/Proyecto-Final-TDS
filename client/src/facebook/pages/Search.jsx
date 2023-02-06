import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import FacebookIcon from "@mui/icons-material/Facebook";
import SearchBar from "../../components/SearchBar.jsx";
// import { dataset } from "../dataset.js";

const API_URL = process.env.REACT_APP_API_URL;

export const Search = () => {
  const [data, setData] = useState([]);

  return (
    <>
      <SearchBar
        onSubmit={(e) => {
          fetch(`${API_URL}/facebook?url=${e}`)
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((err) => console.log(err));
        }}
      />
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {data.map((d) => (
          <React.Fragment key={d.tweet.id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar>
                  <FacebookIcon />
                </Avatar>
              </ListItemAvatar>

              <ListItemText
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
            </ListItem>

            <Divider variant="inset" />
          </React.Fragment>
        ))}
      </List>
    </>
  );
};

export default Search;
