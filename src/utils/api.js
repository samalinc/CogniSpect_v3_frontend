import axios from 'axios';
// import { getUserFromCookie, refreshTokens } from './auth';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    // Authorization: getUserFromCookie() ? getUserFromCookie().accessToken : null,
  },
});

// instance.interceptors.request.use(
//   (config) => {
//     if (!config.headers.Authorization && getUserFromCookie()) {
//       config.headers.Authorization = getUserFromCookie().accessToken;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

// instance.interceptors.response.use(
//   (response) => { return response; },
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.code !== 'ECONNABORTED' && error.response.status === 403) {
//       const newToken = await refreshTokens(getUserFromCookie());
//       originalRequest.headers.Authorization = newToken.accessToken;
//       const retryOriginalRequest = new Promise((resolve) => {
//         resolve(axios(originalRequest));
//       });

//       return retryOriginalRequest;
//     }
//     return Promise.reject(error);
//   },
// );

export default instance;
