import React from 'react';
import { Container } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import styles from './styles.module.scss';

const Survey = ({ history }) => {
  return (
    <Container>
      <div
        onClick={() => { return history.push('/surveys/new'); }}
        className={styles.addGroup}
      >
        {'+ Create new survey'}
      </div>
    </Container>
  );
};

export default Survey;
