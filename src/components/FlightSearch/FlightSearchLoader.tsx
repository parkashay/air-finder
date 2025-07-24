import { Box, Card, CardContent, Grid, Skeleton, Typography, useTheme } from "@mui/material";

export function FlightSearchLoader() {
  const theme = useTheme();

  const SkeletonCard = () => (
    <Card
      elevation={1}
      sx={{
        mb: 2,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
      }}
    >
      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        <Grid container spacing={2} alignItems="center">
          {/* Airline Logo & Name */}
          <Grid item xs={12} sm={3} md={2}>
            <Box display="flex" alignItems="center" gap={1.5}>
              <Skeleton variant="circular" width={32} height={32} />
              <Box>
                <Skeleton variant="text" width={120} height={20} />
                <Skeleton variant="text" width={40} height={16} />
              </Box>
            </Box>
          </Grid>

          {/* Flight Times & Route */}
          <Grid item xs={12} sm={4} md={3}>
            <Box>
              <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                <Skeleton variant="text" width={50} height={24} />
                <Skeleton variant="rectangular" width={40} height={2} />
                <Skeleton variant="text" width={50} height={24} />
              </Box>
              <Skeleton variant="text" width={80} height={16} />
            </Box>
          </Grid>

          {/* Duration */}
          <Grid item xs={6} sm={2} md={2}>
            <Box textAlign="center">
              <Skeleton variant="text" width={60} height={20} sx={{ mx: "auto" }} />
              <Skeleton variant="text" width={50} height={14} sx={{ mx: "auto" }} />
            </Box>
          </Grid>

          {/* Stops */}
          <Grid item xs={6} sm={2} md={2}>
            <Box textAlign="center">
              <Skeleton variant="text" width={60} height={20} sx={{ mx: "auto" }} />
              <Skeleton variant="text" width={40} height={14} sx={{ mx: "auto" }} />
            </Box>
          </Grid>

          {/* CO2 Emissions */}
          <Grid item xs={6} sm={1} md={1}>
            <Box textAlign="center">
              <Skeleton variant="text" width={50} height={16} sx={{ mx: "auto" }} />
              <Skeleton variant="text" width={40} height={14} sx={{ mx: "auto" }} />
            </Box>
          </Grid>

          {/* Price & Select */}
          <Grid item xs={6} sm={2} md={2}>
            <Box textAlign="right">
              <Skeleton variant="text" width={80} height={24} sx={{ ml: "auto", mb: 1 }} />
              <Skeleton
                variant="rectangular"
                width={70}
                height={32}
                sx={{ ml: "auto", borderRadius: 2 }}
              />
            </Box>
          </Grid>
        </Grid>

        {/* Expand Button */}
        <Box display="flex" justifyContent="center" mt={2}>
          <Skeleton variant="circular" width={24} height={24} />
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      {/* Header Skeleton */}
      <Box
        sx={{
          mb: 3,
          p: 3,
          backgroundColor: "background.paper",
          borderRadius: 2,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Box>
            <Skeleton variant="text" width={150} height={32} sx={{ mb: 1 }} />
            <Skeleton variant="text" width={300} height={16} />
            <Skeleton variant="text" width={400} height={16} />
          </Box>
          <Box display="flex" alignItems="center" gap={2}>
            <Skeleton variant="text" width={80} height={16} />
            <Skeleton variant="rectangular" width={180} height={40} sx={{ borderRadius: 1 }} />
          </Box>
        </Box>
        <Box display="flex" gap={1}>
          <Skeleton variant="rectangular" width={100} height={24} sx={{ borderRadius: 12 }} />
          <Skeleton variant="rectangular" width={140} height={24} sx={{ borderRadius: 12 }} />
        </Box>
      </Box>

      {/* Loading Message */}
      <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
        <Typography variant="body2" color="text.secondary">
          Searching for the best flights...
        </Typography>
      </Box>

      {/* Skeleton Cards */}
      {Array.from({ length: 6 }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </Box>
  );
}
