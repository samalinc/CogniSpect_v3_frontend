import _ from 'lodash';
import * as types from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  items: [],
  error: null,
  text: null,
};
export default function questions(state = initialState, action) {
  switch (action.type) {
  case types.SET_QUESTION_TRANSLATION: {
    return Object.assign({}, state, { translation: action.payload });
  }
  case types.GET_ANSWERS_REQUEST: {
    return Object.assign({}, state, { isLoading: true });
  }
  case types.GET_ANSWERS_SUCCESS: {
    return Object.assign({}, state, { isLoading: false, error: null, items: action.payload });
  }
  case types.GET_ANSWERS_FAILURE: {
    return Object.assign({}, state, { isLoading: false, error: action.payload });
  }
  case types.PATCH_ANSWER_REQUEST: {
    return Object.assign({}, state, { isLoading: true });
  }
  case types.PATCH_ANSWER_SUCCESS: {
    return _.merge({}, state, {
      isLoading: false,
      error: null,
      items: state.items.find((answer, index, array) => {
        if (answer.id === action.payload.id) {
          array[index] = action.payload;
          return array;
        }
      }),
    });
  }
  case types.PATCH_ANSWER_FAILURE: {
    return Object.assign({}, state, { isLoading: false, error: action.payload });
  }
  case types.CREATE_ANSWER_REQUEST: {
    return Object.assign({}, state, { isLoading: true });
  }
  case types.CREATE_ANSWER_SUCCESS: {
    return _.merge({}, state, {
      isLoading: false,
      error: null,
    });
  }
  case types.CREATE_ANSWER_FAILURE: {
    return Object.assign({}, state, { isLoading: false, error: action.payload });
  }
  case types.QA_ANSWER_RECEIVED: {
    return Object.assign({}, state, { items: [...state.items, action.payload] });
  }
  default: return state;
  }
}
