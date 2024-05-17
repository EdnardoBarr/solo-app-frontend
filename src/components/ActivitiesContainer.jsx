import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import activityService from '../services/activity-service';
import Activity from './Activity';

const ActivitiesContainer = () => {
  const [activities, setActivities] = useState({});

  useEffect(() => {
    activityService
      .getAll()
      .then((res) => {
        setActivities(res?.data);
        console.log('getAll', res.data);
      })
      .catch((error) => console.log('error', error));
  }, []);

  if (activities?.content?.length === 0) {
    console.log('bbb');
    return (
      <Wrapper>
        <h2>No Actvities to display</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {activities?.content?.map((activity, i) => {
        return <Activity key={i} {...activity} />;
      })}
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
  .jobs {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
  @media (min-width: 992px) {
    .jobs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
  }
`;

export default ActivitiesContainer;
