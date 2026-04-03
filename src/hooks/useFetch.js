import { useState, useEffect, useRef } from "react";
import axios from "axios";

const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000;

function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  const { cacheKey = url, ttl = CACHE_TTL } = options;

  const fetchData = async (forceRefresh = false) => {
    if (!forceRefresh && cache.has(cacheKey)) {
      const cachedData = cache.get(cacheKey);
      const now = Date.now();

      if (now - cachedData.timestamp < ttl) {
        console.log(`Loading from cache: ${cacheKey}`);
        setData(cachedData.data);
        setLoading(false);
        setError(null);
        return;
      } else {
        cache.delete(cacheKey);
      }
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    setLoading(true);
    setError(null);

    try {
      console.log(`Fetching from API: ${url}`);
      const response = await axios.get(url, {
        signal: abortControllerRef.current.signal,
      });

      cache.set(cacheKey, {
        data: response.data,
        timestamp: Date.now(),
      });

      setData(response.data);
      setError(null);
    } catch (err) {
      if (err.name === "CanceledError") {
        console.log("Request was cancelled");
        return;
      }

      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "An error occurred while fetching data";
      setError(errorMessage);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!url) {
      setLoading(false);
      return;
    }

    fetchData();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [url, cacheKey]);

  function refetch() {
    fetchData(true);
  }
  function clearCache() {
    cache.delete(cacheKey);
  }

  return { data, loading, error, refetch, clearCache };
}

export default useFetch;
