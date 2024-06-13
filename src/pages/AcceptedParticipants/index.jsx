import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import activityService from '../../services/activity-service';
import { useLocation } from 'react-router-dom';
import { PageBtnContainer } from '../../components';
import { UserContext } from '../../contexts/user';
import qs from 'qs';
import AcceptedUser from './AcceptedUser';

const AcceptedParticipants = () => {
  const location = useLocation();
  const { userDetails } = useContext(UserContext);
  const [reload, setReload] = useState(false);
  const [users, setUsers] = useState([]);
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  const activityId = parseInt(query.activityId, 10);

  useEffect(() => {
    if (!activityId) {
      return;
    }

    activityService
      .getUsersAccept(activityId)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  }, [activityId, reload]);

  if (users.length === 0) {
    return (
      <Wrapper>
        <h2>There are no Participants in the Activity</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h2>
        {users.length === 1
          ? `${users.length} participant in the Activity`
          : `${users.length} participants in the Activity`}
      </h2>
      <div className='users'>
        {users?.map((user) => {
          const { id } = user;
          return (
            <AcceptedUser
              key={id}
              user={user}
              activityId={activityId}
              reload={reload}
              setReload={setReload}
            />
          );
        })}
      </div>
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
      grid-template-columns: 1fr 1fr 1fr;
      gap: 1rem;
    }
  }
`;

export default AcceptedParticipants;
