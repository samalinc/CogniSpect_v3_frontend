import React from 'react';
import PropTypes from 'prop-types';
import { SortableList } from 'components';

const Sortable = React.memo(
  ({
    sortableItem, items, sortAction,
  }) => {
    return (
      <SortableList
        useDragHandle
        shouldCancelStart={(event) => {
          const disabledElements = [
            'input',
            'textarea',
            'select',
            'option',
            'button',
            'svg',
          ];

          if (
            disabledElements.indexOf(event.target.tagName.toLowerCase()) !== -1
          ) {
            return true;
          }
          return false;
        }}
        itemComponent={sortableItem}
        items={items}
        onSortEnd={sortAction}
      />
    );
  },
);

Sortable.propTypes = {
  items: PropTypes.array,
  sortableItem: PropTypes.Component,
  sortAction: PropTypes.func,
};

export default Sortable;
