import API from 'utils/axiosClient';

export async function loadSubjects(query) {
  try {
    return API.get('subject', {
      params: query,
    });
  } catch (error) {
    throw error;
  }
}

export async function createSubject(data) {
  try {
    return API.post('subject', data);
  } catch (error) {
    throw error;
  }
}

export async function updateSubject(data) {
  try {
    return API.put('subject', data);
  } catch (error) {
    throw error;
  }
}

export async function getSubject(id) {
  try {
    return API.get('subject', {
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
