import httpCommon from '../http-common';

class ActivityService {
  getById(id) {
    return httpCommon.get(`/activity/${id}`);
  }

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

  addParticipant(userId, params) {
    return httpCommon.put(`activity/add/participant/${userId}`, params);
  }

  declineParticipant(userId, params) {
    return httpCommon.put(`activity/decline/participant/${userId}`, params);
  }

  removeParticipant(userId, params) {
    return httpCommon.put(`activity/remove/participant/${userId}`, params);
  }

  dropParticipant(userId, params) {
    return httpCommon.put(`activity/drop/participant/${userId}`, params);
  }

  getStatus(params) {
    return httpCommon.get('/activity/member/get-status', { params });
  }

  getUsersPending(activityId, params) {
    return httpCommon.get(`/activity/member/get-pending/${activityId}`, {
      params,
    });
  }
  getUsersAccept(activityId) {
    return httpCommon.get(`/activity/member/get-accepted/${activityId}`);
  }
}

export default new ActivityService();
