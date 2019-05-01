import API from 'utils/axiosClient';

export async function loadUsers(payload) {
  try {
    return API.get('user');
  } catch (error) {
    throw error;
  }
}

export async function getUser(id) {
  try {
    return API.get('auth/signup', {
      params: {
        id,
      },
    });
  } catch (error) {
    throw error;
  }
}

export async function createUser(data) {
  try {
    return API.post('auth/signup', data);
  } catch (error) {
    throw error;
  }
}

export async function updateUser(data) {
  try {
    return API.put('auth/signup', {
      data,
    });
  } catch (error) {
    throw error;
  }
}
