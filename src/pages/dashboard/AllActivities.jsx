import React, { useContext, useEffect, useState } from 'react';
import activityService from '../../services/activity-service';
import { ActivitiesContainer, SearchContainer } from '../../components';
import { useAuth } from '../../contexts/auth';
import { UserContext } from '../../contexts/user';

const INITIAL_STATE = {
  title: '',
  category: '',
  status: '',
  city: '',
  initialStartDate: '',
  endStartDate: '',
};

const AllActivities = () => {
  const { userDetails } = useContext(UserContext);
  const [activityFilter, setActivityFilter] = useState(INITIAL_STATE);
  const { isLoading, setIsLoading } = useAuth();
  const [activities, setActivities] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(0);

  useEffect(() => {
    let params = { ...activityFilter };
    params.page = page;
    if (userDetails) {
      params.userId = userDetails.id;
    }

    console.log('pparams', params);

    setIsLoading(true);
    activityService
      .getAll(params)
      .then((res) => {
        setActivities(res?.data?.content);
        setTotalElements(res?.data?.totalElements);
        setTotalPages(res?.data?.totalPages);
      })
      .catch((error) => console.log('error', error));

    setIsLoading(false);
  }, [page, activityFilter, userDetails]);
  return (
    <>
      <SearchContainer
        activityFilter={activityFilter}
        setActivityFilter={setActivityFilter}
        page={page}
        setPage={setPage}
      />
      <ActivitiesContainer
        activities={activities}
        totalPages={totalPages}
        page={page}
        setPage={setPage}
      />
    </>
  );
};

export default AllActivities;
