import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  IconButton,
  Avatar,
  Button,
  Card,
  CardContent,
  Stack,
  Chip,
  Alert,
  CircularProgress,
  Divider,
  useMediaQuery,
} from "@mui/material";
import {
  MagnifyingGlass,
  UserPlus,
  Check,
  X,
  Users,
  PaperPlaneTilt,
} from "phosphor-react";
import { useTheme } from "@mui/material/styles";
import { useSocket } from "../../contexts/SocketContext";
import axios from "../../utils/axios";
import Scrollbar from "../../components/Scrollbar";

const Friends = () => {
  const theme = useTheme();
  const { socket } = useSocket();
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [allVerifiedUsers, setAllVerifiedUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", severity: "info" });

  // Fetch data based on active tab
  useEffect(() => {
    fetchData();
    // Clear search query when switching tabs
    setSearchQuery("");
  }, [activeTab]);

  // Filter users based on search query
  useEffect(() => {
    if (activeTab === 3) { // Only for Add Friends tab
      if (searchQuery.trim().length >= 2) {
        const filtered = allVerifiedUsers.filter(user => 
          `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filtered);
      } else {
        setSearchResults(allVerifiedUsers); // Show all when no search query
      }
    }
  }, [searchQuery, allVerifiedUsers, activeTab]);

  // Socket event listeners
  useEffect(() => {
    if (socket) {
      socket.on("friendRequestReceived", (data) => {
        showAlert("New friend request received!", "success");
        if (activeTab === 1) fetchData(); // Refresh pending requests
      });

      socket.on("friendRequestAccepted", (data) => {
        showAlert("Friend request accepted!", "success");
        if (activeTab === 0) fetchData(); // Refresh friends list
      });

      socket.on("friendRequestRejected", (data) => {
        showAlert("Friend request was rejected", "info");
        if (activeTab === 2) fetchData(); // Refresh sent requests
      });

      return () => {
        socket.off("friendRequestReceived");
        socket.off("friendRequestAccepted");
        socket.off("friendRequestRejected");
      };
    }
  }, [socket, activeTab]);

  const showAlert = (message, severity = "info") => {
    setAlert({ show: true, message, severity });
    setTimeout(() => setAlert({ show: false, message: "", severity: "info" }), 5000);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      let endpoint = "";
      switch (activeTab) {
        case 0:
          endpoint = "/friends/friends";
          break;
        case 1:
          endpoint = "/friends/pending";
          break;
        case 2:
          endpoint = "/friends/sent";
          break;
        case 3:
          endpoint = "/friends/verified-users"; // Get all verified users
          break;
        default:
          return;
      }

      const response = await axios.get(endpoint);
      const data = response.data.data;

      switch (activeTab) {
        case 0:
          setFriends(data.friends || []);
          break;
        case 1:
          setPendingRequests(data.requests || []);
          break;
        case 2:
          setSentRequests(data.requests || []);
          break;
        case 3:
          setAllVerifiedUsers(data.users || []);
          break;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      showAlert("Error fetching data", "error");
    } finally {
      setLoading(false);
    }
  };



  const sendFriendRequest = async (recipientId) => {
    try {
      await axios.post("/friends/send", { recipientId });
      showAlert("Friend request sent!", "success");
      // Remove user from both lists
      setSearchResults(searchResults.filter(user => user._id !== recipientId));
      setAllVerifiedUsers(allVerifiedUsers.filter(user => user._id !== recipientId));
    } catch (error) {
      console.error("Error sending friend request:", error);
      showAlert(error.response?.data?.message || "Error sending friend request", "error");
    }
  };

  const acceptFriendRequest = async (requestId) => {
    try {
      await axios.patch(`/friends/accept/${requestId}`);
      showAlert("Friend request accepted!", "success");
      fetchData();
    } catch (error) {
      console.error("Error accepting friend request:", error);
      showAlert("Error accepting friend request", "error");
    }
  };

  const rejectFriendRequest = async (requestId) => {
    try {
      await axios.patch(`/friends/reject/${requestId}`);
      showAlert("Friend request rejected", "info");
      fetchData();
    } catch (error) {
      console.error("Error rejecting friend request:", error);
      showAlert("Error rejecting friend request", "error");
    }
  };

  const UserCard = ({ user, showActions = false, request = null, actionType = "send" }) => (
    <Card sx={{ mb: 1.5, borderRadius: 2, boxShadow: 1 }}>
      <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Avatar
            src={user.avatar}
            sx={{ width: 40, height: 40 }}
          >
            {user.firstName?.[0]}{user.lastName?.[0]}
          </Avatar>
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography 
              variant="subtitle2" 
              sx={{ 
                fontWeight: 600,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
              }}
            >
              {user.firstName} {user.lastName}
            </Typography>
            {user.verified && (
              <Chip
                label="Verified"
                size="small"
                color="primary"
                sx={{ mt: 0.5, height: 20, fontSize: "0.7rem" }}
              />
            )}
          </Box>
          {showActions && (
            <Stack direction="row" spacing={0.5}>
              {actionType === "send" && (
                <IconButton
                  size="small"
                  color="primary"
                  onClick={() => sendFriendRequest(user._id)}
                  sx={{
                    bgcolor: theme.palette.primary.main,
                    color: "white",
                    "&:hover": { bgcolor: theme.palette.primary.dark },
                    width: 32,
                    height: 32,
                  }}
                >
                  <UserPlus size={16} />
                </IconButton>
              )}
              {actionType === "respond" && (
                <>
                  <IconButton
                    size="small"
                    color="success"
                    onClick={() => acceptFriendRequest(request._id)}
                    sx={{
                      bgcolor: theme.palette.success.main,
                      color: "white",
                      "&:hover": { bgcolor: theme.palette.success.dark },
                      width: 32,
                      height: 32,
                    }}
                  >
                    <Check size={16} />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => rejectFriendRequest(request._id)}
                    sx={{
                      bgcolor: theme.palette.error.main,
                      color: "white",
                      "&:hover": { bgcolor: theme.palette.error.dark },
                      width: 32,
                      height: 32,
                    }}
                  >
                    <X size={16} />
                  </IconButton>
                </>
              )}
              {actionType === "sent" && (
                <Chip
                  label={request?.status || "Pending"}
                  size="small"
                  color="warning"
                  sx={{ height: 24, fontSize: "0.7rem" }}
                />
              )}
            </Stack>
          )}
        </Stack>
      </CardContent>
    </Card>
  );

  const renderTabContent = () => {
    if (loading) {
      return (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress />
        </Box>
      );
    }

    switch (activeTab) {
      case 0: // Friends
        return (
          <Box>
            {friends.length === 0 ? (
              <Box textAlign="center" py={3}>
                <Users size={48} color={theme.palette.grey[400]} style={{ marginBottom: 12 }} />
                <Typography variant="subtitle2" color="textSecondary" sx={{ fontWeight: 600 }}>
                  No friends yet
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ fontSize: "0.75rem" }}>
                  Start by searching for verified users
                </Typography>
              </Box>
            ) : (
              friends.map((friend) => (
                <UserCard key={friend._id} user={friend} />
              ))
            )}
          </Box>
        );

      case 1: // Pending Requests
        return (
          <Box>
            {pendingRequests.length === 0 ? (
              <Box textAlign="center" py={3}>
                <UserPlus size={48} color={theme.palette.grey[400]} style={{ marginBottom: 12 }} />
                <Typography variant="subtitle2" color="textSecondary" sx={{ fontWeight: 600 }}>
                  No pending requests
                </Typography>
              </Box>
            ) : (
              pendingRequests.map((request) => (
                <UserCard
                  key={request._id}
                  user={request.sender}
                  showActions={true}
                  request={request}
                  actionType="respond"
                />
              ))
            )}
          </Box>
        );

      case 2: // Sent Requests
        return (
          <Box>
            {sentRequests.length === 0 ? (
              <Box textAlign="center" py={3}>
                <PaperPlaneTilt size={48} color={theme.palette.grey[400]} style={{ marginBottom: 12 }} />
                <Typography variant="subtitle2" color="textSecondary" sx={{ fontWeight: 600 }}>
                  No sent requests
                </Typography>
              </Box>
            ) : (
              sentRequests.map((request) => (
                <UserCard
                  key={request._id}
                  user={request.recipient}
                  showActions={true}
                  request={request}
                  actionType="sent"
                />
              ))
            )}
          </Box>
        );

      case 3: // Add Friends
        return (
          <Box>
            <TextField
              fullWidth
              size="small"
              placeholder="Search verified users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MagnifyingGlass size={18} />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
            
            {searchResults.length === 0 ? (
              <Box textAlign="center" py={3}>
                <UserPlus size={48} color={theme.palette.grey[400]} style={{ marginBottom: 12 }} />
                <Typography variant="subtitle2" color="textSecondary" sx={{ fontWeight: 600 }}>
                  {searchQuery.trim().length >= 2 ? `No users found matching "${searchQuery}"` : "No verified users available"}
                </Typography>
              </Box>
            ) : (
              searchResults.map((user) => (
                <UserCard
                  key={user._id}
                  user={user}
                  showActions={true}
                  actionType="send"
                />
              ))
            )}
          </Box>
        );

      default:
        return null;
    }
  };

  // Responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <>
      <Stack 
        direction={"row"} 
        sx={{ 
          width: "100%",
          height: "100vh",
          overflow: "hidden"
        }}
      >
        {/* Left Panel */}
        <Box
          sx={{
            position: "relative",
            width: isMobile ? "100%" : isTablet ? 280 : 320,
            minWidth: isMobile ? "100%" : isTablet ? 280 : 320,
            maxWidth: isMobile ? "100%" : isTablet ? 280 : 320,
            overflow: "hidden",
            backgroundColor:
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background.paper,
            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Stack 
            p={isMobile ? 2 : 3} 
            spacing={2} 
            sx={{ height: "100vh" }}
          >
            <Stack>
              <Typography 
                variant={isMobile ? "h6" : "h5"}
                sx={{ fontWeight: 600 }}
              >
                Friends
              </Typography>
            </Stack>

            {alert.show && (
              <Alert severity={alert.severity}>
                {alert.message}
              </Alert>
            )}

            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={activeTab}
                onChange={(e, newValue) => setActiveTab(newValue)}
                variant="fullWidth"
                sx={{
                  "& .MuiTab-root": {
                    fontSize: isMobile ? "0.75rem" : "0.875rem",
                    minWidth: "auto",
                    padding: isMobile ? "8px 4px" : "12px 16px",
                  }
                }}
              >
                <Tab label="Friends" />
                <Tab label="Requests" />
                <Tab label="Sent" />
                <Tab label="Add" />
              </Tabs>
            </Box>

            <Stack
              spacing={2}
              direction="column"
              sx={{
                flexGrow: 1,
                overflow: "hidden",
                height: "100%",
                position: "relative",
              }}
            >
              <Scrollbar>
                {renderTabContent()}
              </Scrollbar>
            </Stack>
          </Stack>
        </Box>
        {/* Right Panel */}
        {/* // TODO => Reuse conversation components or add friend details */}
      </Stack>
    </>
  );
};

export default Friends;