import API from 'utils/axiosClient';

export async function loadTests(query) {
  try {
    return API.get('testTemplate', {
      params: query,
    });
  } catch (error) {
    throw error;
  }
}

export async function createTest(data) {
  try {
    return API.post('testTemplate', data);
  } catch (error) {
    throw error;
  }
}

export async function updateTest(data) {
  try {
    return API.put('testTemplate', data);
  } catch (error) {
    throw error;
  }
}

export async function getTest(id) {
  try {
    return API.get('testTemplate', {
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
