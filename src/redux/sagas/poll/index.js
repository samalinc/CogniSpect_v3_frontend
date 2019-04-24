
import {
  takeEvery,
  call,
  put,
  select,
} from 'redux-saga/effects';
import {
  loadPollsSuccess,
  loadPollsFailure,
  createPollSuccess,
  createPollFailure,
} from 'redux/actions/poll';
import * as types from 'redux/actions/actionTypes';
import {
  loadPolls,
  createPoll,
} from './api';
import { getPoll } from './selectors';

function* callLoadPolls({ payload: { query } }) {
  try {
    const response = yield call(loadPolls, query);
    return yield put(loadPollsSuccess(response.data));
  } catch (error) {
    return yield put(loadPollsFailure(error));
  }
}

function* callCreatePoll() {
  try {
    const user = yield select(getPoll);
    const response = yield call(createPoll, user);
    return yield put(createPollSuccess(response.data));
  } catch (error) {
    return yield put(createPollFailure(error));
  }
}

export function* callLoadPollSaga() {
  yield takeEvery(types.LOAD_POLLS_REQUEST, callLoadPolls);
}

export function* callCreatePollSaga() {
  yield takeEvery(types.CREATE_POLL_REQUEST, callCreatePoll);
}
