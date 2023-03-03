import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Bar = styled("form")(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.gray.main, 0.15),
  padding: theme.spacing(1),
  display: "flex",
  gap: theme.spacing(2),
  boxShadow: "0 2px 5px rgb(0 0 0 / 0.2)",
  marginBottom: theme.spacing(2),
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1),
    width: "100%",
  },
}));

export const SearchBar = ({ onSubmit, ...props }) => {
  const [query, setQuery] = useState("");
  return (
    <>
      <Bar
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(query);
        }}
      >
        <StyledInputBase
          placeholder="Search"
          type="search"
          variant="outlined"
          size="small"
          style={{ flexGrow: 1 }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          {...props}
        />
        <Button type="submit" variant="contained">
          <SearchIcon />
          <Typography sx={{ display: { sm: "block", xs: "none" } }}>Search</Typography>
        </Button>
      </Bar>
    </>
  );
};

export const SearchArea = ({ onSubmit, ...props }) => {
  const [query, setQuery] = useState("");
  return (
    <>
      <Bar
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(query);
        }}
      >
        <StyledInputBase
          placeholder="Search"
          type="search"
          variant="outlined"
          size="small"
          style={{ flexGrow: 1 }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          {...props}
        />
      </Bar>
      <Button type="submit" variant="contained">
        <SearchIcon />
        <Typography sx={{ display: { sm: "block", xs: "none" } }}>Search</Typography>
      </Button>
    </>
  );
};

export default SearchBar;
