
import {
  takeEvery,
  call,
  put,
  select,
} from 'redux-saga/effects';
import {
  createTestSuccess,
  createTestFailure,
  // removeTopicSuccess,
  // removeTopicFailure,
  updateTestSuccess,
  updateTestFailure,
  getTestSuccess,
  getTestFailure,
  loadTestsSuccess,
  loadTestsFailure,
} from 'redux/actions/test';
import * as types from 'redux/actions/actionTypes';
import { getUser } from 'redux/sagas/users/selectors';
import cookieStorage from 'utils/cookie';
import {
  loadTests,
  createTest,
  updateTest,
  getTest,
} from './api';
import { getCurrentTest } from './selectors';

const cookie = cookieStorage();
function* callLoadTopics({ payload }) {
  try {
    const response = yield call(loadTests, payload);
    return yield put(loadTestsSuccess(response.data));
  } catch (error) {
    return yield put(loadTestsFailure(error));
  }
}

function* callCreateTest() {
  try {
    const user = yield select(getUser);
    const test = yield select(getCurrentTest);
    const response = yield call(createTest, Object.assign({}, {
      creatorId: cookie.getItem('userId'),
      name: test.name,
      testTemplateQuestions: test.testTemplateQuestions,
    }));
    return yield put(createTestSuccess(response.data));
  } catch (error) {
    return yield put(createTestFailure(error));
  }
}

function* callUpdateTopic() {
  try {
    const test = yield select(getCurrentTest);
    const response = yield call(updateTest, test);
    return yield put(updateTestSuccess(response.data));
  } catch (error) {
    return yield put(updateTestFailure(error));
  }
}

function* callGetTopic({ payload }) {
  try {
    const response = yield call(getTest, payload);
    return yield put(getTestSuccess(response.data.content[0]));
  } catch (error) {
    return yield put(getTestFailure(error));
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
  yield takeEvery(types.LOAD_TESTS_REQUEST, callLoadTopics);
}

export function* callCreateTopicSaga() {
  yield takeEvery(types.CREATE_TEST_REQUEST, callCreateTest);
}

export function* callUpdateTopicSaga() {
  yield takeEvery(types.UPDATE_TEST_REQUEST, callUpdateTopic);
}
export function* callGetTopicSaga() {
  yield takeEvery(types.GET_TEST_REQUEST, callGetTopic);
}

// export function* callRemoveTopicSaga() {
//   yield takeEvery(types.REMOVE_TOPIC_REQUEST, callRemoveTopic);
// }

