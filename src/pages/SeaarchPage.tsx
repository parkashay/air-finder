import { useFlightsSearchQuery } from "@/api/flights/queries";
import { FlightCard } from "@/components/FlightSearch/FlightCard";
import { FlightResultsHeader } from "@/components/FlightSearch/FlightResultsHeader";
import { FlightSearchLoader } from "@/components/FlightSearch/FlightSearchLoader";
import { NoFlightResults } from "@/components/FlightSearch/NoFlightResults";
import type { Itinerary } from "@/types/flights";
import { Alert, Box, Container } from "@mui/material";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";

export function SearchPage() {
  const navigate = useNavigate();
  const { data: flightData, isLoading, error } = useFlightsSearchQuery();
  const [sortBy, setSortBy] = useState("top_flights");

  const itineraries = useMemo(() => {
    if (flightData?.data?.itineraries) {
      return flightData.data.itineraries;
    }
    return [];
  }, [flightData]);
  const totalResults = flightData?.data?.context?.totalResults || 0;

  const sortedItineraries = useMemo(() => {
    const sorted = [...itineraries];

    switch (sortBy) {
      case "price_low":
        return sorted.sort((a, b) => a.price.raw - b.price.raw);
      case "price_high":
        return sorted.sort((a, b) => b.price.raw - a.price.raw);
      case "duration":
        return sorted.sort((a, b) => {
          const durationA = a.legs.reduce((sum, leg) => sum + leg.durationInMinutes, 0);
          const durationB = b.legs.reduce((sum, leg) => sum + leg.durationInMinutes, 0);
          return durationA - durationB;
        });
      case "departure":
        return sorted.sort((a, b) => {
          const timeA = new Date(a.legs[0].departure).getTime();
          const timeB = new Date(b.legs[0].departure).getTime();
          return timeA - timeB;
        });
      case "top_flights":
      default:
        return sorted.sort((a, b) => b.score - a.score);
    }
  }, [itineraries, sortBy]);

  const handleModifySearch = () => {
    navigate("/");
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <FlightSearchLoader />
      </Container>
    );
  }

  // Handle error state
  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          Failed to load flight results. Please try again later.
        </Alert>
        <NoFlightResults onModifySearch={handleModifySearch} />
      </Container>
    );
  }

  if (!itineraries.length) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <NoFlightResults onModifySearch={handleModifySearch} />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box>
        <FlightResultsHeader
          totalResults={totalResults}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <Box>
          {sortedItineraries.map((itinerary: Itinerary) => (
            <FlightCard key={itinerary.id} itinerary={itinerary} />
          ))}
        </Box>

        {totalResults > sortedItineraries.length && (
          <Box display="flex" justifyContent="center" mt={4}>
            <Alert severity="info" variant="outlined">
              Showing {sortedItineraries.length} of {totalResults} flights
            </Alert>
          </Box>
        )}
      </Box>
    </Container>
  );
}
