
import {
  takeEvery,
  call,
  put,
  select,
} from 'redux-saga/effects';
import {
  createTopicSuccess,
  createTopicFailure,
  removeTopicSuccess,
  removeTopicFailure,
  updateTopicSuccess,
  updateTopicFailure,
  getTopicSuccess,
  getTopicFailure,
  loadTopicsSuccess,
  loadTopicsFailure,
} from 'redux/actions/topic';
import * as types from 'redux/actions/actionTypes';
import {
  loadTopics,
  createTopic,
  updateTopic,
  getTopic,
} from './api';
import { getCurrentTopic } from './selectors';

function* callLoadTopics({ payload }) {
  console.log(payload);
  try {
    const response = yield call(loadTopics, payload);
    return yield put(loadTopicsSuccess(response.data));
  } catch (error) {
    return yield put(loadTopicsFailure(error));
  }
}

function* callCreateTopic() {
  try {
    const topic = yield select(getCurrentTopic);
    const response = yield call(createTopic, topic);
    return yield put(createTopicSuccess(response.data));
  } catch (error) {
    return yield put(createTopicFailure(error));
  }
}

function* callUpdateTopic() {
  try {
    const topic = yield select(getCurrentTopic);
    const response = yield call(updateTopic, topic);
    return yield put(updateTopicSuccess(response.data));
  } catch (error) {
    return yield put(updateTopicFailure(error));
  }
}

function* callGetTopic({ payload }) {
  try {
    const response = yield call(getTopic, payload);
    return yield put(getTopicSuccess(response.data));
  } catch (error) {
    return yield put(getTopicFailure(error));
  }
}

function* callRemoveTopic({ payload }) {
  try {
    const response = yield call(getTopic, payload);
    return yield put(removeTopicSuccess(response.data));
  } catch (error) {
    return yield put(removeTopicFailure(error));
  }
}

export function* callLoadTopicsSaga() {
  yield takeEvery(types.LOAD_TOPICS_REQUEST, callLoadTopics);
}

export function* callCreateTopicSaga() {
  yield takeEvery(types.CREATE_TOPIC_REQUEST, callCreateTopic);
}

export function* callUpdateTopicSaga() {
  yield takeEvery(types.UPDATE_TOPIC_REQUEST, callUpdateTopic);
}
export function* callGetTopicSaga() {
  yield takeEvery(types.GET_TOPIC_REQUEST, callGetTopic);
}

export function* callRemoveTopicSaga() {
  yield takeEvery(types.REMOVE_TOPIC_REQUEST, callRemoveTopic);
}
