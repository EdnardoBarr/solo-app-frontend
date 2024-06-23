import httpCommon from '../http-common';

class ActivityService {
  getById(id) {
    return httpCommon.get(`/api/v1/activity/${id}`);
  }

  getAll(params) {
    return httpCommon.get(`/api/v1/activity`, { params });
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
    return httpCommon.post('/api/v1/activity/add', {
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
    return httpCommon.post(`/api/v1/activity/member/join`, params);
  }

  addParticipant(userId, params) {
    return httpCommon.put(`/api/v1activity/add/participant/${userId}`, params);
  }

  declineParticipant(userId, params) {
    return httpCommon.put(
      `/api/v1activity/decline/participant/${userId}`,
      params
    );
  }

  removeParticipant(userId, params) {
    return httpCommon.put(
      `/api/v1activity/remove/participant/${userId}`,
      params
    );
  }

  dropParticipant(userId, params) {
    return httpCommon.put(`/api/v1activity/drop/participant/${userId}`, params);
  }

  getStatus(params) {
    return httpCommon.get('/api/v1/activity/member/get-status', { params });
  }

  getUsersPending(activityId, params) {
    return httpCommon.get(`/api/v1/activity/member/get-pending/${activityId}`, {
      params,
    });
  }
  getUsersAccept(activityId) {
    return httpCommon.get(`/api/v1/activity/member/get-accepted/${activityId}`);
  }
}

export default new ActivityService();
