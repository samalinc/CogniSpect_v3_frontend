

import { combineReducers } from 'redux';
import single from 'redux/factories/single';
import * as types from 'redux/actions/actionTypes';

const initialState = {
  error: null,
  isLoading: true,
  items: [],
};

function guests(state = initialState, action) {
  switch (action.type) {
  case types.LOAD_USERS_REQUEST: {
    return Object.assign({}, state, { isLoading: true, error: null }); }
  case types.LOAD_USERS_SUCCESS: {
    return Object.assign({}, state, {
      isLoading: false,
      error: null,
      items: action.payload,
      total: action.payload.length,
    }); }

  case types.CREATE_USER_FAILURE:
  case types.LOAD_USERS_FAILURE: {
    return Object.assign({}, state, {
      isLoading: false,
      error: action.payload,
    }); }

  case types.CREATE_USER_REQUEST: {
    return Object.assign({}, state, {
      isLoading: true,
      error: null,
    }); }
  case types.CREATE_USER_SUCCESS: {
    return Object.assign({}, state, {
      isLoading: false,
      items: [...state.items, action.payload],
    }); }


  case types.REMOVE_USER_REQUEST: {
    return Object.assign({}, state, { isLoading: true, error: null }); }
  case types.REMOVE_USER_SUCCESS: {
    return Object.assign({}, state, {
      isLoading: false,
      items: state.items.filter((guest) => { return guest.id !== action.payload; }),
    });
  }
  case types.REMOVE_USER_FAILURE: {
    return Object.assign({}, state, { isLoading: false, error: action.payload });
  }

  case types.UPDATE_USER_REQUEST: {
    return Object.assign({}, state, { isLoading: true, error: null }); }
  case types.UPDATE_USER_SUCCESS: {
    return _.merge({}, state, {
      isLoading: false,
      error: null,
      items: state.items.find((guest, index, array) => {
        if (action.payload.id === guest.id) {
          array[index] = action.payload;
          return array;
        }
      }),
    }); }
  case types.UPDATE_USER_FAILURE: {
    return Object.assign({}, state, { isLoading: false, error: action.payload });
  }
  default:
    return state;
  }
}

const currentGuestInitialState = {
  firstName: '',
  lastName: '',
  email: '',
  role: 'STUDENT',
  password: '',
  login: '',
  studyGroup: null,
  isLoading: true,
  error: false,
};

export default combineReducers({
  all: guests,
  currentUser: single({
    types: [types.GET_USER_REQUEST, types.GET_USER_SUCCESS, types.GET_USER_FAILURE],
  })((state = currentGuestInitialState, action = {}) => {
    switch (action.type) {
    case types.CREATE_USER_SUCCESS:
    case types.CREATE_USER_FAILURE:
    case types.UPDATE_USER_SUCCESS: {
      return Object.assign({}, currentGuestInitialState);
    }
    case types.SET_USER_DATA: {
      return Object.assign({}, state, { [action.payload.name]: action.payload.value });
    }
    default:
      return state;
    }
  }),
});
