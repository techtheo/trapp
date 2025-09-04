import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../../components/hook-form/FormProvider";
import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
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

const NewPasswordForm = () => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const NewPasswordSchema = Yup.object().shape({
    newPassword: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#£])[A-Za-z\d@$!%*?&#£]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long"
      ),
    confirmPassword: Yup.string()
      .required("Password must match")
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
  });

  const defaultValues = {
    newPassword: "",
    confirmPassword: "",
  };

  const methods = useForm({
    resolver: yupResolver(NewPasswordSchema),
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
      // Check if passwords match
      if (data.newPassword !== data.confirmPassword) {
        setError("confirmPassword", {
          type: "manual",
          message: "Passwords do not match",
        });
        return;
      }

      // Clear password field errors
      methods.clearErrors("newPassword");

      // Submit data to backend (placeholder)
      console.log(data);

      // Simulate successful password reset
      reset();
      setPasswordSuccess(true);
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
    setPasswordSuccess(false);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {passwordSuccess && (
          <SlideInAlert
            severity="success"
            message="Password reset successfully 😎✅!"
            onClose={handleAlertClose}
          />
        )}

        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}

        <RHFTextField
          name="newPassword"
          label="New Password"
          type={showPassword ? "text" : "password"}
          error={!!errors.newPassword}
          helperText={errors.newPassword?.message}
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

        <RHFTextField
          name="confirmPassword"
          label="Confirm Password"
          type={showPassword ? "text" : "password"}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    setShowPassword(!showPassword);
                    methods.setValue("confirmPassword", ""); // Clear confirmPassword field
                  }}
                >
                  {showPassword ? <Eye /> : <EyeSlash />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

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
          {isSubmitting ? "Setting Password..." : "Set New Password"}
        </Button>
      </Stack>
    </FormProvider>
  );
};

export default NewPasswordForm;
