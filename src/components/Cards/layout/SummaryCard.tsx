import { Box, Typography, Paper } from "@mui/material";
import CardTile from "../components/CardTile";
import type { SummaryCardTileProps } from "../types";

interface SummaryCardProps {
  title: string;
  tiles: SummaryCardTileProps[];
  loading?: boolean;
}

const renderStyledTitle = (title: string) => {
  switch (title) {
    case "Inbound Transactions":
      return (
        <>
          <Typography
            component="span"
            fontSize="2.125rem"
            fontWeight={600}
            sx={{ lineHeight: 1.2 }}
          >
            In
          </Typography>
          <Typography
            component="span"
            fontSize="2.125rem"
            fontWeight={400}
            sx={{ lineHeight: 1.2 }}
          >
            bound Transactions
          </Typography>
        </>
      );
    case "Outbound Transactions":
      return (
        <>
          <Typography
            component="span"
            fontSize="2.125rem"
            fontWeight={600}
            sx={{ lineHeight: 1.2 }}
          >
            Out
          </Typography>
          <Typography
            component="span"
            fontSize="2.125rem"
            fontWeight={400}
            sx={{ lineHeight: 1.2 }}
          >
            bound Transactions
          </Typography>
        </>
      );
    default:
      return (
        <Typography variant="h6" fontSize="2.125rem" fontWeight={600}>
          {title}
        </Typography>
      );
  }
};

const SummaryCard = ({ title, tiles, loading = false }: SummaryCardProps) => {
  return (
    <Paper
      sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column" }}
    >
      <Box
        sx={{
          pb: 2,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "baseline",
        }}
      >
        {renderStyledTitle(title)}
      </Box>

      {/* Row 1 – first two tiles */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
        {tiles.slice(0, 2).map((tile, idx) => (
          <Box
            key={`top-${idx}`}
            sx={{
              flex: { xs: "1 1 100%", sm: "1 1 48%", md: "1 1 48%" },
              minWidth: "180px",
            }}
          >
            <CardTile {...tile} loading={loading} />
          </Box>
        ))}
      </Box>

      {/* Row 2 – remaining tiles */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {tiles.slice(2).map((tile, idx) => (
          <Box
            key={`bottom-${idx}`}
            sx={{
              flex: { xs: "1 1 100%", sm: "1 1 30%", md: "1 1 30%" },
              minWidth: "140px",
            }}
          >
            <CardTile {...tile} loading={loading} />
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default SummaryCard;
