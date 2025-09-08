import jwtDecode from 'jwt-decode';
// routes
import { PATH_AUTH } from '../routes/paths';
//
import axios from './axios';

// ----------------------------------------------------------------------

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }
  
  try {
    const decoded = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return false;
  }
};

const handleTokenExpired = (exp) => {
  let expiredTimer;

  const currentTime = Date.now();
  const timeLeft = exp * 1000 - currentTime;

  console.log('Token expiration setup:', {
    exp,
    currentTime,
    timeLeft,
    expirationDate: new Date(exp * 1000),
    currentDate: new Date(currentTime)
  });

  clearTimeout(expiredTimer);

  // Only set timer if token hasn't already expired
  if (timeLeft > 0) {
    expiredTimer = setTimeout(() => {
      console.log('Token has expired, redirecting to login');
      // eslint-disable-next-line no-alert
      alert('Token expired');

      localStorage.removeItem('accessToken');

      window.location.href = PATH_AUTH.login;
    }, timeLeft);
  } else {
    console.log('Token already expired, redirecting immediately');
    // Token already expired
    localStorage.removeItem('accessToken');
    window.location.href = PATH_AUTH.login;
  }
};

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    // This function below will handle when token is expired
    try {
      const { exp } = jwtDecode(accessToken); // ~3 days by codingmonks server
      handleTokenExpired(exp);
    } catch (error) {
      console.error('Error setting up token expiration handler:', error);
    }
  } else {
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

// Utility function to clear all authentication data
const clearAuthData = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('user_id');
  localStorage.removeItem('verification_email');
  delete axios.defaults.headers.common.Authorization;
  console.log('All authentication data cleared');
};

export { isValidToken, setSession, clearAuthData };
