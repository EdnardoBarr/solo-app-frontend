import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { UserContext } from '../contexts/user';
import { useAuth } from '../contexts/auth';
import PageBtnContainer from './PageBtnContainer';
import friendshipService from '../services/friendship-service';
import Notification from './Notification';
import Friendship from './Friendship';

const FriendshipContainer = ({ friendshipFilter }) => {
  const { userDetails } = useContext(UserContext);
  const { isLoading, setIsLoading } = useAuth();
  const [friendships, setFriendships] = useState([]);
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
        setFriendships(res.data.content);
        setTotalElements(res.data.totalElements);
        setTotalPages(res.data.totalPages);

        console.log('aaa', res.data);
      })
      .catch((err) => console.log(err.response));
  }, [userDetails, page, reload]);

  if (totalElements === 0) {
    return (
      <Wrapper>
        <h2>No Friends to display</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h2>
        {totalElements === 1
          ? `You are friends with ${totalElements} people.`
          : `You have no Friends yet. Connect to people.`}
      </h2>
      <div className='friendships'>
        {friendships?.map((friendship) => {
          const { id } = friendship;
          return (
            <Friendship
              key={id}
              friendship={friendship}
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
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
  }
  .friendships {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
  @media (min-width: 992px) {
    .friendships {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
  }
`;
export default FriendshipContainer;
