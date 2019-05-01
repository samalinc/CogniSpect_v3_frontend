
import React from 'react';
import {
  Input,
  Col,
  Row,
} from 'reactstrap';
import styles from './styles.module.scss';

const MatchPollAnswers = ({
  onChange, index,
  setCorrectAnswer, answer,
  setPollSortPosition,
}) => {
  return (
    <Row className={styles.answer}>
      <Col className="pl-0" xs="6">
        <Input
          type="textarea"
          onChange={(event) => {
            return onChange({
              index,
              name: event.target.name,
              value: event.target.value,
            });
          }}
          name="key"
          placeholder="Key"
          defaultValue={answer.text}
          className="mr-4"
        />
      </Col>
      <Col className="pr-0" xs="6">
        <Input
          type="textarea"
          defaultValue={answer.position}
          max={index}
          onChange={(event) => {
            return onChange({
              index,
              name: event.target.name,
              value: event.target.value,
            });
          }}
          name="value"
          placeholder="Value"
          className="mr-4"
        />
      </Col>
    </Row>
  );
};

export default MatchPollAnswers;
