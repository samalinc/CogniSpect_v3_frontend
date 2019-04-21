import API from 'utils/axiosClient';

export async function login(payload) {
  try {
    return await API.post('/auth/login', payload);
  } catch (err) {
    throw err;
  }
}

