
import {
  takeEvery,
  call,
  put,
} from 'redux-saga/effects';
import {
  loginSuccess,
  authFailure,
} from 'redux/actions/auth';
import * as types from 'redux/actions/actionTypes';
import cookieStorage from 'utils/cookie';
import {
  login,
  logout,
} from './api';

const cookie = cookieStorage();

function* callLogin({ payload: { data, redirect } }) {
  try {
    const response = yield call(login, data);
    yield put(loginSuccess(response.data));
    cookie.setItem('authToken', response.data.authToken);
    redirect();
  } catch (error) {
    return yield put(authFailure(error));
  }
}


export default function* loginSaga() {
  yield takeEvery(types.AUTH_USER_REQUEST, callLogin);
}
