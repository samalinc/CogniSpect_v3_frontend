

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
  case types.LOAD_POLLS_REQUEST: {
    return Object.assign({}, state, { isLoading: true, error: null }); }
  case types.LOAD_POLLS_SUCCESS: {
    return Object.assign({}, state, {
      isLoading: false,
      error: null,
      items: action.payload,
      total: action.payload.length,
    }); }

  case types.LOAD_POLLS_FAILURE: {
    return Object.assign({}, state, {
      isLoading: false,
      error: action.payload,
    }); }

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
    name: '1',
    subject: {
      name: '1',
    },
  },
  type: 'CHOOSE',
  isLoading: true,
  error: false,
};

export default combineReducers({
  all: poll,
  currentPoll: single({
    types: [types.GET_POLL_REQUEST, types.GET_POLL_SUCCESS, types.GET_POLL_FAILURE],
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
    case types.ADD_POLL_ANSWER_TEXT: {
      return merge({}, state, {
        answers: state.answers.find((answer, index, array) => {
          if (index === action.payload.index) {
            array[index].text = action.payload.value;
            return array;
          }
        }),
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
      case 'MULTICHOOSE': {
        newAnswers.forEach((answer, index) => {
          if (index === action.payload) {
            return answer.correct = true;
          }
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
