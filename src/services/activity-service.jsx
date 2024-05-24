import httpCommon from '../http-common';

class ActivityService {
  getAll(params) {
    return httpCommon.get(`/activity`, { params });
  }

  create(
    title,
    description,
    address,
    city,
    country,
    coords,
    startsAt,
    finishesAt,
    category,
    maxParticipants,
    active,
    ownerId
  ) {
    return httpCommon.post('/activity/add', {
      title,
      description,
      address,
      city,
      country,
      coords,
      startsAt,
      finishesAt,
      category,
      maxParticipants,
      active,
      ownerId,
    });
  }

  joinActivity(activityId, userId) {
    console.log('userId', userId);
    return httpCommon.post(`activity/member/request/${activityId}`, userId);
  }
}

export default new ActivityService();
