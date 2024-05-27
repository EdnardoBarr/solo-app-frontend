import React, { useState } from 'react';
import { SearchUserContainer, UsersContainer } from '../../components';
const INITIAL_STATE = {
  givenName: '',
  interests: [],
  city: '',
};

const Connect = () => {
  const [userFilter, setUserFilter] = useState(INITIAL_STATE);
  return (
    <>
      <SearchUserContainer
        userFilter={userFilter}
        setUserFilter={setUserFilter}
      />
      <UsersContainer userFilter={userFilter} setUserFilter={setUserFilter} />
    </>
  );
};

export default Connect;
