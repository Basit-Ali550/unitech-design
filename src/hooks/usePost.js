// src/hooks/usePost.js
import { useState } from "react";
import apiClient from "../lib/apiClient";

const usePost = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = async (payload = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient(endpoint, {
        method: "POST",
        body: payload,
      });

      setData(response);
      return response;
    } catch (err) {
      setError(err.message || "Something went wrong");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, postData };
};

export default usePost;
