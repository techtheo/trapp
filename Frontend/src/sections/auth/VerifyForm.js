import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../../components/hook-form/FormProvider";
import {
  Alert,
  Button,
  Stack,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { RHFTextField } from "../../components/hook-form";
import { VerifyEmail } from "../../redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../utils/axios";
import { showSnackbar } from "../../redux/slices/app";
import { updateRegisterEmail } from "../../redux/slices/auth";

const VerifyForm = () => {
  const dispatch = useDispatch();
  const { email: reduxEmail } = useSelector((state) => state.auth);
  const theme = useTheme();
  const [isResending, setIsResending] = useState(false);

  // Get email from Redux state or localStorage
  const email = reduxEmail || window.localStorage.getItem("verification_email");

  // Update Redux state if email exists in localStorage but not in Redux
  useEffect(() => {
    if (!reduxEmail && email) {
      dispatch(updateRegisterEmail(email));
    }
  }, [reduxEmail, email, dispatch]);

  // Listen for resend OTP event
  useEffect(() => {
    const handleResendOTP = async () => {
      if (!email) {
        dispatch(showSnackbar({ 
          severity: "error", 
          message: "Email not found. Please register again." 
        }));
        return;
      }

      setIsResending(true);
      try {
        const response = await axios.post("/auth/resend-otp", { email });
        dispatch(showSnackbar({ 
          severity: "success", 
          message: response.data?.message || "OTP resent successfully! Check your email." 
        }));
      } catch (error) {
        console.error("Resend OTP error:", error);
        const errorMessage = error.response?.data?.message || error.message || "Failed to resend OTP";
        dispatch(showSnackbar({ 
          severity: "error", 
          message: typeof errorMessage === 'string' ? errorMessage : "Failed to resend OTP" 
        }));
      } finally {
        setIsResending(false);
      }
    };

    // Dispatch resending state to parent component
    const handleResendStart = () => {
      window.dispatchEvent(new CustomEvent('resendStart'));
    };

    const handleResendEnd = () => {
      window.dispatchEvent(new CustomEvent('resendEnd'));
    };

    window.addEventListener('resendOTP', handleResendOTP);
    
    // Listen for resending state changes
    if (isResending) {
      handleResendStart();
    } else {
      handleResendEnd();
    }

    return () => {
      window.removeEventListener('resendOTP', handleResendOTP);
    };
  }, [email, dispatch, isResending]);

  const VerifySchema = Yup.object().shape({
    otp: Yup.string()
      .required("OTP is required")
      .length(6, "OTP must be exactly 6 digits")
      .matches(/^\d+$/, "OTP must contain only numbers"),
  });

  const defaultValues = {
    otp: "",
  };

  const methods = useForm({
    resolver: yupResolver(VerifySchema),
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
      // Dispatch the VerifyEmail action with email from Redux state and OTP from form
      await dispatch(VerifyEmail({
        email: email,
        otp: data.otp
      }));
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
        {!!errors.afterSubmit && errors.afterSubmit.message && (
          <Alert severity="error">{String(errors.afterSubmit.message)}</Alert>
        )}

        <RHFTextField
          name="otp"
          label="Enter 6-digit OTP"
          placeholder="123456"
          error={!!errors.otp}
          helperText={errors.otp?.message}
          inputProps={{
            maxLength: 6,
            style: { textAlign: 'center', fontSize: '1.2rem', letterSpacing: '0.5rem' }
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
          {isSubmitting ? "Verifying..." : "Verify Email"}
        </Button>
      </Stack>
    </FormProvider>
  );
};

export default VerifyForm;