import { useFlightStore } from "@/stores/flights-store";
import { CalendarToday } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/style.css";

export function DatePickerModal() {
  const theme = useTheme();
  const { tripType, selectedDateRange, setDateRange } = useFlightStore();
  const [isOpen, setIsOpen] = useState(false);
  const [tempDateRange, setTempDateRange] = useState<DateRange | undefined>();

  const handleOpen = () => {
    setTempDateRange(selectedDateRange);
    setIsOpen(true);
  };

  const handleClose = () => {
    setTempDateRange(undefined);
    setIsOpen(false);
  };

  const handleConfirm = () => {
    setDateRange(tempDateRange);
    setIsOpen(false);
  };

  const handleDateRangeSelect = (range: DateRange | undefined) => {
    setTempDateRange(range);
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const commonStyles = {
    "--rdp-cell-size": "40px",
    "--rdp-accent-color": theme.palette.primary.main,
    "--rdp-background-color": theme.palette.primary.light,
    "--rdp-range_middle-background-color": theme.palette.action.focus,
  };

  return (
    <>
      {/* Departure Date Field */}
      <TextField
        label="Departure"
        value={formatDate(selectedDateRange?.from)}
        onClick={handleOpen}
        fullWidth
        placeholder="Select date"
        slotProps={{
          input: {
            readOnly: true,
            startAdornment: <CalendarToday sx={{ color: "text.secondary", mr: 1 }} />,
          },
        }}
        sx={{
          cursor: "pointer",
          "& .MuiInputBase-input": {
            cursor: "pointer",
          },
        }}
      />

      {tripType === "round-trip" && (
        <TextField
          label="Return"
          value={formatDate(selectedDateRange?.to)}
          onClick={handleOpen}
          fullWidth
          placeholder="Select date"
          slotProps={{
            input: {
              readOnly: true,
              startAdornment: <CalendarToday sx={{ color: "text.secondary", mr: 1 }} />,
            },
          }}
          sx={{
            cursor: "pointer",
            "& .MuiInputBase-input": {
              cursor: "pointer",
            },
          }}
        />
      )}

      <Dialog open={isOpen} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CalendarToday sx={{ mr: 1, color: "primary.main" }} />
            {tripType === "one-way" ? "Select Departure Date" : "Select Travel Dates"}
          </Box>
        </DialogTitle>

        <DialogContent>
          {tempDateRange?.from && (
            <Box
              sx={{
                mb: 3,
                p: 2,
                backgroundColor: theme.palette.primary.light,
                borderRadius: 2,
              }}
            >
              <Typography
                variant="body2"
                color={theme.palette.primary.contrastText}
                fontWeight={500}
              >
                {tripType === "one-way"
                  ? `Departure: ${formatDate(tempDateRange.from)}`
                  : `${formatDate(tempDateRange.from)} ${
                      tempDateRange.to ? `- ${formatDate(tempDateRange.to)}` : ""
                    }`}
              </Typography>
            </Box>
          )}

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {tripType === "one-way" ? (
              <DayPicker
                mode="single"
                selected={tempDateRange?.from}
                onSelect={(date: Date | undefined) =>
                  setTempDateRange(date ? { from: date, to: undefined } : undefined)
                }
                disabled={{ before: new Date() }}
                numberOfMonths={window.innerWidth > 600 ? 2 : 1}
                style={{
                  ...commonStyles,
                  fontSize: "0.875rem",
                }}
              />
            ) : (
              <DayPicker
                mode="range"
                selected={tempDateRange}
                onSelect={handleDateRangeSelect}
                disabled={{ before: new Date() }}
                numberOfMonths={window.innerWidth > 600 ? 2 : 1}
                style={{
                  ...commonStyles,
                  fontSize: "0.875rem",
                }}
              />
            )}
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            variant="contained"
            disabled={!tempDateRange?.from}
            sx={{ px: 4, borderRadius: 2 }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
