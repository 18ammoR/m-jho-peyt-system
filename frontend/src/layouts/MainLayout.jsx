import { Outlet } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />

      <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
        <Outlet />
      </Container>

      <Box component="footer" sx={{ bgcolor: "grey.900", color: "white", py: 3, textAlign: "center" }}>
        <Typography variant="body2">
          © {new Date().getFullYear()} Our App. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}