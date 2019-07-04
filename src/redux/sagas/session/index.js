
import {
  takeEvery,
  call,
  put,
  select,
} from 'redux-saga/effects';
import {
  createVariantSuccess,
  createVariantFailure,
  removeVariantFailure,
  updateVariantSuccess,
  updateVariantFailure,
  getVariantSuccess,
  getVariantFailure,
  loadVariantsSuccess,
  loadVariantsFailure,
} from 'redux/actions/variants';
import * as types from 'redux/actions/actionTypes';
import cookieStorage from 'utils/cookie';
import {
  loadSessions,
  createSession,
  updateSession,
  getSession,
} from './api';
import { getCurrentSession } from './selectors';

const cookie = cookieStorage();

function* callLoadSessions({ payload }) {
  try {
    const response = yield call(loadSessions, payload);
    return yield put(loadVariantsSuccess(response.data));
  } catch (error) {
    return yield put(loadVariantsFailure(error));
  }
}

function* callCreateSession() {
  try {
    const topic = yield select(getCurrentSession);
    const response = yield call(createSession, Object.assign({}, topic, {
      creatorId: cookie.getItem('userId'),
      status: 'STARTED',
    }));
    return yield put(createVariantSuccess(response.data));
  } catch (error) {
    return yield put(createVariantFailure(error));
  }
}

function* callUpdateSession() {
  try {
    const topic = yield select(getCurrentSession);
    const response = yield call(updateSession, topic);
    return yield put(updateVariantSuccess(response.data));
  } catch (error) {
    return yield put(updateVariantFailure(error));
  }
}

function* callGetSession({ payload }) {
  try {
    const response = yield call(getSession, payload);
    return yield put(getVariantSuccess(response.data));
  } catch (error) {
    return yield put(getVariantFailure(error));
  }
}

// function* callRemoveSession({ payload }) {
//   try {
//     const response = yield call(getTopic, payload);
//     return yield put(removeVariantSuccess(response.data));
//   } catch (error) {
//     return yield put(removeVariantFailure(error));
//   }
// }

export function* callLoadTopicsSaga() {
  yield takeEvery(types.LOAD_VARIANTS_REQUEST, callLoadSessions);
}

export function* callCreateTopicSaga() {
  yield takeEvery(types.CREATE_VARIANT_REQUEST, callCreateSession);
}

export function* callUpdateTopicSaga() {
  yield takeEvery(types.UPDATE_VARIANT_REQUEST, callUpdateSession);
}
export function* callGetTopicSaga() {
  yield takeEvery(types.GET_VARIANT_REQUEST, callGetSession);
}

// export function* callRemoveTopicSaga() {
//   yield takeEvery(types.REMOVE_VARIANT_REQUEST, callRemoveSession);
// }
