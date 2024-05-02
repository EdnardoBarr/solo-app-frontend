import httpCommon from '../http-common';

class LoginService {
  doLogin(email, password) {
    return httpCommon.post('/user/login', { email, password });
  }

  doLogout(id) {
    return httpCommon.post('/user/logout', { id });
  }
}

export default new LoginService();
