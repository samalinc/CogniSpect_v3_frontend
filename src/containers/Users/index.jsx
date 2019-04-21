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
  UserCreate,
} from 'components';

import { showModal } from 'redux/actions/modal';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import { ITEM_PER_PAGE } from 'utils/constants';
import styles from './styles.module.scss';

class ConferenceContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
    };
    this.createUser = ::this.createUser;
    this.removeMeeting = ::this.removeMeeting;
    this.onChange = ::this.onChange;
    this.onPageChange = ::this.onPageChange;
    this.onSearchDebounce = debounce(this.onSearchDebounce, 350);
  }


  onSearchDebounce = (value) => {
    const {
      loadMeetings,
    } = this.props;

    loadMeetings({
      query: {
        $sort: {
          createdAt: 1,
        },
        title: { $like: `${value}%` },
      },
    });
  }

  createUser() {
    const {
      showModal,
      deleteConfernce,
    } = this.props;

    showModal(
      'CONFIRM_MODAL',
      {
        title: 'Create user',
        confirmButtonTitle: 'Confirm',
        confirmAction: () => { },
        message: (
          <UserCreate />
        ),
        type: 'primary',
      },
    );
  }

  removeMeeting(meetingId, meetingName) {
    const {
      showModal,
      deleteConfernce,
    } = this.props;

    showModal(
      'CONFIRM_MODAL',
      {
        title: 'Remove meeting',
        confirmButtonTitle: 'Confirm',
        confirmAction: () => { deleteConfernce(meetingId); },
        message: (<h4>{`Remove ${meetingName} ?`}</h4>),
        type: 'danger',
      },
    );
  }

  onChange(event) {
    const {
      value,
    } = event.target;

    this.onSearchDebounce(value);
  }

  onPageChange(current) {
    const {
      loadMeetings,
      history,
    } = this.props;

    this.setState({ page: current });

    history.push(`?page=${current}`);
    loadMeetings({
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
    } = this.props;
    const { page } = this.state;
    const pageNumber = history.location.search.split('');

    return (
      <Card>
        <CardHeader className={styles.cardHeader}>
          <div>
            <i className="fa fa-align-justify mr-3" />
            <strong className="mr-4">Users</strong>
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
              Create new user
          </Button>
        </CardHeader>
        <Loader loaded>
          {
            [].length === 0 ? <Placeholder text="Sorry, no content!" />
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
                        <th>Title</th>
                        <th>Language</th>
                        <th>Auth type</th>
                        <th>Translation service</th>
                        <th>Url</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody style={{ fontWeight: 'normal' }}>
                      {
                        [].map(((meeting) => {
                          return (
                            <tr
                              key={meeting.id}
                            >
                              <th scope="row">{meeting.id}</th>
                              <th scope="row">{meeting.title}</th>
                              <th scope="row">{meeting.language}</th>
                              <th scope="row">{meeting.authType}</th>
                              <th scope="row">{meeting.translationService}</th>
                              <th scope="row">{meeting.url}</th>
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
  };
};

export default connect(mapStateToProps, {
  showModal,
})(ConferenceContainer);
