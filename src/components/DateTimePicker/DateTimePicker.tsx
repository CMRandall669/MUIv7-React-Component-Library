import { Box, Grid, Button, ButtonGroup } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useState, useEffect } from "react";
import {
  startOfToday,
  endOfToday,
  subDays,
  isEqual,
  differenceInMinutes,
} from "date-fns";

type PresetType = "24 Hours" | "Today" | "Yesterday" | "7 Days" | "Custom";

interface GlobalDateRangePickerProps {
  startDate: Date;
  endDate: Date;
  setDateRange: (start: Date, end: Date) => void;
}

const presets: PresetType[] = [
  "24 Hours",
  "Today",
  "Yesterday",
  "7 Days",
  "Custom",
];

const GlobalDateRangePicker = ({
  startDate,
  endDate,
  setDateRange,
}: GlobalDateRangePickerProps) => {
  const [localStart, setLocalStart] = useState<Date>(startDate);
  const [localEnd, setLocalEnd] = useState<Date>(endDate);
  const [activePreset, setActivePreset] = useState<PresetType>("Custom");

  useEffect(() => {
    setLocalStart(startDate);
    setLocalEnd(endDate);
    updateActivePreset(startDate, endDate);
  }, [startDate, endDate]);

  const updateActivePreset = (start: Date, end: Date) => {
    const now = new Date();

    if (
      differenceInMinutes(end, start) === 1440 &&
      isEqual(end, roundToMinute(now))
    ) {
      setActivePreset("24 Hours");
    } else if (isEqual(start, startOfToday()) && isEqual(end, endOfToday())) {
      setActivePreset("Today");
    } else if (
      isEqual(start, subDays(startOfToday(), 1)) &&
      isEqual(end, subDays(endOfToday(), 1))
    ) {
      setActivePreset("Yesterday");
    } else if (
      differenceInMinutes(end, start) === 10080 &&
      isEqual(end, roundToMinute(now))
    ) {
      setActivePreset("7 Days");
    } else {
      setActivePreset("Custom");
    }
  };

  const roundToMinute = (date: Date) => {
    const d = new Date(date);
    d.setSeconds(0, 0);
    return d;
  };

  const handlePreset = (type: PresetType) => {
    const now = roundToMinute(new Date());
    switch (type) {
      case "24 Hours":
        setDateRange(new Date(now.getTime() - 24 * 60 * 60 * 1000), now);
        break;
      case "Today":
        setDateRange(startOfToday(), endOfToday());
        break;
      case "Yesterday":
        setDateRange(subDays(startOfToday(), 1), subDays(endOfToday(), 1));
        break;
      case "7 Days":
        setDateRange(subDays(now, 7), now);
        break;
      case "Custom":
      default:
        break;
    }
  };

  const handleStartChange = (date: Date | null) => {
    if (date) {
      const newStart = roundToMinute(date);
      setLocalStart(newStart);
      setDateRange(newStart, localEnd);
    }
  };

  const handleEndChange = (date: Date | null) => {
    if (date) {
      const newEnd = roundToMinute(date);
      setLocalEnd(newEnd);
      setDateRange(localStart, newEnd);
    }
  };

  return (
    <Box sx={{ backgroundColor: "white", px: 2, py: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          mb: 2,
        }}
      >
        {presets.map((label) => (
          <Button
            key={label}
            onClick={() => handlePreset(label)}
            variant="outlined"
            sx={{
              borderRadius: "9999px",
              textTransform: "none",
              fontWeight: 500,
              fontSize: "0.875rem",
              minWidth: "auto",
              px: 2,
              py: 0.5,
              backgroundColor: activePreset === label ? "#075895" : "white",
              color: activePreset === label ? "white" : "#075895",
              border: activePreset === label ? "none" : "1px solid #075895",
              "&:hover": {
                backgroundColor: activePreset === label ? "#075895" : "#f0f0f0",
                border: activePreset === label ? "none" : "1px solid #075895",
              },
              "&:focus": {
                outline: "none",
              },
              "&.Mui-focusVisible": {
                outline: "none",
              },
            }}
          >
            {label}
          </Button>
        ))}
      </Box>

      <Grid container spacing={2}>
        <Grid>
          <DateTimePicker
            label="From"
            value={localStart}
            onChange={handleStartChange}
            slotProps={{ textField: { fullWidth: true } }}
          />
        </Grid>
        <Grid>
          <DateTimePicker
            label="To"
            value={localEnd}
            onChange={handleEndChange}
            slotProps={{ textField: { fullWidth: true } }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default GlobalDateRangePicker;
