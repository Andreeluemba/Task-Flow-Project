import { useAuthStore } from '../store/authStore';
import type { User } from '../types';

/**
 * Custom hook for authentication operations
 * Provides a clean interface to auth store functionality
 */
export const useAuth = () => {
  const {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout,
    checkAuth,
    clearError,
    setLoading,
  } = useAuthStore();

  return {
    // State
    user,
    token,
    isAuthenticated,
    loading,
    error,
    
    // Actions
    login,
    register,
    logout,
    checkAuth,
    clearError,
    setLoading,
    
    // Computed values
    isLoggedIn: isAuthenticated && !!user,
    hasError: !!error,
  };
};

/**
 * Hook to get only auth state (no actions)
 * Useful for components that only need to read auth state
 */
export const useAuthState = () => {
  const { user, token, isAuthenticated, loading, error } = useAuthStore();
  
  return {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    isLoggedIn: isAuthenticated && !!user,
    hasError: !!error,
  };
};

/**
 * Hook to get only auth actions (no state)
 * Useful for components that only need to perform auth actions
 */
export const useAuthActions = () => {
  const { login, register, logout, checkAuth, clearError, setLoading } = useAuthStore();
  
  return {
    login,
    register,
    logout,
    checkAuth,
    clearError,
    setLoading,
  };
};

/**
 * Hook to get current user info
 * Returns null if not authenticated
 */
export const useCurrentUser = (): User | null => {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  return isAuthenticated ? user : null;
};