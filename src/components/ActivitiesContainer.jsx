import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import activityService from '../services/activity-service';
import Activity from './Activity';
import PageBtnContainer from './PageBtnContainer';

const ActivitiesContainer = ({ activityFilter }) => {
  const [activities, setActivities] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(0);

  useEffect(() => {
    let params = { ...activityFilter };
    params.page = page;

    activityService
      .getAll(params)
      .then((res) => {
        setActivities(res?.data?.content);
        setTotalElements(res?.data?.totalElements);
        setTotalPages(res?.data?.totalPages);
        console.log('getAll', res.data);
      })
      .catch((error) => console.log('error', error));
  }, [page, activityFilter]);

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
