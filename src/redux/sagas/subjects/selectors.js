import { createSelector } from 'reselect';

const subject = (state) => { return state.subjects.currentSubject; };
const subjects = (state) => { return state.subjects.all; };

export const getCurrentSubject = createSelector(
  [subject],
  (state) => {
    return state;
  },
);

export const getSubjects = createSelector(
  [subjects],
  (state) => {
    return state;
  },
);
