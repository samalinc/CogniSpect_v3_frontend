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
import styles from './styles.module.scss';

class Polls extends Component {
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

    loadPolls({});
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
    console.log(polls.items);
    const pageNumber = history.location.search.split('');
    return (
      <Card>
        <CardHeader className={styles.cardHeader}>
          <div>
            <i className="fa fa-align-justify mr-3" />
            <strong className="mr-4">Polls</strong>
          </div>
          <Input
            placeholder="Search"
            name="user"
            onChange={this.onChange}
            style={{ marginRight: 'auto' }}
          />
          <Button
            onClick={this.createUser}
            color="success"
          >
              Create new poll
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
                              <th scope="row">{poll.description || '-'}</th>
                              <th scope="row">
                                <Button
                                //   onClick={() => { return this.chooseConference(meeting.id); }}
                                  color="primary"
                                  outline
                                  style={{ marginRight: '10px' }}
                                >
                                 View
                                </Button>
                                <Button
                                  onClick={() => { return this.removeMeeting(meeting.id, meeting.title); }}
                                  icon="cui-delete"
                                  outline
                                  color="danger"
                                >
                                  Delete
                                </Button>
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
})(Polls);
