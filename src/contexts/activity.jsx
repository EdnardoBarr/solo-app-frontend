import { useState } from 'react';

const INITIAL_STATE = {
  title: '',
  category: '',
  city: '',
  initialStartDate: '',
  endStartDate: '',
};

function ActivityProvider({ children }) {
  const [activityFilter, setActivityFilter] = useState(INITIAL_STATE);
}

export { ActivityProvider };
