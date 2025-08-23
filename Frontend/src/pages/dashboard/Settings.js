import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme, styled, alpha } from "@mui/material/styles";
import {
  Bell,
  CaretLeft,
  Key,
  Lock,
  PencilCircle,
  Image,
  Note,
  Keyboard,
  Info,
} from "phosphor-react";
import { faker } from "@faker-js/faker";
import Scrollbar from "../../components/Scrollbar";
import Shortcuts from "../../sections/settings/Shortcuts";

// Styled components for fancy settings options
const SettingsOptionContainer = styled(Box)(({ theme, isSelected }) => ({
  width: "100%",
  overflow: "hidden",
  borderRadius: 12,
  padding: "16px 20px",
  cursor: "pointer",
  position: "relative",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  background: isSelected
    ? `linear-gradient(135deg, ${alpha(
        theme.palette.primary.main,
        0.15
      )} 0%, ${alpha(theme.palette.primary.light, 0.08)} 100%)`
    : theme.palette.mode === "light"
    ? "#ffffff"
    : theme.palette.background.paper,
  border: isSelected
    ? `2px solid ${alpha(theme.palette.primary.main, 0.3)}`
    : `2px solid transparent`,
  boxShadow: isSelected
    ? `0 8px 32px ${alpha(theme.palette.primary.main, 0.15)}, 0 0 0 1px ${alpha(
        theme.palette.primary.main,
        0.1
      )}`
    : theme.palette.mode === "light"
    ? "0 2px 8px rgba(0, 0, 0, 0.04)"
    : "0 2px 8px rgba(0, 0, 0, 0.2)",

  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: isSelected
      ? `0 12px 40px ${alpha(
          theme.palette.primary.main,
          0.2
        )}, 0 0 0 1px ${alpha(theme.palette.primary.main, 0.15)}`
      : theme.palette.mode === "light"
      ? "0 8px 24px rgba(0, 0, 0, 0.08)"
      : "0 8px 24px rgba(0, 0, 0, 0.3)",
    background: isSelected
      ? `linear-gradient(135deg, ${alpha(
          theme.palette.primary.main,
          0.2
        )} 0%, ${alpha(theme.palette.primary.light, 0.12)} 100%)`
      : theme.palette.mode === "light"
      ? "#f8faff"
      : alpha(theme.palette.background.paper, 0.8),
  },

  "&:active": {
    transform: "translateY(0px)",
    transition: "all 0.1s ease",
  },

  // Subtle gradient overlay for selected state
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: isSelected
      ? `linear-gradient(90deg, ${alpha(
          theme.palette.primary.main,
          0.05
        )} 0%, transparent 100%)`
      : "transparent",
    borderRadius: 12,
    pointerEvents: "none",
  },
}));

const SettingsIcon = styled(Box)(({ theme, isSelected }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 40,
  height: 40,
  borderRadius: 10,
  backgroundColor: isSelected
    ? alpha(theme.palette.primary.main, 0.15)
    : alpha(theme.palette.text.secondary, 0.08),
  color: isSelected
    ? theme.palette.primary.main
    : theme.palette.text.secondary,
  transition: "all 0.3s ease",
}));

const Settings = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);
  const [openShortcuts, setOpenShortcuts] = useState(false);

  const handleOpenShortcuts = () => {
    setOpenShortcuts(true);
  };
  const handleCloseShortcuts = () => {
    setOpenShortcuts(false);
  };

  const handleOptionClick = (key, originalOnClick) => {
    setSelectedOption(key);
    originalOnClick();
  };

  const list = [
    {
      key: 0,
      icon: <Bell size={20} />,
      title: "Notifications",
      onclick: () => {},
    },
    {
      key: 1,
      icon: <Lock size={20} />,
      title: "Privacy",
      onclick: () => {},
    },
    {
      key: 2,
      icon: <Key size={20} />,
      title: "Security",
      onclick: () => {},
    },
    {
      key: 3,
      icon: <PencilCircle size={20} />,
      title: "Theme",
      onclick: () => {},
    },
    {
      key: 4,
      icon: <Image size={20} />,
      title: "Chat Wallpaper",
      onclick: () => {},
    },
    {
      key: 5,
      icon: <Note size={20} />,
      title: "Request Account Info",
      onclick: () => {},
    },
    {
      key: 6,
      icon: <Keyboard size={20} />,
      title: "Keyboard Shortcuts",
      onclick: handleOpenShortcuts,
    },
    {
      key: 7,
      icon: <Info size={20} />,
      title: "Help",
      onclick: () => {},
    },
  ];

  return (
    <>
      <Stack direction={"row"} sx={{ width: "100%" }}>
        {/* LeftPanel */}
        <Box
          sx={{
            height: "100vh",
            width: 320,
            minWidth: 320,
            maxWidth: 320,
            backgroundColor:
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background.paper,
            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Fixed Header */}
          <Box sx={{ flexShrink: 0, p: 4, pb: 2 }}>
            <Stack direction={"row"} alignItems="center" spacing={3}>
              <IconButton onClick={() => navigate(-1)}>
                <CaretLeft size={24} color={"#4B4B4B"} />
              </IconButton>
              <Typography variant="h6">Settings</Typography>
            </Stack>
          </Box>

          {/* Fixed Profile Section */}
          <Box sx={{ flexShrink: 0, px: 4, pb: 3 }}>
            <Stack direction={"row"} spacing={3}>
              <Avatar
                sx={{ width: 56, height: 56 }}
                src={faker.image.avatar()}
                alt={faker.person.fullName()}
              />
              <Stack spacing={0.5}>
                <Typography variant="article">
                  {faker.person.fullName()}
                </Typography>
                <Typography variant="body2">{faker.lorem.words()}</Typography>
              </Stack>
            </Stack>
          </Box>

          {/* Scrollable Options List */}
          <Box sx={{ flex: 1, overflow: "hidden" }}>
            <Scrollbar>
              <Stack spacing={2} sx={{ px: 4, pb: 4 }}>
                {list.map(({ key, icon, title, onclick }) => {
                  const isSelected = selectedOption === key;
                  return (
                    <SettingsOptionContainer
                      key={key}
                      isSelected={isSelected}
                      onClick={() => handleOptionClick(key, onclick)}
                    >
                      <Stack 
                        direction="row" 
                        spacing={3} 
                        alignItems="center"
                        sx={{ position: "relative", zIndex: 1 }}
                      >
                        <SettingsIcon isSelected={isSelected}>
                          {icon}
                        </SettingsIcon>
                        <Typography 
                          variant="body1" 
                          sx={{
                            fontWeight: isSelected ? 600 : 500,
                            color: isSelected
                              ? theme.palette.primary.main
                              : theme.palette.text.primary,
                            transition: "all 0.3s ease",
                          }}
                        >
                          {title}
                        </Typography>
                      </Stack>
                    </SettingsOptionContainer>
                  );
                })}
              </Stack>
            </Scrollbar>
          </Box>
        </Box>
        {/* RightPanel */}
      </Stack>
      {openShortcuts && (
        <Shortcuts open={openShortcuts} handleClose={handleCloseShortcuts} />
      )}
    </>
  );
};

export default Settings;
