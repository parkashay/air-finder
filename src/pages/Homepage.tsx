import { Faqs } from "@/components/Faqs/Faqs";
import { Box, Container } from "@mui/material";
import { DestinationExplorer } from "../components/Destinations/DestinationExplorer";
import { FlightSearchForm } from "../components/FlightSearch/FlightSearchForm";
import { HeroSection } from "../components/Hero/HeroSection";

export function Homepage() {
  return (
    <Box>
      <HeroSection />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <FlightSearchForm />
        <DestinationExplorer />
        <Faqs />
      </Container>
    </Box>
  );
}
