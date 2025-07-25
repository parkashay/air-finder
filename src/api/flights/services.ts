import { mockFlightSearchResponse } from "@/data/flights-mock-data";
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
    res({
      status: true,
      timestamp: 1753371252374,
      data: [
        {
          presentation: {
            title: "Pokhara",
            suggestionTitle: "Pokhara (Any)",
            subtitle: "Nepal",
          },
          navigation: {
            entityId: "27545974",
            entityType: "CITY",
            localizedName: "Pokhara",
            relevantFlightParams: {
              skyId: "PKRA",
              entityId: "27545974",
              flightPlaceType: "CITY",
              localizedName: "Pokhara",
            },
            relevantHotelParams: {
              entityId: "27545974",
              entityType: "CITY",
              localizedName: "Pokhara",
            },
          },
        },
        {
          presentation: {
            title: "Pokhara",
            suggestionTitle: "Pokhara (PKR)",
            subtitle: "Nepal",
          },
          navigation: {
            entityId: "128667758",
            entityType: "AIRPORT",
            localizedName: "Pokhara",
            relevantFlightParams: {
              skyId: "PKR",
              entityId: "128667758",
              flightPlaceType: "AIRPORT",
              localizedName: "Pokhara",
            },
            relevantHotelParams: {
              entityId: "27545974",
              entityType: "CITY",
              localizedName: "Pokhara",
            },
          },
        },
        {
          presentation: {
            title: "Pokhara International",
            suggestionTitle: "Pokhara International (PHH)",
            subtitle: "Nepal",
          },
          navigation: {
            entityId: "222885585",
            entityType: "AIRPORT",
            localizedName: "Pokhara International",
            relevantFlightParams: {
              skyId: "PHH",
              entityId: "222885585",
              flightPlaceType: "AIRPORT",
              localizedName: "Pokhara International",
            },
            relevantHotelParams: {
              entityId: "27545974",
              entityType: "CITY",
              localizedName: "Pokhara",
            },
          },
        },
        {
          presentation: {
            title: "New York",
            suggestionTitle: "New York (Any)",
            subtitle: "United States",
          },
          navigation: {
            entityId: "27537542",
            entityType: "CITY",
            localizedName: "New York",
            relevantFlightParams: {
              skyId: "NYCA",
              entityId: "27537542",
              flightPlaceType: "CITY",
              localizedName: "New York",
            },
            relevantHotelParams: {
              entityId: "27537542",
              entityType: "CITY",
              localizedName: "New York",
            },
          },
        },
        {
          presentation: {
            title: "New York Newark",
            suggestionTitle: "New York Newark (EWR)",
            subtitle: "United States",
          },
          navigation: {
            entityId: "95565059",
            entityType: "AIRPORT",
            localizedName: "New York Newark",
            relevantFlightParams: {
              skyId: "EWR",
              entityId: "95565059",
              flightPlaceType: "AIRPORT",
              localizedName: "New York Newark",
            },
            relevantHotelParams: {
              entityId: "27537542",
              entityType: "CITY",
              localizedName: "New York",
            },
          },
        },
        {
          presentation: {
            title: "New York John F. Kennedy",
            suggestionTitle: "New York John F. Kennedy (JFK)",
            subtitle: "United States",
          },
          navigation: {
            entityId: "95565058",
            entityType: "AIRPORT",
            localizedName: "New York John F. Kennedy",
            relevantFlightParams: {
              skyId: "JFK",
              entityId: "95565058",
              flightPlaceType: "AIRPORT",
              localizedName: "New York John F. Kennedy",
            },
            relevantHotelParams: {
              entityId: "27537542",
              entityType: "CITY",
              localizedName: "New York",
            },
          },
        },
        {
          presentation: {
            title: "New York LaGuardia",
            suggestionTitle: "New York LaGuardia (LGA)",
            subtitle: "United States",
          },
          navigation: {
            entityId: "95565057",
            entityType: "AIRPORT",
            localizedName: "New York LaGuardia",
            relevantFlightParams: {
              skyId: "LGA",
              entityId: "95565057",
              flightPlaceType: "AIRPORT",
              localizedName: "New York LaGuardia",
            },
            relevantHotelParams: {
              entityId: "27537542",
              entityType: "CITY",
              localizedName: "New York",
            },
          },
        },
        {
          presentation: {
            title: "Stewart International",
            suggestionTitle: "Stewart International (SWF)",
            subtitle: "United States",
          },
          navigation: {
            entityId: "95566280",
            entityType: "AIRPORT",
            localizedName: "Stewart International",
            relevantFlightParams: {
              skyId: "SWF",
              entityId: "95566280",
              flightPlaceType: "AIRPORT",
              localizedName: "Stewart International",
            },
            relevantHotelParams: {
              entityId: "27537542",
              entityType: "CITY",
              localizedName: "New York",
            },
          },
        },
      ],
    })
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
