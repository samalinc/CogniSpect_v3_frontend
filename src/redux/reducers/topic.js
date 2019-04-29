

import { combineReducers } from 'redux';
import single from 'redux/factories/single';
import * as types from 'redux/actions/actionTypes';

const initialState = {
  error: null,
  isLoading: true,
  items: [],
};

function topic(state = initialState, action) {
  switch (action.type) {
  case types.UPDATE_TOPIC_REQUEST:
  case types.REMOVE_TOPIC_REQUEST:
  case types.LOAD_TOPICS_REQUEST: {
    return Object.assign({}, state, {
      isLoading: true,
    }); }
  case types.UPDATE_TOPIC_FAILURE:
  case types.REMOVE_TOPIC_FAILURE:
  case types.LOAD_TOPICS_FAILURE: {
    return Object.assign({}, state, {
      isLoading: false,
      error: action.payload,
    }); }

  case types.LOAD_TOPICS_SUCCESS: {
    return Object.assign({}, state, {
      isLoading: false,
      items: action.payload,
      total: action.payload.length,
    }); }

  case types.REMOVE_TOPIC_SUCCESS: {
    return Object.assign({}, state, {
      isLoading: false,
      items: action.payload.filter((topic) => {
        return topic.id !== action.payload.id;
      }),
    }); }

  case types.UPDATE_TOPIC_SUCCESS: {
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
  subject: {
    name: '',
  },
  isLoading: true,
  error: false,
};

export default combineReducers({
  all: topic,
  currentTopic: single({
    types: [types.GET_TOPIC_REQUEST, types.GET_TOPIC_SUCCESS, types.GET_TOPIC_FAILURE],
  })((state = currentTopicInitialState, action = {}) => {
    switch (action.type) {
    case types.SET_TOPIC_DATA: {
      if (action.payload.name === 'topic') {
        return Object.assign({}, state, {
          name: action.payload.value,
        });
      }
      if (action.payload.name === 'subject') {
        return {
          ...state,
          subject: {
            ...state.subject,
            name: action.payload.value,
          },
        };
      }
      return Object.assign({}, state, {
        [action.payload.name]: action.payload.value,
      });
    }
    default:
      return state;
    }
  }),
});
