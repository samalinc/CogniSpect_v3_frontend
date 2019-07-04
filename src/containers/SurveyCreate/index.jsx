import React, { Component } from 'react';
import {
  Table,
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
} from 'reactstrap';
import {
  Loader,
  Placeholder,
  Paginate,
} from 'components';
import { getTests, getCurrentTest } from 'redux/sagas/test/selectors';
import { showModal } from 'redux/actions/modal';
import { connect } from 'react-redux';
import { ITEM_PER_PAGE } from 'utils/constants';
import {
  loadPollsRequest,
} from 'redux/actions/poll';
import {
  setTestData,
  addPoll,
  createTestRequest,
} from 'redux/actions/test';
import { getPolls } from 'redux/sagas/poll/selectors';
import { AppSwitch } from '@coreui/react';
import styles from './styles.module.scss';

class SurveyCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
    };
    this.removePoll = ::this.removePoll;
    this.onPageChange = ::this.onPageChange;
  }

  componentDidMount() {
    const { loadPolls } = this.props;

    loadPolls({
      page: 0,
      pageSize: ITEM_PER_PAGE,
    });
  }

  onPageChange(current) {
    const {
      loadPolls,
      history,
    } = this.props;

    this.setState({ page: current });

    history.push(`?page=${current}`);
    loadPolls({
      query: {
        $sort: {
          createdAt: 1,
        },
        $limit: ITEM_PER_PAGE,
        $skip: `${(current - 1) * ITEM_PER_PAGE}%`,
      },
    });
  }


  removePoll(meetingId, meetingName) {
    const {
      showModal,
      deleteConfernce,
    } = this.props;

    showModal(
      'CONFIRM_MODAL',
      {
        title: 'Remove poll',
        confirmButtonTitle: 'Confirm',
        confirmAction: () => { deleteConfernce(meetingId); },
        message: (<h4>{`Remove ${meetingName} ?`}</h4>),
        type: 'danger',
      },
    );
  }

  createTest = () => {
    const {
      props: {
        createTest,
        currentTest,
      },
    } = this;

    createTest(currentTest.testTemplateQuestions);
  }

  render() {
    const {
      history,
      polls,
      addPoll,
      setTestData,
    } = this.props;
    const { page } = this.state;

    const pageNumber = history.location.search.split('');
    return (
      <Card>
        <CardHeader className={styles.cardHeader}>
          <div>
            <i className="fa fa-align-justify mr-3" />
            <strong className="mr-4">New Survey</strong>
          </div>
          <Input
            placeholder="Survey title"
            name="name"
            style={{ marginRight: 'auto' }}
            onChange={(event) => { return setTestData({ value: event.target.value, name: event.target.name }); }}
          />
          <Button
            onClick={this.createTest}
            color="success"
          >
              Create new survey
          </Button>
        </CardHeader>
        <Loader loaded={!polls.isLoading}>
          {
            polls.items.length === 0 ? <Placeholder text="Sorry, no content!" />
              : (
                <CardBody>
                  <Table
                    striped
                    responsive
                    hover
                  >
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Topic</th>
                        <th>Subject</th>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody style={{ fontWeight: 'normal' }}>
                      {
                        polls.items.map(((poll, index) => {
                          return (
                            <tr key={poll.id}>
                              <th scope="row">{index}</th>
                              <th scope="row">{poll.topic.name || '-'}</th>
                              <th scope="row">{poll.topic.subject.name || '-'}</th>
                              <th scope="row">{poll.type || '-'}</th>
                              <th className={styles.description} scope="row">{poll.description || '-'}</th>
                              <th scope="row">
                                <div className={styles.actions}>
                                  <Input
                                    placeholder="Question cost"
                                    type="number"
                                    name="questionCost"
                                    min="0"
                                    max="10"
                                    onChange={(event) => { return setTestData({ value: event.target.value, name: event.target.name, questionId: poll.id }); }}
                                  />
                                  <AppSwitch
                                    name="isCorrect"
                                    variant="pill"
                                    color="success"
                                    className={styles.switch}
                                    label
                                    dataOn={'\u2713'}
                                    dataOff={'\u2715'}
                                    onChange={() => { addPoll({ questionId: poll.id, questionCost: 0 }); }}
                                  />
                                </div>
                              </th>
                            </tr>
                          );
                        }))
                      }
                    </tbody>
                  </Table>
                </CardBody>
              )
          }
        </Loader>
        <Paginate
          current={parseInt(pageNumber[pageNumber.length - 1]) ? (parseInt(pageNumber[pageNumber.length - 1], 10) !== page
            ? parseInt(pageNumber[pageNumber.length - 1], 10) : page) : page}
          onChange={this.onPageChange}
        //   total={meetings.total}
        />
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    polls: getPolls(state),
    tests: getTests(state),
    currentTest: getCurrentTest(state),
  };
};

export default connect(mapStateToProps, {
  showModal,
  loadPolls: loadPollsRequest,
  setTestData,
  addPoll,
  createTest: createTestRequest,
})(SurveyCreate);
