import { Box, Stack, useMediaQuery } from "@mui/material";
import React from "react";
import Conversation from "../../components/Conversation";
import Chats from "./Chats";
import { useTheme } from "@mui/material/styles";
import Contact from "../../components/Contact";
import { useSelector } from "react-redux";
import SharedMessages from "../../components/SharedMessages";
import StarredMessages from "../../components/StarredMessages";

const GeneralApp = () => {
  const theme = useTheme();
  const { sidebar } = useSelector((store) => store.app);
  
  // Responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Stack 
      direction={isMobile ? "column" : "row"} 
      sx={{ 
        width: "100%",
        height: "100vh",
        overflow: "hidden"
      }}
    >
      {/* Chats - Hide on mobile when conversation is open */}
      <Box
        sx={{
          display: isMobile && sidebar.open ? "none" : "block",
          width: isMobile ? "100%" : "auto",
          height: isMobile ? "50%" : "100%",
          minHeight: isMobile ? "300px" : "auto"
        }}
      >
        <Chats />
      </Box>

      {/* Conversation */}
      <Box
        sx={{
          height: isMobile ? (sidebar.open ? "100%" : "50%") : "100%",
          width: isMobile 
            ? "100%" 
            : isTablet 
              ? sidebar.open ? "calc(100vw - 640px)" : "calc(100vw - 320px)"
              : sidebar.open ? "calc(100vw - 740px)" : "calc(100vw - 420px)",
          backgroundColor:
            theme.palette.mode === "light"
              ? "#F0F4FA"
              : theme.palette.background.default,
          minWidth: isMobile ? "100%" : "300px",
          overflow: "hidden"
        }}
      >
        <Conversation />
      </Box>

      {/* Contact/Sidebar - Overlay on mobile */}
      {sidebar.open && (
        <Box
          sx={{
            position: isMobile ? "absolute" : "relative",
            top: isMobile ? 0 : "auto",
            right: isMobile ? 0 : "auto",
            width: isMobile ? "100%" : "320px",
            height: "100%",
            zIndex: isMobile ? 1300 : "auto",
            backgroundColor: isMobile ? "rgba(0,0,0,0.5)" : "transparent"
          }}
        >
          <Box
            sx={{
              width: isMobile ? "85%" : "100%",
              height: "100%",
              marginLeft: isMobile ? "auto" : 0,
              backgroundColor: theme.palette.background.paper,
              boxShadow: isMobile ? "0 0 20px rgba(0,0,0,0.3)" : "none"
            }}
          >
            {(() => {
              switch (sidebar.type) {
                case "CONTACT":
                  return <Contact />;
                case "STARRED":
                  return <StarredMessages />;
                case "SHARED":
                  return <SharedMessages />;
                default:
                  break;
              }
            })()}
          </Box>
        </Box>
      )}
    </Stack>
  );
};

export default GeneralApp;
