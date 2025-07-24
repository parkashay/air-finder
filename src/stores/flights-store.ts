import { create } from "zustand";
import type { DateRange } from "react-day-picker";
import type { CabinClass } from "@/types";

interface PassengerDetails {
  adults: number;
  children: number;
  infants: number;
}

interface FlightSearchData {
  skyId: string;
  entityId: string;
  name: string;
}

interface FlightState {
  // Trip details
  tripType: "round-trip" | "one-way" | "multi-city";

  // Locations
  origin: FlightSearchData;
  destination: FlightSearchData;

  // Dates
  selectedDateRange: DateRange | undefined;

  // Passengers
  passengers: PassengerDetails;

  // Cabin class
  cabinClass: CabinClass;
}

interface FlightActions {
  // Trip type
  setTripType: (tripType: "round-trip" | "one-way" | "multi-city") => void;

  // Locations
  setOrigin: (origin: FlightSearchData) => void;
  setDestination: (destination: FlightSearchData) => void;
  swapLocations: () => void;

  // Dates
  setDateRange: (dateRange: DateRange | undefined) => void;

  // Passengers
  setPassengers: (passengers: PassengerDetails) => void;
  updatePassengerCount: (type: keyof PassengerDetails, count: number) => void;

  // Cabin class
  setCabinClass: (cabinClass: CabinClass) => void;

  // Utility
  resetSearch: () => void;
  getSearchData: () => FlightState;
}

const initialState: FlightState = {
  tripType: "round-trip",
  origin: {
    skyId: "",
    entityId: "",
    name: "",
  },
  destination: {
    skyId: "",
    entityId: "",
    name: "",
  },
  selectedDateRange: undefined,
  passengers: {
    adults: 1,
    children: 0,
    infants: 0,
  },
  cabinClass: "economy",
};

type FlightStoreSchema = FlightState & FlightActions;

export const useFlightStore = create<FlightStoreSchema>()((set, get) => ({
  ...initialState,

  // Trip type
  setTripType: (tripType) => set({ tripType }),

  // Locations
  setOrigin: (origin) => set({ origin }),
  setDestination: (destination) => set({ destination }),
  swapLocations: () => {
    const { origin, destination } = get();
    set({ origin: destination, destination: origin });
  },

  // Dates
  setDateRange: (selectedDateRange) => set({ selectedDateRange }),

  // Passengers
  setPassengers: (passengers) => set({ passengers }),
  updatePassengerCount: (type, count) =>
    set((state) => ({
      passengers: { ...state.passengers, [type]: Math.max(0, count) },
    })),

  // Cabin class
  setCabinClass: (cabinClass) => set({ cabinClass }),

  // Utility
  resetSearch: () => set(initialState),
  getSearchData: () => get(),
}));
