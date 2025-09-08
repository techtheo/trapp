import { Link as RouterLink } from "react-router-dom";
import { Link, Stack, Typography, Box, Card, CardContent, CircularProgress } from "@mui/material";
import { useTheme, styled, alpha } from "@mui/material/styles";
import React, { useState } from "react";
import VerifyForm from "../../sections/auth/VerifyForm";
import { ChatCircleDots, Sparkle } from "phosphor-react";
import Logo from "../../assets/Images/trapp.png";

// Styled components for fancy design
const AuthCard = styled(Card)(({ theme }) => ({
  borderRadius: 24,
  background: theme.palette.mode === "light" 
    ? "rgba(255, 255, 255, 0.95)" 
    : "rgba(18, 18, 18, 0.95)",
  backdropFilter: "blur(20px)",
  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  boxShadow: theme.palette.mode === "light"
    ? "0 20px 40px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.05)"
    : "0 20px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  position: "relative",
  overflow: "hidden",
  
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "1px",
    background: `linear-gradient(90deg, transparent, ${alpha(
      theme.palette.primary.main,
      0.5
    )}, transparent)`,
  },
}));

const GradientText = styled(Typography)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 50%, ${theme.palette.secondary.main} 100%)`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  fontWeight: 700,
  position: "relative",
}));

const FloatingIcon = styled(Box)(({ theme }) => ({
  position: "absolute",
  width: 60,
  height: 60,
  borderRadius: "50%",
  background: `linear-gradient(135deg, ${alpha(
    theme.palette.primary.main,
    0.1
  )} 0%, ${alpha(theme.palette.primary.light, 0.05)} 100%)`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.primary.main,
  animation: "float 6s ease-in-out infinite",
  
  "@keyframes float": {
    "0%, 100%": {
      transform: "translateY(0px) rotate(0deg)",
    },
    "50%": {
      transform: "translateY(-10px) rotate(5deg)",
    },
  },
}));

const Verify = () => {
  const theme = useTheme();
  const [isResending, setIsResending] = useState(false);

  // Listen for resending state changes
  React.useEffect(() => {
    const handleResendStart = () => setIsResending(true);
    const handleResendEnd = () => setIsResending(false);

    window.addEventListener('resendStart', handleResendStart);
    window.addEventListener('resendEnd', handleResendEnd);

    return () => {
      window.removeEventListener('resendStart', handleResendStart);
      window.removeEventListener('resendEnd', handleResendEnd);
    };
  }, []);

  return (
    <Box sx={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      {/* Floating Background Elements */}
      <FloatingIcon sx={{ top: "10%", left: "10%", animationDelay: "0s" }}>
        <ChatCircleDots size={28} />
      </FloatingIcon>
      <FloatingIcon sx={{ top: "20%", right: "15%", animationDelay: "2s" }}>
        <Sparkle size={24} />
      </FloatingIcon>
      <FloatingIcon sx={{ bottom: "15%", left: "20%", animationDelay: "4s" }}>
        <ChatCircleDots size={32} />
      </FloatingIcon>

      {/* Main Content */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          p: 2,
        }}
      >
        <AuthCard sx={{ width: "100%", maxWidth: 480 }}>
          <CardContent sx={{ p: 2.5 }}>
            <Stack spacing={2} sx={{ position: "relative" }}>
              {/* Header Section */}
              <Box sx={{ textAlign: "center", mb: 0 }}>
                <Box
                  sx={{
                    display: "inline-flex",
                    p: 0.5,
                    borderRadius: 3,
                    background: `linear-gradient(135deg, ${alpha(
                      theme.palette.primary.main,
                      0.1
                    )} 0%, ${alpha(theme.palette.primary.light, 0.05)} 100%)`,
                    mb: 1,
                  }}
                >
                  <img 
                    src={Logo} 
                    alt="Trapp Logo" 
                    style={{ 
                      height: 70, 
                      width: 70,
                      borderRadius: 8
                    }} 
                  />
                </Box>
                
                <GradientText variant="h4" sx={{ mb: 0.5 }}>
                  Verify Your Email
                </GradientText>
                
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontWeight: 400,
                    color: "text.secondary",
                    mb: 1,
                  }}
                >
                  Enter the 6-digit code sent to your email
                </Typography>

                <Stack direction="row" spacing={0.5} justifyContent="center" alignItems="center">
                  <Typography variant="body2" color="text.secondary">
                    Didn't receive the code?
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    {isResending && (
                      <CircularProgress size={12} thickness={4} />
                    )}
                    <Typography 
                      variant="subtitle2"
                      sx={{
                        color: isResending ? theme.palette.text.disabled : theme.palette.primary.main,
                        textDecoration: "none",
                        fontWeight: 600,
                        position: "relative",
                        cursor: isResending ? "default" : "pointer",
                        pointerEvents: isResending ? "none" : "auto",
                        "&:hover": {
                          "&::after": {
                            width: isResending ? 0 : "100%",
                          },
                        },
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          bottom: -2,
                          left: 0,
                          width: 0,
                          height: 2,
                          background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                          transition: "width 0.3s ease",
                        },
                      }}
                      onClick={() => {
                        if (!isResending) {
                          // This will be handled by the VerifyForm component
                          const event = new CustomEvent('resendOTP');
                          window.dispatchEvent(event);
                        }
                      }}
                    >
                      {isResending ? "Sending..." : "Resend"}
                    </Typography>
                  </Box>
                </Stack>
              </Box>

              {/* Verify Form */}
              <VerifyForm />

              {/* Back to Login */}
              <Stack direction="row" spacing={0.5} justifyContent="center">
                <Typography variant="body2" color="text.secondary">
                  Remember your password?
                </Typography>
                <Link 
                  to="/auth/login" 
                  component={RouterLink} 
                  variant="subtitle2"
                  sx={{
                    color: theme.palette.primary.main,
                    textDecoration: "none",
                    fontWeight: 600,
                    position: "relative",
                    "&:hover": {
                      "&::after": {
                        width: "100%",
                      },
                    },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: -2,
                      left: 0,
                      width: 0,
                      height: 2,
                      background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                      transition: "width 0.3s ease",
                    },
                  }}
                >
                  Back to Login
                </Link>
              </Stack>
            </Stack>
          </CardContent>
        </AuthCard>
      </Box>
    </Box>
  );
};

export default Verify;