import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import app from './app';
import auth from './auth';
import modal from './modal';
import users from './users';

export default combineReducers({
  app,
  auth,
  modal,
  users,
});

