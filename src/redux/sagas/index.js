import {
  fork,
  all,
} from 'redux-saga/effects';
import * as authSaga from './auth';
import * as users from './users';
import * as polls from './poll';
import * as topics from './topic';

export default function* rootSaga() {
  yield all([
    ...Object.values(authSaga),
    ...Object.values(users),
    ...Object.values(polls),
    ...Object.values(topics),
  ].map(fork));
}
