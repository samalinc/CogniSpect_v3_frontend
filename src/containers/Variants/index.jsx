import React, { Component } from 'react';
import {
  Table,
  Card,
  CardHeader,
  CardBody,
  Button,
  Container,
} from 'reactstrap';
import { showModal } from 'redux/actions/modal';
import { connect } from 'react-redux';
import { ITEM_PER_PAGE } from 'utils/constants';
import {
  loadVariantsRequest,
  removeVariantRequest,
  updateVariantRequest,
  getVariantRequest,
  createVariantRequest,
} from 'redux/actions/variants';
import { getSessions } from 'redux/sagas/session/selectors';
import {
  Loader,
  Placeholder,
  SessionCreateModal,
  Paginate,
} from 'components';
import { loadUsersRequest } from 'redux/actions/users';
import { loadTestsRequest } from 'redux/actions/test';
import { getTests } from 'redux/sagas/test/selectors';
import styles from './styles.module.scss';

class Variants extends Component {
  componentDidMount() {
    const {
      loadSessions,
      loadUsers,
      loadTests,
    } = this.props;

    loadSessions({
      page: 0,
      pageSize: ITEM_PER_PAGE,
    });
    loadUsers({
      page: 0,
      pageSize: ITEM_PER_PAGE,
    });
    loadTests({
      page: 0,
      pageSize: ITEM_PER_PAGE,
    });
  }

  createSession = () => {
    const {
      props: {
        showModal,
        createSession,
      },
    } = this;
    showModal(
      'CONFIRM_MODAL',
      {
        title: 'Create session',
        confirmButtonTitle: 'Confirm',
        confirmAction: () => { createSession(); },
        message: <SessionCreateModal />,
        type: 'primary',
      },
    );
  }

  render() {
    const {
      history,
      tests,
      sessions,
    } = this.props;

    return (
      <Container>
        <Card>
          <CardHeader className={styles.cardHeader}>
            <div>
              <i className="fa fa-align-justify mr-3" />
              <strong className="mr-4">Sessions</strong>
            </div>
            <Button
              type="button"
              color="success"
              onClick={this.createSession}
              className="ml-auto"
            >
            Create session
            </Button>
          </CardHeader>
          <Loader loaded={!sessions.isLoading}>
            {
              sessions.items.length === 0 ? <Placeholder text="Sorry, no content!" />
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
                          <th>Name</th>
                          <th>Routers</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody style={{ fontWeight: 'normal' }}>
                        {
                          sessions.items.map(((session, index) => {
                            return (
                              <tr key={session.id}>
                                <th scope="row">{index}</th>
                                <th scope="row">{session.name || '-'}</th>
                                <th scope="row">{session.routers.join(',') || '-'}</th>
                                <th scope="row">{session.status || '-'}</th>
                                {/* <th scope="row">{test.creator.account.role || '-'}</th> */}
                                <th scope="row">
                                  <Button
                                    onClick={() => { return this.editTopic(session.id); }}
                                    color="primary"
                                    outline
                                    style={{ marginRight: '10px' }}
                                  >
                                   View
                                  </Button>
                                  <Button
                                    onClick={() => { return this.deleteTopic(session.id, session.name); }}
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
          {/* <Paginate
            current={parseInt(pageNumber[pageNumber.length - 1]) ? (parseInt(pageNumber[pageNumber.length - 1], 10) !== page
              ? parseInt(pageNumber[pageNumber.length - 1], 10) : page) : page}
            onChange={this.onPageChange}
          //   total={meetings.total}
          /> */}
        </Card>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sessions: getSessions(state),
    tests: getTests(state),
  };
};

export default connect(mapStateToProps, {
  showModal,
  removeSession: removeVariantRequest,
  updateSession: updateVariantRequest,
  loadSessions: loadVariantsRequest,
  loadUsers: loadUsersRequest,
  loadTests: loadTestsRequest,
  createSession: createVariantRequest,
})(Variants);
