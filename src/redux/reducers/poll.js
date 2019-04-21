

import { combineReducers } from 'redux';
import single from 'redux/factories/single';
import * as types from 'redux/actions/actionTypes';
import merge from 'lodash/merge';

const initialState = {
  error: null,
  isLoading: true,
  items: [],
};

function poll(state = initialState, action) {
  switch (action.type) {
  default:
    return state;
  }
}

const currentPollInitialState = {
  answers: [{
    text: '',
    correct: false,
  }],
  description: '',
  matchAnswers: [],
  sortAnswers: [],
  substitutions: [],
  topic: {
    name: '',
    subject: {
      name: '',
    },
  },
  type: 'CHOOSE',
  isLoading: true,
  error: false,
};

export default combineReducers({
  all: poll,
  currentPoll: single({
    types: [types.GET_USER_REQUEST, types.GET_USER_SUCCESS, types.GET_USER_FAILURE],
  })((state = currentPollInitialState, action = {}) => {
    switch (action.type) {
    case types.SET_POLL_DATA: {
      return Object.assign(state, {
        [action.payload.name]: action.payload.value,
      });
    }
    case types.RESET_POLL_DATA: {
      return currentPollInitialState;
    }
    case types.ADD_POLL_ANSWER: {
      return Object.assign({}, state, {
        answers: [...state.answers, {
          text: '',
          correct: false,
        }],
      });
    }
    case types.SET_CORRECT_ANSWER: {
      const newAnswers = state.answers;
      switch (state.type) {
      case 'CHOOSE': {
        newAnswers.forEach((answer, index) => {
          if (index === action.payload) {
            return answer.correct = true;
          }
          answer.correct = false;
          return answer;
        });
        break;
      }
      default: return null;
      }

      return Object.assign({}, state, { answers: newAnswers });
    }
    default:
      return state;
    }
  }),
});
