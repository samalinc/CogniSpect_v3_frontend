
// import ApiClient from 'utils/api';
// import errorHandler from 'utils/error';
import * as types from './actionTypes';

export function setPage(path) {
  return {
    type: types.SET_PAGE,
    payload: path,
  };
}


