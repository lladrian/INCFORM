import React, { useState, useEffect } from "react";
import {
  Drawer,
  Typography,
  Avatar,
  List,
  ListItemButton,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  IconButton,
  useMediaQuery,
  useTheme,
  Badge,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SecurityIcon from "@mui/icons-material/Security";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import AssessmentIcon from "@mui/icons-material/Assessment"; // Icon for reports
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../utils/authContext";
import ArchiveIcon from "@mui/icons-material/Archive";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn"; // Make sure to import the icon

import "../Sidebar.css";

const profilePicUrl =
  "https://img.freepik.com/free-photo/isolated-happy-smiling-dog-white-background-portrait-4_1562-693.jpg?t=st=1723984303~exp=1723987903~hmac=1b96352b622b8cad8f9f72728a8f47fbe4e38c2ba999af61cfd580b8758dc795&w=900";

const Sidebar = ({ open, onClose, role }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isDrawerOpen, setIsDrawerOpen] = useState(open);
  const location = useLocation();
  const { logout } = useAuth();
  const [notificationCount, setNotificationCount] = useState(5); // Example notification count

  const [openSection, setOpenSection] = useState(null);

  useEffect(() => {
    if (isMobile) {
      setIsDrawerOpen(open);
    } else {
      setIsDrawerOpen(true);
    }
  }, [isMobile, open]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= theme.breakpoints.values.sm) {
        setIsDrawerOpen(true);
      } else {
        setIsDrawerOpen(open);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [theme.breakpoints.values.sm, open]);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setOpenSection(isExpanded ? panel : false);
  };

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={isDrawerOpen}
      onClose={isMobile ? onClose : undefined}
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#FFFFFF",
          color: "#333333",
          borderRight: `1px solid ${theme.palette.divider}`,
        },
      }}
    >
      <div className="sidebar-container">
        {isMobile && (
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              zIndex: 1200,
              display: "block",
            }}
          >
            <CloseIcon />
          </IconButton>
        )}

        <Avatar
          src={profilePicUrl}
          alt="Profile Picture"
          sx={{ width: 100, height: 100, margin: "16px auto" }}
          className="sidebar-profile"
        />

        <Typography
          variant="h6"
          sx={{
            textAlign: "center", // Center the text horizontally
            fontWeight: 600, // Semi-bold font weight
            color: "#333", // Optional: text color
          }}
        >
          GERALD C. MANATAD
        </Typography>

        <Divider />

        {role === "Instructor" ? (
          <List className="custom-scrollbar">
            {/* Dashboard */}
            <ListItemButton
              component={Link}
              to="/dashboard"
              className={`sidebar-list-item ${
                isActive("/dashboard") ? "active" : ""
              }`}
              sx={{
                borderRadius: 2,
                backgroundColor: isActive("/dashboard")
                  ? "#E0F7FA"
                  : "transparent",
                "&:hover": {
                  backgroundColor: isActive("/dashboard")
                    ? "#B2EBF2"
                    : "#F1F8E9",
                },
              }}
            >
              <DashboardIcon
                sx={{
                  marginRight: 2,
                  fontSize: 20,
                  color: isActive("/dashboard") ? "#00796B" : "#333333",
                }}
              />
              <ListItemText
                primary="Dashboard"
                primaryTypographyProps={{
                  fontWeight: isActive("/dashboard") ? "bold" : "normal",
                }}
              />
            </ListItemButton>

            {/* Management Section */}
            <Accordion
              expanded={openSection === "management"}
              onChange={handleAccordionChange("management")}
              sx={{ boxShadow: "none", backgroundColor: "transparent" }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Management
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {/* INC Form Management */}
                  <ListItemButton
                    component={Link}
                    to="/inc-form-management"
                    className={`sidebar-list-item ${
                      isActive("/inc-form-management") ? "active" : ""
                    }`}
                    sx={{
                      borderRadius: 2,
                      backgroundColor: isActive("/inc-form-management")
                        ? "#E0F7FA"
                        : "transparent",
                      "&:hover": {
                        backgroundColor: isActive("/inc-form-management")
                          ? "#B2EBF2"
                          : "#F1F8E9",
                      },
                    }}
                  >
                    <AssignmentIcon
                      sx={{
                        marginRight: 2,
                        fontSize: 20,
                        color: isActive("/inc-form-management")
                          ? "#00796B"
                          : "#333333",
                      }}
                    />
                    <ListItemText
                      primary="INC Form Management"
                      primaryTypographyProps={{
                        fontWeight: isActive("/inc-form-management")
                          ? "bold"
                          : "normal",
                      }}
                    />
                  </ListItemButton>

                  {/* Archived */}
                  <ListItemButton
                    component={Link}
                    to="/archive"
                    className={`sidebar-list-item ${
                      isActive("/archive") ? "active" : ""
                    }`}
                    sx={{
                      borderRadius: 2,
                      backgroundColor: isActive("/archive")
                        ? "#E0F7FA"
                        : "transparent",
                      "&:hover": {
                        backgroundColor: isActive("/archive")
                          ? "#B2EBF2"
                          : "#F1F8E9",
                      },
                    }}
                  >
                    <AssignmentIcon
                      sx={{
                        marginRight: 2,
                        fontSize: 20,
                        color: isActive("/archive") ? "#00796B" : "#333333",
                      }}
                    />
                    <ListItemText
                      primary="Archive"
                      primaryTypographyProps={{
                        fontWeight: isActive("/archive") ? "bold" : "normal",
                      }}
                    />
                  </ListItemButton>

                  {/* Reports */}
                  <ListItemButton
                    component={Link}
                    to="/summary"
                    className={`sidebar-list-item ${
                      isActive("/summary") ? "active" : ""
                    }`}
                    sx={{
                      borderRadius: 2,
                      backgroundColor: isActive("/summary")
                        ? "#E0F7FA"
                        : "transparent",
                      "&:hover": {
                        backgroundColor: isActive("/summary")
                          ? "#B2EBF2"
                          : "#F1F8E9",
                      },
                    }}
                  >
                    <AssessmentIcon
                      sx={{
                        marginRight: 2,
                        fontSize: 20,
                        color: isActive("/summary") ? "#00796B" : "#333333",
                      }}
                    />
                    <ListItemText
                      primary="Summary"
                      primaryTypographyProps={{
                        fontWeight: isActive("/summary") ? "bold" : "normal",
                      }}
                    />
                  </ListItemButton>
                </List>
              </AccordionDetails>
            </Accordion>

            {/* Notifications */}
            <ListItemButton
              component={Link}
              to="/notifications"
              className={`sidebar-list-item ${
                isActive("/notifications") ? "active" : ""
              }`}
              sx={{
                borderRadius: 2,
                backgroundColor: isActive("/notifications")
                  ? "#E0F7FA"
                  : "transparent",
                "&:hover": {
                  backgroundColor: isActive("/notifications")
                    ? "#B2EBF2"
                    : "#F1F8E9",
                },
              }}
            >
              <Badge badgeContent={notificationCount} color="error">
                <NotificationsIcon
                  sx={{
                    marginRight: 2,
                    fontSize: 20,
                    color: isActive("/notifications") ? "#00796B" : "#333333",
                  }}
                />
              </Badge>
              <ListItemText
                primary="Notifications"
                primaryTypographyProps={{
                  fontWeight: isActive("/notifications") ? "bold" : "normal",
                }}
              />
            </ListItemButton>

            {/* Profile */}
            <ListItemButton
              component={Link}
              to="/profile"
              className={`sidebar-list-item ${
                isActive("/profile") ? "active" : ""
              }`}
              sx={{
                borderRadius: 2,
                backgroundColor: isActive("/profile")
                  ? "#E0F7FA"
                  : "transparent",
                "&:hover": {
                  backgroundColor: isActive("/profile") ? "#B2EBF2" : "#F1F8E9",
                },
              }}
            >
              <PersonIcon
                sx={{
                  marginRight: 2,
                  fontSize: 20,
                  color: isActive("/profile") ? "#00796B" : "#333333",
                }}
              />
              <ListItemText
                primary="Profile"
                primaryTypographyProps={{
                  fontWeight: isActive("/profile") ? "bold" : "normal",
                }}
              />
            </ListItemButton>

            {/* Settings */}
            <ListItemButton
              component={Link}
              to="/settings"
              className={`sidebar-list-item ${
                isActive("/settings") ? "active" : ""
              }`}
              sx={{
                borderRadius: 2,
                backgroundColor: isActive("/settings")
                  ? "#E0F7FA"
                  : "transparent",
                "&:hover": {
                  backgroundColor: isActive("/settings")
                    ? "#B2EBF2"
                    : "#F1F8E9",
                },
              }}
            >
              <SettingsIcon
                sx={{
                  marginRight: 2,
                  fontSize: 20,
                  color: isActive("/settings") ? "#00796B" : "#333333",
                }}
              />
              <ListItemText
                primary="Settings"
                primaryTypographyProps={{
                  fontWeight: isActive("/settings") ? "bold" : "normal",
                }}
              />
            </ListItemButton>

            {/* Help */}
            <ListItemButton
              component={Link}
              to="/help"
              className={`sidebar-list-item ${
                isActive("/help") ? "active" : ""
              }`}
              sx={{
                borderRadius: 2,
                backgroundColor: isActive("/help") ? "#E0F7FA" : "transparent",
                "&:hover": {
                  backgroundColor: isActive("/help") ? "#B2EBF2" : "#F1F8E9",
                },
              }}
            >
              <HelpOutlineIcon
                sx={{
                  marginRight: 2,
                  fontSize: 20,
                  color: isActive("/help") ? "#00796B" : "#333333",
                }}
              />
              <ListItemText
                primary="Help"
                primaryTypographyProps={{
                  fontWeight: isActive("/help") ? "bold" : "normal",
                }}
              />
            </ListItemButton>

            {/* Logout */}
            <ListItemButton
              onClick={handleLogout}
              className="sidebar-list-item"
              sx={{
                borderRadius: 2,
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "#F1F8E9",
                },
              }}
            >
              <LogoutIcon
                sx={{
                  marginRight: 2,
                  fontSize: 20,
                  color: "#333333",
                }}
              />
              <ListItemText primary="Logout" />
            </ListItemButton>
          </List>
        ) : role === "Head Department" ? (
          <List className="custom-scrollbar">
            {/* Dashboard */}
            <ListItemButton
              component={Link}
              to="/dashboard"
              className={`sidebar-list-item ${
                isActive("/dashboard") ? "active" : ""
              }`}
              sx={{
                borderRadius: 2,
                backgroundColor: isActive("/dashboard")
                  ? "#E0F7FA"
                  : "transparent",
                "&:hover": {
                  backgroundColor: isActive("/dashboard")
                    ? "#B2EBF2"
                    : "#F1F8E9",
                },
              }}
            >
              <DashboardIcon
                sx={{
                  marginRight: 2,
                  fontSize: 20,
                  color: isActive("/dashboard") ? "#00796B" : "#333333",
                }}
              />
              <ListItemText
                primary="Dashboard"
                primaryTypographyProps={{
                  fontWeight: isActive("/dashboard") ? "bold" : "normal",
                }}
              />
            </ListItemButton>

            {/* Instructor-related sections */}
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="instructor-content"
                id="instructor-header"
                className="sidebar-accordion-summary"
                sx={{ fontWeight: "bold", fontSize: 16 }}
              >
                <Typography>Instructor Functionality</Typography>
              </AccordionSummary>
              <AccordionDetails className="sidebar-accordion-details">
                <List>
                  <ListItemButton
                    component={Link}
                    to="/instructor-form-management"
                    className={`sidebar-list-item ${
                      isActive("/instructor-form-management") ? "active" : ""
                    }`}
                    sx={{
                      borderRadius: 2,
                      backgroundColor: isActive("/instructor-form-management")
                        ? "#E0F7FA"
                        : "transparent",
                      "&:hover": {
                        backgroundColor: isActive("/instructor-form-management")
                          ? "#B2EBF2"
                          : "#F1F8E9",
                      },
                    }}
                  >
                    <AssignmentIcon
                      sx={{
                        marginRight: 2,
                        fontSize: 20,
                        color: isActive("/instructor-form-management")
                          ? "#00796B"
                          : "#333333",
                      }}
                    />
                    <ListItemText
                      primary="Manage INC Forms"
                      primaryTypographyProps={{
                        fontWeight: isActive("/instructor-form-management")
                          ? "bold"
                          : "normal",
                      }}
                    />
                  </ListItemButton>

                  {/* Archived */}
                  <ListItemButton
                    component={Link}
                    to="/archive-instructor"
                    className={`sidebar-list-item ${
                      isActive("/archive-instructor") ? "active" : ""
                    }`}
                    sx={{
                      borderRadius: 2,
                      backgroundColor: isActive("/archive-instructor")
                        ? "#E0F7FA"
                        : "transparent",
                      "&:hover": {
                        backgroundColor: isActive("/archive-instructor")
                          ? "#B2EBF2"
                          : "#F1F8E9",
                      },
                    }}
                  >
                    <AssignmentIcon
                      sx={{
                        marginRight: 2,
                        fontSize: 20,
                        color: isActive("/archive-instructor")
                          ? "#00796B"
                          : "#333333",
                      }}
                    />
                    <ListItemText
                      primary="Archive"
                      primaryTypographyProps={{
                        fontWeight: isActive("/archive-instructor")
                          ? "bold"
                          : "normal",
                      }}
                    />
                  </ListItemButton>

                  <ListItemButton
                    component={Link}
                    to="/notifications"
                    className={`sidebar-list-item ${
                      isActive("/notifications") ? "active" : ""
                    }`}
                    sx={{
                      borderRadius: 2,
                      backgroundColor: isActive("/notifications")
                        ? "#E0F7FA"
                        : "transparent",
                      "&:hover": {
                        backgroundColor: isActive("/notifications")
                          ? "#B2EBF2"
                          : "#F1F8E9",
                      },
                    }}
                  >
                    <NotificationsIcon
                      sx={{
                        marginRight: 2,
                        fontSize: 20,
                        color: isActive("/notifications")
                          ? "#00796B"
                          : "#333333",
                      }}
                    />
                    <ListItemText
                      primary="Notifications"
                      primaryTypographyProps={{
                        fontWeight: isActive("/notifications")
                          ? "bold"
                          : "normal",
                      }}
                    />
                  </ListItemButton>

                  <ListItemButton
                    component={Link}
                    to="/instructor-summary"
                    className={`sidebar-list-item ${
                      isActive("/instructor-summary") ? "active" : ""
                    }`}
                    sx={{
                      borderRadius: 2,
                      backgroundColor: isActive("/instructor-summary")
                        ? "#E0F7FA"
                        : "transparent",
                      "&:hover": {
                        backgroundColor: isActive("/instructor-summary")
                          ? "#B2EBF2"
                          : "#F1F8E9",
                      },
                    }}
                  >
                    <AssignmentIcon
                      sx={{
                        marginRight: 2,
                        fontSize: 20,
                        color: isActive("/instructor-summary")
                          ? "#00796B"
                          : "#333333",
                      }}
                    />
                    <ListItemText
                      primary="View Form Summary"
                      primaryTypographyProps={{
                        fontWeight: isActive("/instructor-summary")
                          ? "bold"
                          : "normal",
                      }}
                    />
                  </ListItemButton>
                </List>
              </AccordionDetails>
            </Accordion>

            {/* Department Head-related sections */}
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="hod-content"
                id="hod-header"
                className="sidebar-accordion-summary"
                sx={{ fontWeight: "bold", fontSize: 16 }}
              >
                <Typography>HOD Functionality</Typography>
              </AccordionSummary>
              <AccordionDetails className="sidebar-accordion-details">
                <List>
                  <ListItemButton
                    component={Link}
                    to="/hod-form-management"
                    className={`sidebar-list-item ${
                      isActive("/hod-form-management") ? "active" : ""
                    }`}
                    sx={{
                      borderRadius: 2,
                      backgroundColor: isActive("/hod-form-management")
                        ? "#E0F7FA"
                        : "transparent",
                      "&:hover": {
                        backgroundColor: isActive("/hod-form-management")
                          ? "#B2EBF2"
                          : "#F1F8E9",
                      },
                    }}
                  >
                    <AssignmentIcon
                      sx={{
                        marginRight: 2,
                        fontSize: 20,
                        color: isActive("/hod-form-management")
                          ? "#00796B"
                          : "#333333",
                      }}
                    />
                    <ListItemText
                      primary="Manage INC Forms"
                      primaryTypographyProps={{
                        fontWeight: isActive("/hod-form-management")
                          ? "bold"
                          : "normal",
                      }}
                    />
                  </ListItemButton>

                  {/* Archived */}
                  <ListItemButton
                    component={Link}
                    to="/archive-hod"
                    className={`sidebar-list-item ${
                      isActive("/archive-hod") ? "active" : ""
                    }`}
                    sx={{
                      borderRadius: 2,
                      backgroundColor: isActive("/archive-hod")
                        ? "#E0F7FA"
                        : "transparent",
                      "&:hover": {
                        backgroundColor: isActive("/archive-hod")
                          ? "#B2EBF2"
                          : "#F1F8E9",
                      },
                    }}
                  >
                    <AssignmentIcon
                      sx={{
                        marginRight: 2,
                        fontSize: 20,
                        color: isActive("/archive-hod") ? "#00796B" : "#333333",
                      }}
                    />
                    <ListItemText
                      primary="Archive"
                      primaryTypographyProps={{
                        fontWeight: isActive("/archive-hod")
                          ? "bold"
                          : "normal",
                      }}
                    />
                  </ListItemButton>

                  <ListItemButton
                    component={Link}
                    to="/notifications"
                    className={`sidebar-list-item ${
                      isActive("/notifications") ? "active" : ""
                    }`}
                    sx={{
                      borderRadius: 2,
                      backgroundColor: isActive("/notifications")
                        ? "#E0F7FA"
                        : "transparent",
                      "&:hover": {
                        backgroundColor: isActive("/notifications")
                          ? "#B2EBF2"
                          : "#F1F8E9",
                      },
                    }}
                  >
                    <NotificationsIcon
                      sx={{
                        marginRight: 2,
                        fontSize: 20,
                        color: isActive("/notifications")
                          ? "#00796B"
                          : "#333333",
                      }}
                    />
                    <ListItemText
                      primary="Notifications"
                      primaryTypographyProps={{
                        fontWeight: isActive("/notifications")
                          ? "bold"
                          : "normal",
                      }}
                    />
                  </ListItemButton>

                  <ListItemButton
                    component={Link}
                    to="/department-summary"
                    className={`sidebar-list-item ${
                      isActive("/department-summary") ? "active" : ""
                    }`}
                    sx={{
                      borderRadius: 2,
                      backgroundColor: isActive("/department-summary")
                        ? "#E0F7FA"
                        : "transparent",
                      "&:hover": {
                        backgroundColor: isActive("/department-summary")
                          ? "#B2EBF2"
                          : "#F1F8E9",
                      },
                    }}
                  >
                    <AssignmentIcon
                      sx={{
                        marginRight: 2,
                        fontSize: 20,
                        color: isActive("/department-summary")
                          ? "#00796B"
                          : "#333333",
                      }}
                    />
                    <ListItemText
                      primary="Department Summary"
                      primaryTypographyProps={{
                        fontWeight: isActive("/department-summary")
                          ? "bold"
                          : "normal",
                      }}
                    />
                  </ListItemButton>
                </List>
              </AccordionDetails>
            </Accordion>

            {/* Shared Sections */}
            <List>
              <ListItemButton
                component={Link}
                to="/mfa"
                className={`sidebar-list-item ${
                  isActive("/mfa") ? "active" : ""
                }`}
                sx={{
                  borderRadius: 2,
                  backgroundColor: isActive("/mfa") ? "#E0F7FA" : "transparent",
                  "&:hover": {
                    backgroundColor: isActive("/mfa") ? "#B2EBF2" : "#F1F8E9",
                  },
                }}
              >
                <SecurityIcon
                  sx={{
                    marginRight: 2,
                    fontSize: 20,
                    color: isActive("/mfa") ? "#00796B" : "#333333",
                  }}
                />
                <ListItemText
                  primary="Multi-Factor Authentication"
                  primaryTypographyProps={{
                    fontWeight: isActive("/mfa") ? "bold" : "normal",
                  }}
                />
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/profile"
                className={`sidebar-list-item ${
                  isActive("/profile") ? "active" : ""
                }`}
                sx={{
                  borderRadius: 2,
                  backgroundColor: isActive("/profile")
                    ? "#E0F7FA"
                    : "transparent",
                  "&:hover": {
                    backgroundColor: isActive("/profile")
                      ? "#B2EBF2"
                      : "#F1F8E9",
                  },
                }}
              >
                <PersonIcon
                  sx={{
                    marginRight: 2,
                    fontSize: 20,
                    color: isActive("/profile") ? "#00796B" : "#333333",
                  }}
                />
                <ListItemText
                  primary="Profile"
                  primaryTypographyProps={{
                    fontWeight: isActive("/profile") ? "bold" : "normal",
                  }}
                />
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/settings"
                className={`sidebar-list-item ${
                  isActive("/settings") ? "active" : ""
                }`}
                sx={{
                  borderRadius: 2,
                  backgroundColor: isActive("/settings")
                    ? "#E0F7FA"
                    : "transparent",
                  "&:hover": {
                    backgroundColor: isActive("/settings")
                      ? "#B2EBF2"
                      : "#F1F8E9",
                  },
                }}
              >
                <SettingsIcon
                  sx={{
                    marginRight: 2,
                    fontSize: 20,
                    color: isActive("/settings") ? "#00796B" : "#333333",
                  }}
                />
                <ListItemText
                  primary="Settings"
                  primaryTypographyProps={{
                    fontWeight: isActive("/settings") ? "bold" : "normal",
                  }}
                />
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/help"
                className={`sidebar-list-item ${
                  isActive("/help") ? "active" : ""
                }`}
                sx={{
                  borderRadius: 2,
                  backgroundColor: isActive("/help")
                    ? "#E0F7FA"
                    : "transparent",
                  "&:hover": {
                    backgroundColor: isActive("/help") ? "#B2EBF2" : "#F1F8E9",
                  },
                }}
              >
                <HelpOutlineIcon
                  sx={{
                    marginRight: 2,
                    fontSize: 20,
                    color: isActive("/help") ? "#00796B" : "#333333",
                  }}
                />
                <ListItemText
                  primary="Help"
                  primaryTypographyProps={{
                    fontWeight: isActive("/help") ? "bold" : "normal",
                  }}
                />
              </ListItemButton>
              <ListItemButton
                className="sidebar-list-item"
                onClick={handleLogout}
                sx={{
                  marginTop: "auto",
                  borderTop: "1px solid #E0E0E0",
                  borderRadius: 2,
                  backgroundColor: "transparent",
                  "&:hover": {
                    backgroundColor: "#FFEBEE",
                  },
                }}
              >
                <LogoutIcon
                  sx={{ marginRight: 2, fontSize: 20, color: "#FF5722" }}
                />
                <ListItemText
                  primary="Log out"
                  primaryTypographyProps={{ fontWeight: "bold" }}
                />
              </ListItemButton>
            </List>
          </List>
        ) : role === "Cashier" ? (
          <List className="custom-scrollbar">
            {/* Dashboard */}
            <ListItemButton
              component={Link}
              to="/dashboard"
              className={`sidebar-list-item ${
                isActive("/dashboard") ? "active" : ""
              }`}
              sx={{
                borderRadius: 2,
                backgroundColor: isActive("/dashboard")
                  ? "#E0F7FA"
                  : "transparent",
                "&:hover": {
                  backgroundColor: isActive("/dashboard")
                    ? "#B2EBF2"
                    : "#F1F8E9",
                },
              }}
            >
              <DashboardIcon
                sx={{
                  marginRight: 2,
                  fontSize: 20,
                  color: isActive("/dashboard") ? "#00796B" : "#333333",
                }}
              />
              <ListItemText
                primary="Dashboard"
                primaryTypographyProps={{
                  fontWeight: isActive("/dashboard") ? "bold" : "normal",
                }}
              />
            </ListItemButton>

            {/* Cashier-related sections */}
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="cashier-content"
                id="cashier-header"
                className="sidebar-accordion-summary"
                sx={{ fontWeight: "bold", fontSize: 16 }}
              >
                <Typography>Cashier Functionality</Typography>
              </AccordionSummary>
              <AccordionDetails className="sidebar-accordion-details">
                <List>
                  <ListItemButton
                    component={Link}
                    to="/online-payments"
                    className={`sidebar-list-item ${
                      isActive("/online-payments") ? "active" : ""
                    }`}
                    sx={{
                      borderRadius: 2,
                      backgroundColor: isActive("/online-payments")
                        ? "#E0F7FA"
                        : "transparent",
                      "&:hover": {
                        backgroundColor: isActive("/online-payments")
                          ? "#B2EBF2"
                          : "#F1F8E9",
                      },
                    }}
                  >
                    <AssignmentIcon
                      sx={{
                        marginRight: 2,
                        fontSize: 20,
                        color: isActive("/online-payments")
                          ? "#00796B"
                          : "#333333",
                      }}
                    />
                    <ListItemText
                      primary="Online Payments"
                      primaryTypographyProps={{
                        fontWeight: isActive("/online-payments")
                          ? "bold"
                          : "normal",
                      }}
                    />
                  </ListItemButton>

                  <ListItemButton
                    component={Link}
                    to="/walk-in-payments"
                    className={`sidebar-list-item ${
                      isActive("/walk-in-payments") ? "active" : ""
                    }`}
                    sx={{
                      borderRadius: 2,
                      backgroundColor: isActive("/walk-in-payments")
                        ? "#E0F7FA"
                        : "transparent",
                      "&:hover": {
                        backgroundColor: isActive("/walk-in-payments")
                          ? "#B2EBF2"
                          : "#F1F8E9",
                      },
                    }}
                  >
                    <AssignmentIcon
                      sx={{
                        marginRight: 2,
                        fontSize: 20,
                        color: isActive("/walk-in-payments")
                          ? "#00796B"
                          : "#333333",
                      }}
                    />
                    <ListItemText
                      primary="Walk-In Payments"
                      primaryTypographyProps={{
                        fontWeight: isActive("/walk-in-payments")
                          ? "bold"
                          : "normal",
                      }}
                    />
                  </ListItemButton>

                  <ListItemButton
                    component={Link}
                    to="/reports"
                    className={`sidebar-list-item ${
                      isActive("/reports") ? "active" : ""
                    }`}
                    sx={{
                      borderRadius: 2,
                      backgroundColor: isActive("/reports")
                        ? "#E0F7FA"
                        : "transparent",
                      "&:hover": {
                        backgroundColor: isActive("/reports")
                          ? "#B2EBF2"
                          : "#F1F8E9",
                      },
                    }}
                  >
                    <AssignmentIcon
                      sx={{
                        marginRight: 2,
                        fontSize: 20,
                        color: isActive("/reports") ? "#00796B" : "#333333",
                      }}
                    />
                    <ListItemText
                      primary="Reports"
                      primaryTypographyProps={{
                        fontWeight: isActive("/reports") ? "bold" : "normal",
                      }}
                    />
                  </ListItemButton>
                </List>
              </AccordionDetails>
            </Accordion>

            {/* Archived INC Forms */}
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="archived-inc-content"
                id="archived-inc-header"
                className="sidebar-accordion-summary"
                sx={{ fontWeight: "bold", fontSize: 16 }}
              >
                <Typography>Archived INC Forms</Typography>
              </AccordionSummary>
              <AccordionDetails className="sidebar-accordion-details">
                <List>
                  <ListItemButton
                    component={Link}
                    to="/archived-inc"
                    className={`sidebar-list-item ${
                      isActive("/archived-inc") ? "active" : ""
                    }`}
                    sx={{
                      borderRadius: 2,
                      backgroundColor: isActive("/archived-inc")
                        ? "#E0F7FA"
                        : "transparent",
                      "&:hover": {
                        backgroundColor: isActive("/archived-inc")
                          ? "#B2EBF2"
                          : "#F1F8E9",
                      },
                    }}
                  >
                    <ArchiveIcon
                      sx={{
                        marginRight: 2,
                        fontSize: 20,
                        color: isActive("/archived-inc")
                          ? "#00796B"
                          : "#333333",
                      }}
                    />
                    <ListItemText
                      primary="Manage Archived INC Forms"
                      primaryTypographyProps={{
                        fontWeight: isActive("/archived-inc")
                          ? "bold"
                          : "normal",
                      }}
                    />
                  </ListItemButton>
                </List>
              </AccordionDetails>
            </Accordion>

            {/* Notifications */}
            <ListItemButton
              component={Link}
              to="/notifications"
              className={`sidebar-list-item ${
                isActive("/notifications") ? "active" : ""
              }`}
              sx={{
                borderRadius: 2,
                backgroundColor: isActive("/notifications")
                  ? "#E0F7FA"
                  : "transparent",
                "&:hover": {
                  backgroundColor: isActive("/notifications")
                    ? "#B2EBF2"
                    : "#F1F8E9",
                },
              }}
            >
              <Badge badgeContent={notificationCount} color="secondary">
                <NotificationsIcon
                  sx={{
                    marginRight: 2,
                    fontSize: 20,
                    color: isActive("/notifications") ? "#00796B" : "#333333",
                  }}
                />
              </Badge>
              <ListItemText
                primary="Notifications"
                primaryTypographyProps={{
                  fontWeight: isActive("/notifications") ? "bold" : "normal",
                }}
              />
            </ListItemButton>

            {/* Settings */}
            <ListItemButton
              component={Link}
              to="/settings"
              className={`sidebar-list-item ${
                isActive("/settings") ? "active" : ""
              }`}
              sx={{
                borderRadius: 2,
                backgroundColor: isActive("/settings")
                  ? "#E0F7FA"
                  : "transparent",
                "&:hover": {
                  backgroundColor: isActive("/settings")
                    ? "#B2EBF2"
                    : "#F1F8E9",
                },
              }}
            >
              <SettingsIcon
                sx={{
                  marginRight: 2,
                  fontSize: 20,
                  color: isActive("/settings") ? "#00796B" : "#333333",
                }}
              />
              <ListItemText
                primary="Settings"
                primaryTypographyProps={{
                  fontWeight: isActive("/settings") ? "bold" : "normal",
                }}
              />
            </ListItemButton>

            {/* Logout */}
            <ListItemButton
              onClick={handleLogout}
              className="sidebar-list-item"
            >
              <LogoutIcon
                sx={{ marginRight: 2, fontSize: 20, color: "#333333" }}
              />
              <ListItemText primary="Logout" />
            </ListItemButton>
          </List>
        ) : role === "Registrar Head" ? (
          <List className="custom-scrollbar">
            {/* Dashboard */}
            <ListItemButton
              component={Link}
              to="/dashboard"
              className={`sidebar-list-item ${
                isActive("/dashboard") ? "active" : ""
              }`}
              sx={{
                borderRadius: 2,
                backgroundColor: isActive("/dashboard")
                  ? "#E0F7FA"
                  : "transparent",
                "&:hover": {
                  backgroundColor: isActive("/dashboard")
                    ? "#B2EBF2"
                    : "#F1F8E9",
                },
              }}
            >
              <DashboardIcon
                sx={{
                  marginRight: 2,
                  fontSize: 20,
                  color: isActive("/dashboard") ? "#00796B" : "#333333",
                }}
              />
              <ListItemText
                primary="Dashboard"
                primaryTypographyProps={{
                  fontWeight: isActive("/dashboard") ? "bold" : "normal",
                }}
              />
            </ListItemButton>

            {/* Management Section */}
            <Accordion
              expanded={openSection === "management"}
              onChange={handleAccordionChange("management")}
              sx={{ boxShadow: "none", backgroundColor: "transparent" }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Management
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {/* INC Form Management */}
                  <ListItemButton
                    component={Link}
                    to="/inc-form-management"
                    className={`sidebar-list-item ${
                      isActive("/inc-form-management") ? "active" : ""
                    }`}
                    sx={{
                      borderRadius: 2,
                      backgroundColor: isActive("/inc-form-management")
                        ? "#E0F7FA"
                        : "transparent",
                      "&:hover": {
                        backgroundColor: isActive("/inc-form-management")
                          ? "#B2EBF2"
                          : "#F1F8E9",
                      },
                    }}
                  >
                    <AssignmentIcon
                      sx={{
                        marginRight: 2,
                        fontSize: 20,
                        color: isActive("/inc-form-management")
                          ? "#00796B"
                          : "#333333",
                      }}
                    />
                    <ListItemText
                      primary="INC Form Management"
                      primaryTypographyProps={{
                        fontWeight: isActive("/inc-form-management")
                          ? "bold"
                          : "normal",
                      }}
                    />
                  </ListItemButton>

                  {/* Finalizing INC Form Request */}
                  <ListItemButton
                    component={Link}
                    to="/finalizing-inc-form-request"
                    className={`sidebar-list-item ${
                      isActive("/finalizing-inc-form-request") ? "active" : ""
                    }`}
                    sx={{
                      borderRadius: 2,
                      backgroundColor: isActive("/finalizing-inc-form-request")
                        ? "#E0F7FA"
                        : "transparent",
                      "&:hover": {
                        backgroundColor: isActive(
                          "/finalizing-inc-form-request"
                        )
                          ? "#B2EBF2"
                          : "#F1F8E9",
                      },
                    }}
                  >
                    <AssignmentTurnedInIcon // Updated Icon
                      sx={{
                        marginRight: 2,
                        fontSize: 20,
                        color: isActive("/finalizing-inc-form-request")
                          ? "#00796B"
                          : "#333333",
                      }}
                    />
                    <ListItemText
                      primary="Finalizing INC Form Request"
                      primaryTypographyProps={{
                        fontWeight: isActive("/finalizing-inc-form-request")
                          ? "bold"
                          : "normal",
                      }}
                    />
                  </ListItemButton>
                  

                  <ListItemButton
                    component={Link}
                    to="/archive"
                    className={`sidebar-list-item ${
                      isActive("/archive") ? "active" : ""
                    }`}
                    sx={{
                      borderRadius: 2,
                      backgroundColor: isActive("/archive")
                        ? "#E0F7FA"
                        : "transparent",
                      "&:hover": {
                        backgroundColor: isActive("/archive")
                          ? "#B2EBF2"
                          : "#F1F8E9",
                      },
                    }}
                  >
                    <AssignmentIcon
                      sx={{
                        marginRight: 2,
                        fontSize: 20,
                        color: isActive("/archive") ? "#00796B" : "#333333",
                      }}
                    />
                    <ListItemText
                      primary="Archive"
                      primaryTypographyProps={{
                        fontWeight: isActive("/archive") ? "bold" : "normal",
                      }}
                    />
                  </ListItemButton>

                  {/* Reports */}
                  <ListItemButton
                    component={Link}
                    to="/reports"
                    className={`sidebar-list-item ${
                      isActive("/reports") ? "active" : ""
                    }`}
                    sx={{
                      borderRadius: 2,
                      backgroundColor: isActive("/reports")
                        ? "#E0F7FA"
                        : "transparent",
                      "&:hover": {
                        backgroundColor: isActive("/reports")
                          ? "#B2EBF2"
                          : "#F1F8E9",
                      },
                    }}
                  >
                    <AssessmentIcon
                      sx={{
                        marginRight: 2,
                        fontSize: 20,
                        color: isActive("/reports") ? "#00796B" : "#333333",
                      }}
                    />
                    <ListItemText
                      primary="Reports"
                      primaryTypographyProps={{
                        fontWeight: isActive("/reports") ? "bold" : "normal",
                      }}
                    />
                  </ListItemButton>
                </List>
              </AccordionDetails>
            </Accordion>

            {/* Notifications */}
            <ListItemButton
              component={Link}
              to="/notifications"
              className={`sidebar-list-item ${
                isActive("/notifications") ? "active" : ""
              }`}
              sx={{
                borderRadius: 2,
                backgroundColor: isActive("/notifications")
                  ? "#E0F7FA"
                  : "transparent",
                "&:hover": {
                  backgroundColor: isActive("/notifications")
                    ? "#B2EBF2"
                    : "#F1F8E9",
                },
              }}
            >
              <Badge badgeContent={notificationCount} color="error">
                <NotificationsIcon
                  sx={{
                    marginRight: 2,
                    fontSize: 20,
                    color: isActive("/notifications") ? "#00796B" : "#333333",
                  }}
                />
              </Badge>
              <ListItemText
                primary="Notifications"
                primaryTypographyProps={{
                  fontWeight: isActive("/notifications") ? "bold" : "normal",
                }}
              />
            </ListItemButton>

            {/* Profile */}
            <ListItemButton
              component={Link}
              to="/profile"
              className={`sidebar-list-item ${
                isActive("/profile") ? "active" : ""
              }`}
              sx={{
                borderRadius: 2,
                backgroundColor: isActive("/profile")
                  ? "#E0F7FA"
                  : "transparent",
                "&:hover": {
                  backgroundColor: isActive("/profile") ? "#B2EBF2" : "#F1F8E9",
                },
              }}
            >
              <PersonIcon
                sx={{
                  marginRight: 2,
                  fontSize: 20,
                  color: isActive("/profile") ? "#00796B" : "#333333",
                }}
              />
              <ListItemText
                primary="Profile"
                primaryTypographyProps={{
                  fontWeight: isActive("/profile") ? "bold" : "normal",
                }}
              />
            </ListItemButton>

            {/* Settings */}
            <ListItemButton
              component={Link}
              to="/settings"
              className={`sidebar-list-item ${
                isActive("/settings") ? "active" : ""
              }`}
              sx={{
                borderRadius: 2,
                backgroundColor: isActive("/settings")
                  ? "#E0F7FA"
                  : "transparent",
                "&:hover": {
                  backgroundColor: isActive("/settings")
                    ? "#B2EBF2"
                    : "#F1F8E9",
                },
              }}
            >
              <SettingsIcon
                sx={{
                  marginRight: 2,
                  fontSize: 20,
                  color: isActive("/settings") ? "#00796B" : "#333333",
                }}
              />
              <ListItemText
                primary="Settings"
                primaryTypographyProps={{
                  fontWeight: isActive("/settings") ? "bold" : "normal",
                }}
              />
            </ListItemButton>

            {/* Help */}
            <ListItemButton
              component={Link}
              to="/help"
              className={`sidebar-list-item ${
                isActive("/help") ? "active" : ""
              }`}
              sx={{
                borderRadius: 2,
                backgroundColor: isActive("/help") ? "#E0F7FA" : "transparent",
                "&:hover": {
                  backgroundColor: isActive("/help") ? "#B2EBF2" : "#F1F8E9",
                },
              }}
            >
              <HelpOutlineIcon
                sx={{
                  marginRight: 2,
                  fontSize: 20,
                  color: isActive("/help") ? "#00796B" : "#333333",
                }}
              />
              <ListItemText
                primary="Help"
                primaryTypographyProps={{
                  fontWeight: isActive("/help") ? "bold" : "normal",
                }}
              />
            </ListItemButton>

            {/* Logout */}
            <ListItemButton
              onClick={handleLogout}
              className="sidebar-list-item"
              sx={{
                borderRadius: 2,
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "#F1F8E9",
                },
              }}
            >
              <LogoutIcon
                sx={{
                  marginRight: 2,
                  fontSize: 20,
                  color: "#333333",
                }}
              />
              <ListItemText primary="Logout" />
            </ListItemButton>
          </List>
        ) : (
          <></>
        )}
      </div>
    </Drawer>
  );
};

export default Sidebar;
