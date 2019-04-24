import axios from 'axios';
import cookieStorage from 'utils/cookie';

const cookie = cookieStorage();

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://cognispect.herokuapp.com/api',
  // headers: {
  //   'Content-Type': 'multipart/form-data',
  // },
});

API.interceptors.request.use(
  (config) => {
    const storedToken = cookie.getItem('authToken');
    if (!config.headers.authorization && !!storedToken) {
      config.headers.authorization = `Bearer ${storedToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// API.interceptors.response.use(
//   (response) => { return response; },
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401) {
//       const newToken = await refresh();
//       originalRequest.headers.authorization = newToken;
//       const retryOriginalRequest = new Promise((resolve) => {
//         resolve(axios(originalRequest));
//       });

//       return retryOriginalRequest;
//     }
//     if (error.response.status === 404) {
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   },
// );

export default API;
