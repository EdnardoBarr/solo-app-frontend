import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import httpCommon from '../http-common';

const tokenKey = 'token';
const refreshTokenKey = 'refresh-token';
const authHeader = 'Authorization';
const authHeaderPrefix = 'Bearer';

const AuthContext = createContext();

const updateHeaders = (token) => {
  if (token) {
    httpCommon.defaults.headers.common[
      authHeader
    ] = `${authHeaderPrefix} ${token}`;
  } else {
    delete httpCommon.defaults.headers.common[authHeader];
  }
};

const AuthProvider = ({ children }) => {
  const storedKey = localStorage.getItem(tokenKey);
  updateHeaders(storedKey);

  // State to hold the authentication token
  const [token, setToken_] = useState(storedKey);
  const [refreshToken, setRefreshToken_] = useState(
    localStorage.getItem(refreshTokenKey)
  );

  // Function to set the authentication token
  const setToken = (newToken) => {
    setToken_(newToken);
  };

  // Function to set the authentication token
  const setRefreshToken = (newToken) => {
    setRefreshToken_(newToken);
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem(tokenKey, token);
    } else {
      localStorage.removeItem(tokenKey);
      setRefreshToken(null);
    }
    window.dispatchEvent(new Event('storage'));
    updateHeaders(token);
  }, [token]);

  useEffect(() => {
    if (refreshToken) localStorage.setItem(refreshTokenKey, refreshToken);
    else localStorage.removeItem(refreshTokenKey);
  }, [refreshToken]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      tokenKey,
      setToken,
      refreshToken,
      setRefreshToken,
    }),
    [token, refreshToken]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
