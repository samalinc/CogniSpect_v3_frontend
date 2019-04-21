import React from 'react';
import PropTypes from 'prop-types';

import Pagination from 'rc-pagination';

import './pagination.scss';

const Paginate = React.memo(({ total, onChange, current }) => {
  if (total >= 10) {
    return (
      <Pagination
        current={current}
        onChange={onChange}
        total={total}
      />
    );
  }
  return null;
});

Paginate.propTypes = {
  current: PropTypes.number,
  total: PropTypes.number,
  onChange: PropTypes.func,
};

export default Paginate;
