// Flight Search Response Types

export interface FlightSearchResponse {
  status: boolean;
  timestamp: number;
  data: FlightSearchData;
}

export interface FlightSearchData {
  context: SearchContext;
  itineraries: Itinerary[];
  filterStats: FilterStats;
  flightsSessionId: string;
  destinationImageUrl: string;
}

export interface SearchContext {
  status: string;
  sessionId: string;
  totalResults: number;
}

export interface Itinerary {
  id: string;
  price: Price;
  legs: Leg[];
  isSelfTransfer: boolean;
  isProtectedSelfTransfer: boolean;
  farePolicy: FarePolicy;
  eco?: EcoInfo;
  tags: string[];
  isMashUp: boolean;
  hasFlexibleOptions: boolean;
  score: number;
}

export interface Price {
  raw: number;
  formatted: string;
  pricingOptionId: string;
}

export interface Leg {
  id: string;
  origin: Airport;
  destination: Airport;
  durationInMinutes: number;
  stopCount: number;
  isSmallestStops: boolean;
  departure: string; // ISO date string
  arrival: string; // ISO date string
  timeDeltaInDays: number;
  carriers: CarrierInfo;
  segments: Segment[];
}

export interface Airport {
  id: string;
  entityId: string;
  name: string;
  displayCode: string;
  city: string;
  country: string;
  isHighlighted: boolean;
}

export interface CarrierInfo {
  marketing: MarketingCarrier[];
  operationType: string;
}

export interface MarketingCarrier {
  id: number;
  alternateId: string;
  logoUrl: string;
  name: string;
}

export interface Segment {
  id: string;
  origin: FlightPlace;
  destination: FlightPlace;
  departure: string; // ISO date string
  arrival: string; // ISO date string
  durationInMinutes: number;
  flightNumber: string;
  marketingCarrier: Carrier;
  operatingCarrier: Carrier;
  transportMode: string;
}

export interface FlightPlace {
  flightPlaceId: string;
  displayCode: string;
  parent: {
    flightPlaceId: string;
    displayCode: string;
    name: string;
    type: string;
  };
  name: string;
  type: string;
  country: string;
}

export interface Carrier {
  id: number;
  name: string;
  alternateId: string;
  allianceId: number;
  displayCode: string;
}

export interface FarePolicy {
  isChangeAllowed: boolean;
  isPartiallyChangeable: boolean;
  isCancellationAllowed: boolean;
  isPartiallyRefundable: boolean;
}

export interface EcoInfo {
  ecoContenderDelta: number;
}

export interface FilterStats {
  duration: DurationStats;
  total: number;
  hasCityOpenJaw: boolean;
  multipleCarriers: MultipleCarriersInfo;
  airports: CityAirports[];
  carriers: CarrierStats[];
  stopPrices: StopPrices;
  alliances: Alliance[];
}

export interface DurationStats {
  min: number;
  max: number;
  multiCityMin: number;
  multiCityMax: number;
}

export interface MultipleCarriersInfo {
  minPrice: string;
  rawMinPrice: number | null;
}

export interface CityAirports {
  city: string;
  airports: AirportInfo[];
}

export interface AirportInfo {
  id: string;
  entityId: string;
  name: string;
}

export interface CarrierStats {
  id: number;
  alternateId: string;
  logoUrl: string;
  name: string;
  minPrice: string;
  allianceId: number;
}

export interface StopPrices {
  direct: StopPrice;
  one: StopPrice;
  twoOrMore: StopPrice;
}

export interface StopPrice {
  isPresent: boolean;
  formattedPrice?: string;
  rawPrice?: number;
}

export interface Alliance {
  id: number;
  name: string;
}

// Helper types for common patterns
export type FlightDuration = number; // in minutes
export type FlightPrice = number; // raw price
export type ISODateString = string;
export type AirportCode = string;
export type CarrierId = number;

// Search parameters types (for requests)
export interface FlightSearchParams {
  tripType: "round-trip" | "one-way" | "multi-city";
  originSkyId: string;
  originEntityId: string;
  destinationSkyId: string;
  destinationEntityId: string;
  departureDate: string;
  returnDate?: string;
  adults: string;
  children: string;
  infants: string;
  cabinClass: string;
}
