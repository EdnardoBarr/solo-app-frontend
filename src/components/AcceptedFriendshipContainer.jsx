import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { UserContext } from '../contexts/user';
import { useAuth } from '../contexts/auth';
import PageBtnContainer from './PageBtnContainer';
import friendshipService from '../services/friendship-service';
import Notification from './Notification';

const AcceptedFriendshipContainer = () => {
  const { userDetails } = useContext(UserContext);
  const { isLoading, setIsLoading } = useAuth();
  const [users, setUsers] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(0);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (!userDetails) {
      return;
    }
    const userId = userDetails.id;
    let params = {};
    params.page = 0;

    friendshipService
      .getAccepted(params, userId)
      .then((res) => {
        setUsers(res.data.content);
        setTotalElements(res?.data?.totalElements);
        setTotalPages(res?.data?.totalPages);
      })
      .catch((err) => console.log(err.response));
  }, [userDetails, page, reload]);

  if (totalElements === 0) {
    return (
      <Wrapper>
        <h2>No Users to display</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h2>
        {totalElements === 1
          ? `${totalElements} person wants to be your friend`
          : `${totalElements} people want to be your friend`}
      </h2>
      <div className='users'>
        {users?.map((notification, i) => {
          return (
            <Notification
              key={i}
              user={notification}
              reload={reload}
              setReload={setReload}
            />
          );
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
export default AcceptedFriendshipContainer;
