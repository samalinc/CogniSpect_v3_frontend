import API from 'utils/axiosClient';

export async function loadSessions(query) {
  try {
    return API.get('testSession', {
      params: query,
    });
  } catch (error) {
    throw error;
  }
}

export async function createSession(data) {
  try {
    return API.post('testSession', data);
  } catch (error) {
    throw error;
  }
}

export async function updateSession(data) {
  try {
    return API.put('testSession', data);
  } catch (error) {
    throw error;
  }
}

export async function getSession(id) {
  try {
    return API.get('testSession', {
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
