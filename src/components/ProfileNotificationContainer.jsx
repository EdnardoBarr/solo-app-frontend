import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { UserContext } from '../contexts/user';
import { useAuth } from '../contexts/auth';
import PageBtnContainer from './PageBtnContainer';
import friendshipService from '../services/friendship-service';
import Notification from './Notification';

const ProfileNotificationContainer = () => {
  const { userDetails } = useContext(UserContext);
  const { isLoading, setIsLoading } = useAuth();
  const [notifications, setNotifications] = useState([]);
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
      .getPending(params, userId)
      .then((res) => {
        setNotifications(res.data.content);
        setTotalElements(res.data.totalElements);
        setTotalPages(res.data.totalPages);

        console.log('aaa', res.data);
      })
      .catch((err) => console.log(err.response));
  }, [userDetails, page, reload]);

  if (totalElements === 0) {
    return (
      <Wrapper>
        <h2>No Notifications to display</h2>
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
      <div className='notifications'>
        {notifications?.map((notification) => {
          const { id } = notification;
          return (
            <Notification
              key={id}
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
  .notifications {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
  @media (min-width: 992px) {
    .notifications {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
  }
`;

export default ProfileNotificationContainer;
