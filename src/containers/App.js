import React, { Component } from 'react';
import { withRouter } from 'react-router';
import {
  Switch,
  Route,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import cookieStorage from 'utils/cookie';
import { connect } from 'react-redux';
import { setPage } from 'redux/actions/app';
import PrivateRoute from 'components/HOC/PrivateRoute';
import {
  Users,
  Surveys,
  PollCreate,
  Polls,
  Topics,
  SurveyCreate,
  Subjects,
  Variants,
} from 'containers';
import Login from 'containers/Login';
import NotFound from 'containers/NotFound';
import AuthLayout from '../layouts/AuthLayout';
import DefaultLayout from '../layouts/DefaultLayout';

import './App.scss';

class App extends Component {
  componentDidMount() {
    const {
      history,
      setPage,
    } = this.props;

    this.unlisten = history.listen((location) => {
      setPage(location);
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    const isAuth = cookieStorage().getItem('authToken');
    return (
      <Switch>
        <Route
          path="/login"
          exact
          component={(() => {
            return (
              <AuthLayout
                component={<Login {...this.props} />}
              />
            );
          })}
        />
        <PrivateRoute
          path="/users"
          exact
          isAuth={isAuth}
          component={(
            <DefaultLayout>
              <Users {...this.props} />
            </DefaultLayout>
          )}
        />
        <PrivateRoute
          path="/questions/new"
          exact
          isAuth={isAuth}
          component={(
            <DefaultLayout>
              <PollCreate {...this.props} />
            </DefaultLayout>
          )}
        />
        <PrivateRoute
          path="/surveys"
          exact
          isAuth={isAuth}
          component={(
            <DefaultLayout>
              <Surveys {...this.props} />
            </DefaultLayout>
          )}
        />
        <PrivateRoute
          path="/surveys/new"
          exact
          isAuth={isAuth}
          component={(
            <DefaultLayout>
              <SurveyCreate {...this.props} />
            </DefaultLayout>
          )}
        />
        <PrivateRoute
          path="/polls"
          exact
          isAuth={isAuth}
          component={(
            <DefaultLayout>
              <Polls {...this.props} />
            </DefaultLayout>
          )}
        />
        <PrivateRoute
          path="/sessions"
          exact
          isAuth={isAuth}
          component={(
            <DefaultLayout>
              <Variants {...this.props} />
            </DefaultLayout>
          )}
        />
        <PrivateRoute
          path="/subjects"
          exact
          isAuth={isAuth}
          component={(
            <DefaultLayout>
              <Subjects {...this.props} />
            </DefaultLayout>
          )}
        />
        <PrivateRoute
          path="/topics"
          exact
          isAuth={isAuth}
          component={(
            <DefaultLayout>
              <Topics {...this.props} />
            </DefaultLayout>
          )}
        />
        <PrivateRoute
          path="*"
          exact
          isAuth={isAuth}
          component={(
            <DefaultLayout>
              <NotFound {...this.props} />
            </DefaultLayout>
          )}
        />
      </Switch>
    );
  }
}

App.propsTypes = {
  history: PropTypes.string,
};

App.defaulProps = {
  history: {},
};

export default withRouter(connect((state) => {
  return {

  };
}, {
  setPage,
})(App));

