const SHOW_MODAL = 'SHOW_MODAL';
const HIDE_MODAL = 'HIDE_MODAL';

const initialState = {
  modalType: null,
  modalProps: {},
};

export default function modal(state = initialState, action) {
  switch (action.type) {
  case SHOW_MODAL:
    return {
      modalType: action.modalType,
      modalProps: action.modalProps,
    };
  case HIDE_MODAL:
    return initialState;
  default:
    return state;
  }
}
