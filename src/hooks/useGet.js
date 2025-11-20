// src/hooks/useGet.js
import { useEffect, useState } from "react";
import apiClient from "./apiClient";

const useGet = (endpoint, query = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      let url = endpoint;

      // Handle query params
      if (Object.keys(query).length > 0) {
        const params = new URLSearchParams(query).toString();
        url = `${endpoint}?${params}`;
      }

      const res = await apiClient(url, { method: "GET" });
      setData(res);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint, JSON.stringify(query)]);

  return { data, loading, error, refetch: fetchData };
};

export default useGet;
