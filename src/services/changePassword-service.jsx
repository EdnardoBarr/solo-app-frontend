import httpCommon from '../http-common';

class ChangePassword {
  changePassword(oldPassword, password, matchingPassword) {
    return httpCommon.post('/api/v1/password/change', {
      oldPassword,
      password,
      matchingPassword,
    });
  }
}

export default new ChangePassword();
