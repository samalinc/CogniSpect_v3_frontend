import React, { Fragment, useState, useEffect } from 'react';
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
import { loadSubjectsRequest } from 'redux/actions/subject';
import { loadTopicsRequest } from 'redux/actions/topic';
import CreatableSelect from 'react-select/lib/Creatable';
import { showModal } from 'redux/actions/modal';
import { connect } from 'react-redux';
import { getPoll } from 'redux/sagas/poll/selectors';
import {
  setSubstitutionTemplate,
  setSubstitutionText,
} from 'redux/actions/poll';
import { getSubjects } from 'redux/sagas/subjects/selectors';
import { getTopics } from 'redux/sagas/topic/selectors';
import { ITEM_PER_PAGE } from 'utils/constants';
import styles from './styles.module.scss';

const PollCreateForm = React.memo(({
  onDataChange, colourStyles, addPollAnswer,
  poll, setCorrectAnswer, addPollAnswerText,
  createPoll, setPollSortPosition, addPollSubstitution,
  type, setSubstitutionTemplate, setSubstitutionText,
  topics, subjects, loadSubjects, loadTopics, setPollData,
}) => {
  useEffect(() => {
    loadSubjects({
      page: 0,
      pageSize: ITEM_PER_PAGE,
    });

    loadTopics({
      page: 0,
      pageSize: ITEM_PER_PAGE,
    });
  }, []);

  const getPollAnswers = (rest) => {
    switch (type) {
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
        poll.chooseAnswers.map((answer, iterator) => {
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
      return poll.chooseAnswers.map((answer, iterator) => {
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

  const [description, setDesciption] = useState('');

  const setDesciptionValue = (event) => {
    setDesciption(event.target.value);
    onDataChange(event);
  };

  const addSubstitutionTemplate = () => {
    if (!description.split('%').find((word) => { return word === 'substitution'; })) {
      setDesciption(`${description}%substitution%`);
    }
    setSubstitutionTemplate();
  };
  console.log(topics, subjects);
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
              onChange={setDesciptionValue}
              className="mb-2"
              required
              rows="5"
              value={description}
              name="description"
              placeholder="Description"
              type="textarea"
            />
            {
              type === 'SUBSTITUTION' && (
                <Col className="pl-0 mb-2 mt-2">
                  <Button
                    type="button"
                    className="btn btn-success"
                    onClick={addSubstitutionTemplate}
                  >
                    {'Add substitution'}
                  </Button>
                </Col>
              )
            }
            <Label>Subject</Label>
            <Input
              type="select"
              name="subjectId"
              onChange={(event) => { setPollData({ name: event.target.name, value: event.target.value }); }}
            >
              <option>Choose subject</option>
              {
                subjects.map((subject) => {
                  return <option key={subject.id} value={subject.id}>{subject.name}</option>;
                })
              }
            </Input>
            <Label>Topic</Label>
            <Input
              type="select"
              name="topicId"
              onChange={(event) => { setPollData({ name: event.target.name, value: event.target.value }); }}
            >
              <option>Choose topic</option>
              {
                topics.map((topic) => {
                  return <option key={topic.id} value={topic.id}>{topic.name}</option>;
                })
              }

            </Input>
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
                poll.substitutions.map((substitution, iterator) => {
                  return (
                    <Input
                      onChange={(event) => { return setSubstitutionText({ index: iterator, value: event.target.value }); }}
                      placeholder="Substitution"
                      className="mb-2"
                      defaultValue={substitution.text}
                      type="textarea"
                    />
                  );
                })
              }
              {
                type === 'SUBSTITUTION' && (
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
    subjects: getSubjects(state).items,
    topics: getTopics(state).items,
  };
};

export default connect(mapStateToProps, {
  showModal,
  setSubstitutionTemplate,
  setSubstitutionText,
  loadSubjects: loadSubjectsRequest,
  loadTopics: loadTopicsRequest,
})(PollCreateForm);
