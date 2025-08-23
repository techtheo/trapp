import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Stack,
  Typography,
  Avatar,
  IconButton,
  Box,
} from "@mui/material";
import { useTheme, styled, alpha } from "@mui/material/styles";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../components/Search";
import { MagnifyingGlass, Phone, VideoCamera, X } from "phosphor-react";
import { faker } from "@faker-js/faker";
import Scrollbar from "../../components/Scrollbar";

// Styled components for fancy user list
const UserContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "12px 16px",
  borderRadius: 12,
  cursor: "pointer",
  transition: "all 0.3s ease",
  background: theme.palette.mode === "light" ? "#ffffff" : theme.palette.background.paper,
  border: "1px solid transparent",
  
  "&:hover": {
    transform: "translateY(-1px)",
    background: theme.palette.mode === "light" ? "#f8faff" : alpha(theme.palette.background.paper, 0.8),
    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
    boxShadow: theme.palette.mode === "light"
      ? "0 4px 12px rgba(0, 0, 0, 0.08)"
      : "0 4px 12px rgba(0, 0, 0, 0.3)",
  },
}));

const CallButton = styled(IconButton)(({ theme, callType }) => ({
  width: 40,
  height: 40,
  borderRadius: 10,
  backgroundColor: callType === "video" 
    ? alpha(theme.palette.primary.main, 0.1)
    : alpha(theme.palette.success.main, 0.1),
  color: callType === "video" 
    ? theme.palette.primary.main
    : theme.palette.success.main,
  transition: "all 0.3s ease",
  
  "&:hover": {
    backgroundColor: callType === "video" 
      ? alpha(theme.palette.primary.main, 0.2)
      : alpha(theme.palette.success.main, 0.2),
    transform: "scale(1.1)",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StartCall = ({ open, handleClose }) => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState("");

  // Generate mock user list with faker (stable data)
  const mockUsers = React.useMemo(() => 
    Array.from({ length: 15 }, (_, index) => ({
      id: index + 1,
      name: faker.person.fullName(),
      avatar: faker.image.avatar(),
      online: index % 3 !== 0, // Mix of online/offline users (2/3 online, 1/3 offline)
    })), []
  );

  // Filter users based on search term
  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleVoiceCall = (user) => {
    console.log(`Starting voice call with ${user.name}...`);
    handleClose();
  };

  const handleVideoCall = (user) => {
    console.log(`Starting video call with ${user.name}...`);
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
      sx={{ 
        "& .MuiDialog-paper": {
          borderRadius: 3,
          overflow: "hidden",
          maxHeight: "80vh"
        }
      }}
    >
      {/* Fixed Header */}
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
          Start New Call
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

      {/* Fixed Search Bar */}
      <Box sx={{ px: 3, pb: 2 }}>
        <Search>
          <SearchIconWrapper>
            <MagnifyingGlass color="#709CE6" />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
      </Box>

      {/* Scrollable User List */}
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
            <Stack spacing={1} sx={{ p: 3, pt: 1 }}>
              {filteredUsers.map((user) => (
                <UserContainer key={user.id}>
                  <Stack direction="row" spacing={2} alignItems="center" sx={{ flex: 1 }}>
                    <Avatar
                      src={user.avatar}
                      sx={{
                        width: 48,
                        height: 48,
                        border: user.online 
                          ? `2px solid ${theme.palette.success.main}`
                          : `2px solid ${alpha(theme.palette.text.secondary, 0.3)}`,
                      }}
                    />
                    <Stack sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                        {user.name}
                      </Typography>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: user.online 
                            ? theme.palette.success.main 
                            : theme.palette.text.secondary 
                        }}
                      >
                        {user.online ? "Online" : "Offline"}
                      </Typography>
                    </Stack>
                  </Stack>
                  
                  <Stack direction="row" spacing={1}>
                    <CallButton 
                      callType="voice"
                      onClick={() => handleVoiceCall(user)}
                      size="small"
                    >
                      <Phone size={18} />
                    </CallButton>
                    <CallButton 
                      callType="video"
                      onClick={() => handleVideoCall(user)}
                      size="small"
                    >
                      <VideoCamera size={18} />
                    </CallButton>
                  </Stack>
                </UserContainer>
              ))}
            </Stack>
          </Scrollbar>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default StartCall;
