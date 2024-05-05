import React, { createContext, useState } from 'react';

const UserContext = createContext(undefined);
const UserDispatchContext = createContext(undefined);

function UserProvider({ children }) {
  const [userDetails, setUserDetails] = useState(null);

  function hasRole(userDetails, userRole) {
    return userDetails?.authorities.some(
      (role) => role?.authority === userRole
    );
  }

  const authenticated = userDetails !== null;
  const isDefault = authenticated
    ? hasRole(userDetails, 'ROLE_DEFAULT')
    : false;
  const isAdmin = authenticated
    ? hasRole(userDetails, 'ROLE_ADMINISTRATOR')
    : false;
  const isPremium = authenticated
    ? hasRole(userDetails, 'ROLE_PREMIUM')
    : false;
  const changePassword = authenticated
    ? !userDetails?.credentialsNonExpired
    : false;

  return (
    <UserContext.Provider
      value={{
        userDetails,
        isDefault,
        isAdmin,
        isPremium,
        authenticated,
        changePassword,
      }}
    >
      <UserDispatchContext.Provider value={{ setUserDetails }}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext, UserDispatchContext };
