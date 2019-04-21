import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Confirm from './Confirm';

const MODALS_COMPONENTS = {
  // ERROR_MODAL: ErrorModal,
  // NOTIFY_MODAL: NotifyModal,
  CONFIRM_MODAL: Confirm,
  // CHATBOT_MODAL: ChatbotModal,
  // COMPLIANCE_MODAL: ComplianceModal,
};

const Modals = ({ modalType, modalProps }) => {
  if (!modalType) {
    return <span />;
  }

  const SelectedModal = MODALS_COMPONENTS[modalType];
  return <SelectedModal {...modalProps} />;
};

Modals.propTypes = {
  modalType: PropTypes.string,
  modalProps: PropTypes.object,
};

export default connect((state) => { return state.modal; })(Modals);
