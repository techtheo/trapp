import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
  TextField,
  Switch,
  FormControlLabel,
  Card,
  CardContent,
  Chip,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  LinearProgress,
  useMediaQuery,
} from "@mui/material";
import { useTheme, styled, alpha } from "@mui/material/styles";
import {
  CaretLeft,
  Camera,
  PencilSimple,
  Check,
  X,
  User,
  Envelope,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Bell,
  Eye,
  EyeSlash,
  Lock,
  Key,
} from "phosphor-react";
import { faker } from "@faker-js/faker";
import Scrollbar from "../../components/Scrollbar";

// Styled components
const ProfileContainer = styled(Box)(({ theme, isMobile, isTablet }) => ({
  height: "100vh",
  width: isMobile ? "100%" : isTablet ? 280 : 320,
  minWidth: isMobile ? "100%" : isTablet ? 280 : 320,
  maxWidth: isMobile ? "100%" : isTablet ? 280 : 320,
  backgroundColor:
    theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background.paper,
  boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
}));

const AvatarContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "inline-block",
  "&:hover .camera-overlay": {
    opacity: 1,
  },
}));

const CameraOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  opacity: 0,
  transition: "opacity 0.3s ease",
  cursor: "pointer",
  color: "white",
}));

const ProfileCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  background:
    theme.palette.mode === "light" ? "#ffffff" : theme.palette.background.paper,
  boxShadow:
    theme.palette.mode === "light"
      ? "0 2px 8px rgba(0, 0, 0, 0.04)"
      : "0 2px 8px rgba(0, 0, 0, 0.2)",
  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow:
      theme.palette.mode === "light"
        ? "0 8px 24px rgba(0, 0, 0, 0.08)"
        : "0 8px 24px rgba(0, 0, 0, 0.3)",
  },
}));

const EditableField = styled(Box)(({ theme, isEditing }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "16px 20px",
  borderRadius: 12,
  cursor: "pointer",
  position: "relative",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  background: isEditing
    ? `linear-gradient(135deg, ${alpha(
        theme.palette.primary.main,
        0.15
      )} 0%, ${alpha(theme.palette.primary.light, 0.08)} 100%)`
    : theme.palette.mode === "light"
    ? "#ffffff"
    : theme.palette.background.paper,
  border: isEditing
    ? `2px solid ${alpha(theme.palette.primary.main, 0.3)}`
    : `2px solid transparent`,
  boxShadow: isEditing
    ? `0 8px 32px ${alpha(theme.palette.primary.main, 0.15)}, 0 0 0 1px ${alpha(
        theme.palette.primary.main,
        0.1
      )}`
    : theme.palette.mode === "light"
    ? "0 2px 8px rgba(0, 0, 0, 0.04)"
    : "0 2px 8px rgba(0, 0, 0, 0.2)",

  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: isEditing
      ? `0 12px 40px ${alpha(
          theme.palette.primary.main,
          0.2
        )}, 0 0 0 1px ${alpha(theme.palette.primary.main, 0.15)}`
      : theme.palette.mode === "light"
      ? "0 8px 24px rgba(0, 0, 0, 0.08)"
      : "0 8px 24px rgba(0, 0, 0, 0.3)",
    background: isEditing
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

  // Subtle gradient overlay for editing state
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: isEditing
      ? `linear-gradient(90deg, ${alpha(
          theme.palette.primary.main,
          0.05
        )} 0%, transparent 100%)`
      : "transparent",
    borderRadius: 12,
    pointerEvents: "none",
  },
}));

const StatusChip = styled(Chip)(({ theme, status }) => ({
  backgroundColor:
    status === "online"
      ? alpha(theme.palette.success.main, 0.1)
      : status === "away"
      ? alpha(theme.palette.warning.main, 0.1)
      : alpha(theme.palette.error.main, 0.1),
  color:
    status === "online"
      ? theme.palette.success.main
      : status === "away"
      ? theme.palette.warning.main
      : theme.palette.error.main,
  fontWeight: 600,
  fontSize: "0.75rem",
  borderRadius: 20,
  padding: "4px 12px",
  cursor: "pointer",
  transition: "all 0.3s ease",
  border: `1px solid ${
    status === "online"
      ? alpha(theme.palette.success.main, 0.3)
      : status === "away"
      ? alpha(theme.palette.warning.main, 0.3)
      : alpha(theme.palette.error.main, 0.3)
  }`,

  "&:hover": {
    transform: "scale(1.05)",
    backgroundColor:
      status === "online"
        ? alpha(theme.palette.success.main, 0.2)
        : status === "away"
        ? alpha(theme.palette.warning.main, 0.2)
        : alpha(theme.palette.error.main, 0.2),
    boxShadow: `0 4px 12px ${
      status === "online"
        ? alpha(theme.palette.success.main, 0.3)
        : status === "away"
        ? alpha(theme.palette.warning.main, 0.3)
        : alpha(theme.palette.error.main, 0.3)
    }`,
  },

  "&:active": {
    transform: "scale(0.95)",
    transition: "all 0.1s ease",
  },
}));

const Profile = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  
  // Responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  const [profileData, setProfileData] = useState({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    location: faker.location.city(),
    bio: faker.lorem.sentence(),
    avatar: faker.image.avatar(),
    status: "online", // online, away, busy
    joinDate: "March 2023",
  });

  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState("");
  const [uploadStatus, setUploadStatus] = useState(null);

  // Change Password Modal State
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setUploadStatus("error");
        setTimeout(() => setUploadStatus(null), 3000);
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setUploadStatus("error");
        setTimeout(() => setUploadStatus(null), 3000);
        return;
      }

      // Simulate upload process
      setUploadStatus("uploading");

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setTimeout(() => {
          setProfileData((prev) => ({
            ...prev,
            avatar: e.target.result,
          }));
          setUploadStatus("success");
          setTimeout(() => setUploadStatus(null), 3000);
        }, 1500);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = (field, currentValue) => {
    setEditingField(field);
    setTempValue(currentValue);
  };

  const handleSave = (field) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: tempValue,
    }));
    setEditingField(null);
    setTempValue("");
  };

  const handleCancel = () => {
    setEditingField(null);
    setTempValue("");
  };

  const handleStatusChange = (newStatus) => {
    setProfileData((prev) => ({
      ...prev,
      status: newStatus,
    }));
  };

  // Password validation function
  const validatePassword = (password) => {
    const errors = [];
    let strength = 0;

    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long");
    } else {
      strength += 1;
    }

    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter");
    } else {
      strength += 1;
    }

    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter");
    } else {
      strength += 1;
    }

    if (!/\d/.test(password)) {
      errors.push("Password must contain at least one number");
    } else {
      strength += 1;
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push("Password must contain at least one special character");
    } else {
      strength += 1;
    }

    return { errors, strength };
  };

  // Handle password input changes
  const handlePasswordChange = (field, value) => {
    setPasswordData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (field === "newPassword") {
      const validation = validatePassword(value);
      setPasswordErrors(validation.errors);
      setPasswordStrength(validation.strength);
    }
  };

  // Handle password visibility toggle
  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // Handle change password modal
  const handleOpenChangePassword = () => {
    setChangePasswordOpen(true);
  };

  const handleCloseChangePassword = () => {
    setChangePasswordOpen(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setShowPasswords({
      current: false,
      new: false,
      confirm: false,
    });
    setPasswordStrength(0);
    setPasswordErrors([]);
  };

  // Handle password change submission
  const handleChangePassword = async () => {
    // Validate passwords match
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordErrors(["New passwords do not match"]);
      return;
    }

    // Check if new password is strong enough
    if (passwordStrength < 4) {
      setPasswordErrors(["Password is not strong enough"]);
      return;
    }

    setIsChangingPassword(true);

    // Simulate API call
    setTimeout(() => {
      setIsChangingPassword(false);
      handleCloseChangePassword();
      // Show success message
      setUploadStatus("success");
      setTimeout(() => setUploadStatus(null), 3000);
    }, 2000);
  };

  // Get password strength color and text
  const getPasswordStrengthInfo = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return {
          color: theme.palette.error.main,
          text: "Very Weak",
          value: 20,
        };
      case 2:
        return { color: theme.palette.warning.main, text: "Weak", value: 40 };
      case 3:
        return { color: theme.palette.info.main, text: "Fair", value: 60 };
      case 4:
        return { color: theme.palette.success.light, text: "Good", value: 80 };
      case 5:
        return {
          color: theme.palette.success.main,
          text: "Strong",
          value: 100,
        };
      default:
        return { color: theme.palette.grey[400], text: "", value: 0 };
    }
  };

  const profileFields = [
    {
      key: "name",
      label: "Full Name",
      icon: <User size={20} />,
      value: profileData.name,
    },
    {
      key: "email",
      label: "Email",
      icon: <Envelope size={20} />,
      value: profileData.email,
    },
    {
      key: "phone",
      label: "Phone",
      icon: <Phone size={20} />,
      value: profileData.phone,
    },
    {
      key: "location",
      label: "Location",
      icon: <MapPin size={20} />,
      value: profileData.location,
    },
    {
      key: "bio",
      label: "Bio",
      icon: <PencilSimple size={20} />,
      value: profileData.bio,
    },
  ];

  const privacySettings = [
    { key: "showOnline", label: "Show online status", defaultChecked: true },
    { key: "readReceipts", label: "Read receipts", defaultChecked: true },
    { key: "lastSeen", label: "Last seen", defaultChecked: false },
    {
      key: "profilePhoto",
      label: "Profile photo visibility",
      defaultChecked: true,
    },
  ];

  return (
    <Stack 
      direction="row" 
      sx={{ 
        width: "100%",
        height: "100vh",
        overflow: "hidden"
      }}
    >
      <ProfileContainer isMobile={isMobile} isTablet={isTablet}>
        {/* Fixed Header */}
        <Box sx={{ flexShrink: 0, p: isMobile ? 2 : 4, pb: 2 }}>
          <Stack direction="row" alignItems="center" spacing={isMobile ? 2 : 3}>
            <IconButton onClick={() => navigate(-1)}>
              <CaretLeft size={isMobile ? 20 : 24} color="#4B4B4B" />
            </IconButton>
            <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ fontWeight: 600 }}>
              Profile
            </Typography>
          </Stack>
        </Box>

        {/* Scrollable Content */}
        <Box sx={{ flex: 1, overflow: "hidden" }}>
          <Scrollbar>
            <Stack spacing={isMobile ? 2 : 3} sx={{ px: isMobile ? 2 : 4, pb: isMobile ? 2 : 4 }}>
              {/* Upload Status Alert */}
              {uploadStatus && (
                <Alert
                  severity={
                    uploadStatus === "success"
                      ? "success"
                      : uploadStatus === "error"
                      ? "error"
                      : "info"
                  }
                  sx={{ borderRadius: 2 }}
                >
                  {uploadStatus === "uploading" && "Uploading image..."}
                  {uploadStatus === "success" && "Profile picture updated!"}
                  {uploadStatus === "error" &&
                    "Invalid file. Please select an image under 5MB."}
                </Alert>
              )}

              {/* Profile Picture Section */}
              <ProfileCard>
                <CardContent sx={{ textAlign: "center", py: isMobile ? 3 : 4 }}>
                  <AvatarContainer>
                    <Avatar
                      src={profileData.avatar}
                      sx={{
                        width: isMobile ? 100 : 120,
                        height: isMobile ? 100 : 120,
                        mx: "auto",
                        mb: 2,
                        border: `4px solid ${alpha(
                          theme.palette.primary.main,
                          0.2
                        )}`,
                      }}
                    />
                    <CameraOverlay className="camera-overlay">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          opacity: 0,
                          cursor: "pointer",
                        }}
                      />
                      <Camera size={24} />
                    </CameraOverlay>
                  </AvatarContainer>

                  <Typography 
                    variant={isMobile ? "h6" : "h5"} 
                    sx={{ fontWeight: 600, mb: 1 }}
                  >
                    {profileData.name}
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="center"
                    sx={{ mb: 2 }}
                  >
                    <StatusChip
                      label={profileData.status}
                      status={profileData.status}
                      onClick={() => {
                        const statuses = ["online", "away", "busy"];
                        const currentIndex = statuses.indexOf(
                          profileData.status
                        );
                        const nextStatus =
                          statuses[(currentIndex + 1) % statuses.length];
                        handleStatusChange(nextStatus);
                      }}
                      sx={{ cursor: "pointer" }}
                    />
                  </Stack>

                  <Typography variant="body2" color="text.secondary">
                    <Calendar
                      size={16}
                      style={{ marginRight: 8, verticalAlign: "middle" }}
                    />
                    Joined {profileData.joinDate}
                  </Typography>
                </CardContent>
              </ProfileCard>

              {/* Profile Information */}
              <ProfileCard>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Profile Information
                  </Typography>

                  <Stack spacing={2}>
                    {profileFields.map(({ key, label, icon, value }) => (
                      <EditableField key={key} isEditing={editingField === key}>
                        <Stack
                          direction="row"
                          spacing={2}
                          alignItems="center"
                          sx={{ flex: 1 }}
                        >
                          <Box sx={{ color: theme.palette.text.secondary }}>
                            {icon}
                          </Box>
                          <Stack sx={{ flex: 1 }}>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {label}
                            </Typography>
                            {editingField === key ? (
                              <TextField
                                value={tempValue}
                                onChange={(e) => setTempValue(e.target.value)}
                                size="small"
                                variant="standard"
                                sx={{ mt: 0.5 }}
                                multiline={key === "bio"}
                                rows={key === "bio" ? 2 : 1}
                                autoFocus
                              />
                            ) : (
                              <Typography
                                variant="body2"
                                sx={{
                                  fontWeight: 500,
                                  wordBreak: "break-word",
                                  overflowWrap: "break-word",
                                  maxWidth: "100%",
                                  whiteSpace: "normal",
                                }}
                              >
                                {value}
                              </Typography>
                            )}
                          </Stack>
                        </Stack>

                        <Stack direction="row" spacing={1}>
                          {editingField === key ? (
                            <>
                              <IconButton
                                size="small"
                                onClick={() => handleSave(key)}
                                sx={{ color: theme.palette.success.main }}
                              >
                                <Check size={16} />
                              </IconButton>
                              <IconButton
                                size="small"
                                onClick={handleCancel}
                                sx={{ color: theme.palette.error.main }}
                              >
                                <X size={16} />
                              </IconButton>
                            </>
                          ) : (
                            <IconButton
                              size="small"
                              onClick={() => handleEdit(key, value)}
                              sx={{ color: theme.palette.text.secondary }}
                            >
                              <PencilSimple size={16} />
                            </IconButton>
                          )}
                        </Stack>
                      </EditableField>
                    ))}
                  </Stack>
                </CardContent>
              </ProfileCard>

              {/* Privacy Settings */}
              <ProfileCard>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    <Shield
                      size={20}
                      style={{ marginRight: 8, verticalAlign: "middle" }}
                    />
                    Privacy Settings
                  </Typography>

                  <Stack spacing={2}>
                    {privacySettings.map(({ key, label, defaultChecked }) => (
                      <FormControlLabel
                        key={key}
                        control={<Switch defaultChecked={defaultChecked} />}
                        label={
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {label}
                          </Typography>
                        }
                        sx={{
                          m: 0,
                          justifyContent: "space-between",
                          width: "100%",
                          "& .MuiFormControlLabel-label": {
                            flex: 1,
                          },
                        }}
                      />
                    ))}
                  </Stack>
                </CardContent>
              </ProfileCard>

              {/* Account Actions */}
              <Stack spacing={2}>
                <Button
                  variant="outlined"
                  startIcon={<Lock size={18} />}
                  onClick={handleOpenChangePassword}
                  sx={{
                    borderRadius: 3,
                    py: 1.5,
                    textTransform: "none",
                    fontWeight: 600,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: `0 8px 20px ${alpha(
                        theme.palette.primary.main,
                        0.3
                      )}`,
                      background: alpha(theme.palette.primary.main, 0.05),
                    },
                  }}
                >
                  Change Password
                </Button>

                <Button
                  variant="outlined"
                  color="error"
                  sx={{
                    borderRadius: 3,
                    py: 1.5,
                    textTransform: "none",
                    fontWeight: 600,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: `0 8px 20px ${alpha(
                        theme.palette.error.main,
                        0.3
                      )}`,
                      background: alpha(theme.palette.error.main, 0.05),
                    },
                  }}
                >
                  Delete Account
                </Button>
              </Stack>
            </Stack>
          </Scrollbar>
        </Box>
      </ProfileContainer>

      {/* Change Password Modal */}
      <Dialog
        open={changePasswordOpen}
        onClose={handleCloseChangePassword}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            background:
              theme.palette.mode === "light"
                ? "#ffffff"
                : theme.palette.background.paper,
            boxShadow:
              theme.palette.mode === "light"
                ? "0 24px 48px rgba(0, 0, 0, 0.15)"
                : "0 24px 48px rgba(0, 0, 0, 0.4)",
          },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box
              sx={{
                p: 1.5,
                borderRadius: 2,
                background: `linear-gradient(135deg, ${alpha(
                  theme.palette.primary.main,
                  0.15
                )} 0%, ${alpha(theme.palette.primary.light, 0.08)} 100%)`,
                color: theme.palette.primary.main,
              }}
            >
              <Key size={24} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Change Password
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Update your account password
              </Typography>
            </Box>
          </Stack>
        </DialogTitle>

        <DialogContent sx={{ pt: 2 }}>
          <Stack spacing={3}>
            {/* Current Password */}
            <TextField
              fullWidth
              label="Current Password"
              type={showPasswords.current ? "text" : "password"}
              value={passwordData.currentPassword}
              onChange={(e) =>
                handlePasswordChange("currentPassword", e.target.value)
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock size={20} color={theme.palette.text.secondary} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => togglePasswordVisibility("current")}
                      edge="end"
                    >
                      {showPasswords.current ? (
                        <EyeSlash size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />

            {/* New Password */}
            <Box>
              <TextField
                fullWidth
                label="New Password"
                type={showPasswords.new ? "text" : "password"}
                value={passwordData.newPassword}
                onChange={(e) =>
                  handlePasswordChange("newPassword", e.target.value)
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Key size={20} color={theme.palette.text.secondary} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => togglePasswordVisibility("new")}
                        edge="end"
                      >
                        {showPasswords.new ? (
                          <EyeSlash size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />

              {/* Password Strength Indicator */}
              {passwordData.newPassword && (
                <Box sx={{ mt: 2 }}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mb: 1 }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Password Strength
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: getPasswordStrengthInfo().color,
                        fontWeight: 600,
                      }}
                    >
                      {getPasswordStrengthInfo().text}
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={getPasswordStrengthInfo().value}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: alpha(theme.palette.grey[400], 0.2),
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: getPasswordStrengthInfo().color,
                        borderRadius: 3,
                      },
                    }}
                  />
                </Box>
              )}
            </Box>

            {/* Confirm Password */}
            <TextField
              fullWidth
              label="Confirm New Password"
              type={showPasswords.confirm ? "text" : "password"}
              value={passwordData.confirmPassword}
              onChange={(e) =>
                handlePasswordChange("confirmPassword", e.target.value)
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Check size={20} color={theme.palette.text.secondary} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => togglePasswordVisibility("confirm")}
                      edge="end"
                    >
                      {showPasswords.confirm ? (
                        <EyeSlash size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />

            {/* Password Errors */}
            {passwordErrors.length > 0 && (
              <Alert severity="error" sx={{ borderRadius: 2 }}>
                <Stack spacing={0.5}>
                  {passwordErrors.map((error, index) => (
                    <Typography key={index} variant="body2">
                      • {error}
                    </Typography>
                  ))}
                </Stack>
              </Alert>
            )}

            {/* Loading Progress */}
            {isChangingPassword && (
              <Box>
                <LinearProgress
                  sx={{
                    borderRadius: 2,
                    height: 4,
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  }}
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1, textAlign: "center" }}
                >
                  Updating password...
                </Typography>
              </Box>
            )}
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button
            onClick={handleCloseChangePassword}
            disabled={isChangingPassword}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleChangePassword}
            variant="contained"
            disabled={
              !passwordData.currentPassword ||
              !passwordData.newPassword ||
              !passwordData.confirmPassword ||
              passwordStrength < 4 ||
              isChangingPassword
            }
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              px: 3,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              "&:hover": {
                background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                transform: "translateY(-1px)",
                boxShadow: `0 8px 20px ${alpha(
                  theme.palette.primary.main,
                  0.4
                )}`,
              },
            }}
          >
            {isChangingPassword ? "Updating..." : "Update Password"}
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default Profile;
