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
  loadTopicsRequest,
  createTopicRequest,
  removeTopicRequest,
  updateTopicRequest,
  getTopicRequest,
  setTopicData,
} from 'redux/actions/topic';
import { loadSubjectsRequest } from 'redux/actions/subject';
import {
  getTopics,
  getCurrentTopic,
} from 'redux/sagas/topic/selectors';
import { getSubjects } from 'redux/sagas/subjects/selectors';
import styles from './styles.module.scss';

class Topics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
    };
    // this.deleteTopic = ::this.deleteTopic;
    this.onPageChange = ::this.onPageChange;
    this.createTopic = ::this.createTopic;
  }

  componentDidMount() {
    const {
      loadTopics,
      loadSubjects,
    } = this.props;

    loadSubjects({
      page: 0,
      pageSize: ITEM_PER_PAGE,
    });

    loadTopics({
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

  // deleteTopic(topicId, topicName) {
  //   const {
  //     showModal,
  //     removeTopic,
  //   } = this.props;

  //   showModal(
  //     'CONFIRM_MODAL',
  //     {
  //       title: 'Remove poll',
  //       confirmButtonTitle: 'Confirm',
  //       confirmAction: () => { removeTopic(topicId); },
  //       message: (<h4>{`Remove ${topicName} ?`}</h4>),
  //       type: 'danger',
  //     },
  //   );
  // }

  createTopic = (topicId, topicName) => {
    return () => {
      const {
        showModal,
        createTopic,
        setTopicData,
        topic,
        subjects,
      } = this.props;

      showModal(
        'CONFIRM_MODAL',
        {
          title: 'Remove poll',
          confirmButtonTitle: 'Confirm',
          confirmAction: () => { createTopic(); },
          message: (
            <div>
              <Label>Topic name</Label>
              <Input
                defaultValue={topic.name}
                name="topic"
                placeholder="Topic name"
                className="mb-2"
                onChange={(event) => { return setTopicData({ name: event.target.name, value: event.target.value }); }}
              />
              <Label>Subject name</Label>
              <Input
                type="select"
                name="subjectId"
                placeholder="Subject name"
                onChange={(event) => { return setTopicData({ name: event.target.name, value: event.target.value }); }}
              >
                <option>Choose subject</option>
                {
                  subjects.map((subject) => {
                    return <option value={subject.id} key={subject.id}>{subject.name}</option>;
                  })
                }
              </Input>
            </div>),
          type: 'primary',
        },
      );
    };
  }

  editTopic(id) {
    const {
      showModal,
      updateTopic,
      getTopic,
      setTopicData,
      topic,
    } = this.props;

    getTopic(id);
    showModal(
      'CONFIRM_MODAL',
      {
        title: 'Remove poll',
        confirmButtonTitle: 'Confirm',
        confirmAction: () => { updateTopic(); },
        message: (
          <div>
            <Label>Topic name</Label>
            <Input
              defaultValue={topic.name}
              name="topic"
              placeholder="Topic name"
              className="mb-2"
              onChange={(event) => { return setTopicData({ name: event.target.name, value: event.target.value }); }}
            />
            <Label>Subject name</Label>
            <Input
              type="select"
              // defaultValue={topic.subject.name}
              name="subject"
              placeholder="Subject name"
              onChange={(event) => { return setTopicData({ name: event.target.name, value: event.target.value }); }}
            >
              <option>Choose subject</option>
              {
                subjects.map((subject) => {
                  return <option key={subject.id}>{subject.name}</option>;
                })
              }
            </Input>
          </div>),
        type: 'primary',
      },
    );
  }

  render() {
    const {
      history,
      topics,
    } = this.props;
    const { page } = this.state;
    const pageNumber = history.location.search.split('');

    return (
      <Card>
        <CardHeader className={styles.cardHeader}>
          <div>
            <i className="fa fa-align-justify mr-3" />
            <strong className="mr-4">Topics</strong>
          </div>
          <Input
            placeholder="Search"
            name="user"
            onChange={this.onChange}
            style={{ marginRight: 'auto' }}
          />
          <Button
            onClick={this.createTopic()}
            color="success"
          >
              Create new topic
          </Button>
        </CardHeader>
        <Loader loaded={!topics.isLoading}>
          {
            topics.items.length === 0 ? <Placeholder text="Sorry, no content!" />
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
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody style={{ fontWeight: 'normal' }}>
                      {
                        topics.items.map(((topic, index) => {
                          return (
                            <tr key={topic.id}>
                              <th scope="row">{index}</th>
                              <th scope="row">{topic.name || '-'}</th>
                              <th scope="row">{topic.subject.name || '-'}</th>
                              <th scope="row">
                                <Button
                                  onClick={() => { return this.editTopic(topic.id); }}
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
    subjects: getSubjects(state).items,
    topics: getTopics(state),
    topic: getCurrentTopic(state),
  };
};

export default connect(mapStateToProps, {
  showModal,
  loadTopics: loadTopicsRequest,
  getTopic: getTopicRequest,
  createTopic: createTopicRequest,
  removeTopic: removeTopicRequest,
  updateTopic: updateTopicRequest,
  setTopicData,
  loadSubjects: loadSubjectsRequest,
})(Topics);
