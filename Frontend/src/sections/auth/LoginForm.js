import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../../components/hook-form/FormProvider";
import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import { useTheme, styled, alpha } from "@mui/material/styles";
import { RHFTextField } from "../../components/hook-form";
import { Eye, EyeSlash, Envelope, Lock, CheckCircle } from "phosphor-react";

const SlideInAlert = ({ severity, message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 2000); // 2000 milliseconds = 2 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  return (
    <Alert
      severity={severity}
      sx={{
        position: "fixed",
        top: "50px", // Adjust as needed
        right: isVisible ? "10px" : "-100%", // Slide in from the right or hide off-screen
        zIndex: 9999, // Ensure it's above other content
        transition: "right 0.3s ease-out", // Slide in animation
        backgroundColor:
          severity === "error" ? "#FBE3E3" : "#E3FBE3", // Background color based on severity
        color: severity === "error" ? "#B50A0A" : "#0A470A", // Text color based on severity
      }}
      onClose={handleClose}
      variant="filled"
    >
      {message}
    </Alert>
  );
};

// Styled components for fancy form
const FancyTextField = styled(RHFTextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 16,
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    background: theme.palette.mode === "light" 
      ? alpha(theme.palette.background.paper, 0.8)
      : alpha(theme.palette.background.paper, 0.4),
    backdropFilter: "blur(10px)",
    
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: theme.palette.mode === "light"
        ? "0 8px 24px rgba(0, 0, 0, 0.08)"
        : "0 8px 24px rgba(0, 0, 0, 0.3)",
    },
    
    "&.Mui-focused": {
      transform: "translateY(-2px)",
      boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.15)}`,
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.primary.main,
        borderWidth: 2,
      },
    },
  },
  
  "& .MuiInputLabel-root": {
    fontWeight: 500,
    "&.Mui-focused": {
      color: theme.palette.primary.main,
    },
  },
}));

const FancyButton = styled(Button)(({ theme }) => ({
  borderRadius: 16,
  padding: "16px 24px",
  fontSize: "1rem",
  fontWeight: 600,
  textTransform: "none",
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.3)}`,
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  position: "relative",
  overflow: "hidden",
  
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: `0 12px 32px ${alpha(theme.palette.primary.main, 0.4)}`,
    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
  },
  
  "&:active": {
    transform: "translateY(0px)",
  },
  
  "&:disabled": {
    background: alpha(theme.palette.action.disabled, 0.12),
    color: theme.palette.action.disabled,
    boxShadow: "none",
    transform: "none",
  },
  
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background: `linear-gradient(90deg, transparent, ${alpha(
      theme.palette.common.white,
      0.2
    )}, transparent)`,
    transition: "left 0.5s",
  },
  
  "&:hover::before": {
    left: "100%",
  },
}));

const FancyLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: "none",
  fontWeight: 500,
  position: "relative",
  transition: "all 0.3s ease",
  
  "&:hover": {
    color: theme.palette.primary.dark,
    transform: "translateY(-1px)",
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
  
  "&:hover::after": {
    width: "100%",
  },
}));

const LoginForm = () => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#£])[A-Za-z\d@$!%*?&#£]{8,}$/,
        "Password should contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long"
      ),
  });

  const defaultValues = {
    email: "",
    password: "",
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);

      // Simulate validation errors (remove this block in real implementation)
      // if (data.email !== "demo@trapp.com" || data.password !== "Password123!") {
      //   throw new Error("Invalid credentials");
      // }

      // Submit data to backend (placeholder)
      console.log(data);

      // Simulate successful login
      reset();
      setSuccessAlert(true);
    } catch (error) {
      console.log(error);
      reset();
      setError("afterSubmit", {
        message: error.message || "Failed to log in",
      });
      setErrorAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  const handleErrorAlertClose = () => {
    setErrorAlert(false);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        {!!errors.afterSubmit && (
          <SlideInAlert severity="error" message={errors.afterSubmit.message} onClose={handleErrorAlertClose} />
        )}

        <FancyTextField 
          name="email" 
          label="Email address"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Envelope size={20} color={theme.palette.text.secondary} />
              </InputAdornment>
            ),
          }}
        />

        <FancyTextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock size={20} color={theme.palette.text.secondary} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  sx={{
                    color: theme.palette.text.secondary,
                    "&:hover": {
                      color: theme.palette.primary.main,
                      background: alpha(theme.palette.primary.main, 0.08),
                    },
                  }}
                >
                  {showPassword ? <Eye size={20} /> : <EyeSlash size={20} />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Stack alignItems="flex-end" sx={{ mt: 1 }}>
          <FancyLink
            component={RouterLink}
            to="/auth/reset-password"
            variant="body2"
          >
            Forgot Password?
          </FancyLink>
        </Stack>

        <FancyButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          disabled={isLoading}
          startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <CheckCircle size={20} />}
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </FancyButton>
      </Stack>

      {successAlert && (
        <SlideInAlert
          severity="success"
          message="Login successful 😎🎉"
          onClose={() => setSuccessAlert(false)}
        />
      )}
      {errorAlert && (
        <SlideInAlert
          severity="error"
          message="Invalid email or password. Please try again."
          onClose={handleErrorAlertClose}
        />
      )}
    </FormProvider>
  );
};

export default LoginForm;
