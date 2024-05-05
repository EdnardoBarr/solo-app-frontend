import React, { useContext, useEffect } from 'react';
import { UserContext, UserDispatchContext } from '../contexts/user';
import { useNavigate } from 'react-router-dom';
import userService from '../services/user-service';
import { useAuth } from '../contexts/auth';
const ProtectedRoute = ({ children }) => {
  const { setUserDetails } = useContext(UserDispatchContext) || {};
  const { token, setToken, tokenKey } = useAuth();
  const { authenticated } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) {
      userService
        .getLoggedUserEmail()
        .then((res) => setUserDetails(res.data))
        .catch((error) => {
          if (error.response?.status === 401) {
            setUserDetails(null);
            if (token) setToken(null);
          }
        });
    }
  }, [authenticated]);

  const onStorageTokenChange = () => {
    if (!localStorage.getItem(tokenKey)) {
      navigate('/landing', {
        state: {
          message: 'Sua sessão expirou. Faça novamente o Login.',
          severity: 'warning',
        },
      });
      setUserDetails(null);
    }
  };

  useEffect(() => {
    window.addEventListener('storage', onStorageTokenChange);
  }, []);

  if (!authenticated) {
    return navigate('/landing');
  }
  return children;
};

export default ProtectedRoute;
