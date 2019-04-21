import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DefaultModal, Button } from 'components';
import { hideModal } from 'redux/actions/modal';


class ConfirmModal extends Component {
  static propTypes = {
    additionalFooterContent: PropTypes.node,
    cancelAsCrossButton: PropTypes.bool,
    cancelButtonTitle: PropTypes.node,
    confirmButtonTitle: PropTypes.node,
    hideModal: PropTypes.func,
    message: PropTypes.node,
    onConfirm: PropTypes.func,
    onHide: PropTypes.func,
    isError: PropTypes.bool,
    title: PropTypes.node,
    type: PropTypes.string,
    declineButtonTitle: PropTypes.node,
    isDisabled: PropTypes.bool,
  }

  static defaultProps = {
    additionalFooterContent: null,
    cancelAsCrossButton: false,
    cancelButtonTitle: 'Take Me Back',
    confirmButtonTitle: 'OK',
    declineButtonTitle: 'Cancel',
    isError: false,
    hideModal: () => {},
    message: null,
    onConfirm: () => {},
    onHide: () => {},
    title: null,
    type: null,
    isDisabled: false,
  }

  constructor() {
    super();

    this.onConfirm = ::this.onConfirm;
    this.onHide = ::this.onHide;
  }

  onConfirm() {
    const {
      hideModal,
      confirmAction,
      isError,
    } = this.props;

    confirmAction();
    hideModal();
  }

  onHide() {
    const {
      hideModal,
      hideAction,
    } = this.props;

    if (hideAction) { hideAction(); }
    hideModal();
  }

  render() {
    const {
      additionalFooterContent,
      title,
      message,
      confirmButtonTitle,
      declineButtonTitle,
      type,
      style,
      isDisabled,
    } = this.props;

    return (
      <DefaultModal
        additionalFooterContent={additionalFooterContent}
        handleClose={this.onHide}
        title={title}
        type={type}
        style={style}
        buttons={[
          <Button
            className={`btn btn-${type || 'secondary'}`}
            value={confirmButtonTitle}
            onClick={this.onConfirm}
            highlighted
            disabled={isDisabled}
          />,
          <Button
            className="btn btn-secondary ml-2"
            value={declineButtonTitle}
            onClick={this.onHide}
            highlighted
          />,
        ]}
        show
      >
        {message}
      </DefaultModal>
    );
  }
}

export default connect(() => { return {}; }, {
  hideModal: () => { return hideModal('CONFIRM_MODAL'); },
})(ConfirmModal);
