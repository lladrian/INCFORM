import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../utils/authContext";

const LayoutAuth = () => {
  const { role } = useAuth(); // Get the user role from auth context

  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // For small screens
  const isDesktop = useMediaQuery(theme.breakpoints.up("md")); // For medium and larger screens

  const handleDrawerToggle = () => setOpen(!open);

  return (
    <>
      {role === "Student" ? (
        <>
          <Header />
          <Outlet />
        </>
      ) : (
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          {isMobile && (
            <AppBar position="fixed">
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2 }}
                >
                  <MenuIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
          )}
          <Sidebar open={open} onClose={() => setOpen(false)} role={role} />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              bgcolor: "background.default",
              // p: isMobile ? 3 : 0,
              
            }} // Adjust padding based on screen size
          >
            {isMobile && <Toolbar />} {/* Only render Toolbar on mobile */}
            <Outlet />
          </Box>
        </Box>
      )}
    </>
  );
};

export default LayoutAuth;
