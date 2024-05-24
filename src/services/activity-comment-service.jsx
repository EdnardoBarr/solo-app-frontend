import httpCommon from '../http-common';

class ActivityComment {
  getById(id) {
    return httpCommon.get(`/activity-comment/${id}`);
  }

  getAll(id) {
    return httpCommon.get(`/activity-comment/all/${id}`);
  }

  create(params) {
    return httpCommon.post('/activity-comment/create', params);
  }

  update(id, params) {
    return httpCommon.put(`/activity-comment/update/${id}`, { params });
  }

  delete(id) {
    return httpCommon.delete(`/activity-comment/delete/${id}`);
  }
}

export default new ActivityComment();
