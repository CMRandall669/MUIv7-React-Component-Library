import React from "react";
import { Box, Button, Typography } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import OutboundOutlinedIcon from "@mui/icons-material/OutboundOutlined";
import { formatWithCommas } from "../../components/DataGridCommon/helper";

interface SuppressBarProps {
  selectedCount: number;
  inboundCount: number;
  outboundCount: number;
  onSuppressClick: () => void;
}

const SuppressBar = ({
  selectedCount,
  inboundCount,
  outboundCount,
  onSuppressClick,
}: SuppressBarProps) => {
  return (
    <Box display="flex" alignItems="center" gap={7.75}>
      <Typography color="#000000" fontSize="0.875rem">
        {selectedCount} items selected
      </Typography>
      <Button
        variant="outlined"
        disabled={selectedCount === 0}
        onClick={onSuppressClick}
      >
        Suppress Selected Alerts
      </Button>
      <Box display="flex" alignItems="center" gap={1}>
        <OutboundOutlinedIcon
          fontSize="small"
          sx={{ transform: "rotate(180deg)", color: "#607485" }}
        />
        <Typography color="#000000" fontSize="0.875rem">
          {formatWithCommas(inboundCount)} Inbound
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" gap={1}>
        <OutboundOutlinedIcon fontSize="small" sx={{ color: "#607485" }} />
        <Typography color="#000000" fontSize="0.875rem">
          {formatWithCommas(outboundCount)} Outbound
        </Typography>
      </Box>
    </Box>
  );
};

export default SuppressBar;
