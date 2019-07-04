import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Row, Col, Label, Input, Button,
} from 'reactstrap';
import {
  setVariantData,
  addRouter,
  addUser,
} from 'redux/actions/variants';
import { AppSwitch } from '@coreui/react';
import { getTests } from 'redux/sagas/test/selectors';
import { getUsers } from 'redux/sagas/users/selectors';
import styles from './styles.module.scss';

class SessionCreateModal extends Component {
  render() {
    const {
      props: {
        tests,
        users,
        setVariantData,
        addRouter,
        addUser,
      },
    } = this;

    return (
      <Fragment>
        <Row>
          <Col>
            <Label>Session name</Label>
            <Input
              type="text"
              name="name"
              onChange={(event) => { setVariantData({ name: event.target.name, value: event.target.value }); }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Label>Router 1</Label>
            <Input
              type="text"
              name="router"
              onChange={(event) => {
                return addRouter({
                  name: event.target.name,
                  value: event.target.value,
                  index: 0,
                });
              }}
            />
            <Label>Router 2</Label>
            <Input
              type="text"
              name="router"
              onChange={(event) => {
                return addRouter({
                  name: event.target.name,
                  value: event.target.value,
                  index: 1,
                });
              }}
            />
          </Col>
          <Col>
            <Label>Router 3</Label>
            <Input
              type="text"
              name="router"
              onChange={(event) => {
                return addRouter({
                  name: event.target.name,
                  value: event.target.value,
                  index: 2,
                });
              }}
            />
            <Label>Router 4</Label>
            <Input
              type="text"
              name="router"
              onChange={(event) => {
                return addRouter({
                  name: event.target.name,
                  value: event.target.value,
                  index: 3,
                });
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Label>Variant</Label>
            <Input
              type="select"
              name="testTemplateId"
              onChange={(event) => { setVariantData({ name: event.target.name, value: event.target.value }); }}
            >
              {
                tests.map((test) => {
                  return <option key={test.id} value={test.id}>{test.name}</option>;
                })
              }
            </Input>
          </Col>
        </Row>
        <Row>
          <Col>
            <Label>User list</Label>
          </Col>

        </Row>
        <Row>
          {
            users.map((user) => {
              return (
                <div key={user.id}>
                  <Col>
                    <span>
                      {user.firstName}
                    </span>
                    <Input
                      type="checkbox"
                      name="isActive"
                      className="ml-2"
                      onChange={(event) => { addUser({ value: event.target.value, id: user.id }); }}
                    />
                  </Col>
                </div>
              );
            })
          }
        </Row>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tests: getTests(state).items,
    users: getUsers(state).items,
  };
};

export default connect(mapStateToProps, {
  setVariantData,
  addRouter,
  addUser,
})(SessionCreateModal);
