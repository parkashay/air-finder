export type MakeAPIUrlParams = {
  paths: string[];
  searchParams?: Record<string, string>;
  version?: 1 | 2;
};

export interface Faq {
  title: string;
  description: string;
}

type PlaceType = "CITY" | "AIRPORT" | "COUNTRY";

interface Presentation {
  title: string;
  suggestionTitle: string;
  subtitle: string;
}

interface RelevantFlightParams {
  skyId: string;
  entityId: string;
  flightPlaceType: PlaceType;
  localizedName: string;
}

interface RelevantHotelParams {
  entityId: string;
  entityType: PlaceType;
  localizedName: string;
}

export interface Navigation {
  entityId: string;
  entityType: PlaceType;
  localizedName: string;
  relevantFlightParams: RelevantFlightParams;
  relevantHotelParams: RelevantHotelParams;
}

export interface AirportSearchData {
  presentation: Presentation;
  navigation: Navigation;
  skyId?: string;
  entityId?: string;
}

export interface SearchAirportResult {
  status: boolean;
  timestamp: number;
  data: AirportSearchData[];
}

export type CabinClass = "economy" | "premium_economy" | "business" | "first";

export type TripType = "ONE_WAY";

export interface AirportOption {
  skyId: string;
  entityId: string;
  name: string;
  type: PlaceType;
  code: string;
}

// Re-export flight search types
export * from "./flights";
