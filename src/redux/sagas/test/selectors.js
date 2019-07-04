import { createSelector } from 'reselect';

const test = (state) => { return state.test.currentTest; };
const tests = (state) => { return state.test.all; };

export const getCurrentTest = createSelector(
  [test],
  (state) => {
    return state;
  },
);

export const getTests = createSelector(
  [tests],
  (state) => {
    return state;
  },
);
