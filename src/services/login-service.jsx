import httpCommon from '../http-common';

class LoginService {
  doLogin(email, password) {
    return httpCommon.post('/user/login', { email, password });
  }

  doLogout() {
    return httpCommon.post('/user/logout');
  }
}

export default new LoginService();
