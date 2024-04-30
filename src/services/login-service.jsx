import httpCommon from '../http-common';

class LoginService {
  doLogin(email, password) {
    return httpCommon.post('/user/login', { email, password });
  }
}

export default new LoginService();
