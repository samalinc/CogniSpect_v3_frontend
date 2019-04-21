import React from 'react';
import styles from './styles.module.scss';

const AddAnswer = () => {
  return (
    <div
      // onClick={this.onGroupCreated}
      className={styles.addAnswer}
    >
      {'+ Add answer'}
    </div>
  );
};

export default AddAnswer;
