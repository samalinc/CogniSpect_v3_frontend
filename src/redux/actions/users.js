import * as types from './actionTypes';

export const createUserRequest = (payload) => {
  return {
    type: types.CREATE_USER_REQUEST,
    payload,
  };
};

export const createUserSuccess = (payload) => {
  return {
    type: types.CREATE_USER_SUCCESS,
    payload,
  };
};

export const createUserFailure = (payload) => {
  return {
    type: types.CREATE_USER_FAILURE,
    payload,
  };
};

export const loadUsersRequest = (payload) => {
  return {
    type: types.LOAD_USERS_REQUEST,
    payload,
  };
};

export const loadUsersSuccess = (payload) => {
  return {
    type: types.LOAD_USERS_SUCCESS,
    payload,
  };
};

export const loadUsersFailure = (payload) => {
  return {
    type: types.LOAD_USERS_FAILURE,
    payload,
  };
};

export const removeUserRequest = (payload) => {
  return {
    type: types.REMOVE_USER_REQUEST,
    payload,
  };
};

export const removeUserSuccess = (payload) => {
  return {
    type: types.REMOVE_USER_SUCCESS,
    payload,
  };
};

export const removeUserFailure = (payload) => {
  return {
    type: types.REMOVE_USER_FAILURE,
    payload,
  };
};


export const updateUserRequest = (payload) => {
  return {
    type: types.UPDATE_USER_REQUEST,
    payload,
  };
};

export const updateUserSuccess = (payload) => {
  return {
    type: types.UPDATE_USER_SUCCESS,
    payload,
  };
};

export const updateUserFailure = (payload) => {
  return {
    type: types.UPDATE_USER_FAILURE,
    payload,
  };
};

export const getUserRequest = (payload) => {
  return {
    type: types.GET_USER_REQUEST,
    payload,
  };
};

export const getUserSuccess = (payload) => {
  return {
    type: types.GET_USER_SUCCESS,
    payload,
  };
};

export const getUserFailure = (payload) => {
  return {
    type: types.GET_USER_FAILURE,
    payload,
  };
};

export const setUserData = (payload) => {
  return {
    type: types.SET_USER_DATA,
    payload,
  };
};

