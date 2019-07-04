import React, { Component } from 'react';
import {
  Table,
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Label,
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
  loadSubjectsRequest,
  createSubjectRequest,
  // removeTopicRequest,
  updateSubjectRequest,
  getSubjectRequest,
  setSubjectData,
} from 'redux/actions/subject';
import {
  getSubjects,
  getCurrentSubject,
} from 'redux/sagas/subjects/selectors';
import styles from './styles.module.scss';

class Subjects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
    };
    this.deleteTopic = ::this.deleteTopic;
    this.onPageChange = ::this.onPageChange;
    this.createSubject = ::this.createSubject;
  }

  componentDidMount() {
    const { loadSubjects } = this.props;

    loadSubjects({
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

  createSubject = (topicId, topicName) => {
    return () => {
      const {
        showModal,
        createSubject,
        setSubjectData,
        subject,
      } = this.props;

      showModal(
        'CONFIRM_MODAL',
        {
          title: 'Remove poll',
          confirmButtonTitle: 'Confirm',
          confirmAction: () => { createSubject(); },
          message: (
            <div>
              <Label>Subject name</Label>
              <Input
                defaultValue={subject.name}
                name="subject"
                placeholder="Subject name"
                onChange={(event) => { return setSubjectData(event.target.value); }}
              />
            </div>),
          type: 'primary',
        },
      );
    };
  }

  deleteTopic(topicId, topicName) {
    const {
      showModal,
      removeTopic,
    } = this.props;

    showModal(
      'CONFIRM_MODAL',
      {
        title: 'Remove poll',
        confirmButtonTitle: 'Confirm',
        confirmAction: () => { removeTopic(topicId); },
        message: (<h4>{`Remove ${topicName} ?`}</h4>),
        type: 'danger',
      },
    );
  }

  async editSubject(id) {
    const {
      showModal,
      updateTopic,
      getSubject,
      setSubjectData,
      subject,
    } = this.props;

    const temp = await getSubject(id);

    showModal(
      'CONFIRM_MODAL',
      {
        title: 'Remove poll',
        confirmButtonTitle: 'Confirm',
        confirmAction: () => { updateTopic(); },
        message: (
          <div>
            <Label>Subject name</Label>
            <Input
              defaultValue={subject.name}
              name="subject"
              placeholder="Subject name"
              onChange={(event) => { return setSubjectData(event.target.value); }}
            />
          </div>),
        type: 'primary',
      },
    );
  }

  render() {
    const {
      history,
      subjects,
    } = this.props;
    const { page } = this.state;
    const pageNumber = history.location.search.split('');

    return (
      <Card>
        <CardHeader className={styles.cardHeader}>
          <div>
            <i className="fa fa-align-justify mr-3" />
            <strong className="mr-4">Subjects</strong>
          </div>
          <Input
            placeholder="Search"
            name="user"
            onChange={this.onChange}
            style={{ marginRight: 'auto' }}
          />
          <Button
            onClick={this.createSubject()}
            color="success"
          >
              Create new subject
          </Button>
        </CardHeader>
        <Loader loaded={!subjects.isLoading}>
          {
            subjects.items.length === 0 ? <Placeholder text="Sorry, no content!" />
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
                        <th>Subject</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody style={{ fontWeight: 'normal' }}>
                      {
                        subjects.items.map(((topic, index) => {
                          return (
                            <tr key={topic.id}>
                              <th scope="row">{index}</th>
                              <th scope="row">{topic.name || '-'}</th>
                              <th scope="row">
                                <Button
                                  onClick={() => { return this.editSubject(topic.id); }}
                                  color="primary"
                                  outline
                                  style={{ marginRight: '10px' }}
                                >
                                 View
                                </Button>
                                <Button
                                  onClick={() => { return this.deleteTopic(topic.id, topic.name); }}
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
    subjects: getSubjects(state),
    subject: getCurrentSubject(state),
  };
};

export default connect(mapStateToProps, {
  showModal,
  loadSubjects: loadSubjectsRequest,
  getSubject: getSubjectRequest,
  createSubject: createSubjectRequest,
  // removeTopic: removeSubjectRequest,
  updateSubject: updateSubjectRequest,
  setSubjectData,
})(Subjects);
