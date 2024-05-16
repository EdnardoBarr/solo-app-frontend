import httpCommon from '../http-common';

class ChangePassword {
  changePassword(oldPassword, password, matchingPassword) {
    return httpCommon.post('/password/change', {
      oldPassword,
      password,
      matchingPassword,
    });
  }
}

export default new ChangePassword();
