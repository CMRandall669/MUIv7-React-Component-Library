import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import type { EdgeToEdgeReportRow } from "../../Pages/EdgeToEdgeReport/DataGrid/types";
import PaginationBar from "../../components/DataGridCommon/DataGridComponents/PaginationBar/PaginationBar";

interface SuppressModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  rows: EdgeToEdgeReportRow[];
  columns: GridColDef[];
}

const SuppressModal = ({
  open,
  onClose,
  onConfirm,
  rows,
  columns,
}: SuppressModalProps) => {
  const [reason, setReason] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    if (!open) {
      setReason("");
      setPage(0);
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle sx={{ padding: 0 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 500,
            fontSize: "1.25rem",
            color: "#075895",
            lineHeight: "160%",
            letterSpacing: "0.15px",
            px: 3,
            py: 2,
          }}
        >
          Confirm Suppression
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Typography
          variant="body2"
          sx={{
            color: "#000000",
            lineHeight: "150%",
            letterSpacing: "0.15px",
            fontSize: "1rem",
            pb: 2.5,
          }}
        >
          Are you sure you want to suppress the selected alerts? This action
          will remove them from the table and cannot be undone.
        </Typography>

        <Typography
          variant="subtitle2"
          sx={{
            color: "#000000",
            fontSize: "1.25rem",
            letterSpacing: "0.15px",
            lineHeight: "160%",
            fontWeight: 500,
            px: 2,
          }}
        >
          Selected Alerts for Suppression
        </Typography>

        <Typography variant="subtitle2" sx={{ color: "#00000099", px: 2 }}>
          Review the alerts below before confirming their removal from the
          unresolved alerts table.
        </Typography>
        <Box sx={{ py: 2 }}>
          <Box sx={{ pb: 2 }}>
            <DataGrid
              rows={rows}
              columns={columns}
              disableRowSelectionOnClick
              hideFooter
              paginationMode="client"
              paginationModel={{ page, pageSize }}
              onPaginationModelChange={({ page, pageSize }) => {
                setPage(page);
                setPageSize(pageSize);
              }}
              getRowId={(row) => row.id}
              sx={{ border: 0 }}
            />
          </Box>

          <PaginationBar
            count={rows.length}
            page={page}
            rowsPerPage={pageSize}
            onPageChange={setPage}
            onRowsPerPageChange={setPageSize}
            rowsPerPageOptions={[5, 10, 15]}
          />
        </Box>

        <TextField
          fullWidth
          required
          multiline
          label="Add the Reason For Suppression"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          slotProps={{
            htmlInput: {
              maxLength: 2000,
            },
          }}
          helperText={`${reason.length}/2000`}
          sx={{ mt: 2 }}
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => onConfirm(reason)}
          color="error"
          variant="contained"
          disabled={reason.trim() === ""}
        >
          Confirm Suppression
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SuppressModal;
