import React, { useContext, useEffect, useState } from 'react';
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';
import styled from 'styled-components';
import StatItem from './StatItem';
import { UserContext } from '../contexts/user';
import userService from '../services/user-service';
import activityService from '../services/activity-service';
import friendshipService from '../services/friendship-service';
import { MdOutlinePending } from 'react-icons/md';
import { FaUniversalAccess } from 'react-icons/fa6';
import { FiActivity } from 'react-icons/fi';

const StatsContainer = () => {
  const { userDetails } = useContext(UserContext);
  const [pending, setPending] = useState(0);
  const [accepted, setAccepted] = useState(0);
  const [friends, setFriends] = useState(0);

  useEffect(() => {
    if (!userDetails) {
      return;
    }

    const { id } = userDetails;

    activityService
      .countPending(id)
      .then((res) => setPending(res.data))
      .catch();

    activityService
      .countAccepted(id)
      .then((res) => setAccepted(res.data))
      .catch();

    friendshipService
      .countFriendships(id)
      .then((res) => setFriends(res.data))
      .catch();
  }, [userDetails]);

  const defaultStats = [
    {
      title: 'pending activities',
      count: pending,
      icon: <MdOutlinePending />,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: 'joined activities',
      count: accepted,
      icon: <FiActivity />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: 'friendships',
      count: friends,
      icon: <FaUniversalAccess />,
      color: '#66cd85',
      bcg: '#2f9638',
    },
  ];
  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return <StatItem key={index} {...item} />;
      })}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  row-gap: 2rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
  }
  @media (min-width: 1120px) {
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 1rem;
  }
`;

export default StatsContainer;
