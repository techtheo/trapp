import { createSlice } from "@reduxjs/toolkit";

import axios from "../../utils/axios";
import { showSnackbar } from "./app";
import { setSession } from "../../utils/jwt";

// ----------------------------------------------------------------------

const initialState = {
  isLoggedIn: false,
  token: "",
  isLoading: false,
  user: null,
  user_id: null,
  email: "",
  error: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateIsLoading(state, action) {
      state.error = action.payload.error;
      state.isLoading = action.payload.isLoading;
    },
    logIn(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
      state.user_id = action.payload.user_id;
    },
    signOut(state, action) {
      state.isLoggedIn = false;
      state.token = "";
      state.user_id = null;
    },
    updateRegisterEmail(state, action) {
      state.email = action.payload.email;
      // Persist email to localStorage for resend functionality
      if (action.payload.email) {
        window.localStorage.setItem("verification_email", action.payload.email);
      } else {
        window.localStorage.removeItem("verification_email");
      }
    },
  },
});

// Reducer
export default slice.reducer;

// Action creators
export const updateRegisterEmail = (email) => (dispatch) => {
  dispatch(slice.actions.updateRegisterEmail({ email }));
};

export function NewPassword(formValues) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));

    await axios
      .post(
        "/auth/reset-password",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response);
        
        // Set the JWT token in axios headers and localStorage
        setSession(response.data.token);
        
        dispatch(
            slice.actions.logIn({
              isLoggedIn: true,
              token: response.data.token,
            })
          );
        dispatch(
          showSnackbar({ severity: "success", message: response.data.message })
        );
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: false })
        );
      })
      .catch(function (error) {
        console.log(error);
        const errorMessage = error.response?.data?.message || error.message || "Password reset failed";
        dispatch(showSnackbar({ severity: "error", message: errorMessage }));
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: true })
        );
      });
  };
}

export function ForgotPassword(formValues) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));

    await axios
      .post(
        "/auth/forgot-password",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response);

        dispatch(
          showSnackbar({ severity: "success", message: response.data.message })
        );
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: false })
        );
      })
      .catch(function (error) {
        console.log(error);
        const errorMessage = error.response?.data?.message || error.message || "Forgot password failed";
        dispatch(showSnackbar({ severity: "error", message: errorMessage }));
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: true })
        );
      });
  };
}

export function LoginUser(formValues) {
  return async (dispatch, getState) => {
    // Make API call here

    dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));

    await axios
      .post(
        "/auth/login",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response);
        
        // Set the JWT token in axios headers and localStorage
        setSession(response.data.token);
        
        dispatch(
          slice.actions.logIn({
            isLoggedIn: true,
            token: response.data.token,
            user_id: response.data.user_id,
          })
        );
        window.localStorage.setItem("user_id", response.data.user_id);
        dispatch(
          showSnackbar({ severity: "success", message: response.data.message })
        );
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: false })
        );
      })
      .catch(function (error) {
        console.log(error);
        
        const errorData = error.response?.data;
        const errorMessage = errorData?.message || error.message || "Login failed";
        
        // Check if user needs verification
        if (errorData?.requiresVerification) {
          // Store email for verification
          dispatch(
            slice.actions.updateRegisterEmail({ email: errorData.email })
          );
          
          dispatch(
            showSnackbar({ 
              severity: "warning", 
              message: errorMessage 
            })
          );
          
          dispatch(
            slice.actions.updateIsLoading({ isLoading: false, error: false })
          );
          
          // Redirect to verify page
          setTimeout(() => {
            window.location.href = "/auth/verify";
          }, 2000);
        } else {
          dispatch(showSnackbar({ severity: "error", message: errorMessage }));
          dispatch(
            slice.actions.updateIsLoading({ isLoading: false, error: true })
          );
        }
      });
  };
}

export function LogoutUser() {
  return async (dispatch, getState) => {
    try {
      // Get current token from localStorage for the logout API call
      const token = localStorage.getItem('accessToken');
      
      // Call backend logout endpoint to blacklist the token
      if (token) {
        try {
          await axios.post("/auth/logout", {}, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
        } catch (apiError) {
          console.warn("Backend logout failed, proceeding with frontend cleanup:", apiError.message);
        }
      }
      
      // Clear JWT session (removes token from localStorage and axios headers)
      setSession(null);
      
      // Clear all user-related data from localStorage
      window.localStorage.removeItem("user_id");
      window.localStorage.removeItem("verification_email");
      
      // Dispatch the signOut action to clear Redux state
      dispatch(slice.actions.signOut());
      
      // Show success message
      dispatch(
        showSnackbar({ 
          severity: "success", 
          message: "Logged out successfully!" 
        })
      );
      
      // Redirect to login page after a short delay
      setTimeout(() => {
        window.location.href = "/auth/login";
      }, 1000);
      
    } catch (error) {
      console.error("Logout error:", error);
      // Even if there's an error, still clear local data and redirect
      setSession(null);
      window.localStorage.clear();
      dispatch(slice.actions.signOut());
      window.location.href = "/auth/login";
    }
  };
}

export function RegisterUser(formValues) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));

    await axios
      .post(
        "/auth/register",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response);
        dispatch(
          slice.actions.updateRegisterEmail({ email: formValues.email })
        );

        dispatch(
          showSnackbar({ severity: "success", message: response.data.message })
        );
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: false })
        );
      })
      .catch(function (error) {
        console.log(error);
        const errorMessage = error.response?.data?.message || error.message || "Registration failed";
        dispatch(showSnackbar({ severity: "error", message: errorMessage }));
        dispatch(
          slice.actions.updateIsLoading({ error: true, isLoading: false })
        );
      })
      .finally(() => {
        if (!getState().auth.error) {
          window.location.href = "/auth/verify";
        }
      });
  };
}

export function VerifyEmail(formValues) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));

    await axios
      .post(
        "/auth/verify",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response);
        
        // Clear the verification email from storage
        dispatch(slice.actions.updateRegisterEmail({ email: "" }));
        
        // Log the user in directly with the token from verification
        if (response.data.token && response.data.user_id) {
          // Set the JWT token in axios headers and localStorage
          setSession(response.data.token);
          
          dispatch(
            slice.actions.logIn({
              isLoggedIn: true,
              token: response.data.token,
              user_id: response.data.user_id,
            })
          );
          window.localStorage.setItem("user_id", response.data.user_id);
          
          dispatch(
            showSnackbar({ severity: "success", message: response.data.message || "Email verified successfully! Welcome!" })
          );
          
          // Redirect to dashboard/main app
          setTimeout(() => {
            window.location.href = "/app";
          }, 1500);
        } else {
          // Fallback to login page if no token provided
          dispatch(
            showSnackbar({ severity: "success", message: "Email verified successfully! Please login." })
          );
          setTimeout(() => {
            window.location.href = "/auth/login";
          }, 1500);
        }
        
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: false })
        );
      })
      .catch(function (error) {
        console.log(error);
        const errorMessage = error.response?.data?.message || error.message || "Email verification failed";
        dispatch(showSnackbar({ severity: "error", message: errorMessage }));
        dispatch(
          slice.actions.updateIsLoading({ error: true, isLoading: false })
        );
      });
  };
}
