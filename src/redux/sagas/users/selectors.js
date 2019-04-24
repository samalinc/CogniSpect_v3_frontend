import { createSelector } from 'reselect';

const users = (state) => { return state.users.all; };
const user = (state) => { return state.users.currentUser; };

export const getUsers = createSelector(
  [users],
  (users) => {
    return users;
  },
);

export const getUser = createSelector(
  [user],
  (user) => {
    return user;
  },
);
