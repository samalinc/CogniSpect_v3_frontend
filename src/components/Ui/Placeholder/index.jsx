import React from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as Sad } from './images/sad.svg';
import styles from './styles.module.scss';

const Placeholder = React.memo(({ text }) => {
  return (
    <div className={styles.placeholder}>
      <Sad width="50px" height="50px" />
      <span>
        {text}
      </span>
    </div>
  );
});

Placeholder.defaultValue = {
  text: 'Sorry, no content',
};

Placeholder.propTypes = {
  text: PropTypes.string,
};

export default Placeholder;
