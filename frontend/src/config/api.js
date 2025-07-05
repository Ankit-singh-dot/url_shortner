// API Configuration
export const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:6969';

// API Endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  SIGNUP: `${API_BASE_URL}/api/auth/signup`,
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  GET_ME: `${API_BASE_URL}/api/auth/me`,
  
  // URL endpoints
  CREATE_URL: `${API_BASE_URL}/api/url/`,
  GET_MY_URLS: `${API_BASE_URL}/api/url/me`,
  REDIRECT_URL: (shortCode) => `${API_BASE_URL}/api/url/${shortCode}`,
};

// Axios configuration
export const axiosConfig = {
  withCredentials: true,
  baseURL: API_BASE_URL,
}; 