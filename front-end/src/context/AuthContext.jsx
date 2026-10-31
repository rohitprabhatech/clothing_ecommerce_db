/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useCallback, useMemo } from 'react';

/**
 * Authentication Context Foundation
 * Provides initial session state and action placeholders for future backend integration.
 */
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem('auth_token') || null;
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(false);

  const isAuthenticated = Boolean(token);

  // Authentication action stubs (to be connected with FastAPI /auth endpoints)
  const login = useCallback(async (credentials) => {
    setIsLoading(true);
    try {
      // Future: Call backend API login endpoint
      console.info('Login requested with credentials:', credentials);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (userData) => {
    setIsLoading(true);
    try {
      // Future: Call backend API register endpoint
      console.info('Registration requested with data:', userData);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem('auth_token');
    } catch {
      // Ignore storage errors
    }
    setToken(null);
    setUser(null);
  }, []);

  const contextValue = useMemo(
    () => ({
      user,
      token,
      isAuthenticated,
      isLoading,
      login,
      register,
      logout,
      setUser,
    }),
    [user, token, isAuthenticated, isLoading, login, register, logout]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
