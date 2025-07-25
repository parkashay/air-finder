import HeroDark from "@/assets/hero-dark.svg";
import HeroLight from "@/assets/hero-light.svg";
import { Box, Container, Typography, useTheme } from "@mui/material";

export function HeroSection() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: "relative",
        color: theme.palette.mode === "dark" ? "white" : "black",
        py: 8,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${theme.palette.mode === "dark" ? HeroDark : HeroLight})`,
          opacity: 0.8,
          width: "100%",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: "3rem", sm: "4rem", md: "5rem" },
              fontWeight: 300,
              mb: 2,
              textShadow: "0 2px 8px rgba(0,0,0,0.3)",
              letterSpacing: "-0.02em",
            }}
          >
            Flights
          </Typography>

          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "1.1rem", sm: "1.25rem" },
              fontWeight: 400,
              opacity: 0.9,
              maxWidth: 600,
              mx: "auto",
              textShadow: "0 1px 4px rgba(0,0,0,0.2)",
            }}
          >
            Search hundreds of travel sites at once to find the best flight deals
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
