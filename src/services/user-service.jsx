import httpCommon from '../http-common';

class UserService {
  getLoggedUserEmail() {
    return httpCommon.get('/user/logged');
  }

  // getUserByEmail(email) {
  //   return httpCommon.get(`/user/retrieve/${email}`);
  // }

  getUserById(id) {
    return httpCommon.get(`/user/${id}`);
  }

  getAll(params) {
    return httpCommon.get(`/user/all`, { params });
  }

  doLogin(email, password) {
    return httpCommon.post('/user/login', { email, password });
  }

  save(givenName, surname, email, password, matchingPassword, country, city) {
    return httpCommon.post('/user/register', {
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
    return httpCommon.put(`/user/update/${id}`, {
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
