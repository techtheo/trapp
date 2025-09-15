import { createSlice } from "@reduxjs/toolkit";
import UserService from "../../services/userService";
import { showSnackbar } from "./app";

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  user: null,
  isUpdating: false,
  isUploadingAvatar: false,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Loading states
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setUpdating(state, action) {
      state.isUpdating = action.payload;
    },
    setUploadingAvatar(state, action) {
      state.isUploadingAvatar = action.payload;
    },
    
    // User data
    setUser(state, action) {
      state.user = action.payload;
      state.error = null;
    },
    updateUserField(state, action) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    
    // Error handling
    setError(state, action) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { setUser, updateUserField, clearError } = slice.actions;

// Async actions
export const fetchUserProfile = () => async (dispatch) => {
  try {
    dispatch(slice.actions.setLoading(true));
    dispatch(slice.actions.clearError());
    
    const response = await UserService.getMe();
    
    if (response.status === "success") {
      dispatch(slice.actions.setUser(response.data));
    } else {
      throw new Error(response.message || "Failed to fetch user profile");
    }
  } catch (error) {
    console.error("Fetch user profile error:", error);
    const errorMessage = error.response?.data?.message || error.message || "Failed to fetch user profile";
    dispatch(slice.actions.setError(errorMessage));
    dispatch(showSnackbar({ severity: "error", message: errorMessage }));
  } finally {
    dispatch(slice.actions.setLoading(false));
  }
};

export const updateUserProfile = (profileData) => async (dispatch) => {
  try {
    dispatch(slice.actions.setUpdating(true));
    dispatch(slice.actions.clearError());
    
    const response = await UserService.updateProfile(profileData);
    
    if (response.status === "success") {
      dispatch(slice.actions.setUser(response.data));
      dispatch(showSnackbar({ 
        severity: "success", 
        message: response.message || "Profile updated successfully!" 
      }));
      return response.data;
    } else {
      throw new Error(response.message || "Failed to update profile");
    }
  } catch (error) {
    console.error("Update profile error:", error);
    const errorMessage = error.response?.data?.message || error.message || "Failed to update profile";
    dispatch(slice.actions.setError(errorMessage));
    dispatch(showSnackbar({ severity: "error", message: errorMessage }));
    throw error;
  } finally {
    dispatch(slice.actions.setUpdating(false));
  }
};

export const uploadAvatar = (file) => async (dispatch) => {
  try {
    dispatch(slice.actions.setUploadingAvatar(true));
    dispatch(slice.actions.clearError());
    
    const response = await UserService.uploadAvatar(file);
    
    if (response.status === "success") {
      // Update the entire user object with the updated user from backend
      dispatch(slice.actions.setUser(response.data.user));
      dispatch(showSnackbar({ 
        severity: "success", 
        message: response.message || "Avatar uploaded successfully!" 
      }));
      return response.data;
    } else {
      throw new Error(response.message || "Failed to upload avatar");
    }
  } catch (error) {
    console.error("Upload avatar error:", error);
    const errorMessage = error.response?.data?.message || error.message || "Failed to upload avatar";
    dispatch(slice.actions.setError(errorMessage));
    dispatch(showSnackbar({ severity: "error", message: errorMessage }));
    throw error;
  } finally {
    dispatch(slice.actions.setUploadingAvatar(false));
  }
};

export const changePassword = (passwordData) => async (dispatch) => {
  try {
    dispatch(slice.actions.setLoading(true));
    dispatch(slice.actions.clearError());
    
    const response = await UserService.changePassword(passwordData);
    
    if (response.status === "success") {
      dispatch(showSnackbar({ 
        severity: "success", 
        message: response.message || "Password changed successfully!" 
      }));
      return response;
    } else {
      throw new Error(response.message || "Failed to change password");
    }
  } catch (error) {
    console.error("Change password error:", error);
    const errorMessage = error.response?.data?.message || error.message || "Failed to change password";
    dispatch(slice.actions.setError(errorMessage));
    dispatch(showSnackbar({ severity: "error", message: errorMessage }));
    throw error;
  } finally {
    dispatch(slice.actions.setLoading(false));
  }
};