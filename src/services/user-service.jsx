import httpCommon from '../http-common';

class UserService {
  getLoggedUserEmail() {
    return httpCommon.get('/user/logged');
  }

  getUserInfo(email) {
    return httpCommon.post('/user/info', { email });
  }

  doLogin(email, password) {
    return httpCommon.post('/user/login', { email, password });
  }

  save(givenName, surname, email, password, matchingPassword, country, city) {
    return httpCommon.post('/user/registration', {
      givenName,
      surname,
      email,
      password,
      matchingPassword,
      country,
      city,
    });
  }
}

export default new UserService();
