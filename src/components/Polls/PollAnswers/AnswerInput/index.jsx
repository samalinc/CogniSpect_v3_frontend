import React from 'react';
import { AppSwitch } from '@coreui/react';
import { Input, Label } from 'reactstrap';
import styles from './styles.module.scss';

const AnswerInput = ({
  isSwitchEnable, onChange,
  setCorrectAnswer, iterator, answer,
}) => {
  return (
    <div className={styles.answer}>
      <Input
        onChange={onChange}
        name="answer"
        placeholder="Answer"
        className="mr-4"
      />
      {
        isSwitchEnable && (
          <AppSwitch
            onChange={() => { return setCorrectAnswer(iterator); }}
            name="isCorrect"
            variant="pill"
            color="success"
            className={styles.switch}
            checked={answer.correct}
            label
            dataOn={'\u2713'}
            dataOff={'\u2715'}
          />
        )
      }
    </div>
  );
};

export default AnswerInput;
