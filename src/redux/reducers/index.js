import { combineReducers } from 'redux';
import app from './app';
import auth from './auth';
import modal from './modal';
import users from './users';
import poll from './poll';
import topic from './topic';
import subjects from './subject';
import test from './test';

export default combineReducers({
  app,
  auth,
  modal,
  users,
  poll,
  topic,
  subjects,
  test,
});

