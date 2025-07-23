import { Explore, Map, TrendingUp } from "@mui/icons-material";
import { Box, Button, Card, CardContent, Chip, Paper, Typography, useTheme } from "@mui/material";
import { useState } from "react";

interface Destination {
  id: string;
  name: string;
  country: string;
  price: string;
  trend: "up" | "down" | "stable";
  popular: boolean;
}

// Dummy destination data
const destinations: Destination[] = [
  { id: "1", name: "Paris", country: "France", price: "$299", trend: "up", popular: true },
  { id: "2", name: "Tokyo", country: "Japan", price: "$599", trend: "down", popular: true },
  {
    id: "3",
    name: "London",
    country: "United Kingdom",
    price: "$399",
    trend: "stable",
    popular: true,
  },
  {
    id: "4",
    name: "New York",
    country: "United States",
    price: "$199",
    trend: "up",
    popular: true,
  },
  { id: "5", name: "Dubai", country: "UAE", price: "$449", trend: "stable", popular: true },
  { id: "6", name: "Sydney", country: "Australia", price: "$799", trend: "down", popular: false },
  { id: "7", name: "Rome", country: "Italy", price: "$349", trend: "up", popular: false },
  { id: "8", name: "Barcelona", country: "Spain", price: "$279", trend: "stable", popular: false },
];

const popularDestinations = destinations.filter((dest) => dest.popular);

export function DestinationExplorer() {
  const theme = useTheme();
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);

  return (
    <Box sx={{ mt: 6 }}>
      {/* Find cheap flights section */}
      <Box sx={{ mb: 6 }}>
        <Typography
          variant="h5"
          component="h2"
          sx={{
            mb: 3,
            fontWeight: 400,
            color: "text.primary",
          }}
        >
          Find cheap flights to anywhere
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 4 }}>
          {popularDestinations.map((destination) => (
            <Chip
              key={destination.id}
              label={destination.name}
              onClick={() => setSelectedDestination(destination.id)}
              variant={selectedDestination === destination.id ? "filled" : "outlined"}
              sx={{
                px: 2,
                py: 1,
                height: "auto",
                "& .MuiChip-label": {
                  fontSize: "0.875rem",
                  fontWeight: 500,
                },
                backgroundColor:
                  selectedDestination === destination.id ? "primary.main" : "transparent",
                color: selectedDestination === destination.id ? "white" : "text.primary",
                borderColor: "divider",
                "&:hover": {
                  backgroundColor:
                    selectedDestination === destination.id ? "primary.dark" : "action.hover",
                },
              }}
            />
          ))}
        </Box>
      </Box>

      {/* World Map Section */}
      <Paper
        elevation={0}
        sx={{
          position: "relative",
          height: 400,
          borderRadius: 3,
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg, #263238 0%, #37474f 100%)"
              : "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        {/* Simplified World Map Background */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 1000 500' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M150,100 L200,80 L300,90 L350,70 L400,85 L450,75 L500,80 L550,70 L600,85 L650,75 L700,90 L750,80 L800,100 L850,90 L900,110 L850,130 L800,140 L750,130 L700,140 L650,135 L600,145 L550,135 L500,140 L450,135 L400,145 L350,140 L300,150 L250,140 L200,130 L150,120 Z' fill='${
              theme.palette.mode === "dark" ? "%2345525b" : "%2390caf9"
            }' opacity='0.6'/%3E%3Cpath d='M100,200 L180,180 L280,190 L380,170 L480,185 L580,175 L680,190 L780,180 L880,200 L850,220 L750,230 L650,220 L550,230 L450,225 L350,235 L250,225 L150,215 L100,205 Z' fill='${
              theme.palette.mode === "dark" ? "%2345525b" : "%2390caf9"
            }' opacity='0.7'/%3E%3Cpath d='M200,300 L300,280 L400,290 L500,270 L600,285 L700,275 L800,290 L750,310 L650,320 L550,310 L450,320 L350,315 L250,325 L200,315 Z' fill='${
              theme.palette.mode === "dark" ? "%2345525b" : "%2390caf9"
            }' opacity='0.8'/%3E%3C/svg%3E")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.3,
          }}
        />

        {/* Destination Dots */}
        {popularDestinations.slice(0, 5).map((dest, index) => (
          <Box
            key={dest.id}
            sx={{
              position: "absolute",
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "primary.main",
              border: "2px solid white",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              left: `${20 + index * 15}%`,
              top: `${30 + (index % 2) * 20}%`,
              cursor: "pointer",
              animation: "pulse 2s infinite",
              "@keyframes pulse": {
                "0%": { boxShadow: "0 0 0 0 rgba(25, 118, 210, 0.7)" },
                "70%": { boxShadow: "0 0 0 10px rgba(25, 118, 210, 0)" },
                "100%": { boxShadow: "0 0 0 0 rgba(25, 118, 210, 0)" },
              },
              "&:hover": {
                transform: "scale(1.2)",
                transition: "transform 0.2s ease",
              },
            }}
            title={`${dest.name}, ${dest.country} - ${dest.price}`}
          />
        ))}

        {/* Central Content */}
        <Box sx={{ textAlign: "center", zIndex: 2 }}>
          <Map sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
          <Typography
            variant="h6"
            sx={{
              mb: 1,
              fontWeight: 500,
              color: "text.primary",
            }}
          >
            Explore destinations
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              mb: 3,
              maxWidth: 300,
              mx: "auto",
            }}
          >
            Discover amazing places around the world and find the best flight deals
          </Typography>
          <Button
            variant="contained"
            startIcon={<Explore />}
            sx={{
              px: 4,
              py: 1,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 500,
            }}
          >
            Explore destinations
          </Button>
        </Box>
      </Paper>

      {/* Popular Destinations Grid */}
      <Box sx={{ mt: 6 }}>
        <Typography
          variant="h6"
          component="h3"
          sx={{
            mb: 3,
            fontWeight: 500,
            color: "text.primary",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <TrendingUp sx={{ color: "primary.main" }} />
          Popular destinations
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: 2,
          }}
        >
          {destinations.map((destination) => (
            <Card
              key={destination.id}
              sx={{
                cursor: "pointer",
                transition: "all 0.2s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow:
                    theme.palette.mode === "dark"
                      ? "0 8px 25px rgba(0,0,0,0.4)"
                      : "0 8px 25px rgba(0,0,0,0.15)",
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 1,
                  }}
                >
                  <Typography variant="h6" component="h4" sx={{ fontWeight: 600 }}>
                    {destination.name}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "primary.main",
                      fontWeight: 700,
                    }}
                  >
                    {destination.price}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {destination.country}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <TrendingUp
                    sx={{
                      fontSize: 16,
                      color:
                        destination.trend === "up"
                          ? "success.main"
                          : destination.trend === "down"
                          ? "error.main"
                          : "text.secondary",
                      transform: destination.trend === "down" ? "rotate(180deg)" : "none",
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      color:
                        destination.trend === "up"
                          ? "success.main"
                          : destination.trend === "down"
                          ? "error.main"
                          : "text.secondary",
                      fontWeight: 500,
                    }}
                  >
                    {destination.trend === "up"
                      ? "Trending up"
                      : destination.trend === "down"
                      ? "Price drop"
                      : "Stable"}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
