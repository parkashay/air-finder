import type { Itinerary } from "@/types/flights";
import { ExpandLess, ExpandMore, FlightLand, FlightTakeoff, Nature } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Collapse,
  Divider,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";

interface FlightCardProps {
  itinerary: Itinerary;
}

export function FlightCard({ itinerary }: FlightCardProps) {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);

  // Get primary leg (outbound)
  const outboundLeg = itinerary.legs[0];
  const returnLeg = itinerary.legs[1];

  // Format time
  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  // Format duration
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins}min`;
    return `${hours}h ${mins}min`;
  };

  // Get airline info
  const primaryCarrier = outboundLeg.carriers.marketing[0];

  return (
    <Card
      elevation={1}
      sx={{
        mb: 2,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          boxShadow: theme.shadows[4],
          borderColor: theme.palette.primary.main,
        },
      }}
    >
      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        {/* Mobile Layout */}
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          {/* Airline & Price Row */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Box display="flex" alignItems="center" gap={1.5}>
              <Avatar
                src={primaryCarrier.logoUrl}
                alt={primaryCarrier.name}
                sx={{ width: 32, height: 32 }}
              >
                {primaryCarrier.alternateId}
              </Avatar>
              <Box>
                <Typography variant="body2" fontWeight={600}>
                  {primaryCarrier.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {primaryCarrier.alternateId}
                </Typography>
              </Box>
            </Box>
            <Box textAlign="right">
              <Typography variant="h6" fontWeight={700} color="primary.main">
                {itinerary.price.formatted}
              </Typography>
            </Box>
          </Box>

          {/* Flight Time & Route */}
          <Box mb={2}>
            <Box display="flex" alignItems="center" justifyContent="center" gap={1} mb={1}>
              <Typography variant="h6" fontWeight={600}>
                {formatTime(outboundLeg.departure)}
              </Typography>
              <Box display="flex" alignItems="center" gap={0.5} color="text.secondary">
                <FlightTakeoff fontSize="small" />
                <Box
                  sx={{
                    width: 60,
                    height: 1,
                    backgroundColor: "text.secondary",
                    position: "relative",
                  }}
                >
                  {outboundLeg.stopCount > 0 && (
                    <Box
                      sx={{
                        width: 4,
                        height: 4,
                        backgroundColor: "text.secondary",
                        borderRadius: "50%",
                        position: "absolute",
                        top: -1.5,
                        left: "50%",
                        transform: "translateX(-50%)",
                      }}
                    />
                  )}
                </Box>
                <FlightLand fontSize="small" />
              </Box>
              <Typography variant="h6" fontWeight={600}>
                {formatTime(outboundLeg.arrival)}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" textAlign="center">
              {outboundLeg.origin.displayCode} – {outboundLeg.destination.displayCode}
            </Typography>
          </Box>

          {/* Flight Details Row */}
          <Box display="flex" justifyContent="space-around" mb={2}>
            <Box textAlign="center">
              <Typography variant="body2" fontWeight={500}>
                {formatDuration(outboundLeg.durationInMinutes)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Duration
              </Typography>
            </Box>
            <Box textAlign="center">
              <Typography variant="body2" fontWeight={500}>
                {outboundLeg.stopCount === 0
                  ? "Non-stop"
                  : `${outboundLeg.stopCount} stop${outboundLeg.stopCount > 1 ? "s" : ""}`}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {outboundLeg.stopCount === 0 ? "Direct" : "Connecting"}
              </Typography>
            </Box>
            <Box textAlign="center">
              {itinerary.eco ? (
                <Box>
                  <Typography variant="body2" color="success.main" fontWeight={500}>
                    Low CO₂
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Eco-friendly
                  </Typography>
                </Box>
              ) : (
                <Typography variant="caption" color="text.secondary">
                  Standard
                </Typography>
              )}
            </Box>
          </Box>

          {/* Select Button */}
          <Button
            variant="contained"
            fullWidth
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 2,
              mb: 1,
            }}
          >
            Select Flight
          </Button>
        </Box>

        {/* Desktop Layout */}
        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 2 }}>
          {/* Airline Logo & Name */}
          <Box sx={{ width: "15%" }}>
            <Box display="flex" alignItems="center" gap={1.5}>
              <Avatar
                src={primaryCarrier.logoUrl}
                alt={primaryCarrier.name}
                sx={{ width: 32, height: 32 }}
              >
                {primaryCarrier.alternateId}
              </Avatar>
              <Box>
                <Typography variant="body2" fontWeight={600} color="text.primary">
                  {primaryCarrier.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {primaryCarrier.alternateId}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Flight Times & Route */}
          <Box sx={{ width: "25%" }}>
            <Box display="flex" alignItems="center" gap={1} mb={0.5}>
              <Typography variant="h6" fontWeight={600}>
                {formatTime(outboundLeg.departure)}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  color: "text.secondary",
                }}
              >
                <FlightTakeoff fontSize="small" />
                <Box
                  sx={{
                    width: 40,
                    height: 1,
                    backgroundColor: "text.secondary",
                    position: "relative",
                  }}
                >
                  {outboundLeg.stopCount > 0 && (
                    <Box
                      sx={{
                        width: 4,
                        height: 4,
                        backgroundColor: "text.secondary",
                        borderRadius: "50%",
                        position: "absolute",
                        top: -1.5,
                        left: "50%",
                        transform: "translateX(-50%)",
                      }}
                    />
                  )}
                </Box>
                <FlightLand fontSize="small" />
              </Box>
              <Typography variant="h6" fontWeight={600}>
                {formatTime(outboundLeg.arrival)}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              {outboundLeg.origin.displayCode} – {outboundLeg.destination.displayCode}
            </Typography>
          </Box>

          {/* Duration */}
          <Box sx={{ width: "15%" }} textAlign="center">
            <Typography variant="body1" fontWeight={500}>
              {formatDuration(outboundLeg.durationInMinutes)}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Duration
            </Typography>
          </Box>

          {/* Stops */}
          <Box sx={{ width: "15%" }} textAlign="center">
            <Typography variant="body1" fontWeight={500}>
              {outboundLeg.stopCount === 0
                ? "Non-stop"
                : `${outboundLeg.stopCount} stop${outboundLeg.stopCount > 1 ? "s" : ""}`}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {outboundLeg.stopCount === 0 ? "Direct" : "Connecting"}
            </Typography>
          </Box>

          {/* CO2 Emissions */}
          <Box sx={{ width: "10%" }} textAlign="center">
            {itinerary.eco ? (
              <Box>
                <Box display="flex" alignItems="center" justifyContent="center" gap={0.5}>
                  <Nature fontSize="small" color="success" />
                  <Typography variant="caption" color="success.main">
                    Low CO₂
                  </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  Eco-friendly
                </Typography>
              </Box>
            ) : (
              <Typography variant="caption" color="text.secondary">
                Standard
              </Typography>
            )}
          </Box>

          {/* Price & Select */}
          <Box sx={{ width: "20%" }} textAlign="right">
            <Typography variant="h6" fontWeight={700} color="primary.main" gutterBottom>
              {itinerary.price.formatted}
            </Typography>
            <Button
              variant="contained"
              size="small"
              sx={{
                textTransform: "none",
                fontWeight: 600,
                borderRadius: 2,
              }}
            >
              Select
            </Button>
          </Box>
        </Box>

        {/* Expand/Collapse Button */}
        <Box display="flex" justifyContent="center" mt={2}>
          <IconButton
            onClick={() => setExpanded(!expanded)}
            size="small"
            sx={{
              color: "text.secondary",
              "&:hover": { color: "primary.main" },
            }}
          >
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>

        {/* Expanded Details */}
        <Collapse in={expanded}>
          <Divider sx={{ my: 2 }} />
          <Box>
            <Typography variant="h6" gutterBottom>
              Flight Details
            </Typography>

            {/* Outbound Flight Details */}
            <Box mb={3}>
              <Typography variant="subtitle2" color="primary.main" gutterBottom>
                Outbound Flight
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                gap={2}
                mb={1}
                sx={{
                  flexDirection: { xs: "column", sm: "row" },
                  textAlign: { xs: "center", sm: "left" },
                }}
              >
                <Box textAlign="center" minWidth={100}>
                  <Typography variant="h6" fontWeight={600}>
                    {formatTime(outboundLeg.departure)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {outboundLeg.origin.displayCode}
                  </Typography>
                  <Typography variant="body2">{outboundLeg.origin.name}</Typography>
                </Box>
                <Box flex={1} textAlign="center" px={{ xs: 0, sm: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    {formatDuration(outboundLeg.durationInMinutes)}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="caption">
                    Flight {outboundLeg.segments[0]?.flightNumber}
                  </Typography>
                </Box>
                <Box textAlign="center" minWidth={100}>
                  <Typography variant="h6" fontWeight={600}>
                    {formatTime(outboundLeg.arrival)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {outboundLeg.destination.displayCode}
                  </Typography>
                  <Typography variant="body2">{outboundLeg.destination.name}</Typography>
                </Box>
              </Box>
            </Box>

            {/* Return Flight Details (if exists) */}
            {returnLeg && (
              <Box mb={3}>
                <Typography variant="subtitle2" color="primary.main" gutterBottom>
                  Return Flight
                </Typography>
                <Box
                  display="flex"
                  alignItems="center"
                  gap={2}
                  mb={1}
                  sx={{
                    flexDirection: { xs: "column", sm: "row" },
                    textAlign: { xs: "center", sm: "left" },
                  }}
                >
                  <Box textAlign="center" minWidth={100}>
                    <Typography variant="h6" fontWeight={600}>
                      {formatTime(returnLeg.departure)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {returnLeg.origin.displayCode}
                    </Typography>
                    <Typography variant="body2">{returnLeg.origin.name}</Typography>
                  </Box>
                  <Box flex={1} textAlign="center" px={{ xs: 0, sm: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      {formatDuration(returnLeg.durationInMinutes)}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="caption">
                      Flight {returnLeg.segments[0]?.flightNumber}
                    </Typography>
                  </Box>
                  <Box textAlign="center" minWidth={100}>
                    <Typography variant="h6" fontWeight={600}>
                      {formatTime(returnLeg.arrival)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {returnLeg.destination.displayCode}
                    </Typography>
                    <Typography variant="body2">{returnLeg.destination.name}</Typography>
                  </Box>
                </Box>
              </Box>
            )}

            {/* Flight Policies */}
            <Box mt={3}>
              <Typography variant="subtitle2" gutterBottom>
                Fare Policies
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                <Chip
                  label={itinerary.farePolicy.isChangeAllowed ? "Changes allowed" : "No changes"}
                  size="small"
                  color={itinerary.farePolicy.isChangeAllowed ? "success" : "default"}
                />
                <Chip
                  label={
                    itinerary.farePolicy.isCancellationAllowed
                      ? "Cancellation allowed"
                      : "No cancellation"
                  }
                  size="small"
                  color={itinerary.farePolicy.isCancellationAllowed ? "success" : "default"}
                />
                {itinerary.tags.map((tag) => (
                  <Chip key={tag} label={tag.replace("_", " ")} size="small" variant="outlined" />
                ))}
              </Stack>
            </Box>
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
}
