
import {
  takeEvery,
  call,
  put,
  select,
} from 'redux-saga/effects';
import {
  createSubjectSuccess,
  createSubjectFailure,
  // removeTopicSuccess,
  // removeTopicFailure,
  updateSubjectSuccess,
  updateSubjectFailure,
  getSubjectSuccess,
  getSubjectFailure,
  loadSubjectsSuccess,
  loadSubjectsFailure,
} from 'redux/actions/subject';
import * as types from 'redux/actions/actionTypes';
import {
  loadSubjects,
  createSubject,
  updateSubject,
  getSubject,
} from './api';
import { getCurrentSubject } from './selectors';

function* callLoadTopics({ payload }) {
  try {
    const response = yield call(loadSubjects, payload);
    return yield put(loadSubjectsSuccess(response.data));
  } catch (error) {
    return yield put(loadSubjectsFailure(error));
  }
}

function* callCreateTopic() {
  try {
    const user = yield select(getCurrentSubject);
    const response = yield call(createSubject, user);
    return yield put(createSubjectSuccess(response.data));
  } catch (error) {
    return yield put(createSubjectFailure(error));
  }
}

function* callUpdateTopic() {
  try {
    const user = yield select(getCurrentSubject);
    const response = yield call(updateSubject, user);
    return yield put(updateSubjectSuccess(response.data));
  } catch (error) {
    return yield put(updateSubjectFailure(error));
  }
}

function* callGetTopic({ payload }) {
  try {
    const response = yield call(getSubject, payload);
    return yield put(getSubjectSuccess(response.data.content[0]));
  } catch (error) {
    return yield put(getSubjectFailure(error));
  }
}

// function* callRemoveTopic({ payload }) {
//   try {
//     const response = yield call(getTopic, payload);
//     return yield put(removeTopicSuccess(response.data));
//   } catch (error) {
//     return yield put(removeTopicFailure(error));
//   }
// }

export function* callLoadTopicsSaga() {
  yield takeEvery(types.LOAD_SUBJECTS_REQUEST, callLoadTopics);
}

export function* callCreateTopicSaga() {
  yield takeEvery(types.CREATE_SUBJECT_REQUEST, callCreateTopic);
}

export function* callUpdateTopicSaga() {
  yield takeEvery(types.UPDATE_SUBJECT_REQUEST, callUpdateTopic);
}
export function* callGetTopicSaga() {
  yield takeEvery(types.GET_SUBJECT_REQUEST, callGetTopic);
}

// export function* callRemoveTopicSaga() {
//   yield takeEvery(types.REMOVE_TOPIC_REQUEST, callRemoveTopic);
// }
