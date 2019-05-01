import React, { Fragment } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Input,
  Label,
  Form,
  Col,
} from 'reactstrap';
import {
  AnswerInput,
  AddAnswer,
  PreferenceOrderAnswers,
  MatchPollAnswers,
  SubstitutionAnswers,
} from 'components';
import CreatableSelect from 'react-select/lib/Creatable';
import { showModal } from 'redux/actions/modal';
import { connect } from 'react-redux';
import { getPoll } from 'redux/sagas/poll/selectors';
import styles from './styles.module.scss';

const PollCreateForm = React.memo(({
  onDataChange, colourStyles, addPollAnswer,
  poll, setCorrectAnswer, addPollAnswerText,
  createPoll, setPollSortPosition, addPollSubstitution,
}) => {
  const getPollAnswers = (rest) => {
    switch (poll.type) {
    case 'SORT': {
      return (
        poll.sortAnswers.map((answer, iterator) => {
          return (
            <PreferenceOrderAnswers
              index={iterator}
              onChange={addPollAnswerText}
              setCorrectAnswer={setCorrectAnswer}
              setPollSortPosition={setPollSortPosition}
              key={`${answer}-${iterator}`}
              answer={answer}
            />
          );
        })
      );
    }
    case 'MULTICHOOSE':
    case 'CHOOSE': {
      return (
        poll.answers.map((answer, iterator) => {
          return (
            <AnswerInput
              index={iterator}
              onChange={rest.addPollAnswerText}
              iterator={iterator}
              setCorrectAnswer={rest.setCorrectAnswer}
              key={`${answer}-${iterator}`}
              answer={answer}
              isSwitchEnable
            />
          );
        })
      );
    }
    case 'MATCH': {
      return (
        poll.matchAnswers.map((answer, iterator) => {
          return (
            <MatchPollAnswers
              index={iterator}
              onChange={rest.addPollAnswerText}
              iterator={iterator}
              setCorrectAnswer={rest.setCorrectAnswer}
              key={`${answer}-${iterator}`}
              answer={answer}
              isSwitchEnable
            />
          );
        })
      );
    }
    case 'SUBSTITUTION': {
      return poll.answers.map((answer, iterator) => {
        return (
          <SubstitutionAnswers
            index={iterator}
            onChange={rest.addPollAnswerText}
            iterator={iterator}
            setCorrectAnswer={rest.setCorrectAnswer}
            key={`${answer}-${iterator}`}
            answer={answer}
            isSwitchEnable
          />
        );
      });
    }
    default: return 'No poll with such type';
    }
  };

  return (
    <Fragment>
      <Card>
        <Form onSubmit={(event) => { event.preventDefault(); return createPoll(); }}>
          <CardHeader tag="h3">
            <i className="icon-question" />
            {'Create question'}
          </CardHeader>
          <CardBody>
            <Label>Description</Label>
            <Input
              onChange={onDataChange}
              className="mb-2"
              required
              rows="5"
              name="description"
              placeholder="Description"
              type="textarea"
            />
            {
              poll.type === 'SUBSTITUTION' && (
                <Col className="pl-0 mb-2 mt-2">
                  <Button
                    type="button"
                    className="btn btn-success"
                  >
                    {'Add substitution'}
                  </Button>
                </Col>
              )
            }
            <Label>Subject</Label>
            <CreatableSelect
              isClearable
              // onChange={()}
              // onInputChange={this.handleInputChange}
              styles={colourStyles}
              onCreateOption={() => { return console.log('create'); }}
              // options={}
            />
            <Label>Topic</Label>
            <CreatableSelect
              isClearable
              // onChange={()}
              // onInputChange={this.handleInputChange}
              styles={colourStyles}
              onCreateOption={() => { return console.log('create'); }}
              // options={}
            />
            <Label>Answers</Label>
            <div className={styles.answers}>
              {
                getPollAnswers({
                  addPollAnswerText,
                  setCorrectAnswer,
                  setPollSortPosition,
                })
              }
              <AddAnswer addPollAnswer={addPollAnswer} />
              {
                poll.substitutions.map((substitution) => {
                  return (
                    <Input
                      onKeyUp={(event) => { console.log(event.target.selectionStart); }}
                      onMouseDown={(event) => { console.log(event.target.selectionEnd); }}
                      placeholder="Substitution"
                      className="mb-2"
                      defaultValue={substitution.text}
                      type="textarea"
                    />
                  );
                })
              }
              {
                poll.type === 'SUBSTITUTION' && (
                  <div
                    onClick={addPollSubstitution}
                    className={styles.addAnswer}
                  >
                    {'+ Add substitution'}
                  </div>
                )
              }
            </div>
          </CardBody>
          <div className={styles.pollButtons}>
            <Button
              color="primary"
              type="submit"
            >
              {'Create question'}
            </Button>
          </div>
        </Form>
      </Card>
    </Fragment>
  );
});

const mapStateToProps = (state) => {
  return {
    poll: getPoll(state),
  };
};

export default connect(mapStateToProps, {
  showModal,
})(PollCreateForm);
