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
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { RHFTextField } from "../../components/hook-form";
import { Eye, EyeSlash } from "phosphor-react";

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
        transition: "right 0.3s ease-out",
        backgroundColor: severity === "error" ? "#FBE3E3" : "#E3FBE3", // Background color based on severity
        color: severity === "error" ? "#B50A0A" : "#0A470A", // Text color based on severity
      }}
      onClose={handleClose}
      variant="filled"
    >
      {message}
    </Alert>
  );
};

const LoginForm = () => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#£])[A-Za-z\d@$!%*?&#£]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long"
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
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      // Submit data to backend (placeholder)
      console.log(data);

      // Simulate successful login
      reset();
      setLoginSuccess(true);
    } catch (error) {
      console.log(error);
      reset();
      setError("afterSubmit", {
        ...error,
        message: error.message,
      });
    }
  };

  const handleAlertClose = () => {
    setLoginSuccess(false);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {loginSuccess && (
          <SlideInAlert
            severity="success"
            message="Login trapped successfully 😎✅!"
            onClose={handleAlertClose}
          />
        )}

        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}

        <RHFTextField
          name="email"
          label="Email"
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          error={!!errors.password}
          helperText={errors.password?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <Eye /> : <EyeSlash />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Stack alignItems="flex-end" sx={{ my: 2 }}>
          <Link
            component={RouterLink}
            to="/auth/reset-password"
            variant="body2"
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
            Forgot Password?
          </Link>
        </Stack>

        <Button
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          sx={{
            borderRadius: 3,
            padding: "16px 24px",
            fontSize: "1rem",
            fontWeight: 600,
            textTransform: "none",
            position: "relative",
            overflow: "hidden",
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            boxShadow: `0 8px 24px ${theme.palette.primary.main}40`,
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: `0 12px 32px ${theme.palette.primary.main}60`,
              background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
            },
            
            "&:active": {
              transform: "translateY(0px)",
              boxShadow: `0 4px 16px ${theme.palette.primary.main}40`,
            },
            
            "&:disabled": {
              background: theme.palette.action.disabledBackground,
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
              background: `linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)`,
              transition: "left 0.6s",
            },
            
            "&:hover::before": {
              left: "100%",
            },
            
            "&::after": {
              content: '""',
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 0,
              height: 0,
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.1)",
              transform: "translate(-50%, -50%)",
              transition: "width 0.6s, height 0.6s",
            },
            
            "&:active::after": {
              width: "300px",
              height: "300px",
            },
          }}
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </Button>
      </Stack>
    </FormProvider>
  );
};

export default LoginForm;
