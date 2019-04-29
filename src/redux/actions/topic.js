import * as types from './actionTypes';

export const setTopicData = (payload) => {
  return {
    type: types.SET_TOPIC_DATA,
    payload,
  };
};

export const createTopicRequest = (payload) => {
  return {
    type: types.CREATE_TOPIC_REQUEST,
    payload,
  };
};

export const createTopicSuccess = (payload) => {
  return {
    type: types.CREATE_TOPIC_SUCCESS,
    payload,
  };
};

export const createTopicFailure = (payload) => {
  return {
    type: types.CREATE_TOPIC_FAILURE,
    payload,
  };
};

export const removeTopicRequest = (payload) => {
  return {
    type: types.REMOVE_TOPIC_REQUEST,
    payload,
  };
};

export const removeTopicSuccess = (payload) => {
  return {
    type: types.REMOVE_TOPIC_SUCCESS,
    payload,
  };
};

export const removeTopicFailure = (payload) => {
  return {
    type: types.REMOVE_TOPIC_FAILURE,
    payload,
  };
};

export const updateTopicRequest = (payload) => {
  return {
    type: types.UPDATE_TOPIC_REQUEST,
    payload,
  };
};

export const updateTopicSuccess = (payload) => {
  return {
    type: types.UPDATE_TOPIC_SUCCESS,
    payload,
  };
};

export const updateTopicFailure = (payload) => {
  return {
    type: types.UPDATE_TOPIC_FAILURE,
    payload,
  };
};

export const getTopicRequest = (payload) => {
  return {
    type: types.GET_TOPIC_REQUEST,
    payload,
  };
};

export const getTopicSuccess = (payload) => {
  return {
    type: types.GET_TOPIC_SUCCESS,
    payload,
  };
};

export const getTopicFailure = (payload) => {
  return {
    type: types.GET_TOPIC_FAILURE,
    payload,
  };
};


export const loadTopicsRequest = (payload) => {
  return {
    type: types.LOAD_TOPICS_REQUEST,
    payload,
  };
};

export const loadTopicsSuccess = (payload) => {
  return {
    type: types.LOAD_TOPICS_SUCCESS,
    payload,
  };
};

export const loadTopicsFailure = (payload) => {
  return {
    type: types.LOAD_TOPICS_FAILURE,
    payload,
  };
};
