import * as types from './actionTypes';

export const setPollData = (payload) => {
  return {
    type: types.SET_POLL_DATA,
    payload,
  };
};

export const addPollAnswer = (payload) => {
  return {
    type: types.ADD_POLL_ANSWER,
    payload,
  };
};

export const setPollSortPosition = (payload) => {
  return {
    type: types.SET_POLL_SORT_POSITION,
    payload,
  };
};

export const addPollSubstitution = (payload) => {
  return {
    type: types.ADD_POLL_SUBSTITUTION,
    payload,
  };
};

export const resetPollData = () => {
  return {
    type: types.RESET_POLL_DATA,
  };
};

export const setCorrectAnswer = (payload) => {
  return {
    type: types.SET_CORRECT_ANSWER,
    payload,
  };
};

export const createPollRequest = (payload) => {
  return {
    type: types.CREATE_POLL_REQUEST,
    payload,
  };
};

export const createPollSuccess = (payload) => {
  return {
    type: types.CREATE_POLL_SUCCESS,
    payload,
  };
};

export const createPollFailure = (payload) => {
  return {
    type: types.CREATE_POLL_FAILURE,
    payload,
  };
};

export const removePollRequest = (payload) => {
  return {
    type: types.REMOVE_POLL_REQUEST,
    payload,
  };
};

export const removePollSuccess = (payload) => {
  return {
    type: types.REMOVE_POLL_SUCCESS,
    payload,
  };
};

export const removePollFailure = (payload) => {
  return {
    type: types.REMOVE_POLL_FAILURE,
    payload,
  };
};

export const updatePollRequest = (payload) => {
  return {
    type: types.UPDATE_POLL_REQUEST,
    payload,
  };
};

export const updatePollSuccess = (payload) => {
  return {
    type: types.UPDATE_POLL_SUCCESS,
    payload,
  };
};

export const updatePollFailure = (payload) => {
  return {
    type: types.UPDATE_POLL_FAILURE,
    payload,
  };
};

export const loadPollsRequest = (payload) => {
  return {
    type: types.LOAD_POLLS_REQUEST,
    payload,
  };
};

export const loadPollsSuccess = (payload) => {
  return {
    type: types.LOAD_POLLS_SUCCESS,
    payload,
  };
};

export const loadPollsFailure = (payload) => {
  return {
    type: types.LOAD_POLLS_FAILURE,
    payload,
  };
};

export const addPollAnswerText = (payload) => {
  return {
    type: types.ADD_POLL_ANSWER_TEXT,
    payload,
  };
};

