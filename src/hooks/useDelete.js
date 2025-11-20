import { useState } from "react";
import apiClient from "./apiClient";

const useDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const deleteData = async (endpoint) => {
    setLoading(true);
    setError(null);

    try {
      const res = await apiClient(endpoint, { method: "DELETE" });
      setResponse(res);
      return res;
    } catch (err) {
      setError(err.message || "Delete failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteData, loading, error, response };
};

export default useDelete;
