import * as types from '../actions/actionTypes';

const initialState = {
  location: {
    pathname: '/meetings',
  },
  sended: null,
  loader: false,
};

export default function app(state = initialState, action) {
  switch (action.type) {
  case types.SET_PAGE:
    return {
      ...state,
      location: action.payload,
    };
  default:
    return state;
  }
}
