import React from 'react';
import {
  PollTypes,
  PollCreateForm,
} from 'components';
import {
  Row,
  Col,
} from 'reactstrap';

const PollCreate = () => {
  const params = new URLSearchParams(location.search);
  const type = params.get('type');

  return (
    <Row>
      <Col xs="8">
        <PollCreateForm />
      </Col>
      <Col xs="4">
        <PollTypes
          questionType={type}
        />
      </Col>
    </Row>
  );
};

export default PollCreate;
