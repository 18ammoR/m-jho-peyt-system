import { Link as RouterLink, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Stack, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Contact", to: "/contact" },
  { label: "Tasks", to: "/tasks" },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton color="inherit" component={RouterLink} to="/" edge="start">
          <HomeIcon />
        </IconButton>

        <Typography variant="h6" sx={{ flexGrow: 1, ml: 1 }}>
          Our App
        </Typography>

        <Stack direction="row" spacing={1}>
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Button
                key={item.to}
                color="inherit"
                component={RouterLink}
                to={item.to}
                sx={{
                  borderBottom: active ? "2px solid" : "2px solid transparent",
                  borderRadius: 0,
                }}
              >
                {item.label}
              </Button>
            );
          })}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}