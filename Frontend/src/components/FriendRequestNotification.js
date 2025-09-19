import React, { useState, useEffect } from "react";
import {
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Avatar,
  Stack,
  Box,
  Button,
  Divider,
  Chip,
} from "@mui/material";
import { Bell, Check, X } from "phosphor-react";
import { useTheme } from "@mui/material/styles";
import { useSocket } from "../contexts/SocketContext";
import axios from "../utils/axios";

const FriendRequestNotification = () => {
  const theme = useTheme();
  const { socket } = useSocket();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const open = Boolean(anchorEl);

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("friendRequestReceived", (data) => {
        setNotifications(prev => [data.request, ...prev]);
        setUnreadCount(prev => prev + 1);
      });

      socket.on("friendRequestAccepted", () => {
        fetchPendingRequests(); // Refresh the list
      });

      return () => {
        socket.off("friendRequestReceived");
        socket.off("friendRequestAccepted");
      };
    }
  }, [socket]);

  const fetchPendingRequests = async () => {
    try {
      const response = await axios.get("/friends/pending");
      const requests = response.data.data.requests || [];
      setNotifications(requests);
      setUnreadCount(requests.length);
    } catch (error) {
      console.error("Error fetching pending requests:", error);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setUnreadCount(0); // Mark as read when opened
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const acceptRequest = async (requestId) => {
    try {
      await axios.patch(`/friends/accept/${requestId}`);
      setNotifications(prev => prev.filter(req => req._id !== requestId));
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

  const rejectRequest = async (requestId) => {
    try {
      await axios.patch(`/friends/reject/${requestId}`);
      setNotifications(prev => prev.filter(req => req._id !== requestId));
    } catch (error) {
      console.error("Error rejecting friend request:", error);
    }
  };

  return (
    <>
      <IconButton onClick={handleClick} color="inherit">
        <Badge badgeContent={unreadCount} color="error">
          <Bell />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: 350,
            maxHeight: 400,
            overflow: "auto",
          },
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Friend Requests
          </Typography>
        </Box>
        
        <Divider />

        {notifications.length === 0 ? (
          <Box sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="body2" color="textSecondary">
              No pending friend requests
            </Typography>
          </Box>
        ) : (
          notifications.map((request) => (
            <MenuItem key={request._id} sx={{ p: 2, alignItems: "flex-start" }}>
              <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
                <Avatar
                  src={request.sender?.avatar}
                  sx={{ width: 40, height: 40 }}
                >
                  {request.sender?.firstName?.[0]}{request.sender?.lastName?.[0]}
                </Avatar>
                
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {request.sender?.firstName} {request.sender?.lastName}
                  </Typography>
                  
                  {request.sender?.verified && (
                    <Chip
                      label="Verified"
                      size="small"
                      color="primary"
                      sx={{ mt: 0.5, mb: 1 }}
                    />
                  )}
                  
                  <Stack direction="row" spacing={1}>
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      startIcon={<Check />}
                      onClick={() => acceptRequest(request._id)}
                      sx={{ minWidth: "auto", px: 1 }}
                    >
                      Accept
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      startIcon={<X />}
                      onClick={() => rejectRequest(request._id)}
                      sx={{ minWidth: "auto", px: 1 }}
                    >
                      Reject
                    </Button>
                  </Stack>
                </Box>
              </Stack>
            </MenuItem>
          ))
        )}
      </Menu>
    </>
  );
};

export default FriendRequestNotification;