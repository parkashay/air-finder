import {
  AttachMoney,
  InfoOutlined,
  Schedule,
  Sort,
  TrendingUp,
} from "@mui/icons-material";
import {
  Box,
  Chip,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";

interface FlightResultsHeaderProps {
  totalResults: number;
  sortBy: string;
  onSortChange: (sortBy: string) => void;
}

export function FlightResultsHeader({
  totalResults,
  sortBy,
  onSortChange,
}: FlightResultsHeaderProps) {
  const theme = useTheme();

  const sortOptions = [
    { value: "top_flights", label: "Top flights", icon: <TrendingUp fontSize="small" /> },
    {
      value: "price_low",
      label: "Price (Low to High)",
      icon: <AttachMoney fontSize="small" />,
    },
    {
      value: "price_high",
      label: "Price (High to Low)",
      icon: <AttachMoney fontSize="small" />,
    },
    { value: "duration", label: "Duration", icon: <Schedule fontSize="small" /> },
    { value: "departure", label: "Departure time", icon: <Schedule fontSize="small" /> },
  ];

  return (
    <Box
      sx={{
        mb: 3,
        p: 3,
        backgroundColor: "background.paper",
        borderRadius: 2,
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
        mb={2}
      >
        <Box>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Top flights
          </Typography>
          <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
            <Typography variant="body2" color="text.secondary">
              Ranked based on price and convenience
            </Typography>
            <Tooltip title="Rankings consider factors like price, flight duration, number of stops, departure times, and airline reliability">
              <IconButton size="small">
                <InfoOutlined fontSize="small" />
              </IconButton>
            </Tooltip>
            <Typography variant="body2" color="text.secondary">
              Prices include required taxes + fees for 1 adult. Optional charges and bag
              fees may apply.
            </Typography>
          </Box>
        </Box>

        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="body2" color="text.secondary">
            Sorted by
          </Typography>
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <Select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              displayEmpty
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.divider,
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.primary.main,
                },
              }}
            >
              {sortOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <Box display="flex" alignItems="center" gap={1}>
                    {option.icon}
                    {option.label}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Sort color="action" />
        </Box>
      </Box>

      <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
        <Chip
          label={`${totalResults} flights found`}
          size="small"
          variant="outlined"
          color="primary"
        />
        <Chip
          label="Passenger assistance"
          size="small"
          variant="outlined"
          sx={{ color: "text.secondary" }}
        />
        <Typography variant="caption" color="text.secondary">
          info.
        </Typography>
      </Box>
    </Box>
  );
}
