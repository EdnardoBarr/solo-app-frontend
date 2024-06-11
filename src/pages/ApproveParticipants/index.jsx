import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import activityService from '../../services/activity-service';
import { useLocation } from 'react-router-dom';
import Member from './Member';
import { PageBtnContainer } from '../../components';
import { UserContext } from '../../contexts/user';
import qs from 'qs';

const ApproveParticipants = () => {
  const location = useLocation();
  const { userDetails } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(0);
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  const activityId = parseInt(query.activityId, 10);
  const maxParticipants = parseInt(query.maxParticipants, 10);
  const participantsJoined = parseInt(query.participantsJoined, 10);

  useEffect(() => {
    if (!activityId) {
      return;
    }
    const params = { page };

    activityService
      .getUsersPending(activityId, params)
      .then((res) => {
        setUsers(res.data.content);
        setTotalElements(res.data.totalElements);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => console.log(err));
  }, [activityId, page]);

  if (totalElements === 0) {
    return (
      <Wrapper>
        <h2>No Users to approve</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h2>
        {totalElements === 1
          ? `${totalElements} person wants to join your Activity`
          : `${totalElements} people want to join your Activity`}
      </h2>
      <div className='users'>
        {users?.map((user) => {
          const { id } = user;
          return (
            <Member
              key={id}
              user={user}
              maxParticipants={maxParticipants}
              participantsJoined={participantsJoined}
              activityId={activityId}
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

export default ApproveParticipants;
