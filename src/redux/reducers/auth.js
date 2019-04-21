
import * as types from '../actions/actionTypes';

const initialState = {
  isLoading: true,
  error: null,
  user: null,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
  case types.AUTH_USER_REQUEST: {
    return Object.assign({}, state, { isLoading: true, error: null }); }
  case types.AUTH_USER_SUCCESS: {
    return Object.assign({}, state, {
      isLoading: false,
      authToken: action.payload.authToken,
      error: null,
    }); }
  case types.AUTH_USER_FAILURE: {
    return Object.assign({}, state, { isLoading: false, error: action.payload }); }
  case types.LOGOUT_SUCCESS:
    return Object.assign({}, state, { user: null });
  default:
    return state;
  }
}
