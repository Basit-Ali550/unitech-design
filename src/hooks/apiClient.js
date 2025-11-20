// src/lib/apiClient.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.unitec.run.place';

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await fetch(`${API_BASE_URL}/api/v1/auth/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!response.ok) {
      throw new Error('Token refresh failed');
    }

    const data = await response.json();
    
    // Store new tokens
    localStorage.setItem('access_token', data.tokens.access_token);
    localStorage.setItem('refresh_token', data.tokens.refresh_token);
    
    return data.tokens.access_token;
  } catch (error) {
    // Clear all tokens and redirect to login
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    
    // Redirect to login page
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    
    throw new Error('Session expired. Please login again.');
  }
};

const apiClient = async (endpoint, { body, method = 'GET', headers = {}, retry = true } = {}) => {
  // Get current token
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;

  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  };

  if (body && method !== 'GET' && method !== 'HEAD') {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    // If token is expired, try to refresh it
    if (response.status === 401 && retry) {
      if (isRefreshing) {
        // If already refreshing, add to queue
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          // Retry the original request with new token
          return apiClient(endpoint, { 
            body, 
            method, 
            headers: {
              ...headers,
              Authorization: `Bearer ${token}`
            }, 
            retry: false 
          });
        });
      }

      isRefreshing = true;

      try {
        const newToken = await refreshToken();
        isRefreshing = false;
        processQueue(null, newToken);

        // Retry the original request with new token
        return apiClient(endpoint, { 
          body, 
          method, 
          headers: {
            ...headers,
            Authorization: `Bearer ${newToken}`
          }, 
          retry: false 
        });
      } catch (refreshError) {
        isRefreshing = false;
        processQueue(refreshError, null);
        throw refreshError;
      }
    }

    // Handle other error responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      // If still unauthorized after refresh attempt, logout user
      if (response.status === 401) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
      
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    // Network errors or other fetch failures
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      throw new Error('Network error. Please check your connection.');
    }
    throw error;
  }
};

export default apiClient;