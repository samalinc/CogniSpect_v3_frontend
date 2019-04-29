import { createSelector } from 'reselect';

const topic = (state) => { return state.topic.currentTopic; };
const topics = (state) => { return state.topic.all; };

export const getCurrentTopic = createSelector(
  [topic],
  (topic) => {
    return topic;
  },
);

export const getTopics = createSelector(
  [topics],
  (topics) => {
    return topics;
  },
);
