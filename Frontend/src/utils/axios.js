import axios from 'axios';
// config
import { BASE_URL } from '../config';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: BASE_URL });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Preserve the original error structure while adding the response data
    if (error.response && error.response.data) {
      // Create a new error object that maintains the original structure
      const enhancedError = new Error(error.response.data.message || error.message || 'Something went wrong');
      enhancedError.response = error.response;
      enhancedError.status = error.response.status;
      enhancedError.data = error.response.data;
      return Promise.reject(enhancedError);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
