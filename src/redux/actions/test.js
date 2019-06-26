import * as types from './actionTypes';

export const setSubjectData = (payload) => {
  return {
    type: types.SET_TEST_DATA,
    payload,
  };
};

export const createTestRequest = (payload) => {
  return {
    type: types.CREATE_TEST_REQUEST,
    payload,
  };
};

export const createTestSuccess = (payload) => {
  return {
    type: types.CREATE_TEST_SUCCESS,
    payload,
  };
};

export const createTestFailure = (payload) => {
  return {
    type: types.CREATE_TEST_FAILURE,
    payload,
  };
};

export const removeTestRequest = (payload) => {
  return {
    type: types.REMOVE_TEST_REQUEST,
    payload,
  };
};

export const removeTestSuccess = (payload) => {
  return {
    type: types.REMOVE_TEST_SUCCESS,
    payload,
  };
};

export const removeTestFailure = (payload) => {
  return {
    type: types.REMOVE_TEST_FAILURE,
    payload,
  };
};

export const updateTestRequest = (payload) => {
  return {
    type: types.UPDATE_TEST_REQUEST,
    payload,
  };
};

export const updateTestSuccess = (payload) => {
  return {
    type: types.UPDATE_TEST_SUCCESS,
    payload,
  };
};

export const updateTestFailure = (payload) => {
  return {
    type: types.UPDATE_TEST_FAILURE,
    payload,
  };
};

export const getTestRequest = (payload) => {
  return {
    type: types.GET_TEST_REQUEST,
    payload,
  };
};

export const getTestSuccess = (payload) => {
  return {
    type: types.GET_TEST_SUCCESS,
    payload,
  };
};

export const getSubjectFailure = (payload) => {
  return {
    type: types.GET_TEST_FAILURE,
    payload,
  };
};


export const loadTestsRequest = (payload) => {
  return {
    type: types.LOAD_TESTS_REQUEST,
    payload,
  };
};

export const loadTestsSuccess = (payload) => {
  return {
    type: types.LOAD_TESTS_SUCCESS,
    payload,
  };
};

export const loadTestsFailure = (payload) => {
  return {
    type: types.LOAD_TESTS_FAILURE,
    payload,
  };
};
