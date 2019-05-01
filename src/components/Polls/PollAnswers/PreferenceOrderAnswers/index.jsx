import React from 'react';
import {
  Input,
  Col,
  Row,
} from 'reactstrap';
import styles from './styles.module.scss';

const PreferenceOrderAnswers = ({
  onChange, index,
  setCorrectAnswer, answer,
  setPollSortPosition,
}) => {
  return (
    <Row className={styles.answer}>
      <Col className="pl-0 " xs="9">
        <Input
          onChange={(event) => { return onChange({ index, value: event.target.value }); }}
          name="answer"
          placeholder="Answer"
          defaultValue={answer.text}
          className="mr-4"
        />
      </Col>
      <Col className="pr-0" xs="3">
        <Input
          type="number"
          min="0"
          defaultValue={answer.position}
          max={index}
          onChange={(event) => { return setPollSortPosition({ index, value: parseInt(event.target.value, 10) }); }}
          name="position"
          placeholder="Position"
          className="mr-4"
        />
      </Col>
    </Row>
  );
};

export default PreferenceOrderAnswers;
