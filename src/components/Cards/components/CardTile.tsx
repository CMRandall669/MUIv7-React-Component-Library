import { Box, Typography, Paper, Skeleton } from "@mui/material";
import type { ReactNode } from "react";
import { formatWithCommas } from "../helper";

interface CardTileProps {
  title: string;
  value: string | number | null;
  percentage?: string | null;
  icon?: ReactNode;
  color?: string;
  width?: string | number;
  flex?: string | number;
  loading?: boolean;
}

const CardTile = ({
  title,
  value,
  percentage,
  icon,
  color = "#075895",
  width,
  flex,
  loading = false,
}: CardTileProps) => {
  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        height: "100%",
        p: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: "12px",
        backgroundColor: "white",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        {icon}
        <Typography fontSize="1rem">{title}</Typography>
      </Box>

      <Box sx={{ textAlign: "center", width: "100%" }}>
        {loading || value === null ? (
          <Skeleton
            variant="text"
            width="80%"
            height={36}
            sx={{ mx: "auto" }}
          />
        ) : (
          <Typography
            variant="h5"
            fontWeight={500}
            fontSize="2.125rem"
            sx={{ color: "#607d8b" }}
          >
            {typeof value === "number" ? formatWithCommas(value) : value}
          </Typography>
        )}

        {loading || percentage === null ? (
          <Skeleton
            variant="text"
            width="40%"
            height={24}
            sx={{ mx: "auto", mt: 1 }}
          />
        ) : (
          <Typography variant="body1" fontSize="1rem" color="textSecondary">
            {percentage}
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default CardTile;
