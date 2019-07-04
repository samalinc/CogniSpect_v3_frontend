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
  UserEdit,
} from 'components';
import { showModal } from 'redux/actions/modal';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import { ITEM_PER_PAGE } from 'utils/constants';
import {
  loadUsersRequest,
  createUserRequest,
  getUserRequest,
} from 'redux/actions/users';
import { getUsers } from 'redux/sagas/users/selectors';
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

  componentDidMount() {
    const { loadUsers } = this.props;

    loadUsers({});
  }

  onSearchDebounce = (value) => {
    // const {
    //   loadMeetings,
    // } = this.props;

    // loadMeetings({
    //   query: {
    //     $sort: {
    //       createdAt: 1,
    //     },
    //     title: { $like: `${value}%` },
    //   },
    // });
  }

  createUser() {
    const {
      showModal,
      deleteConfernce,
      createUser,
    } = this.props;
    showModal(
      'CONFIRM_MODAL',
      {
        title: 'Create user',
        confirmButtonTitle: 'Confirm',
        confirmAction: () => { createUser(); },
        message: (
          <UserCreate />
        ),
        type: 'primary',
      },
    );
  }

  editUser = (id) => {
    return () => {
      const {
        showModal,
        getUser,
        createUser,
      } = this.props;

      getUser(id);
      showModal(
        'CONFIRM_MODAL',
        {
          title: 'Create user',
          confirmButtonTitle: 'Confirm',
          confirmAction: () => { createUser(); },
          message: (
            <UserEdit />
          ),
          type: 'primary',
        },
      );
    };
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
      users,
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
        <Loader loaded={!users.isLoading}>
          {
            users.items.length === 0 ? <Placeholder text="Sorry, no content!" />
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
                        <th>First name</th>
                        <th>Last name</th>
                        <th>E-mail</th>
                        <th>Role</th>
                        <th>Study group</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody style={{ fontWeight: 'normal' }}>
                      {
                        users.items.map(((user, index) => {
                          return (
                            <tr key={user.id}>
                              <th scope="row">{index}</th>
                              <th scope="row">{user.firstName || '-'}</th>
                              <th scope="row">{user.lastName || '-'}</th>
                              <th scope="row">{user.email || '-'}</th>
                              <th scope="row">{user.role || '-'}</th>
                              <th scope="row">{user.studyGroup || '-'}</th>
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
    users: getUsers(state),
  };
};

export default connect(mapStateToProps, {
  showModal,
  loadUsers: loadUsersRequest,
  createUser: createUserRequest,
  getUser: getUserRequest,
})(ConferenceContainer);
