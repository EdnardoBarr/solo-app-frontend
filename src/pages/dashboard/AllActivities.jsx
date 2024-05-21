import React, { useEffect, useState } from 'react';
import activityService from '../../services/activity-service';
import { ActivitiesContainer, SearchContainer } from '../../components';

const INITIAL_STATE = {
  title: '',
  category: '',
  city: '',
  initialStartDate: '',
  endStartDate: '',
};

const AllActivities = () => {
  const [activityFilter, setActivityFilter] = useState(INITIAL_STATE);
  return (
    <>
      <SearchContainer
        activityFilter={activityFilter}
        setActivityFilter={setActivityFilter}
      />
      <ActivitiesContainer activityFilter={activityFilter} />
    </>
  );
};

export default AllActivities;
