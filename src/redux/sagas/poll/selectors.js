import { createSelector } from 'reselect';

const poll = (state) => { return state.poll.currentPoll; };

export const getPoll = createSelector(
  [poll],
  (poll) => {
    return poll;
  },
);
