import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Modal,
  ModalHeader,
  ModalFooter,
  Form,
} from 'reactstrap';
import styles from './styles.module.scss';

class DefaultModal extends Component {
  static defaultProps = {
    hideFooter: false,
    showCloseButton: false,
  };

  static propTypes = {
    handleClose: PropTypes.func,
    show: PropTypes.bool.isRequired,
    title: PropTypes.node,
    buttons: PropTypes.node,
    children: PropTypes.node,
    hideFooter: PropTypes.bool,
    showCloseButton: PropTypes.bool,
  }

  renderHeader() {
    const { title } = this.props;
    return (
      <ModalHeader>{title}</ModalHeader>
    );
  }

  renderFooter() {
    const {
      buttons,
    } = this.props;

    return (
      <ModalFooter>
        <div className={styles.ModalButtonsContainer}>
          {buttons.map((button, id) => {
            return (
              <div className={styles.ModalButton} key={id}>
                {button}
              </div>
            );
          })}
        </div>
      </ModalFooter>
    );
  }

  render() {
    const {
      onToggle,
      children,
      type,
      title,
      footer,
      style,
      isDisabled,
    } = this.props;
    return (
      <Modal
        isDisabled={isDisabled}
        centered
        isOpen
        toggle={onToggle}
        className={`modal-${type || ''}`}
        style={style}
      >
        {
          title
          && this.renderHeader()
        }
        <Form className="p-3">
          {
            children
          }
        </Form>
        {
          !footer
          && this.renderFooter()
        }
      </Modal>
    );
  }
}

export default DefaultModal;
