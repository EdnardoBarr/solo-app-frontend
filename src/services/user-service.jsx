import httpCommon from '../http-common';

class UserService {
  getLoggedUserEmail() {
    return httpCommon.get('/api/v1/user/logged');
  }

  // getUserByEmail(email) {
  //   return httpCommon.get(`/user/retrieve/${email}`);
  // }

  getUserById(id) {
    return httpCommon.get(`/api/v1/user/${id}`);
  }

  getAll(params) {
    return httpCommon.get(`/api/v1/user/all`, { params });
  }

  doLogin(email, password) {
    return httpCommon.post('/api/v1/user/login', { email, password });
  }

  save(givenName, surname, email, password, matchingPassword, country, city) {
    return httpCommon.post('/api/v1/user/register', {
      givenName,
      surname,
      email,
      password,
      matchingPassword,
      country,
      city,
    });
  }

  update(
    id,
    givenName,
    surname,
    email,
    country,
    city,
    interests,
    dateOfBirth,
    bio
  ) {
    return httpCommon.put(`/api/v1/user/update/${id}`, {
      givenName,
      surname,
      email,
      country,
      city,
      interests,
      dateOfBirth,
      bio,
    });
  }
}

export default new UserService();
