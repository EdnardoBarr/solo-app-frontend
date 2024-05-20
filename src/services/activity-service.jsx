import httpCommon from '../http-common';

class ActivityService {
  getAll(currentPage) {
    return httpCommon.get(`/activity?page=${currentPage}`);
  }

  create(
    title,
    description,
    address,
    city,
    country,
    coords,
    startsAt,
    finishesAt,
    category,
    maxParticipants,
    active,
    ownerId
  ) {
    return httpCommon.post('/activity/add', {
      title,
      description,
      address,
      city,
      country,
      coords,
      startsAt,
      finishesAt,
      category,
      maxParticipants,
      active,
      ownerId,
    });
  }
}

export default new ActivityService();
