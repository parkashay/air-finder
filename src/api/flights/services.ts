import { mockAirportSearchResult, mockFlightSearchResponse } from "@/data/flights-mock-data";
import type { SearchAirportResult } from "@/types";
import type { FlightSearchResponse } from "@/types/flights";

export async function searchAirports(query: string) {
  // const url = makeUrl({
  //   paths: ["flights", "searchAirport"],
  //   searchParams: {
  //     query,
  //   },
  // });
  // const res = await http.get(url).catch(() => {
  //   throw new Error("Failed to search airports");
  // });
  // const data = await res.json();
  // return data as SearchAirportResult;
  console.log(query);
  return new Promise((res) =>
    setTimeout(() => res(mockAirportSearchResult), 1000)
  ) as Promise<SearchAirportResult>;
}

export async function searchFlights(searchParams: string) {
  // const url = makeUrl({
  //   paths: ["flights", `searchFlights?${searchParams}`],
  //   version: 2,
  // });
  // const res = await http.get(url).catch(() => {
  //   throw new Error("Failed to search flights");
  // });
  // const data = await res.json();
  // return data as FlightSearchResponse;
  console.log(searchParams);
  return new Promise((res) =>
    setTimeout(() => res(mockFlightSearchResponse), 2000)
  ) as Promise<FlightSearchResponse>;
}
