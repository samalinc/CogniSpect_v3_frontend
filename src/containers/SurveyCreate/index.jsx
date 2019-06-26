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

import { showModal } from 'redux/actions/modal';
import { connect } from 'react-redux';
import { ITEM_PER_PAGE } from 'utils/constants';
import {
  loadPollsRequest,
} from 'redux/actions/poll';
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


  editPoll = (id) => {
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

  render() {
    const {
      history,
      polls,
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
            name="user"
            onChange={this.onChange}
            style={{ marginRight: 'auto' }}
          />
          <Button
            onClick={this.createUser}
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
                                    type="text"
                                    name="questionCost"
                                  />
                                  <AppSwitch
                                    //   onChange={() => { return setCorrectAnswer(iterator); }}
                                    name="isCorrect"
                                    variant="pill"
                                    color="success"
                                    className={styles.switch}
                                    label
                                    dataOn={'\u2713'}
                                    dataOff={'\u2715'}
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
  };
};

export default connect(mapStateToProps, {
  showModal,
  loadPolls: loadPollsRequest,
})(SurveyCreate);
