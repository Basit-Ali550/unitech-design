// src/lib/apiClient.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.unitec.run.place';

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    error ? prom.reject(error) : prom.resolve(token);
  });
  failedQueue = [];
};

const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) throw new Error('No refresh token');

    const response = await fetch(`${API_BASE_URL}/api/v1/auth/refresh-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!response.ok) throw new Error('Refresh failed');

    const data = await response.json();
    localStorage.setItem('access_token', data.tokens.access_token);
    localStorage.setItem('refresh_token', data.tokens.refresh_token);

    return data.tokens.access_token;
  } catch (error) {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    throw error;
  }
};

const apiClient = async (endpoint, { body, method = 'GET', headers = {}, retry = true } = {}) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;

  const isFormData = body instanceof FormData;

  const config = {
    method,
    headers: {
      // Don't set Content-Type for FormData — browser sets it with boundary
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...headers,
    },
  };

  if (body) {
    config.body = isFormData ? body : JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (response.status === 401 && retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(newToken => {
          config.headers.Authorization = `Bearer ${newToken}`;
          return fetch(`${API_BASE_URL}${endpoint}`, config).then(r => r.json());
        });
      }

      isRefreshing = true;
      try {
        const newToken = await refreshToken();
        isRefreshing = false;
        processQueue(null, newToken);

        config.headers.Authorization = `Bearer ${newToken}`;
        const retryResponse = await fetch(`${API_BASE_URL}${endpoint}`, config);
        return await retryResponse.json();
      } catch (err) {
        isRefreshing = false;
        processQueue(err, null);
        throw err;
      }
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      throw new Error('Network error. Please check your connection.');
    }
    throw error;
  }
};

export default apiClient;