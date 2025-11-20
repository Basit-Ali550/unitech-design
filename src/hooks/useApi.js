// hooks/useApi.js
import { useState, useEffect, useCallback } from 'react';
import apiClient from '../lib/apiClient';

const useApi = (endpoint, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const {
    method = 'GET',
    body = null,
    headers = {},
    autoFetch = true,
    onSuccess = null,
    onError = null
  } = options;

  // Main execute function
  const execute = useCallback(async (executionBody = body, executionOptions = {}) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await apiClient(endpoint, {
        method,
        body: executionBody,
        headers: {
          ...headers,
          ...executionOptions.headers
        },
        ...executionOptions
      });

      setData(result);
      setSuccess(true);
      
      // Call success callback if provided
      if (onSuccess) {
        onSuccess(result);
      }

      return { data: result, success: true, error: null };
    } catch (err) {
      const errorObj = {
        message: err.message,
        status: err.status,
        data: err.data
      };
      
      setError(errorObj);
      setSuccess(false);
      
      // Call error callback if provided
      if (onError) {
        onError(errorObj);
      }

      return { data: null, success: false, error: errorObj };
    } finally {
      setLoading(false);
    }
  }, [endpoint, method, body, headers, onSuccess, onError]);

  // Auto fetch on mount if enabled
  useEffect(() => {
    if (autoFetch && method === 'GET') {
      execute();
    }
  }, [autoFetch, method, execute]);

  // Reset function
  const reset = useCallback(() => {
    setData(null);
    setLoading(false);
    setError(null);
    setSuccess(false);
  }, []);

  return {
    data,
    loading,
    error,
    success,
    execute,
    reset
  };
};

export default useApi;



// // hooks/useApiMethods.js
// import useApi from './useApi';

// // GET hook
// export const useGet = (endpoint, options = {}) => {
//   return useApi(endpoint, { method: 'GET', ...options });
// };

// // POST hook
// export const usePost = (endpoint, options = {}) => {
//   return useApi(endpoint, { method: 'POST', ...options });
// };

// // PUT hook
// export const usePut = (endpoint, options = {}) => {
//   return useApi(endpoint, { method: 'PUT', ...options });
// };

// // PATCH hook
// export const usePatch = (endpoint, options = {}) => {
//   return useApi(endpoint, { method: 'PATCH', ...options });
// };

// // DELETE hook
// export const useDelete = (endpoint, options = {}) => {
//   return useApi(endpoint, { method: 'DELETE', ...options });
// };