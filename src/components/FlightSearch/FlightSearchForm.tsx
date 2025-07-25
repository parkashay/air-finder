import React from "react";
import {
  Box,
  Card,
  CardContent,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
} from "@mui/material";
import { SwapHoriz, Search } from "@mui/icons-material";
import { useFlightStore } from "@/stores/flights-store";
import { AirportAutocomplete } from "./AirportAutocomplete";
import { DatePickerModal } from "./DatePickerModal";
import { PassengerSelector } from "./PassengerSelector";
import { CabinClassSelector } from "./CabinClassSelector";
import type { AirportOption } from "@/types";
import { formatDateToYYYYMMDD } from "@/utils/format-date";
import { useNavigate } from "react-router";

const createSearchParams = (
  data: ReturnType<ReturnType<typeof useFlightStore.getState>["getSearchData"]>
) => {
  const searchParams = new URLSearchParams();

  const paramMap = {
    originSkyId: data.origin.skyId,
    originEntityId: data.origin.entityId,
    destinationSkyId: data.destination.skyId,
    destinationEntityId: data.destination.entityId,
    departureDate: data.selectedDateRange?.from
      ? formatDateToYYYYMMDD(data.selectedDateRange.from)
      : null,
    returnDate: data.selectedDateRange?.to
      ? formatDateToYYYYMMDD(data.selectedDateRange.to)
      : null,
    adults: String(data.passengers.adults),
    children: String(data.passengers.children),
    infants: String(data.passengers.infants),
    cabinClass: data.cabinClass,
  };

  // Add non-empty values to search params
  Object.entries(paramMap).forEach(([key, value]) => {
    if (value) {
      searchParams.set(key, value);
    }
  });

  return searchParams;
};

export function FlightSearchForm() {
  const theme = useTheme();
  const navigate = useNavigate();
  const {
    tripType,
    setTripType,
    origin,
    destination,
    setOrigin,
    setDestination,
    swapLocations,
    selectedDateRange,
    getSearchData,
  } = useFlightStore();

  const isFormValid = Boolean(
    origin.skyId && destination.skyId && selectedDateRange?.from
  );

  // Convert store data to component format
  const originAirport: AirportOption | null = origin.skyId
    ? {
        skyId: origin.skyId,
        entityId: origin.entityId,
        code: origin.skyId,
        name: origin.name,
        type: "AIRPORT",
      }
    : null;

  const destinationAirport: AirportOption | null = destination.skyId
    ? {
        skyId: destination.skyId,
        entityId: destination.entityId,
        code: destination.skyId,
        name: destination.name,
        type: "AIRPORT",
      }
    : null;

  const handleTripTypeChange = (
    _: React.MouseEvent<HTMLElement>,
    newTripType: string
  ) => {
    if (newTripType !== null) {
      setTripType(newTripType as "round-trip" | "one-way" | "multi-city");
    }
  };

  const handleOriginChange = (airport: AirportOption | null) => {
    setOrigin({
      skyId: airport?.skyId || "",
      entityId: airport?.entityId || "",
      name: airport?.name || "",
    });
  };

  const handleDestinationChange = (airport: AirportOption | null) => {
    setDestination({
      skyId: airport?.skyId || "",
      entityId: airport?.entityId || "",
      name: airport?.name || "",
    });
  };

  const handleSearch = () => {
    if (!isFormValid) return;

    const searchData = getSearchData();
    const searchParams = createSearchParams(searchData);

    navigate(`/search?${searchParams.toString()}`);
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 3,
            flexWrap: "wrap",
            gap: 2,
          }}
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
            <PassengerSelector />
            <CabinClassSelector />
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md:
                tripType === "round-trip" ? "3fr 0.5fr 3fr 2fr 2fr" : "3fr 0.5fr 3fr 2fr",
            },
            gap: 2,
            alignItems: "center",
            "@media (max-width: 899px)": {
              gridTemplateColumns: "1fr",
            },
          }}
        >
          <Box>
            <AirportAutocomplete
              label="Where from?"
              value={originAirport}
              onChange={handleOriginChange}
              variant="from"
            />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={swapLocations}
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

          <Box>
            <AirportAutocomplete
              label="Where to?"
              value={destinationAirport}
              onChange={handleDestinationChange}
              variant="to"
            />
          </Box>

          <DatePickerModal />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleSearch}
            disabled={!isFormValid}
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
              "&.Mui-disabled": {
                backgroundColor: "action.disabledBackground",
                color: "action.disabled",
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
