import httpCommon from '../http-common';

class FriendshipService {
  requestFriend(params) {
    return httpCommon.post('/friendship/request', params);
  }

  update(params) {
    return httpCommon.put('/friendship/request/update', params);
  }

  getStatus(params) {
    return httpCommon.get('/friendship/get-status', { params });
  }
}

export default new FriendshipService();
