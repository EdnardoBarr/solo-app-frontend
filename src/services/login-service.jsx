import httpCommon from '../http-common';

class LoginService {
  doLogin(email, password) {
    return httpCommon.post('/api/v1/user/login', { email, password });
  }

  doLogout() {
    return httpCommon.post('/api/v1/user/logout');
  }

  // verifyTokenExpiration() {
  //   return httpCommon.
  // }
}

export default new LoginService();
