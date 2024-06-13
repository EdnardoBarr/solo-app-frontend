import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import activityService from '../services/activity-service';
import Activity from './Activity';
import PageBtnContainer from './PageBtnContainer';
import { useAuth } from '../contexts/auth';

const ActivitiesContainer = ({ activities, totalPages, page, setPage }) => {
  if (activities?.content?.length === 0) {
    return (
      <Wrapper>
        <h2>No Actvities to display</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className='activities'>
        {activities?.map((activity, i) => {
          return <Activity key={i} activity={activity} />;
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
  .activities {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
  @media (min-width: 992px) {
    .activities {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
  }
`;

export default ActivitiesContainer;
