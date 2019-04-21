import React, { Fragment } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import { withRouter } from 'react-router';
import { questionTypes } from 'utils/constants';

const PollTypes = React.memo(({ questionType, ...rest }) => {
  const onQuestionTypeChange = (type) => {
    return () => {
      const params = new URLSearchParams(location.search);
      params.set('type', type);
      rest.history.push(`?${params.toString()}`);
    };
  };
  return (
    <Fragment>
      <Card>
        <CardHeader tag="h3">
          <i className=" cui-list" />
          {'Question type'}
        </CardHeader>
        <CardBody>
          <ListGroup>
            {
              questionTypes.map((type) => {
                return (
                  <ListGroupItem
                    onClick={onQuestionTypeChange(type.key)}
                    active={questionType === type.key}
                    action
                    key={type.key}
                  >
                    {type.value}
                  </ListGroupItem>
                );
              })
            }
          </ListGroup>
        </CardBody>
      </Card>
    </Fragment>
  );
});

export default withRouter(PollTypes);
