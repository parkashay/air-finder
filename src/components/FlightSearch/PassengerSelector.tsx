import React, { useState } from "react";
import {
  Box,
  Button,
  Popover,
  Typography,
  IconButton,
  Divider,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import { Person, Remove, Add } from "@mui/icons-material";
import { useFlightStore } from "@/stores/flights-store";

export function PassengerSelector() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { passengers, updatePassengerCount } = useFlightStore();

  const totalPassengers = passengers.adults + passengers.children + passengers.infants;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDone = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const incrementCount = (type: keyof typeof passengers) => {
    const maxCount = type === "adults" ? 9 : type === "children" ? 8 : 4;
    if (passengers[type] < maxCount) {
      updatePassengerCount(type, passengers[type] + 1);
    }
  };

  const decrementCount = (type: keyof typeof passengers) => {
    const minCount = type === "adults" ? 1 : 0;
    if (passengers[type] > minCount) {
      updatePassengerCount(type, passengers[type] - 1);
    }
  };

  return (
    <>
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>Passengers</InputLabel>
        <OutlinedInput
          label="Passengers"
          value={totalPassengers}
          readOnly
          onClick={handleClick}
          startAdornment={
            <InputAdornment position="start">
              <Person sx={{ color: "text.secondary" }} />
            </InputAdornment>
          }
          sx={{
            cursor: "pointer",
            "& .MuiOutlinedInput-input": {
              cursor: "pointer",
            },
          }}
        />
      </FormControl>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        slotProps={{
          paper: {
            sx: {
              p: 3,
              minWidth: 300,
              borderRadius: 2,
            },
          },
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Passengers
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box>
            <Typography variant="body1" fontWeight={500}>
              Adults
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Age 12+
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton
              size="small"
              onClick={() => decrementCount("adults")}
              disabled={passengers.adults <= 1}
              sx={{
                border: 1,
                borderColor: "divider",
                width: 32,
                height: 32,
              }}
            >
              <Remove fontSize="small" />
            </IconButton>
            <Typography variant="body1" sx={{ minWidth: 24, textAlign: "center" }}>
              {passengers.adults}
            </Typography>
            <IconButton
              size="small"
              onClick={() => incrementCount("adults")}
              disabled={passengers.adults >= 9}
              sx={{
                border: 1,
                borderColor: "divider",
                width: 32,
                height: 32,
              }}
            >
              <Add fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box>
            <Typography variant="body1" fontWeight={500}>
              Children
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Age 2-11
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton
              size="small"
              onClick={() => decrementCount("children")}
              disabled={passengers.children <= 0}
              sx={{
                border: 1,
                borderColor: "divider",
                width: 32,
                height: 32,
              }}
            >
              <Remove fontSize="small" />
            </IconButton>
            <Typography variant="body1" sx={{ minWidth: 24, textAlign: "center" }}>
              {passengers.children}
            </Typography>
            <IconButton
              size="small"
              onClick={() => incrementCount("children")}
              disabled={passengers.children >= 8}
              sx={{
                border: 1,
                borderColor: "divider",
                width: 32,
                height: 32,
              }}
            >
              <Add fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box>
            <Typography variant="body1" fontWeight={500}>
              Infants
            </Typography>
            <Typography variant="caption" color="text.secondary">
              In seat
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton
              size="small"
              onClick={() => decrementCount("infants")}
              disabled={passengers.infants <= 0}
              sx={{
                border: 1,
                borderColor: "divider",
                width: 32,
                height: 32,
              }}
            >
              <Remove fontSize="small" />
            </IconButton>
            <Typography variant="body1" sx={{ minWidth: 24, textAlign: "center" }}>
              {passengers.infants}
            </Typography>
            <IconButton
              size="small"
              onClick={() => incrementCount("infants")}
              disabled={passengers.infants >= 4}
              sx={{
                border: 1,
                borderColor: "divider",
                width: 32,
                height: 32,
              }}
            >
              <Add fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleDone} variant="contained" sx={{ px: 4 }}>
            Done
          </Button>
        </Box>
      </Popover>
    </>
  );
}
