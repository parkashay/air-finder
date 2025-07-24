export const FaqQeys = {
  all: ["faqs"] as const,
};

export const FlightKeys = {
  airports: (q: string) => ["airports", q],
  flightsSearch: (originSkyId: string, destinationSkyId: string) => [
    "flights-search",
    originSkyId,
    destinationSkyId,
  ],
};
