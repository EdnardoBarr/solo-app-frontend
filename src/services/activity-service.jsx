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

  joinActivity(params) {
    return httpCommon.post(`/activity/member/join`, params);
  }

  getStatus(params) {
    return httpCommon.get('/activity/member/get-status', { params });
  }
}

export default new ActivityService();
