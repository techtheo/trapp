import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Slide,
  Stack,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { useTheme, styled, alpha } from "@mui/material/styles";
import { X } from "phosphor-react";
import Scrollbar from "../../components/Scrollbar";

// Styled components for fancy shortcuts
const ShortcutContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  overflow: "hidden",
  borderRadius: 12,
  padding: "16px 20px",
  cursor: "default",
  position: "relative",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  background: theme.palette.mode === "light" ? "#ffffff" : theme.palette.background.paper,
  border: `2px solid transparent`,
  boxShadow: theme.palette.mode === "light"
    ? "0 2px 8px rgba(0, 0, 0, 0.04)"
    : "0 2px 8px rgba(0, 0, 0, 0.2)",

  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: theme.palette.mode === "light"
      ? "0 8px 24px rgba(0, 0, 0, 0.08)"
      : "0 8px 24px rgba(0, 0, 0, 0.3)",
    background: theme.palette.mode === "light"
      ? "#f8faff"
      : alpha(theme.palette.background.paper, 0.8),
    border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  },

  "&:active": {
    transform: "translateY(0px)",
    transition: "all 0.1s ease",
  },
}));

const KeyButton = styled(Button)(({ theme }) => ({
  minWidth: "auto",
  padding: "6px 12px",
  fontSize: "0.75rem",
  fontWeight: 600,
  borderRadius: 8,
  textTransform: "none",
  background: `linear-gradient(135deg, ${theme.palette.grey[100]} 0%, ${theme.palette.grey[200]} 100%)`,
  color: theme.palette.text.primary,
  border: `1px solid ${theme.palette.grey[300]}`,
  boxShadow: `0 2px 4px ${alpha(theme.palette.common.black, 0.1)}, inset 0 1px 0 ${alpha(theme.palette.common.white, 0.2)}`,
  transition: "all 0.2s ease",

  "&:hover": {
    background: `linear-gradient(135deg, ${theme.palette.grey[200]} 0%, ${theme.palette.grey[300]} 100%)`,
    transform: "translateY(-1px)",
    boxShadow: `0 4px 8px ${alpha(theme.palette.common.black, 0.15)}, inset 0 1px 0 ${alpha(theme.palette.common.white, 0.3)}`,
  },

  "&:active": {
    transform: "translateY(0px)",
    boxShadow: `0 1px 2px ${alpha(theme.palette.common.black, 0.2)}, inset 0 1px 0 ${alpha(theme.palette.common.white, 0.1)}`,
  },

  // Dark mode styles
  ...(theme.palette.mode === "dark" && {
    background: `linear-gradient(135deg, ${theme.palette.grey[700]} 0%, ${theme.palette.grey[800]} 100%)`,
    color: theme.palette.text.primary,
    border: `1px solid ${theme.palette.grey[600]}`,
    boxShadow: `0 2px 4px ${alpha(theme.palette.common.black, 0.3)}, inset 0 1px 0 ${alpha(theme.palette.common.white, 0.1)}`,

    "&:hover": {
      background: `linear-gradient(135deg, ${theme.palette.grey[600]} 0%, ${theme.palette.grey[700]} 100%)`,
      boxShadow: `0 4px 8px ${alpha(theme.palette.common.black, 0.4)}, inset 0 1px 0 ${alpha(theme.palette.common.white, 0.15)}`,
    },

    "&:active": {
      boxShadow: `0 1px 2px ${alpha(theme.palette.common.black, 0.4)}, inset 0 1px 0 ${alpha(theme.palette.common.white, 0.05)}`,
    },
  }),
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: 12,
  padding: "12px 32px",
  textTransform: "none",
  fontWeight: 600,
  fontSize: "1rem",
  minHeight: 48,
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
  transition: "all 0.3s ease",

  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
    background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
  },

  "&:active": {
    transform: "translateY(0px)",
    transition: "all 0.1s ease",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const list = [
  {
    key: 0,
    title: "Mark as unread",
    combination: ["Ctrl", "alt", "Shift", "U"],
  },
  {
    key: 1,
    title: "Mute",
    combination: ["Ctrl", "alt", "Shift", "M"],
  },
  {
    key: 2,
    title: "Archive Chat",
    combination: ["Ctrl", "alt", "Shift", "E"],
  },
  {
    key: 3,
    title: "Delete Chat",
    combination: ["Ctrl", "alt", "Shift", "D"],
  },
  {
    key: 4,
    title: "Pin Chat",
    combination: ["Ctrl", "alt", "Shift", "P"],
  },
  {
    key: 5,
    title: "Search",
    combination: ["Ctrl", "alt", "F"],
  },
  {
    key: 6,
    title: "Search Chat",
    combination: ["Ctrl", "alt", "Shift", "F"],
  },
  {
    key: 7,
    title: "Next Chat",
    combination: ["Ctrl", "alt", "N"],
  },
  {
    key: 8,
    title: "Next Step",
    combination: ["Ctrl", "Tab"],
  },
  {
    key: 9,
    title: "Previous Step",
    combination: ["Ctrl", "Shift", "Tab"],
  },
  {
    key: 10,
    title: "New Group",
    combination: ["Ctrl", "alt", "Shift", "N"],
  },
  {
    key: 11,
    title: "Profile & About",
    combination: ["Ctrl", "alt", "P"],
  },
  {
    key: 12,
    title: "Increase speed of voice message",
    combination: ["Shift", "."],
  },
  {
    key: 13,
    title: "Decrease speed of voice message",
    combination: ["Shift", ","],
  },
  {
    key: 14,
    title: "Settings",
    combination: ["Shift", "S"],
  },
  {
    key: 15,
    title: "Emoji Panel",
    combination: ["Ctrl", "alt", "E"],
  },
  {
    key: 16,
    title: "Sticker Panel",
    combination: ["Ctrl", "alt", "S"],
  },
];

const Shortcuts = ({ open, handleClose }) => {
  const theme = useTheme();

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        onClose={handleClose} // Standard behavior - backdrop + ESC
        keepMounted
        TransitionComponent={Transition}
        sx={{ 
          "& .MuiDialog-paper": {
            borderRadius: 3,
            overflow: "hidden",
            maxHeight: "80vh",
            background: theme.palette.mode === "light" 
              ? `linear-gradient(135deg, #ffffff 0%, #f8faff 100%)`
              : theme.palette.background.paper,
            boxShadow: theme.palette.mode === "light"
              ? "0 20px 60px rgba(0, 0, 0, 0.1)"
              : "0 20px 60px rgba(0, 0, 0, 0.3)",
          }
        }}
      >
        {/* Fixed Header */}
        <DialogTitle 
          sx={{ 
            flexShrink: 0, 
            pb: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
            ⌨️ TRAPP Shortcuts
          </Typography>
          <IconButton 
            onClick={handleClose}
            sx={{ 
              color: theme.palette.text.secondary,
              "&:hover": {
                backgroundColor: alpha(theme.palette.text.secondary, 0.1),
                transform: "rotate(90deg)",
              },
              transition: "all 0.3s ease",
            }}
          >
            <X size={20} />
          </IconButton>
        </DialogTitle>

        {/* Scrollable Content */}
        <DialogContent 
          sx={{ 
            p: 0, 
            display: "flex", 
            flexDirection: "column", 
            height: "60vh",
            overflow: "hidden"
          }}
        >
          <Box sx={{ flex: 1, overflow: "hidden" }}>
            <Scrollbar>
              <Box sx={{ p: 3 }}>
                <Grid container spacing={2}>
                  {list.map(({ key, title, combination }) => (
                    <Grid key={key} item xs={12} sm={6}>
                      <ShortcutContainer>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          spacing={2}
                        >
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              fontSize: "0.875rem",
                              fontWeight: 500,
                              color: theme.palette.text.primary,
                              flex: 1,
                            }}
                          >
                            {title}
                          </Typography>
                          <Stack spacing={0.5} direction="row" alignItems="center">
                            {combination.map((el, index) => (
                              <KeyButton
                                key={index}
                                size="small"
                                disabled
                              >
                                {el}
                              </KeyButton>
                            ))}
                          </Stack>
                        </Stack>
                      </ShortcutContainer>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Scrollbar>
          </Box>
        </DialogContent>

        {/* Fixed Footer */}
        <DialogActions sx={{ flexShrink: 0, p: 3, pt: 2, justifyContent: "center" }}>
          <ActionButton onClick={handleClose}>
            Got it!
          </ActionButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Shortcuts;
