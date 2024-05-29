import React, { useCallback, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import PageBtnContainer from './PageBtnContainer';
import User from './User';
import userService from '../services/user-service';
import { UserContext } from '../contexts/user';

const UsersContainer = ({ userFilter, setUserFilter }) => {
  const { userDetails } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(0);

  useEffect(() => {
    let params = { ...userFilter };
    params.page = page;
    params.page;
    console.log('params', params);

    userService
      .getAll(params)
      .then((res) => {
        console.log('reees', res.data);
        setUsers(res?.data?.content);
        setTotalElements(res?.data?.totalElements);
        setTotalPages(res?.data?.totalPages);
        console.log('getAll', res.data);
      })
      .catch((error) => console.log('error', error));
  }, [page, userFilter]);

  if (users?.content?.length === 0) {
    return (
      <Wrapper>
        <h2>No Users to display</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className='users'>
        {users?.map((user, i) => {
          const { id: userId } = user;
          const { id } = userDetails;
          return userId !== id && <User key={i} user={user} />;
        })}
      </div>
      {totalPages > 1 && (
        <PageBtnContainer
          totalPages={totalPages}
          page={page}
          setPage={setPage}
        />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 4rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
  }
  .users {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
  @media (min-width: 992px) {
    .users {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
  }
`;

export default UsersContainer;
