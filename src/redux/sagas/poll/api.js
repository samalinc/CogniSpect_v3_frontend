import API from 'utils/axiosClient';

export async function loadPolls(payload) {
  try {
    return API.get('question');
  } catch (error) {
    throw error;
  }
}

export async function createPoll(data) {
  try {
    return API.post('question', data);
  } catch (error) {
    throw error;
  }
}
