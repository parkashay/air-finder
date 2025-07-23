import { Outlet } from "react-router";
import { Navbar } from "../components/Navbar/Navbar";
import { Box } from "@mui/material";

export function RootLayout() {
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "background.default" }}>
      <Navbar />
      <Box component="main">
        <Outlet />
      </Box>
    </Box>
  );
}
