import { createSelector } from 'reselect';

const poll = (state) => { return state.poll.currentPoll; };
const polls = (state) => { return state.poll.all; };

export const getPoll = createSelector(
  [poll],
  (poll) => {
    return poll;
  },
);

export const getPolls = createSelector(
  [polls],
  (polls) => {
    return polls;
  },
);
