import React, { useEffect } from 'react';
import friendshipService from '../../services/friendship-service';

const Notifications = () => {
  useEffect(() => {
    let params = {};
    params.page = 4;

    friendshipService
      .getPending(params, 1)
      .then((res) => console.log('aaa', res.data))
      .catch((err) => console.log(err.response));
  });
  return <div></div>;
};

export default Notifications;
