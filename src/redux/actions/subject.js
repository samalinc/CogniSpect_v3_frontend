import * as types from './actionTypes';

export const setSubjectData = (payload) => {
  return {
    type: types.SET_SUBJECT_DATA,
    payload,
  };
};

export const createSubjectRequest = (payload) => {
  return {
    type: types.CREATE_SUBJECT_REQUEST,
    payload,
  };
};

export const createSubjectSuccess = (payload) => {
  return {
    type: types.CREATE_SUBJECT_SUCCESS,
    payload,
  };
};

export const createSubjectFailure = (payload) => {
  return {
    type: types.CREATE_SUBJECT_FAILURE,
    payload,
  };
};

export const removeSubjectRequest = (payload) => {
  return {
    type: types.REMOVE_SUBJECT_REQUEST,
    payload,
  };
};

export const removeSubjectSuccess = (payload) => {
  return {
    type: types.REMOVE_SUBJECT_SUCCESS,
    payload,
  };
};

export const removeSubjectFailure = (payload) => {
  return {
    type: types.REMOVE_SUBJECT_FAILURE,
    payload,
  };
};

export const updateSubjectRequest = (payload) => {
  return {
    type: types.UPDATE_SUBJECT_REQUEST,
    payload,
  };
};

export const updateSubjectSuccess = (payload) => {
  return {
    type: types.UPDATE_SUBJECT_SUCCESS,
    payload,
  };
};

export const updateSubjectFailure = (payload) => {
  return {
    type: types.UPDATE_SUBJECT_FAILURE,
    payload,
  };
};

export const getSubjectRequest = (payload) => {
  return {
    type: types.GET_SUBJECT_REQUEST,
    payload,
  };
};

export const getSubjectSuccess = (payload) => {
  return {
    type: types.GET_SUBJECT_SUCCESS,
    payload,
  };
};

export const getSubjectFailure = (payload) => {
  return {
    type: types.GET_SUBJECT_FAILURE,
    payload,
  };
};


export const loadSubjectsRequest = (payload) => {
  return {
    type: types.LOAD_SUBJECTS_REQUEST,
    payload,
  };
};

export const loadSubjectsSuccess = (payload) => {
  return {
    type: types.LOAD_SUBJECTS_SUCCESS,
    payload,
  };
};

export const loadSubjectsFailure = (payload) => {
  return {
    type: types.LOAD_SUBJECTS_FAILURE,
    payload,
  };
};
