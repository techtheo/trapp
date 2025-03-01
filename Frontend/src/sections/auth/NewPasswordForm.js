import React, { useEffect, useState } from "react";
// import { Link as RouterLink } from "react-router-dom";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../../components/hook-form/FormProvider";
import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  // Link,
  Stack,
  CircularProgress,
} from "@mui/material";
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
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const NewPasswordSchema = Yup.object().shape({
    newPassword: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#£])[A-Za-z\d@$!%*?&#£]{8,}$/,
        "Password should contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long"
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
    formState: { errors },
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
        message: error.message || "Failed to set new password",
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
      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <SlideInAlert severity="error" message={errors.afterSubmit.message} onClose={handleErrorAlertClose} />
        )}


        <RHFTextField
          name="newPassword"
          label="New Password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? <Eye /> : <EyeSlash />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
                <RHFTextField
          name="confirmPassword"
          label="Comfirm Password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    setShowPassword(!showPassword);
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
        disabled={isLoading}
        sx={{
          bgcolor: "text.primary",
          color: (theme) =>
            theme.palette.mode === "light" ? "common.white" : "grey.800",
          "&:hover": {
            bgcolor: "text.primary",
            color: (theme) =>
              theme.palette.mode === "light" ? "common.white" : "grey.800",
          },
        }}
      >
        {isLoading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Set new Password"
        )}
      </Button>
      
      </Stack>
      

      {successAlert && (
        <SlideInAlert
          severity="success"
          message="New password set  successfully 😎🎉"
          onClose={() => setSuccessAlert(false)}
        />
      )}
      {errorAlert && (
        <SlideInAlert
          severity="error"
          message="couldn't set new password . Please try again."
          onClose={handleErrorAlertClose}
        />
      )}
    </FormProvider>
  );
};

export default NewPasswordForm;
