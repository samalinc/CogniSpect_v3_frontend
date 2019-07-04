import { createSelector } from 'reselect';

const session = (state) => { return state.session.currentVariant; };
const sessions = (state) => { return state.session.all; };

export const getCurrentSession = createSelector(
  [session],
  (state) => {
    return state;
  },
);

export const getSessions = createSelector(
  [sessions],
  (state) => {
    return state;
  },
);
