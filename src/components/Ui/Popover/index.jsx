import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

import classNames from 'classnames/bind';

import styles from './style.module.scss';

class Popover extends React.Component {
  constructor() {
    super();

    this.hideClick = this.hideClick.bind(this);
    this.stopPropagation = this.stopPropagation.bind(this);

    this.state = {
      isShown: false,
    };

    this.cx = classNames.bind(styles);
  }

  componentDidMount() {
    window.addEventListener('click', this.hideClick, false);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(
      isEqual(this.props, nextProps)
      && isEqual(this.state, nextState)
    );
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.hideClick, false);
  }

  hideClick() {
    this.setState({ isShown: false });
  }

  triggerPopover(e) {
    this.setState({ isShown: !this.state.isShown });

    this.stopPropagation(e);
  }

  stopPropagation(e) {
    e.stopPropagation();
  }

  render() {
    const classes = this.cx({
      [styles.popover]: true,
      [styles.shown]: this.state.isShown,
      [styles.topLeft]: this.props.position === 'topLeft',
      [styles.topRight]: this.props.position === 'topRight',
      [styles.bottomLeft]: this.props.position === 'bottomLeft',
      [styles.bottomRight]: this.props.position === 'bottomRight',

      [styles.arrowTopLeft]: this.props.arrowPosition === 'arrowTopLeft',
      [styles.arrowTopRight]: this.props.arrowPosition === 'arrowTopRight',
      [styles.arrowTopCenter]: this.props.arrowPosition === 'arrowTopCenter',
      [styles.arrowBottomLeft]: this.props.arrowPosition === 'arrowBottomLeft',
      [styles.arrowBottomRight]: this.props.arrowPosition === 'arrowBottomRight',
      [styles.noArrow]: this.props.arrowPosition === 'noArrow',
    });

    return (
      <div
        className={classes}
        style={this.props.styles}
      >
        {this.props.children}
      </div>
    );
  }
}

Popover.propTypes = {
  arrowPosition: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  styles: PropTypes.object,

  children: PropTypes.element.isRequired,
};

export default Popover;
