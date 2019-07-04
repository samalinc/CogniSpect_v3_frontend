import * as types from './actionTypes';

export const setVariantData = (payload) => {
  return {
    type: types.SET_VARIANT_DATA,
    payload,
  };
};

export const createVariantRequest = (payload) => {
  return {
    type: types.CREATE_VARIANT_REQUEST,
    payload,
  };
};

export const createVariantSuccess = (payload) => {
  return {
    type: types.CREATE_VARIANT_SUCCESS,
    payload,
  };
};

export const createVariantFailure = (payload) => {
  return {
    type: types.CREATE_VARIANT_FAILURE,
    payload,
  };
};

export const removeVariantRequest = (payload) => {
  return {
    type: types.REMOVE_VARIANT_REQUEST,
    payload,
  };
};

export const removeVariantSuccess = (payload) => {
  return {
    type: types.REMOVE_VARIANT_SUCCESS,
    payload,
  };
};

export const removeVariantFailure = (payload) => {
  return {
    type: types.REMOVE_VARIANT_FAILURE,
    payload,
  };
};

export const updateVariantRequest = (payload) => {
  return {
    type: types.UPDATE_VARIANT_REQUEST,
    payload,
  };
};

export const updateVariantSuccess = (payload) => {
  return {
    type: types.UPDATE_VARIANT_SUCCESS,
    payload,
  };
};

export const updateVariantFailure = (payload) => {
  return {
    type: types.UPDATE_VARIANT_FAILURE,
    payload,
  };
};

export const getVariantRequest = (payload) => {
  return {
    type: types.GET_VARIANT_REQUEST,
    payload,
  };
};

export const getVariantSuccess = (payload) => {
  return {
    type: types.GET_VARIANT_SUCCESS,
    payload,
  };
};

export const getVariantFailure = (payload) => {
  return {
    type: types.GET_VARIANT_FAILURE,
    payload,
  };
};


export const loadVariantsRequest = (payload) => {
  return {
    type: types.LOAD_VARIANTS_REQUEST,
    payload,
  };
};

export const loadVariantsSuccess = (payload) => {
  return {
    type: types.LOAD_VARIANTS_SUCCESS,
    payload,
  };
};

export const loadVariantsFailure = (payload) => {
  return {
    type: types.LOAD_VARIANTS_FAILURE,
    payload,
  };
};


export const addRouter = (payload) => {
  return {
    type: types.ADD_ROUTER,
    payload,
  };
};


export const addUser = (payload) => {
  return {
    type: types.ADD_USER,
    payload,
  };
};

