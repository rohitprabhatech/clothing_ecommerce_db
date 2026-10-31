import { useState, useEffect, useCallback } from 'react';

/**
 * Reusable asynchronous data-fetching custom hook.
 *
 * @param {Function} fetchFn - An asynchronous function returning a Promise.
 * @param {Array} [deps=[]] - Dependency array for re-fetching.
 * @param {boolean} [immediate=true] - Whether to execute immediately on mount.
 * @returns {Object} { data, loading, error, refetch }
 */
export function useFetch(fetchFn, deps = [], immediate = true) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFn(...args);
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    if (immediate) {
      execute().catch(() => {});
    }
  }, [execute, immediate]);

  return { data, loading, error, refetch: execute };
}

export default useFetch;

