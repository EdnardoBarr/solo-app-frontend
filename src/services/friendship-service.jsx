import httpCommon from '../http-common';

class FriendshipService {
  requestFriend(params) {
    return httpCommon.post('/friendship/request', params);
  }

  update(params) {
    return httpCommon.put('/friendship/update', params);
  }

  getStatus(params) {
    return httpCommon.get('/friendship/get-status', { params });
  }

  getPending(params, userId) {
    return httpCommon.get(`/friendship/get-pending/${userId}`, { params });
  }

  getAccepted(params, userId) {
    return httpCommon.get(`/friendship/get-accepted/${userId}`, { params });
  }
}

export default new FriendshipService();
