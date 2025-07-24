import { FlightTakeoffOutlined, SearchOutlined, TuneOutlined } from "@mui/icons-material";
import { Box, Button, Card, CardContent, Typography, useTheme } from "@mui/material";

interface NoFlightResultsProps {
  onModifySearch?: () => void;
}

export function NoFlightResults({ onModifySearch }: NoFlightResultsProps) {
  const theme = useTheme();

  return (
    <Card
      elevation={1}
      sx={{
        textAlign: "center",
        py: 6,
        px: 4,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 3,
            opacity: 0.5,
          }}
        >
          <FlightTakeoffOutlined sx={{ fontSize: 64, color: "text.secondary" }} />
        </Box>

        <Typography variant="h5" fontWeight={600} gutterBottom>
          No flights found
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 4, maxWidth: 400, mx: "auto" }}
        >
          We couldn't find any flights matching your search criteria. Try adjusting your dates,
          destinations, or filters to see more options.
        </Typography>

        <Box display="flex" gap={2} justifyContent="center" flexWrap="wrap">
          <Button
            variant="outlined"
            startIcon={<TuneOutlined />}
            onClick={onModifySearch}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 2,
            }}
          >
            Modify search
          </Button>

          <Button
            variant="contained"
            startIcon={<SearchOutlined />}
            onClick={onModifySearch}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 2,
            }}
          >
            New search
          </Button>
        </Box>

        <Box mt={4}>
          <Typography variant="body2" color="text.secondary">
            Tips for better results:
          </Typography>
          <Box mt={1}>
            <Typography variant="caption" color="text.secondary" display="block">
              • Try nearby airports
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block">
              • Be flexible with your travel dates
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block">
              • Consider different cabin classes
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
