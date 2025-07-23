import type { Faq } from "@/types";

const mockFaqs: Faq[] = [
  {
    title: "How can I find last-minute flight deals?",
    description:
      "To find last-minute flights, select your departure and destination cities and choose your travel dates using the calendar. You can also check for flights departing today. For the best prices, try to book a few weeks in advance for domestic flights and a few months ahead for international trips.",
  },
  {
    title: "How can I find cheap flights for a weekend getaway?",
    description:
      "It's easy to use Google Flights to find deals on weekend getaways or even week-long trips. Just enter your departure and destination cities near the top of the page. Then, open the date selector and choose a trip length to see how the round-trip ticket prices change on different days. Adjust the trip type to see one-way tickets. The cheapest available flights are highlighted and easy to spot. Once you settle on dates, select Search to see flight options and book the deal.",
  },
  {
    title: "How can I find flight deals if my travel plans are flexible?",
    description:
      "Searching for flights is simple, even if your plans are uncertain. Just tap Explore near the top of the page, then tap the calendar icon. Switch to Flexible dates and choose a time frame or trip length before tapping Done. You’ll see trip options displayed on the map, with the cheapest flights highlighted for easy spotting. Tap any destination to view available flight options you can select and book. Additionally, price insights and other helpful tools are available to help you find options that fit your schedule and budget.",
  },
  {
    title: "How can I find cheap flights to anywhere?",
    description:
      "Google Flights makes it easy to find cheap flight deals to anywhere in the world. Simply enter your departure city, choose Anywhere as the destination, and select Explore. You can pick specific dates or leave the departure and return dates blank for more flexibility. The results will show the cheapest airline tickets to popular destinations. To plan your perfect budget trip, you can filter the results to display only non-stop flights or flights under a certain price. If you already have a destination in mind, you can enable price tracking to receive alerts whenever the fare changes for your selected route or flight.",
  },
  {
    title: "How can I get flight alerts for my trip?",
    description:
      "You can track flight prices for specific dates or, if your plans are flexible, any dates. To get flight alerts for a specific round trip, choose your dates and flights and select Search. Then, you can turn on price tracking.",
  },
];

export async function getFaqs() {
  return new Promise((res) => setTimeout(() => res(mockFaqs), 1000)) as Promise<Faq[]>;
}
