import axios from 'axios';
import toast from 'react-hot-toast';

// Create axios instance with base URL
const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.detail || 'An error occurred. Please try again.';
    toast.error(message);
    return Promise.reject(error);
  }
);

/**
 * Fetch settings with optional filters
 * @param {Object} filters - Optional filters to apply
 * @returns {Promise<Object>} - The settings data
 */
export const fetchSettings = async (filters = {}) => {
  try {
    // Convert filters to query parameters
    const params = {};
    
    if (filters.fridge_id) {
      params.fridge_id = filters.fridge_id;
    }
    
    if (filters.instrument_name) {
      params.instrument_name = filters.instrument_name;
    }
    
    if (filters.parameter_name) {
      params.parameter_name = filters.parameter_name;
    }
    
    if (filters.min_value !== undefined) {
      params.min_value = filters.min_value;
    }
    
    if (filters.max_value !== undefined) {
      params.max_value = filters.max_value;
    }
    
    const response = await api.get('/settings', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching settings:', error);
    throw error;
  }
};

/**
 * Fetch statistics about the settings data
 * @returns {Promise<Object>} - The statistics data
 */
export const fetchStats = async () => {
  try {
    const response = await api.get('/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching stats:', error);
    throw error;
  }
};

export default api; 