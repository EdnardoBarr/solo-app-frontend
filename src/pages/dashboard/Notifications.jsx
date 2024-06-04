import React, { useEffect } from 'react';
import friendshipService from '../../services/friendship-service';
import { ProfileNotificationContainer } from '../../components';

const Notifications = () => {
  useEffect(() => {
    let params = {};
    params.page = 0;

    friendshipService
      .getPending(params, 1)
      .then((res) => console.log('aaa', res.data))
      .catch((err) => console.log(err.response));
  }, []);

  return <ProfileNotificationContainer />;
};

export default Notifications;
