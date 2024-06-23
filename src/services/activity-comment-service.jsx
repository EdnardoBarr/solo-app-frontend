import httpCommon from '../http-common';

class ActivityComment {
  getById(id) {
    return httpCommon.get(`/api/v1/activity-comment/${id}`);
  }

  getAll(id, params) {
    return httpCommon.get(`/api/v1/activity-comment/all/${id}`, { params });
  }

  create(params) {
    return httpCommon.post('/api/v1/activity-comment/create', params);
  }

  update(id, params) {
    return httpCommon.put(`/api/v1/activity-comment/update/${id}`, params);
  }

  delete(id) {
    return httpCommon.delete(`/api/v1/activity-comment/delete/${id}`);
  }
}

export default new ActivityComment();
