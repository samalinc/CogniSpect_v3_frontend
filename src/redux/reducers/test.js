

import { combineReducers } from 'redux';
import single from 'redux/factories/single';
import * as types from 'redux/actions/actionTypes';

const initialState = {
  error: null,
  isLoading: true,
  items: [],
};

function test(state = initialState, action) {
  switch (action.type) {
  case types.REMOVE_TEST_REQUEST:
  case types.UPDATE_TEST_REQUEST:
  case types.LOAD_TESTS_REQUEST: {
    return Object.assign({}, state, {
      isLoading: true,
    }); }
  case types.REMOVE_TEST_FAILURE:
  case types.UPDATE_TEST_FAILURE:
  case types.LOAD_TESTS_FAILURE: {
    return Object.assign({}, state, {
      isLoading: false,
      error: action.payload,
    }); }
  case types.CREATE_TEST_SUCCESS: {
    return Object.assign({}, state, {
      isLoading: false,
      items: [...state.items, action.payload],
    });
  }
  case types.LOAD_SUBJECTS_SUCCESS: {
    return Object.assign({}, state, {
      isLoading: false,
      items: action.payload.content,
      total: action.payload.totalElements,
    }); }

  case types.REMOVE_TEST_SUCCESS: {
    return Object.assign({}, state, {
      isLoading: false,
      items: action.payload.filter((topic) => {
        return topic.id !== action.payload.id;
      }),
    }); }

  case types.UPDATE_TEST_SUCCESS: {
    return Object.assign({}, state, {
      isLoading: false,
      items: action.payload.find((topic, index, array) => {
        if (topic.id === action.payload.id) {
          array[index] = action.payload;
          return array;
        }
      }),
    }); }

  default:
    return state;
  }
}

const currentTopicInitialState = {
  name: '',
  isLoading: true,
  error: false,
};

export default combineReducers({
  all: test,
  currentTest: single({
    types: [types.GET_SUBJECT_SUCCESS, types.GET_SUBJECT_FAILURE, types.LOAD_SUBJECTS_REQUEST],
  })((state = currentTopicInitialState, action = {}) => {
    switch (action.type) {
    case types.SET_SUBJECT_DATA: {
      return Object.assign({}, state, {
        name: action.payload,
      });
    }
    default:
      return state;
    }
  }),
});
