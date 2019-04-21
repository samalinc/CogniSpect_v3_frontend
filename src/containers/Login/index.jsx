import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Alert,
} from 'reactstrap';

import { connect } from 'react-redux';
import {
  loginRequest,
} from 'redux/actions/auth';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.onLogin = this.onLogin.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onLogin(event) {
    event.preventDefault();

    const {
      history,
      logIn,
    } = this.props;

    const {
      login,
      password,
    } = this.state;

    logIn({
      history,
      redirect: () => {
        history.push('/users');
      },
      data: {
        login,
        password,
      },
    });
  }

  onChange(event) {
    event.preventDefault();
    const {
      name,
      value,
    } = event.target;

    this.setState({ [name]: value });
  }

  render() {
    const {
      error,
    } = this.props;

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.onLogin}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          required
                          onChange={this.onChange}
                          name="login"
                          value={this.state.login}
                          placeholder="Username"
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          required
                          onChange={this.onChange}
                          name="password"
                          type="password"
                          value={this.state.password}
                          placeholder="Password"
                          autoComplete="current-password"
                        />
                      </InputGroup>
                      {
                        error && (
                          <Alert color="danger">
                            {`Something was wrong: ${error.message}`}
                          </Alert>
                        )
                      }
                      <Row>
                        <Col xs="6">
                          <Button
                            color="primary"
                            className="px-4"
                            onClick={this.login}
                          >
                            {'Login'}
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.auth.isLoading,
    error: state.auth.error,
  };
};

Login.propTypes = {
  isLoading: PropTypes.bool,
  history: PropTypes.object,
};

export default connect(mapStateToProps, {
  logIn: loginRequest,
})(Login);
