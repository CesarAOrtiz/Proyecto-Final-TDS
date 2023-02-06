import React from "react";
import Box from "@mui/material/Box";
import SearchBar from "../../components/SearchBar";
import List from "../components/List";
import WordCloud from "../components/WordCloud";
import Charts from "../components/Charts";

const API_URL = process.env.REACT_APP_API_URL;

export const Search = () => {
  const [data, setData] = React.useState([]);
  const [loading, setloading] = React.useState(false);
  const [error, setError] = React.useState("");

  return (
    <>
      <SearchBar
        onSubmit={(e) => {
          if (!e) return;
          setloading(true);
          setError("");
          fetch(`${API_URL}/twitter?query=${e}`)
            .then((res) => res.json())
            .then((res) => {
              if (!Array.isArray(res)) {
                throw new Error(res.message);
              }
              return res;
            })
            .then(setData)
            .catch(setError)
            .finally(() => setloading(false));
        }}
      />

      <Box
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "row-reverse",
          marginBottom: 16,
          gap: 10,
        }}
      >
        <WordCloud data={data} />
        <Charts data={data} />
      </Box>

      <List data={data} loading={loading} error={error} />
    </>
  );
};

export default Search;
