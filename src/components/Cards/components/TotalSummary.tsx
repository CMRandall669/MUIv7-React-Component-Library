import { Box, Typography, Skeleton } from "@mui/material";
import { formatWithCommas } from "../helper";

interface TotalSummaryProps {
  total: number;
  loading?: boolean;
}

const TotalSummary = ({ total, loading = false }: TotalSummaryProps) => {
  return (
    <Box sx={{ mt: 2, textAlign: "center" }}>
      {loading ? (
        <>
          <Skeleton width={40} height={20} />
          <Skeleton width={80} height={30} />
        </>
      ) : (
        <>
          <Typography fontWeight={600} variant="body2" color="textSecondary">
            Total
          </Typography>
          <Typography fontWeight={600} fontSize="1.75rem" color="#607d8b">
            {formatWithCommas(total)}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default TotalSummary;
