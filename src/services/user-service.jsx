import httpCommon from '../http-common';

class UserService {
  getLoggedUserEmail() {
    return httpCommon.get('/user/logged');
  }

  getUserByEmail(email) {
    return httpCommon.get(`/user/retrieve/${email}`);
  }

  getUserById(id) {
    return httpCommon.get(`/user/${id}`);
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
