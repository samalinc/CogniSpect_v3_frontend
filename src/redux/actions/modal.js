import * as types from './actionTypes';

export function showModal(modalType, modalProps) {
  return {
    type: types.SHOW_MODAL,
    modalType,
    modalProps,
  };
}

export function hideModal() {
  return {
    type: types.HIDE_MODAL,
  };
}
