
import {
  takeEvery,
  call,
  put,
  select,
} from 'redux-saga/effects';
import {
  loadUsersSuccess,
  loadUsersFailure,
  createUserSuccess,
  createUserFailure,
} from 'redux/actions/users';
import * as types from 'redux/actions/actionTypes';
import {
  loadUsers,
  createUser,
} from './api';
import { getUser } from './selectors';

function* callLoadUsers({ payload }) {
  try {
    const response = yield call(loadUsers, payload);
    return yield put(loadUsersSuccess(response.data));
  } catch (error) {
    return yield put(loadUsersFailure(error));
  }
}

function* callCreateUser() {
  try {
    const user = yield select(getUser);
    const response = yield call(createUser, user);
    return yield put(createUserSuccess(response.data));
  } catch (error) {
    return yield put(createUserFailure(error));
  }
}

export function* callLoadUsersSaga() {
  yield takeEvery(types.LOAD_USERS_REQUEST, callLoadUsers);
}

export function* callCreateUserSaga() {
  yield takeEvery(types.CREATE_USER_REQUEST, callCreateUser);
}
