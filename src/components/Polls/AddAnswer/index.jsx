import React from 'react';
import styles from './styles.module.scss';

const AddAnswer = React.memo(({ addPollAnswer }) => {
  return (
    <div
      onClick={addPollAnswer}
      className={styles.addAnswer}
    >
      {'+ Add answer'}
    </div>
  );
});

AddAnswer.displayName = 'AddAnswer';

export default AddAnswer;
