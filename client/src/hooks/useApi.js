import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (apiCall, options = {}) => {
    const {
      showSuccessToast = false,
      showErrorToast = true,
      successMessage = 'Operation successful',
      onSuccess,
      onError,
    } = options;

    try {
      setLoading(true);
      setError(null);

      const response = await apiCall();

      if (showSuccessToast) {
        toast.success(successMessage);
      }

      if (onSuccess) {
        onSuccess(response);
      }

      return response;
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message || 'An error occurred';

      setError(errorMessage);

      if (showErrorToast) {
        toast.error(errorMessage);
      }

      if (onError) {
        onError(err);
      }

      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    execute,
    resetError,
  };
};
