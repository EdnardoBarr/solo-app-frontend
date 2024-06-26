import React, { useContext, useEffect, useState } from 'react';
import { UserContext, UserDispatchContext } from '../contexts/user';
import { useNavigate } from 'react-router-dom';
import userService from '../services/user-service';
import { useAuth } from '../contexts/auth';
import { toast } from 'react-toastify';
import { Loading } from '../components/Loading';
const ProtectedRoute = ({ children }) => {
  const { setUserDetails } = useContext(UserDispatchContext) || {};
  const { token, setToken, tokenKey } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { authenticated } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) {
      setIsLoading(true);
      userService
        .getLoggedUserEmail()
        .then((res) => setUserDetails(res.data))
        .catch((error) => {
          if (error.response?.status === 401) {
            setUserDetails(null);
            if (token) setToken(null);
          }
          navigate('/landing');
        })
        .finally(() => setIsLoading(false));
    }
  }, [authenticated]);

  const onStorageTokenChange = () => {
    if (!localStorage.getItem(tokenKey)) {
      navigate('/landing');
      setUserDetails(null);
    }
  };

  useEffect(() => {
    window.addEventListener('storage', onStorageTokenChange);
    return () => {
      window.removeEventListener('storage', onStorageTokenChange);
    };
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return children;
};

export default ProtectedRoute;
