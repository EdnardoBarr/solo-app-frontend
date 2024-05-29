import httpCommon from '../http-common';

class FriendshipService {
  requestFriend(params) {
    return httpCommon.post('/friendship/request', params);
  }
}

export default new FriendshipService();
