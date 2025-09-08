import React, { useState, useEffect } from "react";
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
import { RegisterUser } from "../../redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#£])[A-Za-z\d@$!%*?&#£]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long"
      ),
    confirmPassword: Yup.string()
      .required("Password must match")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
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
      if (data.password !== data.confirmPassword) {
        setError("confirmPassword", {
          type: "manual",
          message: "Passwords do not match",
        });
        return;
      }

      // Clear password field errors
      methods.clearErrors("password");

      // Remove confirmPassword from data before sending to backend
      const { confirmPassword, ...registrationData } = data;
      
      // Dispatch the RegisterUser action
      await dispatch(RegisterUser(registrationData));
    } catch (error) {
      console.log(error);
      setError("afterSubmit", {
        ...error,
        message: error.message,
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <RHFTextField
            name="firstName"
            label="First Name"
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
          <RHFTextField
            name="lastName"
            label="Last Name"
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />
        </Stack>

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
          disabled={isSubmitting || isLoading}
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
          {isSubmitting || isLoading ? "Creating Account..." : "Create Account"}
        </Button>
      </Stack>
    </FormProvider>
  );
};

export default RegisterForm;