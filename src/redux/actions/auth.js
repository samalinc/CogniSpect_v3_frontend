import * as types from './actionTypes';

export function loginRequest(payload) {
  return {
    type: types.AUTH_USER_REQUEST,
    payload,
  };
}

export function loginSuccess(payload) {
  return {
    type: types.AUTH_USER_SUCCESS,
    payload,
  };
}

export function authFailure(payload) {
  return {
    type: types.AUTH_USER_FAILURE,
    payload,
  };
}
