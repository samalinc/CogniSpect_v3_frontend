import API from 'utils/axiosClient';

export async function loadTopics(query) {
  try {
    return API.get(`topic/${query || ''}`);
  } catch (error) {
    throw error;
  }
}

export async function createTopic(data) {
  try {
    return API.post('topic', data);
  } catch (error) {
    throw error;
  }
}

export async function updateTopic(data) {
  try {
    return API.put('topic', data);
  } catch (error) {
    throw error;
  }
}

export async function getTopic(id) {
  try {
    return API.get('topic', {
      params: {
        id,
      },
    });
  } catch (error) {
    throw error;
  }
}

// export async function removeTopic(payload) {
//   try {
//     return API.get('question/filter');
//   } catch (error) {
//     throw error;
//   }
// }
