class LocalStorageServic {
  addUserToLocalStorage(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  removeUserFromLocalStorage() {
    localStorage.removeItem('user');
  }

  getUserFromLocalStorage() {
    const result = localStorage.getItem('user');
    const user = result ? JSON.parse(result) : null;
    return user;
  }
}

export default new LocalStorageServic();
