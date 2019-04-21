import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {
  const {
    className,
    icon,
    value,
    onClick,
    type,
    disabled,
    style,
    outline,
  } = props;
  return (
    <button
      style={style}
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={className}
      outline={outline}
    >
      {value}
      <i className={icon} />
    </button>
  );
}

Button.deafultValue = {
  className: '',
  icon: '',
  value: '',
  outline: false,
};

Button.propsTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
  value: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
