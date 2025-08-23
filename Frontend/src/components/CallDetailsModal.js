import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Stack,
  Typography,
  Avatar,
  Box,
  IconButton,
  Divider,
  Button,
} from "@mui/material";
import { useTheme, styled, alpha } from "@mui/material/styles";
import { 
  Phone, 
  VideoCamera, 
  PhoneIncoming, 
  PhoneOutgoing, 
  PhoneX,
  X,
  Clock,
  Calendar
} from "phosphor-react";
import { faker } from "@faker-js/faker";

// Slide transition for modal
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Styled components
const CallStatusChip = styled(Box)(({ theme, callType }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "6px 12px",
  borderRadius: 20,
  fontSize: "0.875rem",
  fontWeight: 500,
  backgroundColor: callType === "missed" 
    ? alpha(theme.palette.error.main, 0.1)
    : callType === "incoming"
    ? alpha(theme.palette.success.main, 0.1)
    : alpha(theme.palette.primary.main, 0.1),
  color: callType === "missed" 
    ? theme.palette.error.main
    : callType === "incoming"
    ? theme.palette.success.main
    : theme.palette.primary.main,
}));

const CallActionButton = styled(Button)(({ theme, variant }) => ({
  borderRadius: 12,
  padding: "12px 24px",
  textTransform: "none",
  fontWeight: 600,
  fontSize: "1rem",
  minHeight: 48,
  boxShadow: "none",
  "&:hover": {
    boxShadow: variant === "contained" 
      ? `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`
      : "none",
  },
}));

const CallDetailsModal = ({ open, handleClose, callData }) => {
  const theme = useTheme();

  if (!callData) return null;

  const { id, name, img, time, duration, callType, isVideo } = callData;

  const getCallTypeIcon = () => {
    switch (callType) {
      case "incoming":
        return <PhoneIncoming size={16} />;
      case "missed":
        return <PhoneX size={16} />;
      case "outgoing":
      default:
        return <PhoneOutgoing size={16} />;
    }
  };

  const getCallTypeText = () => {
    switch (callType) {
      case "incoming":
        return "Incoming Call";
      case "missed":
        return "Missed Call";
      case "outgoing":
      default:
        return "Outgoing Call";
    }
  };

  const handleVoiceCall = () => {
    console.log(`Starting voice call with ${name}...`);
    // Implement voice call functionality
    handleClose();
  };

  const handleVideoCall = () => {
    console.log(`Starting video call with ${name}...`);
    // Implement video call functionality
    handleClose();
  };

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      disableEscapeKeyDown={false}
      sx={{ 
        "& .MuiDialog-paper": {
          borderRadius: 3,
          overflow: "hidden"
        },
        "& .MuiBackdrop-root": {
          backgroundColor: "rgba(0, 0, 0, 0.5)"
        }
      }}
    >
      {/* Header */}
      <DialogTitle 
        sx={{ 
          p: 3, 
          pb: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Call Details
        </Typography>
        <IconButton 
          onClick={handleClose}
          sx={{ 
            color: theme.palette.text.secondary,
            "&:hover": {
              backgroundColor: alpha(theme.palette.text.secondary, 0.1)
            }
          }}
        >
          <X size={20} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3, pt: 1 }}>
        <Stack spacing={3}>
          {/* Contact Info */}
          <Stack direction="row" spacing={3} alignItems="center">
            <Avatar
              src={img || faker.image.avatar()}
              sx={{
                width: 80,
                height: 80,
                border: `3px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              }}
            />
            <Stack spacing={1} sx={{ flex: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {name}
              </Typography>
              <CallStatusChip callType={callType}>
                {getCallTypeIcon()}
                {getCallTypeText()}
              </CallStatusChip>
            </Stack>
          </Stack>

          <Divider />

          {/* Call Details */}
          <Stack spacing={2}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Call Information
            </Typography>
            
            {/* Call Type */}
            <Stack direction="row" spacing={2} alignItems="center">
              {isVideo ? <VideoCamera size={20} /> : <Phone size={20} />}
              <Typography variant="body1">
                {isVideo ? "Video Call" : "Voice Call"}
              </Typography>
            </Stack>

            {/* Duration */}
            <Stack direction="row" spacing={2} alignItems="center">
              <Clock size={20} />
              <Typography variant="body1">
                {callType === "missed" ? "Call not answered" : `Duration: ${duration}`}
              </Typography>
            </Stack>

            {/* Time */}
            <Stack direction="row" spacing={2} alignItems="center">
              <Calendar size={20} />
              <Typography variant="body1">
                {time} - Today
              </Typography>
            </Stack>
          </Stack>

          <Divider />

          {/* Action Buttons */}
          <Stack spacing={2}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Quick Actions
            </Typography>
            
            <Stack direction="row" spacing={2}>
              {/* Voice Call Button */}
              <CallActionButton
                variant="outlined"
                startIcon={<Phone size={18} />}
                onClick={handleVoiceCall}
                sx={{ flex: 1 }}
              >
                Call Back
              </CallActionButton>

              {/* Video Call Button */}
              <CallActionButton
                variant="contained"
                startIcon={<VideoCamera size={18} />}
                onClick={handleVideoCall}
                sx={{ flex: 1 }}
              >
                Video Call
              </CallActionButton>
            </Stack>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default CallDetailsModal;