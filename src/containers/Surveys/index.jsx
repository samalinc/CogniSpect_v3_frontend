import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Table,
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Label,
  Container,
} from 'reactstrap';
import { showModal } from 'redux/actions/modal';
import { connect } from 'react-redux';
import { ITEM_PER_PAGE } from 'utils/constants';
import {
  loadTestsRequest,
  removeTestRequest,
  updateTestRequest,
  getTestRequest,
} from 'redux/actions/test';
import { getTests } from 'redux/sagas/test/selectors';
import { Loader, Placeholder, Paginate } from 'components';
import styles from './styles.module.scss';

class Survey extends Component {
  componentDidMount() {
    const {
      loadTests,
    } = this.props;

    loadTests({
      page: 0,
      pageSize: ITEM_PER_PAGE,
    });
  }

  render() {
    const {
      history,
      tests,
    } = this.props;
    console.log(tests);
    return (
      <Container>
        <Card>
          <CardHeader className={styles.cardHeader}>
            <div>
              <i className="fa fa-align-justify mr-3" />
              <strong className="mr-4">Test templates</strong>
            </div>
            <Button
              type="button"
              color="success"
              onClick={() => { return history.push('/surveys/new'); }}
              className="ml-auto"
            >
            Create test template
            </Button>
          </CardHeader>
          <Loader loaded={!tests.isLoading}>
            {
              tests.items.length === 0 ? <Placeholder text="Sorry, no content!" />
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
                          <th>Creator name</th>
                          <th>Creator role</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody style={{ fontWeight: 'normal' }}>
                        {
                          tests.items.map(((test, index) => {
                            return (
                              <tr key={test.id}>
                                <th scope="row">{index}</th>
                                <th scope="row">{test.name || '-'}</th>
                                <th scope="row">{test.creator.firstName || '-'}</th>
                                <th scope="row">{test.creator.account.role || '-'}</th>
                                <th scope="row">
                                  <Button
                                    onClick={() => { return this.editTopic(test.id); }}
                                    color="primary"
                                    outline
                                    style={{ marginRight: '10px' }}
                                  >
                                   View
                                  </Button>
                                  <Button
                                    onClick={() => { return this.deleteTopic(test.id, topic.name); }}
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
    tests: getTests(state),
  };
};

export default connect(mapStateToProps, {
  showModal,
  removeTopic: removeTestRequest,
  updateTopic: updateTestRequest,
  loadTests: loadTestsRequest,
})(Survey);
