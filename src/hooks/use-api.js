import { useState, useCallback } from "react";

const useApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (apiConfig, setData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(apiConfig.url, {
        method: apiConfig.method ? apiConfig.method : "GET",
        headers: apiConfig.headers ? apiConfig.headers : {},
        body: apiConfig.body ? JSON.stringify(apiConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error(`Something went wrong!`);
      }

      const data = await response.json();
      setData(data);
    } catch (e) {
      setError(e.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useApi;
