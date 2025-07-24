import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Button,
  useTheme as useMuiTheme,
  useMediaQuery,
} from "@mui/material";
import { Menu as MenuIcon, AccountCircle, DarkMode, LightMode } from "@mui/icons-material";
import { useTheme } from "../../theme/useTheme";
import { Link } from "react-router";

export function Navbar() {
  const { toggleTheme, isDarkMode } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));
  const [mobileMenuAnchor, setMobileMenuAnchor] = React.useState<null | HTMLElement>(null);

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "background.paper",
        borderBottom: `1px solid ${muiTheme.palette.divider}`,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: 2 }}>
        {/* Left side - Menu and Google */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Mobile menu button - only visible on small screens */}
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMobileMenuOpen}
              sx={{ color: "text.primary" }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Link to="/">
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: 400,
                  color: "text.primary",
                  fontSize: "1.375rem",
                }}
              >
                AirFinder
              </Typography>
            </Link>
          </Box>
        </Box>

        {/* Center - Navigation tabs - hidden on mobile */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 1,
          }}
        >
          <Button
            variant="text"
            sx={{
              color: "text.secondary",
              textTransform: "none",
              fontWeight: 400,
              "&:hover": {
                backgroundColor: "action.hover",
              },
            }}
          >
            Travel
          </Button>
          <Button
            variant="text"
            sx={{
              color: "text.secondary",
              textTransform: "none",
              fontWeight: 400,
              "&:hover": {
                backgroundColor: "action.hover",
              },
            }}
          >
            Explore
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "primary.main",
              color: "white",
              textTransform: "none",
              fontWeight: 500,
              px: 3,
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            }}
          >
            Flights
          </Button>
          <Button
            variant="text"
            sx={{
              color: "text.secondary",
              textTransform: "none",
              fontWeight: 400,
              "&:hover": {
                backgroundColor: "action.hover",
              },
            }}
          >
            Hotels
          </Button>
          <Button
            variant="text"
            sx={{
              color: "text.secondary",
              textTransform: "none",
              fontWeight: 400,
              "&:hover": {
                backgroundColor: "action.hover",
              },
            }}
          >
            Holiday rentals
          </Button>
        </Box>

        {/* Right side - Theme toggle and Profile */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            onClick={toggleTheme}
            sx={{ color: "text.primary" }}
            aria-label="toggle theme"
          >
            {isDarkMode ? <LightMode /> : <DarkMode />}
          </IconButton>

          <IconButton edge="end" aria-label="account" sx={{ color: "text.primary" }}>
            <AccountCircle />
          </IconButton>
        </Box>

        {/* Mobile Navigation Menu */}
        <Menu
          anchorEl={mobileMenuAnchor}
          open={Boolean(mobileMenuAnchor)}
          onClose={handleMobileMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          <MenuItem onClick={handleMobileMenuClose}>Travel</MenuItem>
          <MenuItem onClick={handleMobileMenuClose}>Explore</MenuItem>
          <MenuItem
            onClick={handleMobileMenuClose}
            sx={{
              backgroundColor: "primary.main",
              color: "white",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            }}
          >
            Flights
          </MenuItem>
          <MenuItem onClick={handleMobileMenuClose}>Hotels</MenuItem>
          <MenuItem onClick={handleMobileMenuClose}>Holiday rentals</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
