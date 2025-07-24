import { useQuery } from "@tanstack/react-query";
import { FlightKeys } from "../keys";
import { searchAirports, searchFlights } from "./services";
import { useSearchParams } from "react-router";

export function useAirportsQuery({ query }: { query: string }) {
  return useQuery({
    queryKey: FlightKeys.airports(query),
    queryFn: () => searchAirports(query),
    enabled: Boolean(query),
    staleTime: 0,
  });
}

export function useFlightsSearchQuery() {
  const [searchParams] = useSearchParams();
  const originSkyId = searchParams.get("originSkyId");
  const destinationSkyId = searchParams.get("destinationSkyId");

  return useQuery({
    queryKey: FlightKeys.flightsSearch(String(originSkyId), String(destinationSkyId)),
    enabled: Boolean(originSkyId) && Boolean(destinationSkyId),
    queryFn: () => searchFlights(searchParams.toString()),
  });
}
