import {
  fork,
  all,
} from 'redux-saga/effects';
import * as authSaga from './auth';
import * as users from './users';
import * as polls from './poll';
import * as topics from './topic';
import * as subjects from './subjects';
import * as test from './test';
import * as session from './session';

export default function* rootSaga() {
  yield all([
    ...Object.values(authSaga),
    ...Object.values(users),
    ...Object.values(polls),
    ...Object.values(topics),
    ...Object.values(subjects),
    ...Object.values(test),
    ...Object.values(session),
  ].map(fork));
}
