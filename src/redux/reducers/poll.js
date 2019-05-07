

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
  sortAnswers: [
    {
      position: 0,
      text: '',
    },
  ],
  description: '',
  matchAnswers: [],
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
      switch (state.type) {
      case 'MULTICHOOSE':
      case 'SUBSTITUTION':
      case 'CHOOSE': {
        return Object.assign({}, state, {
          answers: [...state.answers, {
            text: '',
            correct: false,
          }],
        });
      }
      case 'SORT': {
        return Object.assign({}, state, {
          sortAnswers: [...state.sortAnswers, {
            text: '',
            position: state.sortAnswers[state.sortAnswers.length - 1].position + 1,
          }],
        });
      }
      case 'MATCH': {
        return Object.assign({}, state, {
          matchAnswers: [...state.matchAnswers, {
            key: '',
            value: '',
          }],
        });
      }
      default: return state;
      }
    }
    case types.ADD_POLL_ANSWER_TEXT: {
      switch (state.type) {
      case 'MULTICHOOSE':
      case 'SUBSTITUTION':
      case 'CHOOSE': {
        return merge({}, state, {
          answers: state.answers.find((answer, index, array) => {
            if (index === action.payload.index) {
              array[index].text = action.payload.value;
              return array;
            }
          }),
        });
      }
      case 'SORT': {
        return merge({}, state, {
          sortAnswers: state.sortAnswers.find((answer, index, array) => {
            if (index === action.payload.index) {
              array[index].text = action.payload.value;
              return array;
            }
          }),
        });
      }
      case 'MATCH': {
        return merge({}, state, {
          matchAnswers: state.matchAnswers.find((answer, index, array) => {
            if (index === action.payload.index) {
              array[index][action.payload.name] = action.payload.value;
              return array;
            }
          }),
        });
      }
      default: return state;
      }
    }
    case types.SET_SUBSTITUTION_TEMPLATE: {
      if (!state.description.split('%').find((word) => { return word === 'substitution'; })) {
        return Object.assign({}, state, {
          description: `${state.description}%substitution%`,
        });
      }
      return state;
    }
    case types.ADD_POLL_SUBSTITUTION: {
      return Object.assign({}, state, {
        substitutions: [...state.substitutions, {
          text: '',
          rightAnswer: {
            correct: true,
            text: '',
          },
        }],
      });
    }
    case types.SET_POLL_SORT_POSITION: {
      return merge({}, state, {
        sortAnswers: state.sortAnswers.find((answer, index, array) => {
          if (index === action.payload.index) {
            array[index].position = action.payload.value;
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
      case 'SUBSTITUTION': {
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

    case types.SET_SUBSTITUTION_TEXT: {
      substitutions.forEach((answer, index) => {
        if (index === action.payload.index) {

        }
      });
    }
    default:
      return state;
    }
  }),
});
