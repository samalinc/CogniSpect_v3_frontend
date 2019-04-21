import React, { Fragment } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Input,
  Label,
  Form,
} from 'reactstrap';
import {
  AnswerInput,
  AddAnswer,
} from 'components';
import { showModal } from 'redux/actions/modal';
import { connect } from 'react-redux';
import styles from './styles.module.scss';

const PollCreateForm = React.memo(({ showModal, ...rest }) => {
  const resetData = () => {
    showModal(
      'CONFIRM_MODAL',
      {
        title: 'Reset data',
        confirmButtonTitle: 'Confirm',
        confirmAction: () => { },
        message: (<h4>Are you sure you want to clear the data?</h4>),
        type: 'danger',
      },
    );
  };
  return (
    <Fragment>
      <Card>
        <Form>
          <CardHeader tag="h3">
            <i className="icon-question" />
            {'Create question'}
          </CardHeader>
          <CardBody>
            <Label>Description</Label>
            <Input
              className="mb-2"
              required
              rows="5"
              name="description"
              placeholder="Description"
              type="textarea"
            />
            <Label>Subject</Label>
            <Input
              className="mb-2"
              name="subject"
              type="select"
            />
            <Label>Topic</Label>
            <Input
              className="mb-2"
              name="topic"
              type="select"
            />
            <Label>Answers</Label>
            <div className={styles.answers}>
              <AnswerInput
                isSwitchEnable
              />
              <AnswerInput
                isSwitchEnable
              />
              <AnswerInput
                isSwitchEnable
              />
              <AddAnswer />
            </div>
          </CardBody>
          <div className={styles.pollButtons}>
            <Button
              color="primary"
              type="submit"
            >
              {'Create question'}
            </Button>
            <Button
              color="danger"
              onClick={resetData}
            >
              {'Reset data'}
            </Button>
          </div>

        </Form>
      </Card>
    </Fragment>
  );
});

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, {
  showModal,
})(PollCreateForm);
