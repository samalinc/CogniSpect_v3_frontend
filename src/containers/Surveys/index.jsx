import React from 'react';
import { Container } from 'reactstrap';
import styles from './styles.module.scss';

const Survey = () => {
  return (
    <Container>
      <div
        // onClick={this.onGroupCreated}
        className={styles.addGroup}
      >
        {'+ Create new survey0'}
      </div>
    </Container>
  );
};

export default Survey;
