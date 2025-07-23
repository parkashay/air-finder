import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
  Autocomplete,
  useTheme,
} from "@mui/material";
import { FlightTakeoff, FlightLand, SwapHoriz, CalendarToday, Search } from "@mui/icons-material";

interface Airport {
  code: string;
  name: string;
  city: string;
}

// Dummy airport data
const airports: Airport[] = [
  { code: "JFK", name: "John F. Kennedy International Airport", city: "New York" },
  { code: "LAX", name: "Los Angeles International Airport", city: "Los Angeles" },
  { code: "ORD", name: "O'Hare International Airport", city: "Chicago" },
  { code: "MIA", name: "Miami International Airport", city: "Miami" },
  { code: "SFO", name: "San Francisco International Airport", city: "San Francisco" },
  { code: "BOS", name: "Logan International Airport", city: "Boston" },
  { code: "SEA", name: "Seattle-Tacoma International Airport", city: "Seattle" },
  { code: "DEN", name: "Denver International Airport", city: "Denver" },
  { code: "LAS", name: "McCarran International Airport", city: "Las Vegas" },
  { code: "ATL", name: "Hartsfield-Jackson Atlanta International Airport", city: "Atlanta" },
];

export function FlightSearchForm() {
  const theme = useTheme();
  const [tripType, setTripType] = useState("round-trip");
  const [passengers, setPassengers] = useState(1);
  const [travelClass, setTravelClass] = useState("economy");
  const [fromAirport, setFromAirport] = useState<Airport | null>(null);
  const [toAirport, setToAirport] = useState<Airport | null>(null);
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const handleTripTypeChange = (event: React.MouseEvent<HTMLElement>, newTripType: string) => {
    if (newTripType !== null) {
      setTripType(newTripType);
    }
  };

  const handleSwapAirports = () => {
    const temp = fromAirport;
    setFromAirport(toAirport);
    setToAirport(temp);
  };

  const handleSearch = () => {
    console.log("Search flights:", {
      tripType,
      fromAirport,
      toAirport,
      departureDate,
      returnDate,
      passengers,
      travelClass,
    });
  };

  return (
    <Card
      sx={{
        maxWidth: 1200,
        mx: "auto",
        mt: 4,
        mb: 4,
        backgroundColor: "background.paper",
        boxShadow:
          theme.palette.mode === "dark"
            ? "0 8px 32px rgba(0,0,0,0.4)"
            : "0 8px 32px rgba(0,0,0,0.12)",
      }}
    >
      <CardContent sx={{ p: 4 }}>
        {/* Trip Type and Passenger/Class Selector */}
        <Box
          sx={{ display: "flex", justifyContent: "space-between", mb: 3, flexWrap: "wrap", gap: 2 }}
        >
          <ToggleButtonGroup
            value={tripType}
            exclusive
            onChange={handleTripTypeChange}
            aria-label="trip type"
            sx={{
              "& .MuiToggleButton-root": {
                border: "none",
                borderRadius: 2,
                px: 3,
                py: 1,
                color: "text.secondary",
                "&.Mui-selected": {
                  backgroundColor: "primary.main",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                },
              },
            }}
          >
            <ToggleButton value="round-trip">Round trip</ToggleButton>
            <ToggleButton value="one-way">One way</ToggleButton>
            <ToggleButton value="multi-city">Multi-city</ToggleButton>
          </ToggleButtonGroup>

          <Box sx={{ display: "flex", gap: 2 }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Passengers</InputLabel>
              <Select
                value={passengers}
                label="Passengers"
                onChange={(e) => setPassengers(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <MenuItem key={num} value={num}>
                    {num} {num === 1 ? "passenger" : "passengers"}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Class</InputLabel>
              <Select
                value={travelClass}
                label="Class"
                onChange={(e) => setTravelClass(e.target.value)}
              >
                <MenuItem value="economy">Economy</MenuItem>
                <MenuItem value="premium-economy">Premium economy</MenuItem>
                <MenuItem value="business">Business</MenuItem>
                <MenuItem value="first">First</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* Flight Search Inputs */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "3.5fr 1fr 3.5fr 2fr 2fr",
            },
            gap: 2,
            alignItems: "center",
            "@media (max-width: 899px)": {
              gridTemplateColumns: "1fr",
            },
          }}
        >
          {/* From Airport */}
          <Box>
            <Autocomplete
              options={airports}
              getOptionLabel={(option) => `${option.code} - ${option.city}`}
              value={fromAirport}
              onChange={(event, newValue) => setFromAirport(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Where from?"
                  fullWidth
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: <FlightTakeoff sx={{ color: "text.secondary", mr: 1 }} />,
                  }}
                />
              )}
            />
          </Box>

          {/* Swap Button */}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={handleSwapAirports}
              sx={{
                minWidth: "auto",
                p: 1,
                borderRadius: "50%",
                color: "primary.main",
              }}
            >
              <SwapHoriz />
            </Button>
          </Box>

          {/* To Airport */}
          <Box>
            <Autocomplete
              options={airports}
              getOptionLabel={(option) => `${option.code} - ${option.city}`}
              value={toAirport}
              onChange={(event, newValue) => setToAirport(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Where to?"
                  fullWidth
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: <FlightLand sx={{ color: "text.secondary", mr: 1 }} />,
                  }}
                />
              )}
            />
          </Box>

          {/* Departure Date */}
          <Box>
            <TextField
              type="date"
              label="Departure"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                startAdornment: <CalendarToday sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Box>

          {/* Return Date */}
          {tripType === "round-trip" && (
            <Box>
              <TextField
                type="date"
                label="Return"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  startAdornment: <CalendarToday sx={{ color: "text.secondary", mr: 1 }} />,
                }}
              />
            </Box>
          )}
        </Box>

        {/* Search Button */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleSearch}
            startIcon={<Search />}
            sx={{
              px: 6,
              py: 1.5,
              borderRadius: 3,
              fontSize: "1.1rem",
              fontWeight: 600,
              textTransform: "none",
              backgroundColor: "primary.main",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            }}
          >
            Search flights
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
