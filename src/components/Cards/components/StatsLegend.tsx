import { Box, Typography, Skeleton } from "@mui/material";
import { formatWithCommas } from "../helper";

interface StatItem {
  label: string;
  value: number;
  color: string;
}

interface StatsLegendProps {
  stats: StatItem[];
  total: number;
  loading?: boolean;
}

const StatsLegend = ({ stats, total, loading = false }: StatsLegendProps) => {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          mb: 6,
          width: "100%",
          maxWidth: 320, // or whatever width looks best in your layout
          mx: "auto", // centers horizontally
        }}
      >
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} height={24} width="100%" />
            ))
          : stats.map((item) => (
              <Box
                key={item.label}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  overflow: "hidden",
                  flexWrap: "nowrap",
                  minWidth: 0,
                  width: "100%",
                }}
              >
                {/* Color Square */}
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    borderRadius: "2px",
                    backgroundColor: item.color,
                    flexShrink: 0,
                  }}
                />
                {/* Label */}
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "0.875rem",
                    lineHeight: 1.2,
                    fontWeight: 400,
                    whiteSpace: "nowrap",
                    m: 0,
                    flexShrink: 0,
                  }}
                >
                  {item.label}
                </Typography>
                {/* Value and Percent */}
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{
                    fontSize: "0.875rem",
                    lineHeight: 1.2,
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    ml: 1,
                    minWidth: 0,
                    maxWidth: "100%",
                  }}
                >
                  {formatWithCommas(item.value)} /{" "}
                  {((item.value / total) * 100).toFixed(2)}%
                </Typography>
              </Box>
            ))}
      </Box>
    </Box>
  );
};

export default StatsLegend;
