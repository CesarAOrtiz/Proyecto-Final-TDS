import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import DownloadIcon from "@mui/icons-material/Download";
import CloseIcon from "@mui/icons-material/Close";
import { removeStopwords, spa } from "stopword";
import WordCloud from "react-d3-cloud";
import saveSvgAsPng from "save-svg-as-png";
import Modal from "../../components/Modal";

const rotate = (word) => (word.value % 90) - 45;

export const Search = ({ data, ...props }) => {
  const [loading, setloading] = React.useState(false);
  const [words, setWords] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  // const [error, setError] = React.useState('');

  React.useEffect(() => {
    setloading(true);
    const countWords = data
      .map((item) => removeStopwords(item.tweet.text.toLowerCase().split(" "), spa))
      .flat()
      .reduce((acc, word) => {
        if (word.length < 1) return acc;
        const cleaned = word
          .replace(/[`~¡!#$%^&*()_|+\-=¿?;:'",.<>{}[]\\\/]/g, "")
          .replace(/\d/g, "");
        return {
          ...acc,
          [cleaned]: (acc[cleaned] || 0) + 1,
        };
      }, {});
    const words = Object.entries(countWords)
      .map((item) => ({ text: item[0], value: item[1] * 100 }))
      .sort((a, b) => b.value - a.value || a.text.localeCompare(b.text))
      .slice(0, 100);
    setWords(words);
    setloading(false);
  }, [data]);

  return (
    <>
      <Button variant="contained" onClick={(e) => setOpen(true)} disabled={!data.length}>
        <Box sx={{ display: { xs: "none", sm: "block" }, mx: 1 }}>
          <Typography>Nube</Typography>
        </Box>
        <CloudQueueIcon />
      </Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        style={{
          width: "80%",
          maxWidth: "800px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" fontWeight="bold"></Typography>
          <Button onClick={() => setOpen(false)} variant="outlined" color="error">
            <CloseIcon />
          </Button>
        </div>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <CircularProgress />
          </Box>
        ) : null}

        {!loading && words.length ? (
          <Box id="wordcloud">
            <WordCloud
              data={words}
              fontSize={(word) => Math.log2(word.value) * 5}
              rotate={rotate}
              //   width={1000}
              //   height={750}
              //   fontWeight="bold"
            />
            <Box display="flex" flexDirection="row-reverse">
              <Button
                onClick={async () => {
                  const svg = document.querySelector("#wordcloud div svg");
                  await saveSvgAsPng.saveSvgAsPng(svg, "wordcloud.png");
                }}
                variant="contained"
              >
                Descargar
                <DownloadIcon />
              </Button>
            </Box>
          </Box>
        ) : null}
      </Modal>
    </>
  );
};

export default Search;
