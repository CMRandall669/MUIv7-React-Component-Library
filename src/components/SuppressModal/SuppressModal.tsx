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
import ModalDataGridCommon from "../DataGridCommon/ModalDataGridCommon";
import type { EdgeToEdgeReportRow } from "../../Pages/EdgeToEdgeReport/DataGrid/types";
import PaginationBar from "../../components/DataGridCommon/DataGridComponents/PaginationBar/PaginationBar";

interface SuppressModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  rows: EdgeToEdgeReportRow[];
  columns: GridColDef[];
  titleText?: string;
  confirmMessage?: string;
  tableHeader?: string;
  tableSubtext?: string;
  confirmButtonText?: string;
}

interface SuppressModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  rows: EdgeToEdgeReportRow[];
  columns: GridColDef[];

  titleText?: string;
  confirmMessage?: string;
  tableHeader?: string;
  tableSubtext?: string;
  confirmButtonText?: string;
}

const SuppressModal = ({
  open,
  onClose,
  onConfirm,
  rows,
  columns,
  titleText = "Confirm Suppression",
  confirmMessage = "Are you sure you want to suppress the selected alerts? This action will remove them from the table and cannot be undone.",
  tableHeader = "Selected Alerts for Suppression",
  tableSubtext = "Review the alerts below before confirming their removal from the unresolved alerts table.",
  confirmButtonText = "Confirm Suppression",
}: SuppressModalProps) => {
  const [reason, setReason] = useState("");
  const [reasonError, setReasonError] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    if (!open) {
      setReason("");
      setPage(0);
      setReasonError(false);
    }
  }, [open]);

  const handleConfirmClick = () => {
    if (reason.trim() === "") {
      setReasonError(true);
    } else {
      setReasonError(false);
      onConfirm(reason);
    }
  };

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
          {titleText}
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
          {confirmMessage}
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
          {tableHeader}
        </Typography>

        <Typography variant="subtitle2" sx={{ color: "#00000099", px: 2 }}>
          {tableSubtext}
        </Typography>

        <Box sx={{ py: 2 }}>
          <ModalDataGridCommon
            rows={rows}
            columns={columns}
            checkboxSelection={false}
          />
        </Box>

        <TextField
          fullWidth
          required
          multiline
          label="Add the Reason For Suppression"
          value={reason}
          onChange={(e) => {
            setReason(e.target.value);
            if (e.target.value.trim() !== "") {
              setReasonError(false);
            }
          }}
          slotProps={{
            htmlInput: {
              maxLength: 2000,
            },
          }}
          error={reasonError}
          helperText={`${reason.length}/2000${
            reasonError ? " — This field is required" : ""
          }`}
          sx={{ mt: 2 }}
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirmClick} color="error" variant="text">
          <Typography fontSize="0.875rem">{confirmButtonText}</Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SuppressModal;
