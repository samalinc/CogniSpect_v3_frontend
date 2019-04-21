import React from 'react';
import {
  SortableContainer,
} from 'react-sortable-hoc';
import className from 'classnames';
import styles from './styles.module.scss';

const SortableList = React.memo(SortableContainer(
  ({ itemComponent: ItemComponent, items }) => {
    return (
      <ul className={className(styles.sortbaleList, styles.scroll)}>
        {items.map((value, index) => {
          return (
            <ItemComponent
              key={`item-${index}`}
              index={index}
              value={value}
            />
          );
        })}
      </ul>
    );
  },
));

export default SortableList;
