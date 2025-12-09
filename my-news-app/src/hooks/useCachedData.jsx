import { useState, useEffect, useCallback } from 'react';
import { cache } from '@/services/cache';

/**
 * Custom hook for fetching data with caching
 * 
 * @param {string} cacheKey - Unique cache key for this data
 * @param {Function} fetchFn - Function that returns a Promise with the data
 * @param {object} options - Configuration options
 *   - ttlMinutes: TTL in minutes (default: 10)
 *   - dependencies: Array of dependencies that trigger refetch
 *   - enabled: Whether to fetch (default: true)
 *   - onSuccess: Callback when data loads
 *   - onError: Callback when error occurs
 * 
 * @returns {object} { data, loading, error, refetch, isCached }
 */
export const useCachedData = (
  cacheKey,
  fetchFn,
  options = {}
) => {
  const {
    ttlMinutes = 10,
    dependencies = [],
    enabled = true,
    onSuccess,
    onError,
  } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCached, setIsCached] = useState(false);

  const fetchData = useCallback(async () => {
    // Check cache first
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      setData(cachedData);
      setIsCached(true);
      setLoading(false);
      setError(null);
      onSuccess?.(cachedData);
      return;
    }

    // Not in cache, fetch fresh data
    setLoading(true);
    setIsCached(false);

    try {
      const result = await fetchFn();
      cache.set(cacheKey, result, ttlMinutes);
      setData(result);
      setError(null);
      onSuccess?.(result);
    } catch (err) {
      setError(err);
      onError?.(err);
    } finally {
      setLoading(false);
    }
  }, [cacheKey, fetchFn, ttlMinutes, onSuccess, onError]);

  useEffect(() => {
    if (enabled) {
      fetchData();
    }
  }, [enabled, fetchData, ...dependencies]);

  const refetch = useCallback(() => {
    cache.clear(cacheKey);
    fetchData();
  }, [cacheKey, fetchData]);

  return {
    data,
    loading,
    error,
    refetch,
    isCached,
  };
};

export default useCachedData;
