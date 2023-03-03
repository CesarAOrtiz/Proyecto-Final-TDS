import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";
import BarChartIcon from "@mui/icons-material/BarChart";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "../../components/Modal";

export const Doughnut = ({ data, ...props }) => {
  const chartRef = useRef();

  useEffect(() => {
    const config = {
      type: "doughnut",
      data,
      options: {
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true, labels: { fontStyle: "bold" } },
        },
      },
    };

    if (chartRef.current) {
      chartRef.current.reset(config);
    } else {
      const myChart = new Chart(document.getElementById("dashpie"), config);
      chartRef.current = myChart;
      myChart.render();
    }
  }, [data]);

  return (
    <div>
      <canvas id={"dashpie"} />
    </div>
  );
};

export const Search = ({ data, ...props }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button variant="contained" onClick={(e) => setOpen(true)} disabled={!data.length}>
        <Box sx={{ display: { xs: "none", sm: "block" }, mx: 1 }}>
          <Typography>Gráficos</Typography>
        </Box>
        <BarChartIcon />
      </Button>

      <Modal open={open} onClose={() => setOpen(false)} style={{ width: "80%", maxWidth: "800px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" fontWeight="bold"></Typography>
          <Button onClick={() => setOpen(false)} variant="outlined" color="error">
            <CloseIcon />
          </Button>
        </div>

        <Box id="wordcloud">
          <Doughnut
            data={{
              labels: ["Positivo", "Neutral", "Negativo"],
              datasets: [
                {
                  data: data.reduce(
                    (acc, cur) => {
                      acc[0] += cur.sentiment === "positive" ? 1 : 0;
                      acc[1] += cur.sentiment === "neutral" ? 1 : 0;
                      acc[2] += cur.sentiment === "negative" ? 1 : 0;
                      return acc;
                    },
                    [0, 0, 0],
                  ),
                  backgroundColor: ["#1cc88a", "#bdbdbd", "#e74a3b"],
                  borderColor: "#ffffff",
                },
              ],
            }}
          />
          <Box display="flex" flexDirection="row-reverse">
            <Button
              onClick={async () => {
                const canvas = document.getElementById("dashpie");
                const dataURL = canvas.toDataURL("image/png");
                const link = document.createElement("a");
                link.download = "chart.png";
                link.href = dataURL;
                link.click();
              }}
              variant="contained"
            >
              Descargar
              <DownloadIcon />
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Search;
