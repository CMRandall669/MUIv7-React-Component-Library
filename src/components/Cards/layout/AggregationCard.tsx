import {
  Box,
  Paper,
  Typography,
  Skeleton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import TotalSummary from "../components/TotalSummary";
import StatsLegend from "../components/StatsLegend";
import DonutChart from "../components/DonutChart";

interface Props {
  total: number;
  success: number;
  failure: number;
  suppressed: number;
  inProcess: number;
  loading?: boolean;
}

const AggregationCard = ({
  total,
  success,
  failure,
  suppressed,
  inProcess,
  loading = false,
}: Props) => {
  const isCompact = useMediaQuery("(max-width: 1600px)");

  const stats = [
    { label: "Success", value: success, color: "#2e7d32" },
    { label: "Failed", value: failure, color: "#d32f2f" },
    { label: "Suppressed", value: suppressed, color: "#607d8b" },
    { label: "In Process", value: inProcess, color: "#075895" },
  ];

  return (
    <Paper
      sx={{
        py: 3,
        px: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      {/* Heading */}
      <Box
        sx={{
          pb: 2,
          textAlign: isCompact ? "center" : "left",
          display: "flex",
          justifyContent: isCompact ? "center" : "flex-start",
          flexWrap: "wrap",
        }}
      >
        <Typography fontSize="2.125rem">
          <Typography component="span" fontSize="2.125rem" fontWeight={600}>
            In
          </Typography>
          <Typography component="span" fontSize="2.125rem" fontWeight={400}>
            bound
          </Typography>
          <Typography
            component="span"
            fontSize="2.125rem"
            fontWeight={400}
            px={0.5}
          >
            &amp;
          </Typography>
          <Typography component="span" fontSize="2.125rem" fontWeight={600}>
            Out
          </Typography>
          <Typography component="span" fontSize="2.125rem" fontWeight={400}>
            bound Transactions
          </Typography>
        </Typography>
      </Box>

      {/* Chart + Legend */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: isCompact ? "column" : "row",
          alignItems: isCompact ? "center" : "stretch",
          flexGrow: 1,
          gap: 2,
        }}
      >
        {/* Chart and Total */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flex: isCompact ? "none" : 1,
          }}
        >
          {loading ? (
            <Skeleton variant="circular" width={180} height={180} />
          ) : (
            <DonutChart
              total={total}
              success={success}
              failure={failure}
              suppressed={suppressed}
              inProcess={inProcess}
            />
          )}
          <TotalSummary total={total} loading={loading} />
        </Box>

        {/* Legend */}
        <Box
          sx={{
            flex: isCompact ? "none" : 1,
            width: "100%",
            display: "flex",
            justifyContent: isCompact ? "center" : "flex-start",
          }}
        >
          <StatsLegend stats={stats} total={total} loading={loading} />
        </Box>
      </Box>
    </Paper>
  );
};

export default AggregationCard;
