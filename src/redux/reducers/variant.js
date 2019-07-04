

import { combineReducers } from 'redux';
import single from 'redux/factories/single';
import merge from 'lodash/merge';
import * as types from 'redux/actions/actionTypes';

const initialState = {
  error: null,
  isLoading: true,
  items: [],
};

function test(state = initialState, action) {
  switch (action.type) {
  case types.REMOVE_VARIANT_REQUEST:
  case types.UPDATE_VARIANT_REQUEST:
  case types.LOAD_VARIANTS_REQUEST: {
    return Object.assign({}, state, {
      isLoading: true,
    }); }
  case types.REMOVE_VARIANT_FAILURE:
  case types.UPDATE_VARIANT_FAILURE:
  case types.LOAD_VARIANTS_FAILURE: {
    return Object.assign({}, state, {
      isLoading: false,
      error: action.payload,
    }); }

  case types.CREATE_VARIANT_SUCCESS: {
    return Object.assign({}, state, {
      isLoading: false,
      items: [...state.items, action.payload],
    });
  }
  case types.LOAD_VARIANTS_SUCCESS: {
    return Object.assign({}, state, {
      isLoading: false,
      items: action.payload.content,
      total: action.payload.totalElements,
    }); }

  case types.REMOVE_VARIANT_SUCCESS: {
    return Object.assign({}, state, {
      isLoading: false,
      items: action.payload.filter((topic) => {
        return topic.id !== action.payload.id;
      }),
    }); }

  case types.UPDATE_VARIANT_SUCCESS: {
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
  testTemplateId: null,
  routers: ['', '', '', ''],
  studentIds: [],
  status: 'STARTED',
};

export default combineReducers({
  all: test,
  currentVariant: single({
    types: [types.GET_VARIANT_REQUEST, types.GET_VARIANT_SUCCESS, types.GET_VARIANT_FAILURE],
  })((state = currentTopicInitialState, action = {}) => {
    switch (action.type) {
    case types.SET_VARIANT_DATA: {
      return Object.assign({}, state, {
        [action.payload.name]: action.payload.value,
      });
    }
    case types.ADD_ROUTER: {
      return merge({}, state, {
        routers: state.routers.find((router, index, array) => {
          if (index === action.payload.index) {
            array[index] = action.payload.value;
          }
        }),
      });
    }
    case types.ADD_USER: {
      const user = state.studentIds.find((id) => { return id === action.payload.id; });
      if (user) {
        return Object.assign({}, state, {
          studentIds: state.studentIds.filter((id) => {
            return id !== action.payload.id;
          }),
        });
      }
      return merge({}, state, {
        studentIds: [...state.studentIds, action.payload.id],
      });
    }
    default:
      return state;
    }
  }),
});
