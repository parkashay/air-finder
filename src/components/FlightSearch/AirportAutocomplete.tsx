import React, { useState, useMemo } from "react";
import { TextField, Autocomplete, Box, Typography } from "@mui/material";
import { FlightTakeoff, FlightLand, Flight, LocationOn } from "@mui/icons-material";
import { debounce } from "lodash";
import { useAirportsQuery } from "@/api/flights/queries";
import type { AirportOption, AirportSearchData } from "@/types/index";

interface AirportAutocompleteProps {
  label: string;
  value: AirportOption | null;
  onChange: (value: AirportOption | null) => void;
  variant: "from" | "to";
}

export function AirportAutocomplete({ label, value, onChange, variant }: AirportAutocompleteProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");

  const debouncedSearch = useMemo(
    () => debounce((term: string) => setDebouncedTerm(term), 1000),
    []
  );

  const { data: airportsData } = useAirportsQuery({
    query: debouncedTerm,
  });

  // Transform API data to AirportOption format
  const transformAirportData = (apiData: AirportSearchData[]): AirportOption[] => {
    return apiData.map((item) => ({
      skyId: item.navigation.relevantFlightParams.skyId,
      entityId: item.navigation.relevantFlightParams.entityId,
      code: item.navigation.relevantFlightParams.skyId,
      name: item.presentation.title,
      type: item.navigation.relevantFlightParams.flightPlaceType,
    }));
  };

  const airports = airportsData?.data ? transformAirportData(airportsData.data) : [];

  const handleInputChange = (_: React.SyntheticEvent, value: string) => {
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "AIRPORT":
        return <Flight sx={{ color: "text.secondary", fontSize: 18 }} />;
      case "CITY":
      case "COUNTRY":
        return <LocationOn sx={{ color: "text.secondary", fontSize: 18 }} />;
      default:
        return <LocationOn sx={{ color: "text.secondary", fontSize: 18 }} />;
    }
  };

  const getStartIcon = () => {
    return variant === "from" ? (
      <FlightTakeoff sx={{ color: "text.secondary", mr: 1 }} />
    ) : (
      <FlightLand sx={{ color: "text.secondary", mr: 1 }} />
    );
  };

  return (
    <Autocomplete
      options={airports}
      getOptionLabel={(option) => `${option.code} - ${option.name}`}
      value={value}
      onChange={(_, newValue) => onChange(newValue)}
      onInputChange={handleInputChange}
      inputValue={searchTerm}
      loading={debouncedTerm.length >= 2 && airports.length === 0}
      noOptionsText={searchTerm.length < 2 ? "Type at least 2 characters..." : "No locations found"}
      renderOption={(props, option) => (
        <Box component="li" {...props} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {getIcon(option.type)}
          <Box>
            <Typography variant="body2" fontWeight={500}>
              {option.code} - {option.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {option.name}
            </Typography>
          </Box>
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          fullWidth
          slotProps={{
            input: {
              ...params.InputProps,
              startAdornment: getStartIcon(),
            },
          }}
        />
      )}
    />
  );
}
