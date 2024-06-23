import httpCommon from '../http-common';

class FriendshipService {
  requestFriend(params) {
    return httpCommon.post('/api/v1/friendship/request', params);
  }

  update(params) {
    return httpCommon.put('/api/v1/friendship/update', params);
  }

  getStatus(params) {
    return httpCommon.get('/api/v1/friendship/get-status', { params });
  }

  getPending(params, userId) {
    return httpCommon.get(`/api/v1/friendship/get-pending/${userId}`, {
      params,
    });
  }

  getAccepted(params, userId) {
    return httpCommon.get(`/api/v1/friendship/get-accepted/${userId}`, {
      params,
    });
  }
}

export default new FriendshipService();
