import React, { useState } from "react";
import { faker } from "@faker-js/faker";
import { Avatar, Badge, Box, Stack, Typography } from "@mui/material";
import { useTheme, styled, alpha } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { Phone, VideoCamera, PhoneIncoming, PhoneOutgoing, PhoneX } from "phosphor-react";
import { SelectChat } from "../redux/slices/app";
import CallDetailsModal from "./CallDetailsModal";
// import { StartAudioCall } from "../redux/slices/audioCall";
// import { StartVideoCall } from "../redux/slices/videoCall";
// import { AWS_S3_REGION, S3_BUCKET_NAME } from "../config";

// Professional Call Container with smooth animations (exactly matching ChatElement)
const CallContainer = styled(Box)(({ theme, isSelected }) => ({
  width: "100%",
  overflow: "hidden",
  borderRadius: 12,
  padding: "12px 16px",
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

// Call status badge (similar to online status in ChatElement)
const CallStatusBadge = styled(Badge)(({ theme, callType }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: callType === "missed" 
      ? theme.palette.error.main
      : callType === "incoming"
      ? theme.palette.success.main
      : theme.palette.primary.main,
    color: callType === "missed" 
      ? theme.palette.error.main
      : callType === "incoming"
      ? theme.palette.success.main
      : theme.palette.primary.main,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    width: 16,
    height: 16,
    fontSize: "0.6rem",
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: callType === "missed" ? "none" : "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

// Enhanced timestamp with better styling (exactly matching ChatElement)
const TimeStamp = styled(Typography)(({ theme, isSelected }) => ({
  fontSize: "0.75rem",
  fontWeight: 500,
  color: isSelected
    ? theme.palette.primary.main
    : alpha(theme.palette.text.secondary, 0.7),
  transition: "color 0.3s ease",
  whiteSpace: "nowrap",
}));

// Call type icon component
const CallTypeIcon = ({ callType, size = 12 }) => {
  switch (callType) {
    case "incoming":
      return <PhoneIncoming size={size} />;
    case "missed":
      return <PhoneX size={size} />;
    case "outgoing":
    default:
      return <PhoneOutgoing size={size} />;
  }
};

const CallLogElement = ({ img, name, incoming, missed, online, id }) => {
  const theme = useTheme();

  return (
    <StyledChatBox
      sx={{
        width: "100%",

        borderRadius: 1,

        backgroundColor: theme.palette.background.paper,
      }}
      p={2}
    >
      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent="space-between"
      >
        <Stack direction="row" spacing={2}>
          {" "}
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar
                alt={name}
                src={`https://${S3_BUCKET_NAME}.s3.${AWS_S3_REGION}.amazonaws.com/${img}`}
              />
            </StyledBadge>
          ) : (
            <Avatar
              alt={name}
              src={`https://${S3_BUCKET_NAME}.s3.${AWS_S3_REGION}.amazonaws.com/${img}`}
            />
          )}
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{name}</Typography>
            <Stack spacing={1} alignItems="center" direction={"row"}>
              {incoming ? (
                <ArrowDownLeft color={missed ? "red" : "green"} />
              ) : (
                <ArrowUpRight color={missed ? "red" : "green"} />
              )}
              <Typography variant="caption">Yesterday 21:24</Typography>
            </Stack>
          </Stack>
        </Stack>
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          <Phone />

          <VideoCamera />
        </Stack>
      </Stack>
    </StyledChatBox>
  );
};

const CallElement = ({ 
  id, 
  name, 
  img, 
  time, 
  duration = "2:34", 
  callType = "outgoing", // incoming, outgoing, missed
  isVideo = false 
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  
  const selectedChatId = useSelector((store) => {
    try {
      return store?.app?.chat?.selectedChatId ?? null;
    } catch (error) {
      console.warn("Error accessing selectedChatId from store:", error);
      return null;
    }
  });

  const isSelected = selectedChatId === id;

  const handleCallClick = () => {
    dispatch(SelectChat(id));
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const callData = {
    id,
    name,
    img,
    time,
    duration,
    callType,
    isVideo
  };

  return (
    <>
      <CallContainer isSelected={isSelected} onClick={handleCallClick}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ position: "relative", zIndex: 1 }}
        >
          {/* Left: Avatar + name/call info */}
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ flex: 1, minWidth: 0 }}
          >
            <CallStatusBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={<CallTypeIcon callType={callType} />}
              callType={callType}
            >
              <Avatar
                src={img || faker.image.avatar()}
                sx={{
                  width: 48,
                  height: 48,
                  border: isSelected
                    ? `2px solid ${alpha(theme.palette.primary.main, 0.3)}`
                    : "none",
                  transition: "all 0.3s ease",
                }}
              />
            </CallStatusBadge>

            <Stack spacing={0.5} sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                variant="subtitle2"
                noWrap
                sx={{
                  fontWeight: isSelected ? 600 : 500,
                  color: isSelected
                    ? theme.palette.primary.main
                    : callType === "missed"
                    ? theme.palette.error.main
                    : theme.palette.text.primary,
                  transition: "all 0.3s ease",
                }}
              >
                {name}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                {isVideo ? (
                  <VideoCamera 
                    size={14} 
                    color={isSelected
                      ? alpha(theme.palette.primary.main, 0.7)
                      : alpha(theme.palette.text.secondary, 0.8)} 
                  />
                ) : (
                  <Phone 
                    size={14} 
                    color={isSelected
                      ? alpha(theme.palette.primary.main, 0.7)
                      : alpha(theme.palette.text.secondary, 0.8)} 
                  />
                )}
                <Typography
                  variant="body2"
                  noWrap
                  sx={{
                    maxWidth: "180px",
                    color: isSelected
                      ? alpha(theme.palette.primary.main, 0.7)
                      : alpha(theme.palette.text.secondary, 0.8),
                    fontSize: "0.875rem",
                    transition: "color 0.3s ease",
                  }}
                >
                  {callType === "missed" ? "Missed call" : duration}
                </Typography>
              </Stack>
            </Stack>
          </Stack>

          {/* Right: Time - Fixed alignment (exactly matching ChatElement) */}
          <Stack
            spacing={1}
            alignItems="flex-end"
            justifyContent="center"
            sx={{
              minWidth: "fit-content",
              height: "100%",
              py: 0.5,
            }}
          >
            <TimeStamp isSelected={isSelected}>{time}</TimeStamp>
          </Stack>
        </Stack>
      </CallContainer>

      {/* Call Details Modal - Moved outside CallContainer */}
      <CallDetailsModal 
        open={openModal} 
        handleClose={handleCloseModal} 
        callData={callData} 
      />
    </>
  );
};

export { CallLogElement };
export default CallElement;
