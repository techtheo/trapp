import { faker } from "@faker-js/faker";
import { Avatar, Badge, Box, Stack, Typography } from "@mui/material";
import { useTheme, styled, alpha } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { SelectChat } from "../redux/slices/app";

// Online status ripple badge
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
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

// Professional Chat Container with smooth animations
const ChatContainer = styled(Box)(({ theme, isSelected }) => ({
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

// Enhanced timestamp with better styling
const TimeStamp = styled(Typography)(({ theme, isSelected }) => ({
  fontSize: "0.75rem",
  fontWeight: 500,
  color: isSelected
    ? theme.palette.primary.main
    : alpha(theme.palette.text.secondary, 0.7),
  transition: "color 0.3s ease",
  whiteSpace: "nowrap",
}));

// Enhanced unread badge
const UnreadBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    fontSize: "0.65rem",
    height: 20,
    minWidth: 20,
    padding: "0 6px",
    fontWeight: 600,
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
    boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.3)}`,
    animation: "pulse 2s infinite",
  },
  "@keyframes pulse": {
    "0%": {
      transform: "scale(1)",
      boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.3)}`,
    },
    "50%": {
      transform: "scale(1.05)",
      boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.4)}`,
    },
    "100%": {
      transform: "scale(1)",
      boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.3)}`,
    },
  },
}));

const ChatElement = ({ id, name, img, msg, time, unread, online }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const selectedChatId = useSelector((store) => {
    try {
      return store?.app?.chat?.selectedChatId ?? null;
    } catch (error) {
      console.warn("Error accessing selectedChatId from store:", error);
      return null;
    }
  });

  const isSelected = selectedChatId === id;

  const handleChatClick = () => {
    dispatch(SelectChat(id));
  };

  return (
    <ChatContainer isSelected={isSelected} onClick={handleChatClick}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ position: "relative", zIndex: 1 }}
      >
        {/* Left: Avatar + name/message */}
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{ flex: 1, minWidth: 0 }}
        >
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
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
            </StyledBadge>
          ) : (
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
          )}

          <Stack spacing={0.5} sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="subtitle2"
              noWrap
              sx={{
                fontWeight: isSelected ? 600 : 500,
                color: isSelected
                  ? theme.palette.primary.main
                  : theme.palette.text.primary,
                transition: "all 0.3s ease",
              }}
            >
              {name}
            </Typography>
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
              {msg}
            </Typography>
          </Stack>
        </Stack>

        {/* Right: Time and Unread Badge - Fixed alignment */}
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

          {unread > 0 && (
            <UnreadBadge color="primary" badgeContent={unread} max={99} />
          )}
        </Stack>
      </Stack>
    </ChatContainer>
  );
};

export default ChatElement;
