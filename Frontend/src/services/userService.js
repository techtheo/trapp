import axios from '../utils/axios';

// User API service
class UserService {
  // Get current user profile
  static async getMe() {
    try {
      const response = await axios.get('/user/get-me');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Update user profile
  static async updateProfile(profileData) {
    try {
      const response = await axios.patch('/user/update-me', profileData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Upload avatar image
  static async uploadAvatar(file) {
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      
      const response = await axios.post('/media/upload-avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Change password
  static async changePassword(passwordData) {
    try {
      const response = await axios.patch('/auth/change-password', passwordData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get all users (for search/discovery)
  static async getAllUsers() {
    try {
      const response = await axios.get('/user/get-users');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get friends list
  static async getFriends() {
    try {
      const response = await axios.get('/user/get-friends');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get friend requests
  static async getFriendRequests() {
    try {
      const response = await axios.get('/user/get-requests');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;