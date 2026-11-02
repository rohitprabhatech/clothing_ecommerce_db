import axios from 'axios';

/**
 * Primary Axios HTTP Client
 * Configured with environment-driven base URL, standard timeouts,
 * request token injection, and centralized response error handling.
 */

// Read base URL exclusively from Vite environment variable
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

/**
 * Request Interceptor
 * Dynamically attach JWT bearer token if present in localStorage.
 */
apiClient.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem('auth_token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch {
      // LocalStorage access might fail in restricted environments
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * Standardize error payloads and intercept common HTTP error statuses (e.g. 401).
 */
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const errorPayload = {
      status: error.response?.status || 500,
      code: error.response?.data?.code || 'NETWORK_ERROR',
      message:
        error.response?.data?.message ||
        error.message ||
        'An unexpected network error occurred.',
      details: error.response?.data?.details || null,
    };

    // Centralized 401 Unauthorized handling preparation
    if (error.response?.status === 401) {
      try {
        localStorage.removeItem('auth_token');
      } catch {
        // Ignore storage removal errors
      }
    }

    return Promise.reject(errorPayload);
  }
);

export default apiClient;

