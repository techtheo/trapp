import PropTypes from "prop-types";
import SimpleBarReact from "simplebar-react";
// @mui
import { alpha, styled } from "@mui/material/styles";
import { Box } from "@mui/material";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(() => ({
  flexGrow: 1,
  height: "100%",
  overflow: "scroll",
}));

const SimpleBarStyle = styled(SimpleBarReact)(({ theme }) => ({
  maxHeight: "100%",
  height: "100%",
  width: "100%",

  // Hide native scrollbars but allow scrolling
  "& .simplebar-content-wrapper": {
    overflow: "auto !important", // CRITICAL: Allow scrolling for mouse wheel
    marginRight: "0 !important",
    marginBottom: "0 !important",
    scrollbarWidth: "none", // Firefox
    "&::-webkit-scrollbar": {
      display: "none !important", // Chrome, Safari, Edge
      width: "0 !important",
      height: "0 !important",
    },
    // Enable mouse wheel events
    pointerEvents: "auto",
    touchAction: "auto", // Enable touch scrolling
  },

  // Ensure content doesn't have padding that causes space issues
  "& .simplebar-content": {
    paddingRight: "0 !important",
    paddingBottom: "0 !important",
    // Enable mouse events on content
    pointerEvents: "auto",
    touchAction: "auto",
  },

  // Position tracks as overlay (not taking up space)
  "& .simplebar-track.simplebar-vertical": {
    position: "absolute",
    width: 8,
    right: 4,
    top: 0,
    bottom: 0,
    zIndex: 10,
    backgroundColor: "transparent",
    borderRadius: "4px",
    opacity: 0,
    visibility: "hidden",
    transition: "opacity 0.2s ease, visibility 0.2s ease",

    // Show on hover or when scrolling
    "&.simplebar-visible": {
      opacity: 1,
      visibility: "visible",
    },
  },

  // Horizontal track overlay
  "& .simplebar-track.simplebar-horizontal": {
    position: "absolute",
    height: 8,
    left: 0,
    right: 0,
    bottom: 4,
    zIndex: 10,
    backgroundColor: "transparent",
    borderRadius: "4px",
    opacity: 0,
    visibility: "hidden",
    transition: "opacity 0.2s ease, visibility 0.2s ease",

    "&.simplebar-visible": {
      opacity: 1,
      visibility: "visible",
    },
  },

  // Scrollbar thumb styling
  "& .simplebar-scrollbar": {
    "&:before": {
      backgroundColor:
        theme.palette.mode === "light"
          ? alpha(theme.palette.grey[600], 0.6)
          : alpha(theme.palette.grey[400], 0.6),
      borderRadius: "4px",
      transition: "all 0.2s ease",
      opacity: 1,
    },
    "&:hover:before": {
      backgroundColor:
        theme.palette.mode === "light"
          ? alpha(theme.palette.grey[600], 0.8)
          : alpha(theme.palette.grey[400], 0.8),
    },
  },

  // Show scrollbars on hover of the entire container
  "&:hover": {
    "& .simplebar-track": {
      opacity: 1,
      visibility: "visible",
    },
  },

  // Show scrollbars when actively scrolling
  "&.simplebar-scrolling": {
    "& .simplebar-track": {
      opacity: 1,
      visibility: "visible",
    },
  },

  // Mask styling to ensure proper clipping
  "& .simplebar-mask": {
    zIndex: 1,
    position: "absolute",
    overflow: "hidden",
    padding: 0,
    margin: 0,
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    width: "auto !important",
    height: "auto !important",
  },

  // Remove placeholder height
  "& .simplebar-placeholder": {
    height: "0 !important",
    width: "0 !important",
  },

  // Wrapper should not affect layout
  "& .simplebar-wrapper": {
    overflow: "hidden",
    width: "inherit",
    height: "inherit",
    maxWidth: "inherit",
    maxHeight: "inherit",
  },

  // Offset container
  "& .simplebar-offset": {
    direction: "inherit !important",
    boxSizing: "inherit !important",
    resize: "none !important",
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    padding: 0,
    margin: 0,
    WebkitOverflowScrolling: "touch",
  },
}));

// ----------------------------------------------------------------------

Scrollbar.propTypes = {
  children: PropTypes.node.isRequired,
  sx: PropTypes.object,
};

export default function Scrollbar({ children, sx, ...other }) {
  const userAgent =
    typeof navigator === "undefined" ? "SSR" : navigator.userAgent;

  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    );
  const isWindows = /Windows/.test(userAgent);

  if (isMobile) {
    return (
      <Box sx={{ overflowX: "auto", ...sx }} {...other}>
        {children}
      </Box>
    );
  }

  return (
    <RootStyle>
      <SimpleBarStyle
        timeout={500}
        clickOnTrack={true} // Enable click on track for better UX
        sx={sx}
        autoHide={true} // Enable auto-hide for overlay behavior
        forceVisible={false} // Don't force visibility, use hover/scroll detection
        scrollbarMinSize={20} // Minimum scrollbar size
        scrollbarMaxSize={80} // Maximum scrollbar size
        // Enable mouse wheel scrolling
        options={{
          wheelPropagation: true, // Allow wheel events to propagate
          suppressScrollX: false, // Allow horizontal scrolling if needed
          suppressScrollY: false, // Allow vertical scrolling
        }}
        {...other}
      >
        {children}
      </SimpleBarStyle>
    </RootStyle>
  );
}

export { SimpleBarStyle };
