import axios from 'axios';
import QueryString from 'qs';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  paramsSerializer: (params) =>
    QueryString.stringify(params, { arrayFormat: 'repeat' }),
});

const refreshTokenReq = () => {
  const refreshToken = localStorage.getItem('refresh-token');
  return refreshToken
    ? client.post('/user/refresh-token', { refreshToken })
    : Promise.reject();
};

client.interceptors.request.use((request) => {
  const token = localStorage.getItem('token');

  if (token) request.headers.Authorization = `Bearer ${token}`;

  return request;
});

client.interceptors.response.use(
  (response) => response,
  async (errorResponse) => {
    const originalRequest = errorResponse.config;

    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (errorResponse.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await refreshTokenReq();
        const { token, refreshToken } = response.data;

        localStorage.setItem('token', token);
        localStorage.setItem('refresh-token', refreshToken);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axios(originalRequest);
      } catch (error) {
        if (error.response.status === 403) {
          localStorage.removeItem('token');
          localStorage.removeItem('refresh-token');
          window.location.href = '/';
        }

        // Handle refresh token error or redirect to login
        return Promise.reject(error ?? errorResponse);
      }
    }

    return Promise.reject(errorResponse);
  }
);

export default client;
