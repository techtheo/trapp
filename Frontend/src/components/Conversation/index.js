import React from "react";

import { Stack, Box, Menu, MenuItem, Typography, Fade } from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import {
  ToggleSidebar,
  updateSidebarType,
  ToggleSelectionMode,
} from "../../redux/slices/app";
import Header from "./Header";
import Footer from "./Footer";
import Message from "./Message";
import Scrollbar from "../Scrollbar";

// Same menu options as in Header component
const ConversationMenuOptions = [
  {
    title: "Contact info",
    action: "contact_info",
  },
  {
    title: "Select messages",
    action: "select_messages",
  },
  {
    title: "Mute notifications",
    action: "mute_notifications",
  },
  {
    title: "Disappearing messages",
    action: "disappearing_messages",
  },
  {
    title: "Clear chat",
    action: "clear_chat",
  },
  {
    title: "Export chat",
    action: "export_chat",
  },
  {
    title: "Block",
    action: "block",
  },
  {
    title: "Report",
    action: "report",
  },
  {
    title: "Delete chat",
    action: "delete_chat",
  },
];

const Conversation = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { sidebar } = useSelector((store) => store.app);
  const selectedChatId = useSelector((store) => {
    try {
      return store?.app?.chat?.selectedChatId ?? null;
    } catch (error) {
      console.warn("Error accessing selectedChatId from store:", error);
      return null;
    }
  });

  // Right-click context menu state
  const [contextMenu, setContextMenu] = React.useState(null);

  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : null
    );
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  const handleMenuItemClick = (action) => {
    switch (action) {
      case "contact_info":
        // Open contact info sidebar
        if (!sidebar.open || sidebar.type !== "CONTACT") {
          dispatch(updateSidebarType("CONTACT"));
          if (!sidebar.open) {
            dispatch(ToggleSidebar());
          }
        }
        break;
      case "select_messages":
        dispatch(ToggleSelectionMode());
        break;
      case "mute_notifications":
        console.log("Mute notifications clicked");
        break;
      case "disappearing_messages":
        console.log("Disappearing messages clicked");
        break;
      case "clear_chat":
        console.log("Clear chat clicked");
        break;
      case "export_chat":
        console.log("Export chat clicked");
        break;
      case "block":
        console.log("Block clicked");
        break;
      case "report":
        console.log("Report clicked");
        break;
      case "delete_chat":
        console.log("Delete chat clicked");
        break;
      default:
        break;
    }
    handleCloseContextMenu();
  };

  return (
    <Stack
      height={"100%"}
      maxHeight={"100vh"}
      width={"auto"}
      sx={{
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: selectedChatId
            ? `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${alpha(
                theme.palette.primary.main,
                0.3
              )} 100%)`
            : "transparent",
          transition: "all 0.3s ease",
          zIndex: 10,
        },
      }}
    >
      {/* Chat Header*/}
      <Header />
      {/* Msg */}
      <Box
        width={"100%"}
        onContextMenu={handleContextMenu}
        sx={{
          flexGrow: 1,
          height: "100%",
          overflow: "hidden", // Changed from "scroll" to "hidden"
          position: "relative",
          background:
            selectedChatId && theme.palette.mode === "light"
              ? `linear-gradient(180deg, ${alpha(
                  theme.palette.primary.main,
                  0.02
                )} 0%, transparent 10%)`
              : "transparent",
          cursor: "context-menu",
        }}
      >
        <Scrollbar>
          <Message menu={true} />
        </Scrollbar>
      </Box>
      {/* Chat Footer*/}
      <Footer />

      {/* Right-click Context Menu */}
      <Menu
        open={contextMenu !== null}
        onClose={handleCloseContextMenu}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
        TransitionComponent={Fade}
        sx={{
          "& .MuiPaper-root": {
            minWidth: 200,
            boxShadow: theme.shadows[8],
          },
        }}
      >
        <Box p={1}>
          <Stack spacing={1}>
            {ConversationMenuOptions.map((option, index) => (
              <MenuItem
                key={index}
                onClick={() => handleMenuItemClick(option.action)}
                sx={{
                  minWidth: 200,
                  borderRadius: 1,
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                <Typography variant="body2">{option.title}</Typography>
              </MenuItem>
            ))}
          </Stack>
        </Box>
      </Menu>
    </Stack>
  );
};

export default Conversation;
