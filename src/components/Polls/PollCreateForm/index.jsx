import React, { Fragment } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Input,
  Label,
  Form,
} from 'reactstrap';
import {
  AnswerInput,
  AddAnswer,
} from 'components';
import CreatableSelect from 'react-select/lib/Creatable';
import { showModal } from 'redux/actions/modal';
import { connect } from 'react-redux';
import { getPoll } from 'redux/sagas/poll/selectors';
import styles from './styles.module.scss';

const PollCreateForm = React.memo(({
  onDataChange, colourStyles, addPollAnswer,
  poll, setCorrectAnswer,
}) => {
  return (
    <Fragment>
      <Card>
        <Form>
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
                poll.answers.map((answer, iterator) => {
                  return (
                    <AnswerInput
                      iterator={iterator}
                      setCorrectAnswer={setCorrectAnswer}
                      key={`${answer}-${iterator}`}
                      answer={answer}
                      isSwitchEnable
                    />
                  );
                })
              }
              <AddAnswer addPollAnswer={addPollAnswer} />
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
