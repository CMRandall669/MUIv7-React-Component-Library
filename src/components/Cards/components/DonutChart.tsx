import { Box } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";
import { formatWithCommas } from "../helper";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DonutChartProps {
  total: number;
  success: number;
  failure: number;
  suppressed: number;
  inProcess: number;
  loading?: boolean;
}

const DonutChart = ({
  total,
  success,
  failure,
  suppressed,
  inProcess,
  loading = false,
}: DonutChartProps) => {
  const chartData = {
    labels: ["Success", "Failure", "Suppressed", "In Process"],
    datasets: [
      {
        data: [success, failure, suppressed, inProcess],
        backgroundColor: ["#2e7d32", "#d32f2f", "#607d8b", "#075895"],
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    cutout: "75%",
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.parsed;
            const percent = ((value / total) * 100).toFixed(2);
            return `${formatWithCommas(value)} (${percent}%)`;
          },
        },
      },
    },
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: 200,
        aspectRatio: "1",
        mx: "auto",
      }}
    >
      <Doughnut data={chartData} options={options} />
    </Box>
  );
};

export default DonutChart;
