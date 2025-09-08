import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Stack,
  Menu,
  MenuItem,
} from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import { Gear } from "phosphor-react";

import { Nav_Buttons, Profile_Menu } from "../../data";
import useSettings from "../../hooks/useSettings";
import IOSSwitch from "../../components/IOSSwitch";
import { faker } from "@faker-js/faker";
import Logo from "../../assets/Images/trapp.png";
import { LogoutUser } from "../../redux/slices/auth";

const SideBar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(0);
  const { onToggleMode } = useSettings();

  // Function to get selected index based on current path
  const getSelectedFromPath = (pathname) => {
    switch (pathname) {
      case "/app":
        return 0; // Chats
      case "/group":
        return 1; // Groups
      case "/call":
        return 2; // Call logs
      case "/settings":
        return 3; // Settings
      case "/profile":
        return null; // Profile doesn't have a sidebar icon, so no selection
      default:
        return 0; // Default to chats for unknown paths
    }
  };

  // Update selected state when location changes
  useEffect(() => {
    const selectedIndex = getSelectedFromPath(location.pathname);
    if (selectedIndex !== null) {
      setSelected(selectedIndex);
    }
  }, [location.pathname]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (title) => {
    handleClose();
    
    switch (title) {
      case "Profile":
        navigate("/profile");
        break;
      case "Settings":
        navigate("/settings");
        break;
      case "Logout":
        // Handle logout functionality here
        console.log("Logout clicked");
        dispatch(LogoutUser());
        break;
      default:
        break;
    }
  };

  const handleNavButtonClick = (index) => {
    // Don't manually set selected - let useEffect handle it based on URL
    switch (index) {
      case 0:
        navigate("/app"); // Chats
        break;
      case 1:
        navigate("/group"); // Groups
        break;
      case 2:
        navigate("/call"); // Call logs
        break;
      default:
        break;
    }
  };

  const handleSettingsClick = () => {
    // Don't manually set selected - let useEffect handle it based on URL
    navigate("/settings");
  };

  return (
    <Box
      p={2}
      sx={{
        backgroundColor: theme.palette.background.paper,
        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
        height: "100vh",
        width: 100,
      }}
    >
      <Stack
        direction="column"
        alignItems={"center"}
        justifyContent="space-between"
        sx={{ height: "100%" }}
        spacing={3}
      >
        <Stack alignItems={"center"} spacing={4}>
          <Box
            sx={{
              height: 64,
              width: 64,
              borderRadius: 1.5,
            }}
          >
            <img src={Logo} alt={"Trapp Logo"} />
          </Box>
          <Stack
            sx={{ width: "max-content" }}
            direction="column"
            alignItems="center"
            spacing={3}
          >
            {Nav_Buttons.map((el) =>
              el.index === selected ? (
                <Box
                  p={1}
                  sx={{
                    background: `linear-gradient(135deg, ${alpha(
                      theme.palette.primary.main,
                      0.15
                    )} 0%, ${alpha(theme.palette.primary.light, 0.08)} 100%)`,
                    borderRadius: 1.5,
                    border: `2px solid ${alpha(
                      theme.palette.primary.main,
                      0.3
                    )}`,
                    boxShadow: `0 8px 32px ${alpha(
                      theme.palette.primary.main,
                      0.15
                    )}, 0 0 0 1px ${alpha(theme.palette.primary.main, 0.1)}`,
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    position: "relative",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: `0 12px 40px ${alpha(
                        theme.palette.primary.main,
                        0.2
                      )}, 0 0 0 1px ${alpha(theme.palette.primary.main, 0.15)}`,
                      background: `linear-gradient(135deg, ${alpha(
                        theme.palette.primary.main,
                        0.2
                      )} 0%, ${alpha(theme.palette.primary.light, 0.12)} 100%)`,
                    },
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: `linear-gradient(90deg, ${alpha(
                        theme.palette.primary.main,
                        0.05
                      )} 0%, transparent 100%)`,
                      borderRadius: 1.5,
                      pointerEvents: "none",
                    },
                  }}
                  key={el.index}
                >
                  <IconButton
                    sx={{
                      width: "max-content",
                      color: theme.palette.primary.main,
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    {el.icon}
                  </IconButton>
                </Box>
              ) : (
                <Box
                  sx={{
                    borderRadius: 1.5,
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      background:
                        theme.palette.mode === "light"
                          ? "#f8faff"
                          : alpha(theme.palette.background.paper, 0.8),
                      boxShadow:
                        theme.palette.mode === "light"
                          ? "0 8px 24px rgba(0, 0, 0, 0.08)"
                          : "0 8px 24px rgba(0, 0, 0, 0.3)",
                    },
                  }}
                  key={el.index}
                >
                  <IconButton
                    onClick={() => handleNavButtonClick(el.index)}
                    sx={{
                      width: "max-content",
                      color:
                        theme.palette.mode === "light"
                          ? "#000"
                          : theme.palette.text.primary,
                      transition: "all 0.3s ease",
                    }}
                  >
                    {el.icon}
                  </IconButton>
                </Box>
              )
            )}

            <Divider sx={{ width: "48px" }} />
            <Box
              p={1}
              sx={{
                background:
                  selected === 3
                    ? `linear-gradient(135deg, ${alpha(
                        theme.palette.primary.main,
                        0.15
                      )} 0%, ${alpha(theme.palette.primary.light, 0.08)} 100%)`
                    : "transparent",
                borderRadius: 1.5,
                border:
                  selected === 3
                    ? `2px solid ${alpha(theme.palette.primary.main, 0.3)}`
                    : "2px solid transparent",
                boxShadow:
                  selected === 3
                    ? `0 8px 32px ${alpha(
                        theme.palette.primary.main,
                        0.15
                      )}, 0 0 0 1px ${alpha(theme.palette.primary.main, 0.1)}`
                    : "none",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow:
                    selected === 3
                      ? `0 12px 40px ${alpha(
                          theme.palette.primary.main,
                          0.2
                        )}, 0 0 0 1px ${alpha(
                          theme.palette.primary.main,
                          0.15
                        )}`
                      : theme.palette.mode === "light"
                      ? "0 8px 24px rgba(0, 0, 0, 0.08)"
                      : "0 8px 24px rgba(0, 0, 0, 0.3)",
                  background:
                    selected === 3
                      ? `linear-gradient(135deg, ${alpha(
                          theme.palette.primary.main,
                          0.2
                        )} 0%, ${alpha(
                          theme.palette.primary.light,
                          0.12
                        )} 100%)`
                      : theme.palette.mode === "light"
                      ? "#f8faff"
                      : alpha(theme.palette.background.paper, 0.8),
                },
                "&::before":
                  selected === 3
                    ? {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `linear-gradient(90deg, ${alpha(
                          theme.palette.primary.main,
                          0.05
                        )} 0%, transparent 100%)`,
                        borderRadius: 1.5,
                        pointerEvents: "none",
                      }
                    : {},
              }}
            >
              <IconButton
                onClick={handleSettingsClick}
                sx={{
                  width: "max-content",
                  color:
                    selected === 3
                      ? theme.palette.primary.main
                      : theme.palette.mode === "light"
                      ? "#000"
                      : theme.palette.text.primary,
                  position: "relative",
                  zIndex: 1,
                  transition: "all 0.3s ease",
                }}
              >
                <Gear />
              </IconButton>
            </Box>
          </Stack>
        </Stack>

        <Stack spacing={4}>
          {/* switch */}
          <IOSSwitch
            onChange={() => {
              onToggleMode();
            }}
            defaultChecked
          />
          <Avatar
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            src={faker.image.avatar()}
          />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Stack spacing={1} px={1}>
              {Profile_Menu.map((el, idx) => (
                <MenuItem 
                  onClick={() => handleMenuItemClick(el.title)} 
                  key={el.title}
                  sx={{
                    borderRadius: 1,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: alpha(theme.palette.primary.main, 0.08),
                      transform: "translateX(4px)",
                    },
                  }}
                >
                  <Stack
                    sx={{ width: 100 }}
                    direction="row"
                    alignItems={"center"}
                    justifyContent="space-between"
                  >
                    <span>{el.title}</span>
                    {el.icon}
                  </Stack>
                </MenuItem>
              ))}
            </Stack>
          </Menu>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SideBar;
