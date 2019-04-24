import API from 'utils/axiosClient';

export async function loadPolls(payload) {
  try {
    return API.get('question/filter');
  } catch (error) {
    throw error;
  }
}

export async function createPoll(data) {
  try {
    return API.post('question/create', data);
  } catch (error) {
    throw error;
  }
}
